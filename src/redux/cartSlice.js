import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    carts: [],
    totalAmount: 0,
    totalItem:0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state,action)=>{
            const isItemInCart = 
            state.carts.find(item=>item.id ===action.payload.id);
            if(isItemInCart){
                const itemInCart = state.carts.map(item=>{
                    if(item.id===action.payload.id){
                        let totalQty = item.quantity + action.payload.quantity;
                        let totalPrice = totalQty * item.price;
                        return {
                            ...item,quantity: totalQty, totalPrice
                        }
                    }
                    else{
                        return item
                    }
                });
                state.carts = itemInCart;
            }
            else{
                state.carts.push({...action.payload, totalPrice: action.payload.price * action.payload.quantity });
            }
        },
        removeFromCart:(state,action)=>{
            const itemInCart = state.carts.filter(item=> item.id!==action.payload);
            state.carts= itemInCart;
        },
        clearCart: (state)=>{
            state.carts = []
        },
        getCartTotal: (state)=>{
            state.totalItem =   state.carts.reduce((cartTotalItem, cartItem)=>{
                return cartTotalItem +=cartItem.quantity
            },0);
             state.totalAmount = state.carts.reduce((cartTotalAmount, cartItem)=>{
                return cartTotalAmount += cartItem.totalPrice
             },0);
        },
        toggleCartQty: (state,action)=>{
            const itemCart = state.carts.map(item=>{
                if(item.id===action.payload.id){
                    if(action.payload.type==='INC'){
                        item.quantity++
                    }
                    if(action.payload.type==='DESC' && item.quantity>1){
                        item.quantity--
                    }
                    item.totalPrice = item.quantity * item.price
                    return item
                }
                return item
            });
            state.carts = itemCart;
        }
    }
})
export const {addToCart, removeFromCart, clearCart, getCartTotal, toggleCartQty} = cartSlice.actions;

export default cartSlice.reducer;