import { Box, Breadcrumbs, Button, Container, Menu, MenuItem, Pagination, Typography } from "@mui/material";
import {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product, SkeletonItem } from "../components";
import useFetch from "../hooks/useFetch";
import { AiFillCaretDown } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const CategoriesPage=()=>{
    const [sort, setSort ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {number,categories} = useParams();
    const [anchorel, setAnchorel] = useState(null);
    
    useEffect(()=>{
            setSort(null);
            setCurrentPage(1);
        }
    ,[categories]);
    const query = sort? sort==='inc'?'&sort=price%3Aasc&':'&sort=price%3Adesc&':'&' ;

    const {data :products ,loading, error} = +number===0? 
    useFetch( `/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=12${query}[filters][mainCategory][$eq]=${categories}`)
    : 
    useFetch( `/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=12${query}[filters][sub_category][name][$eq]=${categories}`);

    const onCloseSort=()=>{
        setAnchorel(null);
    }

    const onSetSort=(value)=>{
        setSort(prev=>prev===value? null: value);
        onCloseSort();
    }

    const onPagination =({target})=>{
        const pagePrev = `<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>`;
        setCurrentPage(prev=>parseInt(target.innerHTML)? parseInt(target.innerHTML):target.innerHTML===pagePrev||target.outerHTML===pagePrev?prev-1:prev+1);
        window.scrollTo(0,0);
    }
    
    return(
        <Container>
            <Box display='flex' alignItems='center' justifyContent='space-between' >
                <Breadcrumbs sx={{fontFamily:'inherit', ml:'3vw'}} separator="›" aria-label="breadcrumb">
                    <LinkStyled to='/'>Trang chủ</LinkStyled>
                    <span>
                        {categories.replace('-','&')}
                    </span>
                </Breadcrumbs>
                <Box display='flex' zIndex={2} alignItems='center' position='relative'>
                    <Button onClick={(e)=>setAnchorel(e.target)} endIcon={<AiFillCaretDown/>}  
                        sx={{marginRight:'3vw',fontFamily:'inherit',textTransform:'initial',color:'black' }}
                        >
                        Sắp xếp
                    </Button>
                    <Menu anchorEl={anchorel} onClose={onCloseSort} open={Boolean(anchorel)}>
                        <MenuItem onClick={()=>onSetSort('inc')} sx={{fontFamily:'inherit'}}>{sort==='inc'? <FcCheckmark/>:null} Giá tăng dần</MenuItem>
                        <MenuItem onClick={()=>onSetSort('desc')} sx={{fontFamily:'inherit'}} >{sort==='desc'? <FcCheckmark/>:null}Giá giảm dần</MenuItem>
                    </Menu>
                </Box>
            </Box>
            {error? <Typography variant="h3" color='red'>Error connect!</Typography>
                    :  
                    !loading?
                        <Grid2 p='0 2vw' container>{ products?.data?.map(item=> 
                            <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4} key={item.id}>
                                <Product item={item}  />
                            </Grid2>
                            )}
                        </Grid2>
                        : 
                        <SkeletonItem/>
            } 
            {products?.meta?.pagination?.pageCount>1 && 
                <Box mt='2vh' display='flex' justifyContent='center' >
                    <Pagination 
                        page={currentPage} 
                        onChange={onPagination}
                        shape="rounded" 
                        count={products?.meta?.pagination?.pageCount}
                        boundaryCount={1}
                    />
                </Box> 
            }
        </Container>
    )
}
export default CategoriesPage;

const LinkStyled = styled(Link)({
    textDecoration: 'none',
    color: '#666666',
    cursor:'pointer',
    ':hover': {
        textDecoration: 'underline'
    }
})



