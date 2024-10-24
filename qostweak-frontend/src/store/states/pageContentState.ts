export default interface PageContentState {
   html: string;
   css: string;
   pageType: 'welcome' | 'instructions' | 'call' | 'questionnaire' | 'end';
}