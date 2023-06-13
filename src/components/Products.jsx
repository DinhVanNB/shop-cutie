import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import useFetch from "../hooks/useFetch";
import {Spinner , Product} from './index';
import logo from '../assets/icon_featured.png';

const Products=({type})=>{
    const {data, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);
    return(
        <Container sx={{mt:'5vh'}}> 
            <Top >
                <Paragraph fontSize='20px' color='gray' variant="subtitle2" >
                    {type} products
                </Paragraph>
                <Paragraph mb='20px' variant="h4" >
                {type==='Best sell'? 'Sản phẩm bán chạy': 'Sản phẩm nổi bật'}
                </Paragraph>
                <Box position='absolute' bottom='-10px' bgcolor='white'>
                    <img src={logo} alt=""/>
                </Box>
            </Top>
            {loading? <Spinner/> : error? <Typography variant="h3" color='red' >Error connect!</Typography>:  
                <Grid2 p='0 2vw' container>{ data?.data?.map(item=> 
                    <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4} key={item.id}>
                        <Product item={item}  />
                    </Grid2>
                    )}
                </Grid2>
            }
        </Container>
    )
}
export default Products;

const Top = styled(Container)({
    marginTop:'5vh',
    marginBottom:'1vh',
    width:'90%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderBottom:'1px dotted #ccc',
    position:'relative'
});

const Paragraph = styled(Typography)({
    textTransform: 'capitalize',
    fontFamily: 'inherit'
});