import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
  },

  reducers: {
    addContact(state, { payload }) {
      if (
        state.items.find(
          contact => payload.name.toLowerCase() === contact.name.toLowerCase()
        )
      ) {
        alert(`${payload.name} is already in contacts`);
        return state;
      }
      state.items.push(payload);
    },
    removeContact(state, { payload }) {
      return { items: state.items.filter(contact => contact.id !== payload) };
    },
  },
});

export const contactsReducer = usersSlice.reducer;
export const { addContact, removeContact } = usersSlice.actions;
