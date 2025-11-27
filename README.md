Installation

Save the three files (scriptlauncher.js, scriptlauncher.html, package.json) in a directory
Run npm install to install dependencies
Copy the directory to your Node-RED user directory (typically ~/.node-red/node_modules/)
Restart Node-RED
Usage

Configure Server: Add a ScriptLauncher server configuration with the host (default: localhost), port (default: 8810), and password
Add Node: Drag the ScriptLauncher node into your flow
Select Command: Choose between shutdown, reboot, shutdown_cancel, or lock
Set Shutdown Time: For shutdown commands, specify delay in minutes
Deploy: The node will send the command when triggered by an input message
You can also override the command and shutdown time dynamically by setting msg.command and msg.shutdownTime in the incoming message.
