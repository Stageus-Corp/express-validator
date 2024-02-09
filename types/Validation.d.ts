export namespace ExpressValidation {
  export interface RunResult<T = any> {
    valid: boolean;
    messages: {
      field: null | string;
      message: null | string;
    }[];
    value: T;
  }
}
