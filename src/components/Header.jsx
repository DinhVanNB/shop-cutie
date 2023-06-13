import { AiOutlineShoppingCart  , AiOutlineMenu, AiOutlineSearch} from "react-icons/ai";
import { Badge, Box, Button, Container, Drawer, IconButton, InputBase, Typography, useMediaQuery} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import {  useSelector } from "react-redux";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";


const Header=({show})=>{
    const [openCart, setOpenCart] = useState(false);
    const [drawOpen, setDrawOpen] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const navigation = useNavigate();
    const {totalItem} = useSelector(state=>state.cart);
    const md = useMediaQuery('(min-width:900px)');
    useEffect(()=>{
        setKeyWord('');
        window.scrollTo(0,0);
    },[navigation]);
    
    const onChangeKeyWord =({target})=>{
         setKeyWord(target.value)
    }
    
    return(
        <Box bgcolor='white' sx={show} top='0' zIndex={10} left={0} p='10px 0'   height='fit-content' width='100%' boxShadow='0px 2px 20px -10px pink'  >
            <Container>
                <Wrapper position='relative' justifyContent='space-between'>
                    {md &&  
                        <>
                            <Link 
                                style={{cursor:'pointer', color:'black', textDecoration:'none',marginLeft:'1vw', 
                                 flex:1, textTransform: 'uppercase', fontSize:'24px', letterSpacing:'1px'}} 
                                to='/'>
                                cutieshop
                            </Link>
                            <Wrapper className="input" height='35px' width='50%' border='1px solid #ccc' borderRadius='20px'>
                                <Wrapper width='100%' height='100%' borderRight='1px solid #ccc'>
                                    <Wrapper  width='45px' color='#ccc' justifyContent='center' textAlign='center'>
                                        <AiOutlineSearch style={{fontSize:'20px'}} />
                                    </Wrapper>
                                    <InputBase 
                                        value={keyWord} onKeyUp={({key})=>{if(key==='Enter' && keyWord !=='' ){navigation(`/search/${keyWord}?page=1`)}}}
                                        onChange={onChangeKeyWord} color="success" sx={{fontFamily:'inherit' }}  fullWidth placeholder="Tìm sản phẩm..." />
                                </Wrapper>
                                <Button 
                                    onClick={()=> keyWord!==''? navigation(`/search/${keyWord}?page=1`):window.confirm('Bạn hãy nhập sản phẩm tìm kiếm!')} 
                                    sx={{width:'100px',fontFamily:'inherit',borderRadius:'30px', textTransform:'initial', color:'#777', ':hover':{color:'#ff6a80'} }}>
                                    Search
                                </Button>
                            </Wrapper>
                        </>
                     }
                     {!md && 
                        <>
                            <Box flex={1}>
                                <IconButton onClick={()=>setDrawOpen(true)} sx={{fontSize:'20px'}} ><AiOutlineMenu/> </IconButton>
                            </Box>
                            <Drawer onClose={()=>setDrawOpen(false)} anchor="left" open={drawOpen}>
                                <Box width='200px' pl='5px'>
                                    <Categories/>
                                </Box>
                            </Drawer>
                            <Link 
                                style={{cursor:'pointer',color:'black', textDecoration:'none',marginLeft:'1vw', 
                                textAlign:'center', flex:1, textTransform: 'uppercase', fontSize:'24px', letterSpacing:'1px'}} 
                                to='/'>
                                cutieshop
                            </Link>
                        </>
                     }
                    <Wrapper flex={1} justifyContent='flex-end' gap='1vw'>
                        <Wrapper marginRight='1vw' color='#777' gap='1vw'>
                            <Box sx={{cursor:'pointer', fontSize:'18px'}}>
                               {!md && <AiOutlineSearch />}
                            </Box>
                            <Badge onClick={()=>setOpenCart(true)} sx={{fontSize:'20px',cursor:'pointer'}} badgeContent={totalItem} color="primary">
                                <AiOutlineShoppingCart />
                            </Badge>
                            <Drawer onClose={()=>setOpenCart(false)} anchor="right" open={openCart}>
                                <Box display='flex' flexDirection='column' justifyContent='space-between' width='300px' height='100%' pl='5px'>
                                    <CartDrawer setOpenCart={setOpenCart}/>
                                </Box>
                            </Drawer>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper marginRight='1vw' justifyContent='flex-end' gap='1vw' textTransform='capitalize'>
                    {
                        md &&  <Categories />
                    }
                </Wrapper>
            </Container>
        </Box>
    )
}

export default Header;

const Wrapper = styled(Box)({
    display: 'flex',
    alignItems:'center',
    fontSize: '14px',
    fontFamily:'inherit',
    '& .input':{
        ':hover':{
            border:'1px solid red'
        }
    }
})
