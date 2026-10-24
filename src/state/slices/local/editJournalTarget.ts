import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RecentJournalEntriesQuery } from '@/__generated__/graphql';

type JournalEntry = RecentJournalEntriesQuery['recentJournalEntries'][0];

interface EditJournalTargetState {
  data?: JournalEntry;
}

const initialState: EditJournalTargetState = {};

// Then, handle actions in your reducers:
export const editJournalTargetSlice = createSlice({
  name: 'editjournaltarget',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setEditJournalTarget: (state, action: PayloadAction<JournalEntry>) => {
      state.data = action.payload;
    },
    resetEditJournalTarget: state => {
      state.data = undefined;
    },
  },
  extraReducers: _builder => {},
});

export const { setEditJournalTarget, resetEditJournalTarget } =
  editJournalTargetSlice.actions;

export default editJournalTargetSlice;
