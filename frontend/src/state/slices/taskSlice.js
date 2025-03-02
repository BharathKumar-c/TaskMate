import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [], // Ensure it's an array
  reducers: {
    setTasks: (state, action) => action.payload, // Replace entire state with tasks
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
  },
});

export const {setTasks, addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
