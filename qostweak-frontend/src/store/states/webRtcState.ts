export default interface WebRtcState {
   callRunning: boolean;
   incomingCall: boolean;
   outgoingCall: boolean;
   echo: CallDegradation;
   delay: CallDegradation;
   bandwidth: CallDegradation;
   packetLoss: CallDegradation;
   audioActive: boolean;
   videoActive: boolean;
   peerConnection: RTCPeerConnection | null;
   rtcSessionDescription: RTCSessionDescription | null;
   localStream: MediaStream | null;
   remoteStream: MediaStream | null;
}

interface CallDegradation {
   active: boolean;
   value: number;
}