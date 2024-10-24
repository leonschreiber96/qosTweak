export default interface ExperimentState {
   page: number;
   pageType: "instructions" | "questions" | "call";
   readyState: boolean;
}