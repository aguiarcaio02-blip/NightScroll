// IndexedDB helper for persisting video blobs across sessions

const DB_NAME = 'nightscroll';
const DB_VERSION = 1;
const VIDEO_STORE = 'videos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(VIDEO_STORE)) {
        db.createObjectStore(VIDEO_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveVideoBlob(postId: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, 'readwrite');
    tx.objectStore(VIDEO_STORE).put(blob, postId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getVideoBlob(postId: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, 'readonly');
    const req = tx.objectStore(VIDEO_STORE).get(postId);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteVideoBlob(postId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, 'readwrite');
    tx.objectStore(VIDEO_STORE).delete(postId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
