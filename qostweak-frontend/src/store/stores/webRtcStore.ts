import { defineStore } from 'pinia'
import StoreId from '../storeIds'
import type { WebRtcState } from '../states/webRtcState'

const useWebRtcStore = defineStore(StoreId.WebRtcConnection, {
   state: (): WebRtcState => ({
      callRunning: false,
      incomingCall: false,
      outgoingCall: false,
      echo: { active: false, value: 0 },
      delay: { active: false, value: 0 },
      bandwidth: { active: false, value: Infinity },
      packetLoss: { active: false, value: 0 },
      audioActive: true,
      videoActive: true,
      peerConnection: null,
      rtcSessionDescription: null,
      localStream: null,
      remoteStream: null,
   }),
   actions: {
      initiateConnection() {
         this.outgoingCall = true
      },
      displayIncomingCall() {
         this.incomingCall = true
      },
      beginCall() {
         this.incomingCall = false
         this.outgoingCall = false
         this.callRunning = true
      },
   },
   // persist: true,
})

export default useWebRtcStore
export type WebRtcStore = ReturnType<typeof useWebRtcStore>
