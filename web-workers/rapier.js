import RAPIER from '@dimforge/rapier3d-compat'
/*
// For testing this worker
rapierWorker.onmessage = console.log
rapierWorker.postMessage({op: 'init', gravity: {x: 0, y: -9.81, z: 0}})
rapierWorker.postMessage({op: 'addBodies', uuid: ['uuid0'], type: 'Sphere', props: [{}]})
rapierWorker.postMessage({op: 'step', gravity: {x: 0, y: -9.81, z: 0}})
*/

let bodyFromProperties = null
let physicsWorld = null
let bodies = null
let subscriptions = null
let inited = false

RAPIER.init().then(() => {
  bodies = {}
  subscriptions = {}
  bodyFromProperties = (uuid, props, type) => {
    const {
      args = [],
      position = [0, 0, 0],
      quaternion = [1, 0, 0, 0],
      velocity = [0, 0, 0],
      angularVelocity = [0, 0, 0],
      linearFactor = [1, 1, 1],
      angularFactor = [1, 1, 1],
      bodyType = 'Dynamic',
      mass = 1,
      isTrigger = false,
      material,
      shapes,
      onCollide,
      collisionResponse,
      ...extra
    } = props
    let collider = null
    switch (type) {
      case 'Box':
        collider = RAPIER.ColliderDesc.cuboid(
          args[0] || 1,
          args[1] || 1,
          args[2] || 1
        )
        break
      case 'Plane':
        collider = RAPIER.ColliderDesc.cuboid(
          args[0] || 10000,
          args[1] || 10000,
          0.001
        ) // args[0] x distance, args[1] z distance
        break
      case 'Sphere':
        collider = RAPIER.ColliderDesc.ball(args || 1) // radius = args
        break
      case 'Heightfield':
        if (!args[0] || !args[1] || !args[2] || !args[3]) {
          throw new Error(
            'At least one argument given to Heightfield constructor'
          )
        }
        collider = RAPIER.ColliderDesc.heightfield(
          args[0],
          args[1],
          args[2],
          args[3]
        )
        break // [ number of rows, number of columns, heightData 1D array, vertical scale ] = args
      case 'Cylinder':
        if (args[0] === undefined) {
          throw new Error(
            'Halfheight argument for Cylinder constructor is undefined'
          )
        }
        collider = RAPIER.ColliderDesc.cylinder(args[0] * 2 || 1, args[1] || 1)
        break // [ halfheight, radius ] = args
      case 'Capsule':
        if (args[0] === undefined) {
          throw new Error(
            'Halfheight argument for Capsule contrustor is undefined'
          )
        }
        collider = RAPIER.ColliderDesc.capsule(args[0] * 2 || 1, args[1] || 1)
        break // [ halfheight, radius] = args
      case 'ConvexPolyhedron':
        // collider = RAPIER.ColliderDesc.convex(scale[0], scale[1], scale[2])
        break
      case 'Particle':
        break // no args
      case 'Trimesh':
        break //
      default:
        throw new Error(`Unrecognized body type found: ${type}`)
    }
    collider.setDensity(0)
    collider.setSensor(isTrigger)
    collider.setActiveCollisionTypes(
      RAPIER.ActiveCollisionTypes.DEFAULT |
        RAPIER.ActiveCollisionTypes.KINEMATIC_STATIC
    )

    let rigidBody = null
    if (bodyType === 'Static' || ['Plane', 'Heightfield'].includes(type)) {
      rigidBody = RAPIER.RigidBodyDesc.newStatic()
    } else if (bodyType === 'Dynamic') {
      rigidBody = RAPIER.RigidBodyDesc.newDynamic()
    } else if (bodyType === 'KinematicPositionBased') {
      rigidBody = RAPIER.RigidBodyDesc.newKinematicPositionBased()
    } else {
      // KinematicVelocityBased
      rigidBody = RAPIER.RigidBodyDesc.newKinematicVelocityBased()
    }
    rigidBody
      .setTranslation(position[0], position[1], position[2])
      .setRotation({
        w: quaternion[0],
        x: quaternion[1],
        y: quaternion[2],
        z: quaternion[3],
      })
      .setLinvel(velocity[0], velocity[1], velocity[2])
      .setAngvel({
        x: angularVelocity[0],
        y: angularVelocity[1],
        z: angularVelocity[2],
      })
      .setAdditionalMass(mass)
    rigidBody.uuid = uuid
    return {
      collider: collider,
      body: rigidBody,
    }
  }
  postMessage({ op: 'ready' })
})

addEventListener('message', (e) => {
  const { op, uuid, type, props } = e.data
  switch (op) {
    case 'init':
      physicsWorld = new RAPIER.World(e.data.gravity)
      inited = true
      postMessage({ op: 'inited' })
      break
    case 'step':
      physicsWorld.step()
      let observations = []
      for (const id of Object.keys(subscriptions)) {
        let uuid = subscriptions[id]
        let object = bodies[uuid]
        if (!object) continue
        const bodyTranslation = object.translation()
        const bodyQuaternion = object.rotation()
        observations.push([id, bodyTranslation, bodyQuaternion])
      }
      let steppedBodies = {}
      Object.keys(bodies).forEach((bodyUuid) => {
        const bodyTranslation = bodies[bodyUuid].translation()
        const bodyQuaternion = bodies[bodyUuid].rotation()
        const bodyArgs = bodies[bodyUuid].args
        steppedBodies[bodyUuid] = {
          args: bodyArgs,
          position: {
            x: bodyTranslation.x,
            y: bodyTranslation.y,
            z: bodyTranslation.z,
          },
          quaternion: {
            w: bodyQuaternion.w,
            x: bodyQuaternion.x,
            y: bodyQuaternion.y,
            z: bodyQuaternion.z,
          },
        }
      })
      postMessage({
        op: 'frame',
        bodies: steppedBodies,
        observations: observations,
      })
      break
    case 'addBodies':
      const { collider, body } = bodyFromProperties(uuid, props, type)
      body.args = props.args
      let rigidBody = physicsWorld.createRigidBody(body)
      physicsWorld.createCollider(collider, rigidBody.handle)
      bodies[uuid] = rigidBody
      break
    case 'removeBodies':
      physicsWorld.removeRigidBody(bodies[uuid])
      delete bodies[uuid]
      break
    case 'subscribe': {
      const { id } = props
      subscriptions[id] = uuid
      break
    }
    case 'unsubscribe': {
      const { id } = props
      delete subscriptions[id]
      break
    }
    case 'setPosition':
      bodies[uuid].setTranslation(props, true)
      break
    case 'setQuaternion':
    case 'setRotation':
      bodies[uuid].setRotation(props, true)
      break
    case 'setVelocity':
      bodies[uuid].setLinvel(props, true)
      break
    case 'setAngularVelocity':
      bodies[uuid].setAngvel({ x: props[0], y: props[1], z: props[2] }, true)
      break
    case 'applyForce':
      bodies[uuid].applyForce({ x: props[0], y: props[1], z: props[2] }, true)
      break
    default:
      throw new Error(`Unrecognized operation, ${op} received`)
  }
})
