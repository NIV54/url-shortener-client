export const classes = (dynamic: Record<string, any>, additionalClasses = "") =>
  Object.entries(dynamic)
    .filter(([_key, value]) => !!value)
    .map(([key]) => key)
    .join(" ")
    .concat(" ")
    .concat(additionalClasses);
