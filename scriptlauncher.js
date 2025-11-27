module.exports = function(RED) {
    const io = require('socket.io-client');

    function ScriptLauncherNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        // Get configuration
        const serverConfig = RED.nodes.getNode(config.server);
        const command = config.command;
        const shutdownTime = parseInt(config.shutdownTime) || 1;

        node.on('input', function(msg) {
            if (! serverConfig) {
                node.error("ScriptLauncher server not configured");
                return;
            }

            const host = serverConfig.host || 'localhost';
            const port = serverConfig.port || 8810;
            const password = serverConfig.credentials. password;
            
            // Determine command from config or msg
            const cmdToSend = msg.command || command;
            const time = msg.shutdownTime || shutdownTime;

            if (! password) {
                node.error("Password not configured");
                return;
            }

            // Connect to ScriptLauncher
            const socket = io. connect(`http://${host}:${port}`);
            
            socket.on('connect', function() {
                node.status({fill:"green", shape:"dot", text:"connected"});
                
                // Prepare command payload
                let payload = {
                    command: cmdToSend,
                    password: password
                };

                // Add time parameter for shutdown
                if (cmdToSend === 'shutdown') {
                    payload.time = time;
                }

                // Send command
                socket.emit('command', payload);
                
                // Listen for result
                socket.on(`${cmdToSend}_result`, function(result) {
                    node.status({fill:"blue", shape:"ring", text:"command sent"});
                    msg.payload = result;
                    node.send(msg);
                    socket.disconnect();
                });
            });

            socket.on('connect_error', function(error) {
                node.status({fill:"red", shape:"ring", text:"connection failed"});
                node.error(`Connection error: ${error.message}`);
                socket.disconnect();
            });

            socket.on('error', function(error) {
                node. status({fill:"red", shape:"ring", text:"error"});
                node.error(`Socket error: ${error}`);
                socket.disconnect();
            });
        });

        node.on('close', function() {
            node.status({});
        });
    }

    // Configuration node for server settings
    function ScriptLauncherServerNode(n) {
        RED.nodes. createNode(this, n);
        this.host = n.host;
        this.port = n. port;
    }

    RED.nodes.registerType("scriptlauncher", ScriptLauncherNode);
    RED.nodes.registerType("scriptlauncher-server", ScriptLauncherServerNode, {
        credentials: {
            password: {type: "password"}
        }
    });
}