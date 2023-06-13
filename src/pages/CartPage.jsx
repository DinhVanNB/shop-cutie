import styled from "@emotion/styled";
import { Box, Breadcrumbs, Button, Container, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../utilities/curencyFormat";
import { AiOutlineMinus,AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { getCartTotal, removeFromCart , toggleCartQty, } from "../redux/cartSlice";
import { useEffect } from "react";

const CartPage = ()=>{
    const dispatch = useDispatch();
    const {carts, totalAmount} = useSelector(state=>state.cart);
    useEffect(()=>{dispatch(getCartTotal())},[carts])
    return (
        <Container >
            <Breadcrumbs separator='>'>
                <Paragraph fontWeight={600}>Giỏ hàng</Paragraph>
                <Paragraph fontWeight={600}>Đặt hàng</Paragraph>
                <Paragraph fontWeight={600}>Thanh toán</Paragraph>
            </Breadcrumbs>
            <Box mt='2vh' >
                <TableContainer  component={Paper}>
                    <Table  >
                        <TableHead >
                            <TableRow >
                                <TableCell width='10%'> <Paragraph fontWeight={600}>Sản phẩm</Paragraph> </TableCell>
                                <TableCell width='25%'><Paragraph fontWeight={600}>Tên</Paragraph></TableCell>
                                <TableCell width='15%'><Paragraph fontWeight={600} textAlign='center'>Giá</Paragraph></TableCell>
                                <TableCell width='10%'><Paragraph fontWeight={600} textAlign='center'>Số lượng</Paragraph></TableCell>
                                <TableCell width='15%'><Paragraph fontWeight={600} textAlign='center'>Thành tiền</Paragraph></TableCell>
                                <TableCell width='15%' ><Paragraph fontWeight={600}>Đặc tính sản phẩm</Paragraph></TableCell>
                                <TableCell width='10%'><Paragraph fontWeight={600}></Paragraph></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {
                                carts?.map(item=>(
                                    <TableRow key={item?.id}>
                                        <TableCell><img width='50px' height='50px' style={{objectFit:'cover'}} src={item?.img} alt=""/></TableCell>
                                        <TableCell> <Paragraph>{item?.title}</Paragraph></TableCell>
                                        <TableCell><Paragraph textAlign='center'>{currencyFormat(item?.price)}</Paragraph></TableCell>
                                        <TableCell>
                                            <Box display='flex' alignItems='center' justifyContent='center'>
                                                <IconButton onClick={()=>dispatch(toggleCartQty({id: item?.id, type:'DESC'}))} sx={{fontSize:'12px', color:'blue'}}><AiOutlineMinus/></IconButton> 
                                                <Paragraph padding='5px' >{item?.quantity}</Paragraph>
                                                <IconButton onClick={()=>dispatch(toggleCartQty({id: item?.id, type:'INC'}))} sx={{fontSize:'12px',color:'blue'}}><AiOutlinePlus/></IconButton> 
                                            </Box>
                                        </TableCell>
                                        <TableCell><Paragraph textAlign='center'>{currencyFormat(item?.totalPrice)}</Paragraph></TableCell>
                                        <TableCell >
                                            <Paragraph>Mã hàng: {item?.codeId}</Paragraph>
                                            <Paragraph>Size: {item?.size}</Paragraph>
                                            <Paragraph>Color: {item?.color}</Paragraph>
                                        </TableCell>
                                        <TableCell><IconButton onClick={()=>dispatch(removeFromCart(item.id))}><AiOutlineDelete/></IconButton></TableCell>
                                    </TableRow>
                                    )
                                )
                            }
                            <TableRow>
                                <TableCell sx={{fontWeight:'600', font:'inherit',  fontSize:'16px'}} align="right" colSpan={4}>Tổng tiền:</TableCell>
                                <TableCell sx={{fontWeight:'600', font:'inherit',  fontSize:'16px', paddingLeft:'2vw', color:'blue'}} colSpan={3}>{currencyFormat(totalAmount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box p='10px'>
                <Paragraph fontWeight='600'>Tên của bạn:</Paragraph>
                <InputBase sx={{fontFamily:'inherit'}} fullWidth placeholder="Nhập tên người đặt hàng..."/>
                <Paragraph fontWeight='600'>Số điện thoại:</Paragraph>
                <InputBase sx={{fontFamily:'inherit'}} fullWidth placeholder="Nhập số điện thoại liên hệ..."/>
                <Paragraph fontWeight='600'>Email:</Paragraph>
                <InputBase sx={{fontFamily:'inherit'}} fullWidth placeholder="Nhập email liên hệ..."/>
                <Paragraph fontWeight='600'>Địa chỉ:</Paragraph>
                <InputBase sx={{fontFamily:'inherit'}} fullWidth placeholder="Nhập địa chỉ liên hệ..."/>
                <Paragraph fontWeight='600'>Tin nhắn</Paragraph>
                <InputBase sx={{fontFamily:'inherit'}} fullWidth placeholder="Nhập lưu ý gửi lại cho shop"/>
                <Box textAlign='center'>
                    <Button variant="outlined" color='success'>Xác nhận</Button>
                </Box>
            </Box>
        </Container>
    )
}
export default CartPage;

const Paragraph =styled(Typography)({
    fontFamily:`'Comic Sans MS', cambria , sans-serif`,
    fontSize:'14px',
    color:'black',
})