import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaExperimentSocketPlugin } from './store/piniaSocketPlugin.ts';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router.ts'
import App from './App.vue'

// 1. Initialize Pinia 
//    → application state management, see: https://pinia.vuejs.org/
// 2. Use the piniaPluginPersistedstate plugin 
//    → persist the Pinia state to localStorage, see: https://prazdevs.github.io/pinia-plugin-persistedstate/ 
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(piniaExperimentSocketPlugin)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app');
