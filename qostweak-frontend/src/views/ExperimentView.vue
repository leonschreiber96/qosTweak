<script setup lang="ts">
import CallView from './CallView.vue';
import InstructionsView from './InstructionsView.vue';
import useExperimentStore from '../store/stores/experimentStore';

const experimentStore = useExperimentStore();
</script>

<template>
   <InstructionsView v-if="experimentStore.pageType === 'instructions'" />
   <CallView v-else-if="experimentStore.pageType === 'call'" />
</template>
