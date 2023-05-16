import { configureStore } from '@reduxjs/toolkit';
import { userDataReducer } from './userDataReducer';

export const store = configureStore ({
    reducer: {
      userDataReducer,
    }
  });