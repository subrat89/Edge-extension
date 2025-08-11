# Edge-extension 

This is a Microsoft Edge extension built using JavaScript, HTML, Shell scripts and Perl. 

# Features 
~ Custom browser action and popup.
~ Background scripting to handle events in edge.
~ Automated build and deployment scripts.
~ Easily configurable via manifest.json. 

# Tech Stack
JavaScript
HTML
Shell
Perl


# Pre-requisites
Microsoft Edge
Node.js and npm (if using JS build tools like Webpack)
Shell (bash) and Perl installed


# Installation
# Clone Repository

git clone <repo_url>
cd <repo_folder>

# Install Dependencies 
npm install

# Build the extension
./scripts/build.sh

Load in Microsoft Edge
- GO TO - edge://extensions/

- Enable Developer mode

- Click Load Unpacked

- Select the dist/folder (or project root if no build step)


# Configuration 
modify manifest.json to update:

Extension name, description and version
Permissions and host permissions
Background, content and popup settings

# Open Terminal
npm install (this will install all necessary packages and project dependencies)
npm start/npm run dev





























