import { defineStore } from "pinia";
import ClientsInfoState from "../states/clientsInfoState";
import StoreId from "../storeIds";

/**
 * Contains metadata about the clients that are part of the experiment
 */
const useClientsInfoStore = defineStore(StoreId.ClientsInfo, {
   state: (): ClientsInfoState => ({
      me: {
         vpId: null,
         name: null,
      },
      other: {
         vpId: null,
         name: null,
      },
   }),
   actions: {
      resetVpId() {
         this.me.vpId = null;
      }
   },

   // Persist the state in localStorage using the Pinia PesistedState plugin 
   // See: https://prazdevs.github.io/pinia-plugin-persistedstate/
   persist: true,
});

export default useClientsInfoStore;
export type ClientsInfoStore = ReturnType<typeof useClientsInfoStore>;