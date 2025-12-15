# ScriptLauncher Integrations

This repository contains integrations for [ScriptLauncher](https://github.com/josephdadams/ScriptLauncher) across multiple platforms.

## Available Integrations

### Node-RED Integration

A Node-RED node for controlling ScriptLauncher system commands.

**Installation**

1. Save the three files (scriptlauncher.js, scriptlauncher.html, package.json) in a directory
2. Run npm install to install dependencies
3. Copy the directory to your Node-RED user directory (typically ~/.node-red/node_modules/)
4. Restart Node-RED

**Usage**

1. Configure Server: Add a ScriptLauncher server configuration with the host (default: localhost), port (default: 8810), and password
2. Add Node: Drag the ScriptLauncher node into your flow
3. Select Command: Choose between shutdown, reboot, shutdown_cancel, or lock
4. Set Shutdown Time: For shutdown commands, specify delay in minutes
5. Deploy: The node will send the command when triggered by an input message

You can also override the command and shutdown time dynamically by setting msg.command and msg.shutdownTime in the incoming message.

### Q-SYS Designer Plugin

A comprehensive Q-SYS Designer plugin (.qplug) that provides complete control over ScriptLauncher with support for ALL commands.

**Features:**
- Complete support for all ScriptLauncher command categories (System, Script, Input, UI, File, App)
- REST API integration using HTTP POST requests
- Dynamic parameter configuration based on command type
- Real-time status indicators
- Full integration with Q-SYS control pins for automation

**Installation & Usage:**

See the [Q-SYS Plugin README](qsys-plugin/README.md) for detailed installation and usage instructions.

**Supported Commands:**
- System: shutdown, shutdown_cancel, reboot, lock, getSystemInfo
- Script: runScript
- Input: sendInput
- UI: sendAlert, getFonts
- File: moveFile, moveDatedFileInFolder, moveDatedFileInFolderWithExtension, moveFileBasedOnSize
- App: focusApp, quitApp
