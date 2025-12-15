# ScriptLauncher Q-SYS Designer Plugin

A comprehensive Q-SYS Designer plugin for controlling ScriptLauncher (https://github.com/josephdadams/ScriptLauncher) with support for ALL ScriptLauncher commands.

## Features

- Complete support for all ScriptLauncher command categories
- REST API integration using HTTP POST requests
- Real-time status indicators
- Dynamic parameter configuration based on command type
- Full integration with Q-SYS control pins for automation

## Installation

1. Download the `ScriptLauncher.qplug` file
2. Open Q-SYS Designer
3. Go to **Tools > Show Design Resources**
4. Navigate to the **Plugins** section
5. Click **Install** and select the `ScriptLauncher.qplug` file
6. The plugin will appear in the Schematic Elements list

## Configuration

### Connection Settings

- **Host/IP Address**: The IP address or hostname of the ScriptLauncher server (default: localhost)
- **Port**: The port number ScriptLauncher is listening on (default: 8810)
- **Password**: The authentication password configured in ScriptLauncher

### Command Types

The plugin supports all ScriptLauncher commands organized by category:

#### System Commands

- **shutdown** - Shutdown the system after a delay
  - *Parameters*: Time (minutes)
- **shutdown_cancel** - Cancel a pending shutdown
- **reboot** - Reboot the system immediately
- **lock** - Lock the user session
- **getSystemInfo** - Return system information snapshot (no password required)

#### Script Commands

- **runScript** - Execute a local script
  - *Parameters*: Executable Path, Arguments, Stdin

#### Input Commands

- **sendInput** - Send keyboard or mouse input
  - *Parameters*: Input Type, Key/Button

#### UI Commands

- **sendAlert** - Display a desktop alert notification
  - *Parameters*: Message
- **getFonts** - Return a list of installed system fonts (no password required)

#### File Commands

- **moveFile** - Move a file
  - *Parameters*: Source Path, Destination Path, Copy Only
- **moveDatedFileInFolder** - Move newest/oldest file in folder
  - *Parameters*: Source Folder Path, Dest Folder Path, Newest/Oldest, File Extension, File Name, Copy Only
- **moveDatedFileInFolderWithExtension** - Move file by date and extension
  - *Parameters*: Source Folder Path, Dest Folder Path, Newest/Oldest, File Extension, File Name, Copy Only
- **moveFileBasedOnSize** - Move files based on size threshold
  - *Parameters*: Source Folder Path, Dest Folder Larger, Dest Folder Smaller, Size Threshold, File Extension, File Name, Copy Only

#### App Commands

- **focusApp** - Bring app window to foreground
  - *Parameters*: App Name
- **quitApp** - Terminate application
  - *Parameters*: App Name

## Usage

### Basic Usage

1. Add the ScriptLauncher plugin to your Q-SYS design
2. Configure the connection settings (Host, Port, Password)
3. Enter the command name in the **Command Type** field (e.g., "shutdown", "runScript", "sendAlert")
4. Fill in the relevant parameters for your selected command
5. Click the **Send** button or trigger via control pin to execute the command

### Control Pin Usage

The plugin exposes control pins that can be connected to other Q-SYS components:

**Input Pins:**
- host, port, password - Connection configuration
- command - Command to execute
- All parameter pins (time, executable, args, message, sourcePath, etc.)
- sendCommand - Trigger to send the command

**Output Pins:**
- status - Status indicator (OK, Fault, etc.)
- statusText - Human-readable status message
- result - Command result/response from ScriptLauncher

### Example: Shutdown System

1. Set **Command Type** to: `shutdown`
2. Set **Time (minutes)** to: `5`
3. Click **Send** button
4. The system will schedule a shutdown in 5 minutes

### Example: Display Alert

1. Set **Command Type** to: `sendAlert`
2. Set **Message** to: `Meeting starts in 5 minutes!`
3. Click **Send** button
4. Alert notification will appear on the ScriptLauncher system

### Example: Run Script

1. Set **Command Type** to: `runScript`
2. Set **Executable Path** to: `/path/to/script.sh`
3. Set **Arguments** to: `--option value`
4. Set **Stdin** to: `input data` (if needed)
5. Click **Send** button
6. Script will execute with specified parameters

### Example: Move File

1. Set **Command Type** to: `moveFile`
2. Set **Source Path** to: `/path/to/source/file.txt`
3. Set **Destination Path** to: `/path/to/dest/file.txt`
4. Set **Copy Only** toggle if you want to copy instead of move
5. Click **Send** button
6. File will be moved (or copied) to destination

## Status Indicators

The plugin provides real-time status feedback:

- **Green (OK)**: Ready or command sent successfully
- **Yellow (Compromised)**: Sending command
- **Red (Fault)**: Connection error or command failed
- **Blue (Initializing)**: Plugin starting up

## API Communication

The plugin communicates with ScriptLauncher using HTTP POST requests to the `/command` endpoint:

```
POST http://<host>:<port>/command
Content-Type: application/json

{
  "command": "<command_name>",
  "password": "<password>",
  ... other parameters
}
```

## Troubleshooting

### Connection Failed

- Verify ScriptLauncher is running on the specified host and port
- Check network connectivity between Q-SYS Core and ScriptLauncher server
- Ensure firewall rules allow traffic on the specified port

### Command Error

- Verify the password is correct
- Ensure all required parameters for the command are provided
- Check ScriptLauncher logs for detailed error messages

### Invalid Command

- Verify the command name is spelled correctly (case-sensitive)
- Refer to ScriptLauncher documentation for available commands

## Supported ScriptLauncher Version

This plugin is compatible with ScriptLauncher v1.0+ that supports the REST API `/command` endpoint.

## License

MIT License - See repository LICENSE file for details

## Credits

- ScriptLauncher by Joseph Adams (https://github.com/josephdadams/ScriptLauncher)
- Q-SYS Plugin by DHPKE

## Support

For issues, questions, or feature requests, please visit:
https://github.com/DHPKE/node-red-scriptlauncher
