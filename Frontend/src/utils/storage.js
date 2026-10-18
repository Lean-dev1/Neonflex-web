// src/utils/storage.js
export const safeStorage = {
  get: (key) => { try { return window.localStorage.getItem(key); } catch { return null; } },
  set: (key, value) => { try { window.localStorage.setItem(key, value); } catch { /* sin storage: se ignora */ } },
  remove: (key) => { try { window.localStorage.removeItem(key); } catch { /* idem */ } },
};