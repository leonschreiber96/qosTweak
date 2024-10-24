<script setup lang="ts">
import usePageContentStore from '../store/stores/pageContentStore';
import useExperimentStore from '../store/stores/experimentStore';

const experimentStore = useExperimentStore();
const pageContentStore = usePageContentStore();
</script>

<template>
   <div v-html="pageContentStore.html"></div>
   <button class="btn main-btn" :class="{ 'btn-disabled': experimentStore.readyState }" 
      @click="experimentStore.toggleReadyState">
      {{experimentStore.readyState ? "Warten..." : "Weiter"}}
   </button>
</template>