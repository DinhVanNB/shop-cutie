import { Box, Typography, Avatar, Container } from "@mui/material";
import styled from "@emotion/styled";

const Footer= ()=>{
    return (
        <Box mt='2vh' bgcolor='black'>
            <Container sx={{padding:'1vh 10px'}}>
                <Top>
                    <FooterLinks flex={1}>
                        <Title >Về chúng tôi</Title>
                        <Content >Giới thiệu</Content>
                        <Content >Blog</Content>
                    </FooterLinks>
                    <FooterLinks flex={1}>
                        <Title >Chính sách</Title>
                        <Content >Chính sách bảo mật</Content>
                        <Content >Chính sách vận chuyển</Content>
                        <Content >Chính sách đổi trả</Content>
                        <Content >Chính sách vận chuyển</Content>
                    </FooterLinks>
                    <FooterLinks flex={1}>
                        <Title  >Hỗ trợ khách hàng</Title>
                        <Content >Phí vận chuyển</Content>
                        <Content >Hoàn trả hàng</Content>
                        <Content >Hướng dẫn đặt hàng</Content>
                        <Content >Trách nhiệm</Content>
                        <Content >Theo dõi đơn hàng</Content>
                        <Content >VIP</Content>
                    </FooterLinks>
                    <FooterLinks textAlign='justify' flex={3}>
                        <Title >Đăng ký nhận khuyến mãi</Title>
                        <Typography fontFamily='inherit' fontSize='13px' color='gray' >
                            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
                            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
                            ut labore etdolore.
                        </Typography>
                    </FooterLinks>
                    
                </Top>
                <Bottom>
                    <Box display='flex' alignItems='center' flexDirection='column'>
                        <Typography fontFamily='inherit'  fontSize='24px' color='#2879ff' variant='h3'>
                            Cutie Shop
                        </Typography>
                        <Typography fontFamily='inherit'  color='gray' fontSize='12px'>
                            Clone 2023
                        </Typography>
                    </Box>
                    <Box>
                        <Avatar/>
                    </Box>
                </Bottom>
            </Container>
        </Box>
       
    )
}
export default Footer;


const Top = styled(Box)({
    display:'flex',
    justifyContent:'space-evently',
    flexWrap: 'wrap',
    gap:'10vw'
});
const FooterLinks= styled(Box)({
    display:'flex',
    flexDirection:'column',
    gap:'1vh'
});
const Title = styled(Typography)({
    fontSize:'15px',
    variant:"h6",
    color:'white',
    whiteSpace:'pre',
    fontFamily: 'inherit'
});
const Content = styled(Typography)({
    fontSize:'13px',
    color:'gray',
    whiteSpace:'pre',
    fontFamily: 'inherit'
});
const Bottom = styled(Box)({
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:'5vh',
})
