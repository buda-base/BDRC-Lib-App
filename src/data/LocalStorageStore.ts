
export const STORAGE_KEY_PREFIX = 'BDRCLibApp1.2.0';

/**
 * wrapper for localStorage which insures the use of the key prefix
 */
export const LocalStorageStore = {
  KEYS:{
    storedLibraryMetaData:'storedLibraryMetaData',
    currentMirrorId:'currentMirrorId',
    customMirrorMetaDataURL:'customMirrorMetaDataURL',
  },
  getItem(key:string) {
    return localStorage.getItem(STORAGE_KEY_PREFIX + key);
  },
  removeItem(key: string) {
    return localStorage.removeItem(STORAGE_KEY_PREFIX + key);
  },
  setItem(key: string, value:string) {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, value);
  },
  getJson(key:string) {
    const item = LocalStorageStore.getItem(key);
    if (null === item) {
      return null;
    } else {
      try {
        return JSON.parse(item);
      } catch (err) {
        return null;
      }
    }
  },
  saveJson(key:string, value:any) {
    try {
      const stringified = JSON.stringify(value);
      localStorage.setItem(STORAGE_KEY_PREFIX + key, stringified);
    } catch(err){
      LocalStorageStore.removeItem(key);
    }
  },
};
