<script setup lang="ts">
import IncomingCallindicator from '../components/IncomingCallIndicator.vue';
import useExperimentStore from '../store/stores/experimentStore';
import useWebRtcStore from '../store/stores/webRtcStore';
import WebRtcManager from '../webRtcManager';

const webRtcStore = useWebRtcStore();
const webRtcManager = new WebRtcManager();

const experimentStore = useExperimentStore();

async function getLocalVideoStream() {
   console.log("Getting local video stream");
   const stream = await navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: true
   });

   return stream;
}

// async function displayLocalVideo() {
//    const stream = await getLocalVideoStream();
//    const localVideo = document.getElementById('local-video') as HTMLVideoElement;
//    localVideo.srcObject = stream;
//    localVideo.play();
// }
</script>

<template>
   <!-- Animated symbol and "accept" button for incoming call -->
   <IncomingCallindicator v-if="webRtcStore.incomingCall" @take-call="() => webRtcManager.takeCall()"/>
   <!-- "Call in progress" message -->
   <div v-if="webRtcStore.outgoingCall" id="outgoing-call">Anruf läuft...</div>

   <div id="video-area">
      <video v-if="webRtcStore.callRunning || true" autoplay id="remote-video"></video>
      <video v-if="webRtcStore.callRunning || true" autoplay id="local-video" muted></video>
   </div>

   <div id="call-action-bar">
      <button v-if="!webRtcStore.callRunning && !webRtcStore.incomingCall && !webRtcStore.outgoingCall" 
         class="btn call-btn" @click="webRtcManager.call">
         Anrufen
      </button>
      <button v-if="webRtcStore.callRunning" class="btn" id="hangup-btn" >
         <svg style="width: 50px; height: 50px" viewBox="0 0 24 24">
            <path
            fill="currentColor"
            d="M12,9C10.4,9 8.85,9.25 7.4,9.72V12.82C7.4,13.22 7.17,13.56 6.84,13.72C5.86,14.21 4.97,14.84 4.17,15.57C4,15.75 3.75,15.86 3.5,15.86C3.2,15.86 2.95,15.74 2.77,15.56L0.29,13.08C0.11,12.9 0,12.65 0,12.38C0,12.1 0.11,11.85 0.29,11.67C3.34,8.77 7.46,7 12,7C16.54,7 20.66,8.77 23.71,11.67C23.89,11.85 24,12.1 24,12.38C24,12.65 23.89,12.9 23.71,13.08L21.23,15.56C21.05,15.74 20.8,15.86 20.5,15.86C20.25,15.86 20,15.75 19.82,15.57C19.03,14.84 18.14,14.21 17.16,13.72C16.83,13.56 16.6,13.22 16.6,12.82V9.72C15.15,9.25 13.6,9 12,9Z"
            />
         </svg>
      </button>
   </div>
</template>

<style>
#call-action-bar {
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 100px;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 1;
}

#video-area {
   background-color: rgb(33, 70, 103);
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: calc(100% - 100px);
   display: flex;
   justify-content: center;
   align-items: center;
}

#remote-video {
   width: 100%;
   height: auto;
   border: 10px solid red;
}

#local-video {
   position: absolute;
   bottom: 0;
   right: 0;
   width: 25%;
   height: auto;
   border: 10px solid green;
}
</style>