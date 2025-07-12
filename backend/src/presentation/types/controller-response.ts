export interface ControllerResponse<T> {
  data: T;
  meta?: Record<string, any>;
  message?: string;
}
