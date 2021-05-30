export const jsonify =
  <U, T extends (...args: any[]) => Promise<Response> = (...args: any[]) => Promise<Response>>(
    serverCall: T
  ) =>
  async (...args: Parameters<T>) => {
    const response = await serverCall(...args);
    const result = await response.json();
    if (!response.ok) throw result;
    return result as Promise<U>;
  };
