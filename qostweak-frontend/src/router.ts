
import { createRouter, createWebHistory } from 'vue-router'
import ExperimentView from './views/ExperimentView.vue'
import IndexView from './views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "default",
      component: IndexView
    },
    {
      path: '/experiment',
      name: 'experiment',
      component: ExperimentView
    }
  ]
})

// router.beforeEach((to, from) => {
//   if (!(to.name === "questions")) {
//     localStorage.setItem("first_questionnaire_reload", "false");
//   }
// })

// router.afterEach((to, from) => {
//   if (to.name === "questions") {
//     // read from local storage
//     const already_reloaded = JSON.parse(localStorage.getItem("first_questionnaire_reload") || false);

//     if (!already_reloaded) {
//       localStorage.setItem("first_questionnaire_reload", "true");
//       window.location.reload();
//     }
//   }
// })

export default router
