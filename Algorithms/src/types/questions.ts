export interface TQuestionItem {
  name: string;
  prompt: string;
  // TODO: type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  algorithm: any;
  inputFormat: string;
  outputFormat: string;
}
