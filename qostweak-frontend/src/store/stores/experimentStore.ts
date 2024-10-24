import { defineStore } from 'pinia'
import StoreId from '../storeIds'
import type { ExperimentState } from '../states/experimentState'

const useExperimentStore = defineStore(StoreId.Experiment, {
   state: (): ExperimentState => ({
      page: 0,
      readyState: false,
      pageType: 'call',
   }),
   actions: {
      toggleReadyState() {
         this.readyState = !this.readyState
      },
      nextPage() {
         this.page++
      },
      prevPage() {
         this.page--
      },
   },
   persist: true,
})

export default useExperimentStore
export type ExperimentStore = ReturnType<typeof useExperimentStore>
