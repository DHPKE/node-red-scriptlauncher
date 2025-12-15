# ScriptLauncher Q-SYS Designer Plugin

A comprehensive Q-SYS Designer plugin (.qplug) that provides complete control over ScriptLauncher with support for ALL commands and **persistent connection settings**.

## Version 2.0.0 - Key Features

### ✅ Persistent Connection Settings
**CRITICAL: Connection settings are now PERSISTENT and saved with the Q-SYS design file!**

- **IP Address** - Configured in Plugin Properties (persistent)
- **Port** - Configured in Plugin Properties (persistent, default: 8810)
- **Password** - Configured in Plugin Properties (persistent)

These settings are saved with your Q-SYS design file and will be preserved when you:
- Save and reload the design
- Share the design with others
- Move the design to different systems

### Complete Command Coverage

The plugin includes ALL 15 basic ScriptLauncher commands organized into 6 categories:

#### System Commands (5 commands)
- `shutdown` - Shutdown the system after a delay (requires time parameter in minutes)
- `shutdown_cancel` - Cancel a pending shutdown
- `reboot` - Reboot the system immediately
- `lock` - Lock the user session
- `getSystemInfo` - Return system information snapshot (no password required)

#### Script Commands (1 command)
- `runScript` - Execute a local script (requires: executable path, args, stdin parameters)

#### Input Commands (1 command)
- `sendInput` - Send keyboard or mouse input (requires: type, key/button parameters)

#### UI Commands (2 commands)
- `sendAlert` - Display a desktop alert notification (requires: message parameter)
- `getFonts` - Return a list of installed system fonts (no password required)

#### File Commands (4 commands)
- `moveFile` - Move a file (requires: sourcePath, destPath, copyOnly parameters)
- `moveDatedFileInFolder` - Move newest/oldest file in folder
- `moveDatedFileInFolderWithExtension` - Move file by date and extension
- `moveFileBasedOnSize` - Move files based on size threshold

#### App Commands (2 commands)
- `focusApp` - Bring app window to foreground (requires: appName parameter)
- `quitApp` - Terminate application (requires: appName parameter)

### Command Selection Dropdown

A unified dropdown menu with ALL commands for easy access:
- Organized by category with clear separators
- Dynamic parameter fields that adapt to the selected command
- Supports all parameter types (text, numeric, boolean)
- Execute button for sending commands

### Additional Features

- **REST API Integration** - Uses HTTP POST requests for reliability
- **Auto Reconnect** - Configurable automatic reconnection
- **Status Indicators** - Real-time connection and command status
- **Individual Command Buttons** - Quick access for common operations
- **Preset Commands** - Configure up to 20 custom command buttons
- **Custom Commands** - Send any command with JSON parameters
- **Full Q-SYS Integration** - All controls available as pins for automation

## Installation

1. Download `ScriptLauncher.qplug` from this directory
2. In Q-SYS Designer, go to **Tools > Show Design Resources**
3. Right-click on "Plugins" and select **"Import Plugin"**
4. Select the downloaded `ScriptLauncher.qplug` file
5. The plugin will appear in the Schematic Elements pane under "Plugins"
6. Drag the "ScriptLauncher Control" plugin into your design

## Configuration

### Step 1: Configure Persistent Settings (Properties)

**IMPORTANT: Configure these settings FIRST before using the plugin!**

1. Right-click on the plugin in your design
2. Select **"Properties"**
3. Configure the following **PERSISTENT** settings:
   - **IP Address**: Enter the ScriptLauncher server IP or hostname (default: "localhost")
   - **Port**: Enter the ScriptLauncher server port (default: 8810)
   - **Password**: Enter the authentication password
   - **Auto Reconnect**: Enable/disable automatic reconnection (default: true)
   - **Command Buttons**: Number of preset command buttons to display (1-20, default: 5)
   - **Debug**: Enable debug logging (default: false)

4. Click **OK** to save

**These settings are saved with your design file and will persist!**

### Step 2: Connect

1. Open the plugin control panel
2. Verify the displayed IP Address and Port (shown as read-only from Properties)
3. Click the **Connect** button
4. Watch the connection status indicator turn green when connected

## Usage

### Method 1: Command Selection Dropdown

**Recommended for comprehensive command access**

1. Click the **Command** dropdown in the "Command Selection" section
2. Select any command from the organized list
3. Fill in the required parameters (Param 1, 2, 3 as needed)
4. Click the blue **Execute** button
5. View the response in the "Last Response" field

#### Parameter Guide

| Command | Parameter 1 | Parameter 2 | Parameter 3 |
|---------|-------------|-------------|-------------|
| shutdown | Time (minutes) | - | - |
| runScript | Script Path | Arguments | Stdin |
| sendInput | Input Type | Key/Button | - |
| sendAlert | Message | - | - |
| moveFile | Source Path | Dest Path | Copy Only (true/false) |
| moveDatedFileInFolder | Folder Path | Destination | - |
| moveDatedFileInFolderWithExtension | Folder Path | Extension | Destination |
| moveFileBasedOnSize | Folder Path | Size (bytes) | Destination |
| focusApp | App Name | - | - |
| quitApp | App Name | - | - |

### Method 2: Individual Command Buttons

**Quick access for common operations**

- **System Commands Section**: Shutdown, Reboot, Lock, Cancel Shutdown, Get System Info, Get Fonts
- **Script Execution Section**: Enter script path, arguments, and stdin, then click Run
- **Send Alert Section**: Enter message and click Send
- **App Control Section**: Enter app name and click Focus or Quit
- **Send Input Section**: Enter type and key, then click Send
- **File Operations Section**: Enter source, destination, toggle copy mode, then click Move

### Method 3: Custom Commands

**For advanced users and special commands**

1. Enter the command name in the "Command" field
2. (Optional) Enter JSON parameters in the "JSON Parameters" field
3. Click **Send**

Example JSON:
```json
{"command": "runScript", "scriptPath": "C:\\Scripts\\backup.bat"}
```

### Method 4: Preset Commands

**Configure reusable commands**

1. For each preset button (1-20, based on your Property setting):
   - Enter a descriptive name
   - Enter the complete JSON payload (without password)
2. Click the "Run" button to execute

Example preset JSON:
```json
{"command": "sendAlert", "message": "Meeting in 5 minutes"}
```

## Q-SYS Automation

All controls are available as Q-SYS control pins for automation:

```lua
-- Example: Automated shutdown sequence
Controls.command_dropdown.String = "shutdown"
Controls.dropdown_param1.String = "5"
Controls.execute_dropdown:Trigger()

-- Example: Focus presentation app before meeting
Controls.command_dropdown.String = "focusApp"
Controls.dropdown_param1.String = "PowerPoint"
Controls.execute_dropdown:Trigger()

-- Example: Run backup script daily
Controls.script_path.String = "C:\\Scripts\\backup.bat"
Controls.script_args.String = "--daily"
Controls.run_script:Trigger()
```

## API Communication

The plugin uses ScriptLauncher's REST API:

- **Endpoint**: `POST http://<host>:<port>/command`
- **Content-Type**: `application/json`
- **Payload Format**:
```json
{
  "command": "<command_name>",
  "password": "<password>",
  ... additional parameters
}
```

## Status Indicators

- **Green Dot**: Connected and ready
- **Red Dot**: Error or disconnected
- **Yellow Dot**: Connecting
- **Gray Dot**: Idle/Disconnected

## Troubleshooting

### "Host/IP address required - Set in Properties"
**Solution**: Right-click the plugin, select Properties, and configure the IP Address field.

### Connection fails
**Solution**: 
1. Verify the IP Address and Port in Properties
2. Ensure ScriptLauncher is running on the target system
3. Check network connectivity
4. Verify firewall settings allow port 8810

### Password errors
**Solution**: Verify the Password in Properties matches the ScriptLauncher server configuration.

### "Please select a command, not a category"
**Solution**: You selected a category header (e.g., "--- System ---"). Select an actual command.

### Settings not saving
**Solution**: This plugin uses Properties which ARE saved. If you're not seeing persistence:
1. Verify you're configuring the Properties (right-click > Properties)
2. Save the Q-SYS design file after making changes
3. The connection settings are in Properties, not the UI text fields

## Differences from Version 1.0

### Version 2.0 Changes

✅ **Connection settings are now PERSISTENT** (Properties instead of Controls)
- IP Address moved to Properties
- Port moved to Properties
- Password moved to Properties
- Settings are saved with the design file

✅ **Enhanced command support**
- Added shutdown_cancel button
- Added getFonts button
- Added sendInput section with type and key parameters
- Added stdin parameter for runScript
- Added copyOnly parameter for moveFile
- Improved parameter handling for all commands

✅ **Better UI organization**
- Connection settings section shows read-only values from Properties
- Clear indication that settings are configured in Properties
- Improved layout spacing
- More descriptive labels

## Version History

- **2.0.0** (Current) - Persistent connection settings using Properties, enhanced command support
- **1.0.0** - Initial version with connection settings in Controls (not persistent)

## Support

For issues or questions:
1. Verify you're using the latest version (2.0.0+)
2. Check that settings are configured in Properties (right-click > Properties)
3. Review the ScriptLauncher server logs
4. Check the "Last Response" field for server feedback
5. Refer to the [ScriptLauncher documentation](https://github.com/josephdadams/ScriptLauncher)

## License

MIT License - See repository root for details

## Author

DHPKE - https://github.com/DHPKE/node-red-scriptlauncher
