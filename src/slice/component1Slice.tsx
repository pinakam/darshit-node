import { createSlice } from "@reduxjs/toolkit";

interface componentSlice {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: String;
  country: string;
  interest: string;
  institute: String;
  degree: string;
  getImage:string
  currentComponent:Number
}

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
  degree: "",
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
