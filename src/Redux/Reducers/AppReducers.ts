import {createSlice} from '@reduxjs/toolkit';
import {IReduxState} from '../../Utils/AppTypes';

const initialState: IReduxState = {
  isNetConnected: false,
  isLoaderStart: false,
  events: null,
};

export const Reducer = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    setNetState: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setIsLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const {setNetState, setIsLoader, setEvents} = Reducer.actions;

export default Reducer.reducer;
