import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function PythonCodeSnippets() {
  return (
    <CodeSnippetPost
      title="Python Code Snippets"
      description="Useful bites of Python code I've probably written by hand too often.">
      <CodeSnippet title="Print the System Path of This Python Executable">
        <p>
          This is like running <code>which python</code> in a Unix-like
          terminal, except Python will be more honest with where it's located.
        </p>
        <CodeBlock lang="python">{`
import sys
print(sys.exec_prefix)
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Hash a String with SHA-256">
        <p>
          Using <code>hash_string('hi')</code> returns{' '}
          <code>'8f434346648...'</code>.
        </p>
        <CodeBlock lang="python">{`
import hashlib

def hash_string(msg_string):
    sha_digest = hashlib.sha256(msg_string.encode()).hexdigest()
    return sha_digest
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Plot a Circle on a 2D Plane">
        <p>
          Using <code>matplotlib</code> to plot a blue circle on a
          two-dimensional plane.
        </p>
        <CodeBlock lang="python">{`
import matplotlib.pyplot as plt

blue_circle = plt.Circle((0, 0), radius=4, color='blue', fill=False)
plt.gca().add_artist(blue_circle)

plt.xlabel('Horiz. Axis')
plt.ylabel('Vert. Axis')
# Blue dot at center
plt.plot(0, 0, 'bD')
# Set X and Y axis limits to -5, 5
plt.axis([-5, 5, -5, 5])
# Make grid visible on plot
plt.grid(True)

plt.show()
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Plot Complex Numbers on 2D Plane">
        <p>
          Using <code>matplotlib</code> and <code>numpy</code> to plot a list of
          imaginary numbers on a two-dimensional plane.
        </p>
        <CodeBlock lang="python">{`
import matplotlib.pyplot as plt
import numpy as np

# Note that Python uses j as the imaginary unit
complex_nums = np.arange(-5, 5) + 1j * np.arange(-5,5)
# Store real and imaginary parts in separate lists
X = [c_num.real for c_num in complex_nums]
Y = [c_num.imag for c_num in complex_nums]

plt.xlabel('I Amplitude')
plt.ylabel('Q Amplitude')
# Plot complex numbers
plt.scatter(X, Y, color='red')
# Blue dot at center
plt.plot(0, 0, 'bD')
# Set X and Y axis limits to -6, 6
plt.axis([-6, 6, -6, 6])
# Make grid visible on plot
plt.grid(True)

plt.show()
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}
