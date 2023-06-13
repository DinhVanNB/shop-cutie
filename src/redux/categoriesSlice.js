import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories:{}
}

const categoriesSlice = createSlice({
    name: 'category',
    initialState ,
    reducers:{
        fetchCategories: (state, action)=>{
            state.categories={...action.payload}
        }
    }
});


export const {fetchCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;