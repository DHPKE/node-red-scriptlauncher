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

A comprehensive Q-SYS Designer plugin (.qplug) that provides complete control over ScriptLauncher with support for ALL commands and **persistent connection settings**.

**Version 2.0 - NEW Features:**
- **✅ PERSISTENT CONNECTION SETTINGS** - IP Address, Port, and Password are saved with the design file using Q-SYS Properties
- Complete support for all 16 ScriptLauncher command categories (System, Script, Input, UI, File, App)
- **Command Selection dropdown** - Unified interface with all commands in a single dropdown menu
- REST API integration using HTTP POST requests
- Dynamic parameter configuration based on command type
- Real-time status indicators
- Full integration with Q-SYS control pins for automation
- Individual command buttons for quick access
- Custom command support with JSON parameters
- Configurable preset command buttons (1-20)

**Installation:**

1. Download `qsys-plugin/ScriptLauncher.qplug` (Version 2.0 - Persistent Settings)
   - Or use legacy: `scriptlauncher-control_Version8.qplug` (Version 1.0 - Non-persistent)
2. In Q-SYS Designer, go to Tools > Show Design Resources
3. Right-click on "Plugins" and select "Import Plugin"
4. Select the downloaded .qplug file
5. Drag the "ScriptLauncher Control" plugin from the Schematic Elements pane into your design

**Quick Start:**

1. **Right-click the plugin and select "Properties"**
2. Configure persistent settings: IP Address, Port (default: 8810), Password
3. Click OK to save (settings are persistent!)
4. Click Connect button in the plugin UI
5. Use the **Command Selection** dropdown to select any command
6. Fill in required parameters
7. Click Execute

For detailed usage instructions, see [qsys-plugin/README.md](qsys-plugin/README.md) or [COMMAND_SELECTION_GUIDE.md](COMMAND_SELECTION_GUIDE.md)

**Supported Commands:**
- System: shutdown, shutdown_cancel, reboot, lock, getSystemInfo
- Script: runScript
- Input: sendInput
- UI: sendAlert, getFonts
- File: moveFile, moveDatedFileInFolder, moveDatedFileInFolderWithExtension, moveFileBasedOnSize
- App: focusApp, quitApp
