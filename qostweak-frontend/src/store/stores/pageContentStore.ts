import { defineStore } from 'pinia'
import StoreId from '../storeIds';
import PageContentState from '../states/pageContentState';
import useExperimentStore from './experimentStore';

const usePageContentStore = defineStore(StoreId.PageContent, {
   state: (): PageContentState => ({
      html: '',
      css: '',
      pageType: 'welcome',
   }),
   actions: {
      clearPageContent() {
         this.html = '';
         this.css = '';
      },
      async fetchPageContent() {
         const experimentStore = useExperimentStore();

         const htmlResponse = await fetch(`/api/page-content/html/${experimentStore.page}.html`);
         const cssResponse = await fetch(`/api/page-content/css/${experimentStore.page}.html`);

         this.html = await htmlResponse.text();
         this.css = await cssResponse.text();
      }
   },
   persist: true,
});

export default usePageContentStore;
export type PageContentStore = ReturnType<typeof usePageContentStore>;