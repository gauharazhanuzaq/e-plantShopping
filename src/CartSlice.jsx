import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0, // New property to keep track of total quantity
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({ ...item, quantity: 1 }); // Add new item with quantity 1
      }
      state.totalQuantity += 1; // Increment total quantity
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      const item = state.items.find(i => i.name === itemName);

      if (item) {
        state.totalQuantity -= item.quantity; // Decrement total quantity by the removed item's quantity
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);

      if (item) {
        state.totalQuantity += (quantity - item.quantity); // Adjust total quantity based on the new quantity
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
