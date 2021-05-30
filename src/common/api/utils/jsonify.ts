export const jsonify =
  <U, T extends (...args: any[]) => Promise<Response> = (...args: any[]) => Promise<Response>>(
    serverCall: T
  ) =>
  (...args: Parameters<T>) =>
    serverCall(...args).then(res => res.json()) as Promise<U>;
