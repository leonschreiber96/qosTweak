import { io, Socket } from 'socket.io-client';

class SocketService {
   public readonly name: string;

   private socket: Socket | null = null;

   constructor(name: string) {
      this.name = name;
   }

   connect(url: string) {
      if (this.socket !== null) return this;

      this.socket = io(url, { query: { name: this.name, type: 'client' } });
      this.socket.on('connect', () => console.log(`[${this.name}] Connected to Socket.IO server`));
      this.socket.on('disconnect', () =>
         console.log(`[${this.name}] Disconnected from Socket.IO server`)
      );

      return this;
   }

   disconnect() {
      if (this.socket === null) return;

      this.socket.disconnect();
      this.socket = null;
   }

   on<T>(event: string, callback: (data: T) => void) {
      if (this.socket === null) return;

      this.socket.on(event, callback);
   }

   emit<T>(event: string, payload?: T) {
      if (this.socket === null) return;

      this.socket.emit(event, payload);
   }
}

export default SocketService;
