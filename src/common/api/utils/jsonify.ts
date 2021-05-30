export const jsonify = (fn: () => Promise<Response>) => () => fn().then(res => res.json());
