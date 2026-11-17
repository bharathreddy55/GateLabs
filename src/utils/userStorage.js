let userId='anonymous';
export function setStorageUser(uid){const next=uid||'anonymous';const changed=next!==userId;userId=next;return changed;}
export function userStorageKey(name){return `${name}:${userId}`;}
// Old unscoped keys are intentionally left untouched. Import them only after the
// device owner explicitly reviews their backup and chooses the target account.
