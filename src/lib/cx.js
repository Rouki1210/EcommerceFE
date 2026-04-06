function addClassToken(store, token) {
  if (!token || typeof token !== "string") {
    return;
  }

  token
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .forEach((className) => {
      store.add(className);
    });
}

function pushToken(store, token) {
  if (!token) {
    return;
  }

  if (typeof token === "string") {
    addClassToken(store, token);
    return;
  }

  if (Array.isArray(token)) {
    token.forEach((item) => pushToken(store, item));
    return;
  }

  if (typeof token === "object") {
    Object.entries(token).forEach(([key, value]) => {
      if (value) {
        addClassToken(store, key);
      }
    });
  }
}

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

function sortObjectKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortObjectKeys(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.keys(value)
    .sort((a, b) => a.localeCompare(b))
    .reduce((result, key) => {
      result[key] = sortObjectKeys(value[key]);
      return result;
    }, {});
}

export function cx(...tokens) {
  const out = new Set();
  tokens.forEach((token) => pushToken(out, token));
  return Array.from(out).join(" ");
}

export function sortCx(styleMap) {
  return sortObjectKeys(styleMap);
}
