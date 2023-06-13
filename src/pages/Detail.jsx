import { Box, Breadcrumbs,  Container, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import useFetch from "../hooks/useFetch";
import { ModalComponent, Product, SkeletonItem } from "../components";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const Detail = ()=>{
    const {state:item} = useLocation();
    const [queryFetch, setQueryFetch] = useState(null);
    const rdId=()=>{
        let arr =[];
        let query= '';
        while(arr.length <8){
            let id = Math.floor(Math.random()*388);
            if(id!==item?.id && !arr.includes(id)){
                query += `&[filters][id][$eq]=${id}`;
                arr.push(id)
            }
        }
        return query;
    }
    
    useEffect(()=>{
        setQueryFetch(()=>rdId());
    }
    ,[item]);
    const {data: products, loading, error} = useFetch( `/products?populate=*${queryFetch}`);
    return(
        <Container>
            <Breadcrumbs sx={{fontFamily:'inherit', ml:'3vw'}} separator="›" aria-label="breadcrumb">
                <LinkStyled  to="/">Trang chủ</LinkStyled>
                <LinkStyled  
                    to={`/0/${item?.attributes?.category?.data?.attributes?.name}/${item?.attributes?.category?.data?.id}`}>
                    {item?.attributes?.category?.data?.attributes?.name?.replace('-','&')}
                </LinkStyled>
                <LinkStyled 
                    to={`/1/${item?.attributes?.sub_category?.data?.attributes?.name}/${item?.attributes?.sub_category?.data?.id}`}>
                    {item?.attributes?.sub_category?.data?.attributes?.name?.replace('-','&')}
                </LinkStyled>
                <span> {item?.attributes?.title}</span>
            </Breadcrumbs>
            <ModalComponent isOpen={false} item={item}/>
            <Box marginLeft='5vw'>
                <Typography color='#8b7158' fontSize='14px' fontFamily='inherit'> 
                    <CgPlayButtonR  style={{rotate:`${item?.attributes?.desc?.length>0?'90deg':''}`}}/> 
                    &nbsp;CHI TIẾT
                </Typography>
                <pre style={{fontFamily:'inherit', opacity:'0.6' ,fontSize:'14px', fontWeight:'600', margin:'5px'}}>{item?.attributes?.desc||''}</pre>
            </Box>
            <Box mt='10px' marginLeft='5vw'>
                <Typography color='#8b7158' fontSize='14px' fontFamily='inherit'> 
                    <CgPlayButtonR/> 
                    &nbsp;BÌNH LUẬN & ĐÁNH GIÁ
                </Typography>
                <pre style={{fontFamily:'inherit', opacity:'0.6' ,fontSize:'14px', fontWeight:'600', margin:'5px'}}></pre>
            </Box>
            <Box mt='10px' marginLeft='5vw'>
                <Box>
                    <Typography color='#8b7158' fontSize='14px' fontFamily='inherit'> 
                        <CgPlayButtonR  style={{rotate:`${products?.data?.length>0?'90deg':''}`}}/> 
                            &nbsp;SẢN PHẨM KHÁC
                    </Typography>
                </Box>
            </Box>
            {error? 
                <Typography variant="h3" color='red'>Error connect!</Typography>
                :  !loading?
                    <Grid2 p='0 5vw' container>{ products?.data?.map(product=> 
                        <Grid2 p='10px 1.5vw' xs={12} sm={6} md={3} key={product.id}>
                            <Product isOpen={false} item={product}  />
                        </Grid2>
                        )}
                    </Grid2>
                    : 
                    <SkeletonItem/>
            } 
        </Container>
    )
}
export default Detail;

const LinkStyled = styled(Link)({
    textDecoration: 'none',
    color: '#666666',
    cursor:'pointer',
    ':hover': {
        textDecoration: 'underline'
    }
})





