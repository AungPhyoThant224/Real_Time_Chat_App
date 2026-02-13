import {io, Socket} from 'socket.io-client';
import Cookies from 'js-cookie';

class SocketService {
    private static socketInstance: Socket | null = null;

    public static getInstance(): Socket{
        if(!this.socketInstance){
            const token = Cookies.get('token');
            this.socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080', {
                auth: {
                    token,
                },
                autoConnect: false,
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
            });
        }
        return this.socketInstance;
    }

    public static disconnectAndClear(){
        if(this.socketInstance){
            this.socketInstance.disconnect();
            this.socketInstance = null;
        }
        return this.getInstance();
    }
    
}

export default SocketService;