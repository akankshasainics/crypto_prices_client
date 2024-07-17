let _websocketConnection: WebSocket | null = null;

export function getWebsocketConnection() {

    // Connection opened
    
	if (!_websocketConnection) {
		_websocketConnection = new WebSocket(`http://127.0.0:8000/`)
        _websocketConnection.onopen = () => {
            console.log('WebSocket connected');
        };

        _websocketConnection.onclose = () => {
            console.log('WebSocket disconnected');
        };
	}
	return _websocketConnection
}