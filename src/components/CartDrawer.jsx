import { Box, Typography,IconButton, Button } from "@mui/material";
import { useEffect } from "react";
import { AiOutlineMinus,AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotal, clearCart,removeFromCart, toggleCartQty } from "../redux/cartSlice";
import { currencyFormat } from "../utilities/curencyFormat";


const CartDrawer = ({setOpenCart})=>{
    const dispatch = useDispatch();
    const {carts, totalAmount} = useSelector(state=>state.cart);
    useEffect(()=>{
        dispatch(getCartTotal())
    },[carts])
    return (
        <>
            <Box>
            <Typography fontFamily='inherit' variant="h6" textAlign='center'>Giỏ hàng</Typography>
            {carts?.map(item=>
                <Box key={item.id} display='flex' alignItems='center' gap='5px' borderBottom='1px dashed #ccc' padding='5px 0px'>
                    <Box width='60px'>
                        <img style={{objectFit:'cover',  height:'50px', width:'50px' }} src={item.img} alt="" />
                    </Box>
                    <Box display='flex' flexDirection='column' overflow='hidden' >
                        <Typography fontFamily='inherit' noWrap>{item.title}</Typography>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Box display='flex' alignItems='center' gap='2px'>
                                <Typography fontFamily='inherit' noWrap>
                                    Số lượng: {item.quantity}
                                </Typography> 
                                <IconButton onClick={()=>dispatch(toggleCartQty({id: item.id, type:'DESC'}))} sx={{fontSize:'12px'}}><AiOutlineMinus/></IconButton>
                                <IconButton onClick={()=>dispatch(toggleCartQty({id: item.id, type:'INC'}))} sx={{fontSize:'12px'}}><AiOutlinePlus/></IconButton>
                            </Box>
                            <IconButton onClick={()=>dispatch(removeFromCart(item.id))} sx={{fontSize:'12px'}}><AiOutlineDelete/></IconButton> 
                        </Box>
                    </Box>
                </Box>)
            }
            {
                carts?.length===0? <Typography textAlign='center' fontFamily='inherit' fontSize='14px' color='red'>Không có sản phẩm nào trong giỏ hàng!!</Typography>:
                <Typography textAlign='end' pr='15px' fontFamily='inherit' fontSize='14px' color='red'>Total: {currencyFormat(totalAmount)}</Typography>
            }
            </Box>
            <Box mb='10px'  width='99%'  display='flex' justifyContent='space-around'>
                <Button onClick={()=>setOpenCart(false)} sx={{font:'inherit', fontSize:'13px', textTransform:'initial'}} variant="outlined"> <Link to={'/cart'} style={{textDecoration:'none'}}>Chi tiết</Link></Button>
                <Button onClick={()=>dispatch(clearCart())} sx={{font:'inherit', fontSize:'13px', textTransform:'initial'}} variant="outlined" color="error">
                    Xóa tất cả
                </Button>
            </Box>
        </>
    )
}
export default CartDrawer;