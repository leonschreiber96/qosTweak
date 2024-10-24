<script setup lang="ts">
const emits = defineEmits(['take-call']);
</script>

<template>
   <div id="incoming-call">
      <div>
         <svg viewBox="0 0 24 24">
            <path
            fill="#fff"
            d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
            />
         </svg>
      </div>
      <span>Eingehender Anruf...</span>
      <button @click="emits('take-call')">Annehmen</button>
   </div>
</template>

<style>
#incoming-call {
   display: flex;
   flex-direction: column;
   position: absolute;
   top: calc(40vh + 100px);
   left: calc(50% - 72px);
   justify-content: center;
   align-items: center;
}

#incoming-call > div {
   position: absolute;
   top: -100px;
   
   width: 75px;
   height: 75px;
   border-radius: 50px;
   z-index: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   
   cursor: pointer;
   border: none;
   box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
   background-color: rgb(165, 185, 209);
}

#incoming-call > div > svg {
   width: 60%;
   height: 60%;
}

#incoming-call > button {
   height: 2.5em;
   z-index: 1;
   
   cursor: pointer;
   border: 1px solid rgb(146, 209, 157);
   font-size: 1.5em;
   border-radius: 5px;
   background-color: #339857;
   color: white;
   box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
}

#incoming-call > button:hover {
   background-color: #155c1f;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
}

#incoming-call > span {
   margin: 1em;
}
</style>