# Command Selection Dropdown - User Guide

## Overview

The Q-SYS ScriptLauncher Control Plugin now includes a comprehensive **Command Selection** dropdown that provides easy access to all 20 default ScriptLauncher commands through a single, unified interface.

## Location

The Command Selection section is located in the plugin UI, positioned between the "Application Control" and "Custom Command" sections.

## Features

### Complete Command Coverage

The dropdown includes all ScriptLauncher commands organized into 6 categories:

#### System Commands
- **shutdown** - Schedule system shutdown
- **shutdown_cancel** - Cancel scheduled shutdown
- **reboot** - Restart the system
- **lock** - Lock the workstation
- **getSystemInfo** - Retrieve system information

#### Script Commands
- **runScript** - Execute a script file

#### Input Commands
- **sendInput** - Send keyboard/mouse input

#### UI Commands
- **sendAlert** - Display an alert message
- **getFonts** - Get list of system fonts

#### File Commands
- **moveFile** - Move a file from source to destination
- **moveDatedFileInFolder** - Move dated files from a folder
- **moveDatedFileInFolderWithExtension** - Move dated files with specific extension
- **moveFileBasedOnSize** - Move files based on size threshold

#### App Commands
- **focusApp** - Bring an application to focus
- **quitApp** - Quit/close an application

### Dynamic Parameter Fields

The section provides three parameter input fields that accept the required parameters for each command:

| Command | Parameter 1 | Parameter 2 | Parameter 3 |
|---------|-------------|-------------|-------------|
| shutdown | Time (minutes) | - | - |
| runScript | Script Path | Arguments (optional) | - |
| sendInput | Input String | - | - |
| sendAlert | Message | - | - |
| moveFile | Source Path | Destination Path | - |
| moveDatedFileInFolder | Folder Path | Destination Path | - |
| moveDatedFileInFolderWithExtension | Folder Path | File Extension | Destination Path |
| moveFileBasedOnSize | Folder Path | Size (bytes) | Destination Path |
| focusApp | Application Name | - | - |
| quitApp | Application Name | - | - |

*Commands not listed above require no parameters*

## How to Use

### Basic Workflow

1. **Select a Command**
   - Click the Command dropdown
   - Choose the desired command from the list
   - Note: Category headers (e.g., "--- System ---") are for organization only and cannot be executed

2. **Enter Parameters**
   - Fill in the required parameter fields (Param 1, 2, 3 as needed)
   - Leave unused parameter fields empty
   - For numeric parameters (time, size), enter just the number

3. **Execute**
   - Click the blue "Execute" button
   - The command will be sent to the ScriptLauncher server
   - View the response in the "Last Response" field at the bottom of the plugin

### Examples

#### Example 1: Schedule Shutdown
```
Command: shutdown
Param 1: 5
(Schedules shutdown in 5 minutes)
```

#### Example 2: Run a Script
```
Command: runScript
Param 1: C:\Scripts\backup.bat
Param 2: --full
(Runs backup.bat with --full argument)
```

#### Example 3: Send Alert
```
Command: sendAlert
Param 1: Meeting starting in 5 minutes
(Displays alert with the message)
```

#### Example 4: Focus Application
```
Command: focusApp
Param 1: Chrome
(Brings Chrome browser to front)
```

#### Example 5: Move Files by Extension
```
Command: moveDatedFileInFolderWithExtension
Param 1: C:\Logs
Param 2: .log
Param 3: C:\Archive\Logs
(Moves dated .log files from C:\Logs to C:\Archive\Logs)
```

## Validation and Error Handling

The Command Selection feature includes built-in validation:

- **Empty Selection**: Prevents execution if no command is selected
- **Category Headers**: Prevents execution of category headers (e.g., "--- System ---")
- **Connection Check**: Verifies connection to ScriptLauncher before sending commands
- **Status Messages**: Provides feedback in the status field for errors

## Integration with Q-SYS

### Control Pins

All command selection controls are available as Q-SYS control pins:

- **command_dropdown** (Input) - Text control for command selection
- **dropdown_param1** (Input) - Text control for parameter 1
- **dropdown_param2** (Input) - Text control for parameter 2
- **dropdown_param3** (Input) - Text control for parameter 3
- **execute_dropdown** (Trigger) - Button to execute the command

### Automation Examples

You can automate command execution using Q-SYS scripting:

```lua
-- Schedule shutdown at end of day
Controls.command_dropdown.String = "shutdown"
Controls.dropdown_param1.String = "1"
Controls.execute_dropdown:Trigger()

-- Run backup script
Controls.command_dropdown.String = "runScript"
Controls.dropdown_param1.String = "C:\\Scripts\\backup.bat"
Controls.dropdown_param2.String = ""
Controls.execute_dropdown:Trigger()

-- Focus presentation app before meeting
Controls.command_dropdown.String = "focusApp"
Controls.dropdown_param1.String = "PowerPoint"
Controls.execute_dropdown:Trigger()
```

## Backward Compatibility

The Command Selection feature is **fully backward compatible** with existing plugin functionality:

- All individual command buttons still work
- Custom command section remains functional
- Preset command buttons (1-20) continue to operate
- Existing control pins are unchanged

You can use the Command Selection dropdown alongside existing controls, or exclusively - the choice is yours.

## Technical Details

### Parameter Type Handling

- **Text Parameters**: Sent as-is to ScriptLauncher
- **Numeric Parameters**: Automatically converted to numbers
  - shutdown time: Converted to number, defaults to 1 if invalid
  - moveFileBasedOnSize size: Converted to number, defaults to 0 if invalid

### Command Structure

Commands are sent as JSON to the ScriptLauncher REST API endpoint `/command` with:
- `command`: The selected command name
- `password`: From the connection password field
- Additional parameters as specified by the command

Example JSON for shutdown:
```json
{
  "command": "shutdown",
  "time": 5,
  "password": "your_password"
}
```

## Troubleshooting

### Common Issues

**Issue**: "Please select a command, not a category"
- **Solution**: You selected a category header (e.g., "--- System ---"). Select an actual command instead.

**Issue**: "Please select a command from the dropdown"
- **Solution**: No command is selected. Choose a command from the dropdown menu.

**Issue**: "Not connected"
- **Solution**: Establish a connection to the ScriptLauncher server using the Connect button.

**Issue**: Command executes but parameters seem wrong
- **Solution**: Verify the parameter order matches the table above. Some commands have specific parameter requirements.

## Support

For issues or questions about the Command Selection feature:
1. Verify you're using the latest version of the plugin
2. Check the ScriptLauncher server logs for detailed error messages
3. Review the "Last Response" field for server feedback
4. Refer to the main [ScriptLauncher documentation](https://github.com/josephdadams/ScriptLauncher)

## Version History

- **Version 8**: Added Command Selection dropdown with all 20 default ScriptLauncher commands
