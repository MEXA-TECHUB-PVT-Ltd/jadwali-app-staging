// questionsSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface QuestionsState {
  questionId: string | null;
}

const initialState: QuestionsState = {
  questionId: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    storeQuestionId(state, action) {
      state.questionId = action.payload;
    },
  },
});

export const { storeQuestionId } = questionsSlice.actions;
export default questionsSlice.reducer;
