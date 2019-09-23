const cache = {
  set: (key: string, value: any, type: 'session' | 'local' = 'session') => {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage[key] = JSON.stringify(value);
  },
  get: (key: string, type: 'session' | 'local' = 'session') => {
    const storage = type === 'local' ? localStorage : sessionStorage;
    return storage[key] && JSON.parse(storage[key]);
  }
}


export { cache }