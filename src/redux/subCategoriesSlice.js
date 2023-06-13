import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    subCategories:{}
}

const subCategoriesSlice = createSlice({
    name: 'subCategory',
    initialState ,
    reducers:{
        fetchSubCategories: (state, action)=>{
            state.subCategories={...action.payload}
        }
    }
});


export const {fetchSubCategories} = subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;