// Share cloud reads during navigation; always merge device records separately.
const requests = new Map();
const MAX_AGE_MS = 30000;

export function invalidateAttemptHistory(uid) {
  if (uid) requests.delete(uid);
  else requests.clear();
}

export function getRemoteAttempts(uid, load, { force = false } = {}) {
  const current = requests.get(uid);
  if (current && (current.pending || (!force && current.expires > Date.now()))) return current.promise;
  const entry = { pending: true, expires: 0 };
  entry.promise = Promise.resolve().then(load).then(rows => {
    entry.pending = false;
    entry.expires = Date.now() + MAX_AGE_MS;
    if (rows?.syncState === 'offline' && requests.get(uid) === entry) requests.delete(uid);
    return rows;
  }).catch(error => {
    if (requests.get(uid) === entry) requests.delete(uid);
    throw error;
  });
  requests.set(uid, entry);
  // An account change clears the cache; keep this bounded for non-UI callers too.
  if (requests.size > 4) requests.delete(requests.keys().next().value);
  return entry.promise;
}
