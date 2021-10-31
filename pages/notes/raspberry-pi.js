import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function RPiNotes() {
  return (
    <NotesPost title="Raspberry Pi" description="" hasCodeSnippet>
      <p>
        <a href="https://www.raspberrypi.org/" target="_blank">
          Raspberry Pis
        </a>{' '}
        are tiny Linux computers that are the size of credits cards, or smaller.
        There's so much you can do with them, from automating your home, to
        running a computer security lab and more!
      </p>
      <h2>Setup</h2>
      <p>
        I run Raspbian, which is easy to setup on new Pis. But, I like to save
        time by automating as much of the tedium as I can when getting a fresh
        one to work the way I want.
      </p>
      <h3>Steps</h3>
      <ol className="mb-6">
        <li>Quick configuration</li>
        <li>Run setup script</li>
      </ol>
      <CodeSnippet title="Quick Configuration">
        <p>
          We start by running the native configuration wizard just so we can
          change the login password for the <code>pi</code> (root) user for
          later logins.
        </p>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
raspi-config
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Run Setup Script">
        <p>
          Next, we update all of the packages on device, installs curl, and then
          runs a custom script that I use. The script installs Go, Nginx,
          Docker, Pyenv, Node Version Manager and ZSH. It also asks whether you
          want to change the hostname of the device and creates a small{' '}
          <code>.zshrc</code> for you. Remember to run all of this as{' '}
          <code>pi</code> (root).
        </p>
        <p>
          Note that you can also use <code>https://hivoltage.xyz/...</code> as
          the host to get the file from.
        </p>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
sudo apt-get update && \\ 
sudo apt-get upgrade -y && \\ 
sudo apt-get upgrade -y curl \\
curl -fsSL https://blog.aunyks.com/code/shell/raspi-setup.sh | bash
`}</CodeBlock>
      </CodeSnippet>
    </NotesPost>
  )
}
