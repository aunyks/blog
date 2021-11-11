# You should run this file as root.
# If it's not already installed on the target 
# machine, then run:
# curl -fsSL <uri to this file> | bash
# OR
# bash -c (curl -fsSL <uri to this file>)

#echo "Updating (using sudo)"
#sudo apt-get update

#echo "Upgrading (using sudo)"
#sudo apt-get upgrade -y

echo "Installing go (using sudo)"
sudo apt-get install golang -y

echo "Installing caddy (using sudo)"
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get install caddy -y

echo "Installing docker"
curl -fsSL https://get.docker.com | bash

echo "Installing pyenv"
curl -fsSL https://pyenv.run | bash

echo "Installing Node Version Manager"
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
' >> ~/.zshrc

# Do while
while
  read -e -p "Would you like to change this pi's hostname? (y/n): " ch_hostname
  [[ $ch_hostname != "y" && $ch_hostname != "n" ]]
do
true
done

if [[ $ch_hostname = "y" ]]; then
 read -e -p "What's the new hostname? " new_hostname 
 echo "Changing hostname to $new_hostname"
 sudo hostnamectl set-hostname $new_hostname && \
 sudo sed -i "s/raspberrypi/$new_hostname/g" /etc/hosts
fi

echo "Installing zsh (using sudo)"
sudo apt-get install zsh -y

echo "Populating ~/.zshrc with quality-of-life improvements"
echo ""  >> ~/.zshrc
echo "setopt autocd" >> ~/.zshrc
echo "export PS1='%/
~ '" >> ~/.zshrc
echo "export PS2='> '" >> ~/.zshrc
echo "
mkcd() {
  mkdir $1 && cd $1;
}" >> ~/.zshrc


echo "Changing shell to zsh"
chsh -s /bin/zsh

echo "Setup complete! Now, to see the new changes, run:"
echo ""
echo "sudo reboot" 