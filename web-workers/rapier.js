import RAPIER from '@dimforge/rapier3d-compat'

let bodyFromProperties = null
let physicsWorld = null
let bodies = null
let handleToBody = null
let subscriptions = null
let eventQueue = null
let onContactDrain = null
let onIntersectionDrain = null
let rays = null
let onRayHit = null

RAPIER.init().then(() => {
  bodies = {}
  handleToBody = {}
  rays = {}
  subscriptions = {}
  onContactDrain = (handle1, handle2, started) => {
    postMessage({
      op: 'event',
      props: {
        type: 'contact',
        bodyA: handleToBody[handle1],
        bodyB: handleToBody[handle2],
        started: started,
      },
    })
  }
  onIntersectionDrain = (handle1, handle2, intersecting) => {
    postMessage({
      op: 'event',
      props: {
        type: 'intersect',
        bodyA: handleToBody[handle1],
        bodyB: handleToBody[handle2],
        intersecting: intersecting,
      },
    })
  }
  onRayHit = (ray) => {
    return (hit) => {
      postMessage({
        op: 'event',
        type: 'rayhit',
        props: {
          uuid: ray.uuid,
          normal: hit.normal,
          body: handleToBody[
            physicsWorld.getRigidBody(
              physicsWorld.getCollider(hit.colliderHandle).parent()
            ).handle
          ],
          point: ray.pointAt(hit.toi),
        },
      })
      return true
    }
  }
  bodyFromProperties = (uuid, props, type) => {
    const {
      args = [],
      position = [0, 0, 0],
      quaternion = [1, 0, 0, 0],
      velocity = [0, 0, 0],
      angularVelocity = [0, 0, 0],
      linearDamping = 0.25,
      angularDamping = 0.25,
      bodyType = 'Dynamic',
      mass = 1,
      isSensor = false,
      restitution = 0,
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
        break // [ number of rows, number of columns, heightData 1D array, scale vector ] = args
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
    collider.setDensity(mass)
    collider.setSensor(isSensor)
    collider.setRestitution(restitution)
    collider.setActiveCollisionTypes(
      RAPIER.ActiveCollisionTypes.DEFAULT |
        RAPIER.ActiveCollisionTypes.KINEMATIC_STATIC
    )
    collider.setActiveEvents(
      RAPIER.ActiveEvents.CONTACT_EVENTS |
        RAPIER.ActiveEvents.INTERSECTION_EVENTS
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
      .setLinearDamping(linearDamping)
      .setAngularDamping(angularDamping)
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
      physicsWorld = new RAPIER.World(props.gravity)
      eventQueue = new RAPIER.EventQueue(true)
      postMessage({ op: 'inited' })
      break
    case 'step':
      physicsWorld.step(eventQueue)
      eventQueue.drainContactEvents(onContactDrain)
      eventQueue.drainIntersectionEvents(onIntersectionDrain)
      for (const rayUuid in rays) {
        let thisRay = rays[rayUuid]
        physicsWorld.intersectionsWithRay(
          thisRay,
          thisRay.maxToI,
          thisRay.solid,
          thisRay.groups,
          onRayHit(thisRay)
        )
      }
      let observations = []
      for (const id in subscriptions) {
        let uuid = subscriptions[id]
        let object = bodies[uuid]
        if (!object) continue
        const bodyTranslation = object.translation()
        const bodyQuaternion = object.rotation()
        observations.push([id, bodyTranslation, bodyQuaternion])
      }
      let steppedBodies = {}
      for (const bodyUuid in bodies) {
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
      }
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
      handleToBody[rigidBody.handle] = uuid
      bodies[uuid] = rigidBody
      break
    case 'removeBodies':
      physicsWorld.removeRigidBody(bodies[uuid])
      delete handleToBody[bodies[uuid].handle]
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
      bodies[uuid].setAngvel(props, true)
      break
    case 'applyForce':
      bodies[uuid].applyForce(props, true)
      break
    case 'applyForceAtPoint':
      bodies[uuid].applyForceAtPoint(props.force, props.point, true)
      break
    case 'addRay':
      const newRay = new RAPIER.Ray(props.origin, props.direction)
      newRay.uuid = uuid
      newRay.maxToI = props.maxToI || 100
      newRay.solid = props.solid || false
      newRay.groups = props.groups || 0xfffffffff
      physicsWorld.castRay(
        newRay,
        props.maxToI,
        props.solid || false,
        props.groups || 0xfffffffff
      )
      rays[uuid] = newRay
      break
    case 'removeRay':
      delete rays[uuid]
      break
    default:
      throw new Error(`Unrecognized operation, ${op} received`)
  }
})
