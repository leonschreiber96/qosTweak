import WebRtcCommand from '@shared/webRtcCommand';
import SocketService from './socketService';
import useWebRtcStore from './store/stores/webRtcStore';

export default class WebRtcManager {
   private peerConnection: RTCPeerConnection | null = null;
   private rtcSessionDescription: RTCSessionDescription | null = null;
   private webRtcBrokerSocket: SocketService = new SocketService('webrtc').connect(
      'http://localhost:3001'
   );
   private webRtcStore = useWebRtcStore();

   constructor() {
      this.webRtcBrokerSocket.on(
         WebRtcCommand.OtherIsCalling,
         () => (this.webRtcStore.incomingCall = true)
      );
      this.webRtcBrokerSocket.on(WebRtcCommand.AnswerMade, (answer: RTCSessionDescriptionInit) =>
         this.answerMade(answer)
      );
      this.webRtcBrokerSocket.on(WebRtcCommand.InitiateCall, this.sendOffer.bind(this));
      this.webRtcBrokerSocket.on(WebRtcCommand.CallBegins, this.callBegins.bind(this));
   }

   public setupPeerConnection() {
      this.peerConnection = new RTCPeerConnection();
      this.peerConnection.ontrack = ({ streams: [remoteStream] }) => {
         this.webRtcStore.remoteStream = remoteStream;
      };
   }

   public call() {
      console.log('Calling', this.webRtcBrokerSocket);
      this.webRtcBrokerSocket.emit(WebRtcCommand.WantToCall);
   }

   public takeCall() {
      console.log('Taking call', this.webRtcBrokerSocket);
      this.webRtcBrokerSocket.emit(WebRtcCommand.TakeCall);
   }

   public hangUp() {
      this.webRtcBrokerSocket.emit(WebRtcCommand.HangUp);
      this.webRtcStore.callRunning = false;
      this.webRtcStore.remoteStream = null;
   }

   private async callBegins() {
      this.webRtcStore.incomingCall = false;
      this.webRtcStore.outgoingCall = false;
      this.webRtcStore.callRunning = true;
   }

   private async sendOffer() {
      if (!this.peerConnection) throw new Error('Peer connection not set up');

      const offer = await this.peerConnection.createOffer();
      this.rtcSessionDescription = new RTCSessionDescription(offer);
      await this.peerConnection.setLocalDescription(this.rtcSessionDescription);

      // Send offer to other peer
      this.webRtcBrokerSocket.emit(WebRtcCommand.CallPeer, offer);
   }

   private async answerMade(answer: RTCSessionDescriptionInit) {
      if (!this.peerConnection) throw new Error('Peer connection not set up');

      const remoteSessionDescription = new RTCSessionDescription(answer);
      await this.peerConnection.setRemoteDescription(remoteSessionDescription);
   }
}
