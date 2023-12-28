import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  country: "",
  address: "",
  date: "",
  institute: "",
  degree: [] as string [],
  getImage:"",
  currentComponent:1
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    updateComponentData: (state, action) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    setImage: (state, action) => {
      state.getImage = action.payload
  },
}
});

export const { updateComponentData ,setCurrentComponent,setImage} = componentSlice.actions;
export default componentSlice.reducer;
