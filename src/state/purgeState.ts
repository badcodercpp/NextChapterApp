import { persistor, store } from '@/state/state';

import { api } from '@/api/baseApi';

export const purgeAllStateCache = async () => {
  try {
    // 1. Clear the RTK Query cache from memory
    store.dispatch(api.util.resetApiState());

    // 2. Clear out the persisted user data in async storage
    await persistor.purge();

    // 3. (Optional) Force a reload or navigate back to the auth root screen
  } catch (error) {
    console.log('purge state failed', error);
  }
};
