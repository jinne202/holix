export const DBConfig = {
    name: 'HolixDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'holix',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'files', keypath: 'files', options: { unique: false } }
        ]
      }
    ]
  };