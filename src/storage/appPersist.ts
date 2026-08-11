import { Storage } from 'redux-persist'
import { createMMKVStorage } from './safeMMKV'

const storage = createMMKVStorage({
    id: `trust-me-bro-redux-persist-storage`,
    encryptionKey: 'trustmebro',
})

export const reduxStorage: Storage = {
    setItem: (key, value) => {
        storage.set(key, value)
        return Promise.resolve(true)
    },
    getItem: (key) => {
        const value = storage.getString(key)
        return Promise.resolve(value)
    },
    removeItem: (key) => {
        storage.delete(key)
        return Promise.resolve()
    },
}
