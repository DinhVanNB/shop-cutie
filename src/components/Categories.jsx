import styled from "@emotion/styled";
import { Box, useMediaQuery } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { RiArrowDropDownLine } from "react-icons/ri";
import SubCategories from "./SubCategories";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categoriesSlice";
import query from "../api/query";

const Categories = ()=>{
    const dispatch = useDispatch();
    const {categories} = useSelector(state=>state.category);
    useEffect(()=>{
        (async()=>{
        const {data} = await query.get('/categories');
        dispatch(fetchCategories(data))})()
    },[categories?.data?.length]);
   
    const md = useMediaQuery('(min-width:900px)');
    
    return (
        categories?.data?.map(category=>
            (<Box zIndex={3} sx={{':hover':{'& .showSubCategories':{ display:'block'} }}} position='relative' mt='10px'  key={category?.id}>
                <Wrapper justifyContent='space-between'>
                    <LinkStyled to={`/0/${category?.attributes?.name}/${category?.id}?page=1`}>
                        {category?.attributes?.name?.replace('-','&')}
                    </LinkStyled>
                    <RiArrowDropDownLine/>
                    { md && 
                        <Box className='showSubCategories' display='none' 
                            position='absolute' width='130px' borderRadius='5px' 
                            bgcolor='#fff6f8' border='1px solid #ccc' top='20px'>
                            {
                                <SubCategories category={category?.attributes?.name}/>
                            }
                        </Box>
                    }
                </Wrapper>
                { !md && 
                    <Box mt='5px' className='showSubCategories' display='none'>
                        {
                            <SubCategories category={category?.attributes?.name}/>
                        }
                    </Box>
                }
            </Box> )
        )
    )
}
export default Categories;

const Wrapper = styled(Box)({
    display: 'flex',
    alignItems:'center',
    fontSize: '14px',
    fontFamily:'inherit',
})

const LinkStyled = styled(Link)({
    textDecoration: 'none',
    color: 'black',
    cursor:'pointer',
    fontSize:'14px',
    fontWeight:'600',
    ':hover': {
        textDecoration: 'underline',
        color:'#ff6a80'
    }
})
