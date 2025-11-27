module.exports = function(RED) {
    const io = require('socket.io-client');

    // Connection timeout in milliseconds
    const CONNECTION_TIMEOUT = 10000;
    // Response timeout in milliseconds
    const RESPONSE_TIMEOUT = 30000;

    function ScriptLauncherNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        // Get configuration
        const serverConfig = RED.nodes.getNode(config.server);
        const command = config.command;
        const shutdownTime = parseInt(config.shutdownTime) || 1;

        // Track active socket connections for cleanup
        const activeSockets = new Set();
        const activeTimeouts = new Set();

        // Helper function to clean up a socket connection
        function cleanupSocket(socket, timeoutIds) {
            if (timeoutIds) {
                timeoutIds.forEach(function(id) {
                    clearTimeout(id);
                    activeTimeouts.delete(id);
                });
            }
            if (socket) {
                activeSockets.delete(socket);
                if (socket.connected) {
                    socket.disconnect();
                }
            }
        }

        node.on('input', function(msg) {
            if (!serverConfig) {
                node.error("ScriptLauncher server not configured");
                return;
            }

            const host = serverConfig.host || 'localhost';
            const port = serverConfig.port || 8810;
            const password = serverConfig.credentials.password;
            
            // Determine command from config or msg
            const cmdToSend = msg.command || command;
            const time = msg.shutdownTime || shutdownTime;

            if (!password) {
                node.error("Password not configured");
                return;
            }

            // Connect to ScriptLauncher with connection timeout
            const socket = io.connect(`http://${host}:${port}`, {
                timeout: CONNECTION_TIMEOUT,
                reconnection: false
            });
            
            // Track this socket
            activeSockets.add(socket);
            const timeoutIds = [];
            let connectionTimedOut = false;
            let connected = false;

            // Connection timeout handler
            const connectionTimeoutId = setTimeout(function() {
                if (!connected) {
                    connectionTimedOut = true;
                    node.status({fill:"red", shape:"ring", text:"connection timeout"});
                    node.error(`Connection timeout: Could not connect to ${host}:${port} within ${CONNECTION_TIMEOUT/1000} seconds`);
                    cleanupSocket(socket, timeoutIds);
                }
            }, CONNECTION_TIMEOUT);
            timeoutIds.push(connectionTimeoutId);
            activeTimeouts.add(connectionTimeoutId);

            socket.on('connect', function() {
                // Ignore if connection timeout already fired
                if (connectionTimedOut) {
                    return;
                }
                connected = true;
                
                // Clear connection timeout since we connected
                clearTimeout(connectionTimeoutId);
                activeTimeouts.delete(connectionTimeoutId);
                
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
                
                // Response timeout handler
                const responseTimeoutId = setTimeout(function() {
                    node.status({fill:"grey", shape:"square", text:"disconnect"});
                    node.error(`Response timeout: No response received for '${cmdToSend}' command within ${RESPONSE_TIMEOUT/1000} seconds`);
                    cleanupSocket(socket, timeoutIds);
                }, RESPONSE_TIMEOUT);
                timeoutIds.push(responseTimeoutId);
                activeTimeouts.add(responseTimeoutId);

                // Listen for result
                socket.on(`${cmdToSend}_result`, function(result) {
                    clearTimeout(responseTimeoutId);
                    activeTimeouts.delete(responseTimeoutId);
                    node.status({fill:"blue", shape:"ring", text:"command sent"});
                    msg.payload = result;
                    node.send(msg);
                    cleanupSocket(socket, timeoutIds);
                });

                // Listen for error result from server
                socket.on('error_result', function(error) {
                    clearTimeout(responseTimeoutId);
                    activeTimeouts.delete(responseTimeoutId);
                    node.status({fill:"red", shape:"ring", text:"command error"});
                    node.error(`Server error: ${error.message || error}`);
                    msg.payload = { error: error };
                    node.send(msg);
                    cleanupSocket(socket, timeoutIds);
                });
            });

            socket.on('connect_error', function(error) {
                node.status({fill:"red", shape:"ring", text:"connection failed"});
                node.error(`Connection error to ${host}:${port}: ${error.message}`);
                cleanupSocket(socket, timeoutIds);
            });

            socket.on('error', function(error) {
                node.status({fill:"red", shape:"ring", text:"error"});
                node.error(`Socket error: ${error}`);
                cleanupSocket(socket, timeoutIds);
            });

            socket.on('disconnect', function(reason) {
                activeSockets.delete(socket);
            });
        });

        node.on('close', function() {
            // Clean up all active timeouts
            activeTimeouts.forEach(function(timeoutId) {
                clearTimeout(timeoutId);
            });
            activeTimeouts.clear();
            
            // Clean up all active socket connections
            activeSockets.forEach(function(socket) {
                if (socket.connected) {
                    socket.disconnect();
                }
            });
            activeSockets.clear();
            
            node.status({});
        });
    }

    // Configuration node for server settings
    function ScriptLauncherServerNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.port = n.port;
    }

    RED.nodes.registerType("scriptlauncher", ScriptLauncherNode);
    RED.nodes.registerType("scriptlauncher-server", ScriptLauncherServerNode, {
        credentials: {
            password: {type: "password"}
        }
    });
}