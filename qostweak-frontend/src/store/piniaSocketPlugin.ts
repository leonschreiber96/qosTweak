import type { PiniaPluginContext } from 'pinia'
import type { ExperimentStore } from './stores/experimentStore'
import type { ClientsInfoStore } from './stores/clientsInfoStore'

import StoreId from './storeIds'
import SocketService from '../socketService'

const experimentSocket = new SocketService('experiment').connect(
   'http://localhost:3001',
)

export function piniaExperimentSocketPlugin({ store }: PiniaPluginContext) {
   switch (store.$id) {
      case StoreId.Experiment:
         const experimentStore = store as ExperimentStore

         experimentSocket.on('next', experimentStore.nextPage)
         experimentSocket.on('prev', experimentStore.prevPage)
         experimentSocket.on('reload', window.location.reload)
         break
      case StoreId.ClientsInfo:
         const clientsInfoStore = store as ClientsInfoStore
         experimentSocket.on('reset-vp-id', clientsInfoStore.resetVpId)
         break
      case StoreId.WebRtcConnection:
         break
   }

   // Clean up on store dispose
   store.$onAction(({ after }) => {
      after(() => {
         console.log('Disconnecting from experiment socket.')
         experimentSocket.disconnect()
      })
   })
}
