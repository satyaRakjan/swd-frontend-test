import { createSlice } from "@reduxjs/toolkit";

const shapeSlice = createSlice({
  name: "shape",
  initialState: {
    rotation: 0
  },
  reducers: {
    rotateShape: (state) => {
      state.rotation += 45; // หมุนทีละ 45 องศา
    }
  }
});

export const { rotateShape } = shapeSlice.actions;
export default shapeSlice.reducer;
