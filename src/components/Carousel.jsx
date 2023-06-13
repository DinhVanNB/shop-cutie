import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import styled from "@emotion/styled";
import banner1 from '../assets/Fashion_Sale_Banner_1.jpg';
import banner2 from '../assets/Sale promotion banner template 002.jpg';
import banner3 from '../assets/banner.png';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() =>
            nextCarousel()
            , 6000); return () => clearTimeout(timer)
    }
        , [currentSlide])
    const prevCarousel = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    }

    const nextCarousel = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
    }
    return (
        <Box sx={{height: '45vh', overflow: 'hidden', position: 'relative'}} >
            <Slider current={currentSlide}>
                <Container fixed>
                    <Image src={banner1} alt="" />
                </Container>
                <Container fixed>
                    <Image src={banner2} alt="" />
                </Container>
                <Container fixed>
                    <Image src={banner3} alt="" />
                </Container>
            </Slider>
            <Icons>
                <Icon onClick={prevCarousel}>
                    <AiOutlineDoubleLeft />
                </Icon>
                <Icon onClick={nextCarousel}>
                    <AiOutlineDoubleRight />
                </Icon>
            </Icons>
        </Box>
    )
}
export default Carousel;

const Slider = styled(Box)(({ current }) => ({
    width: '300%',
    height: '100%',
    display: 'flex',
    transform:`translateX(-${current*100*0.33333333333333}%)`,
    transition: 'all 1s ease'
}));
const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'fill',
});
const Icons = styled(Box)({
    position: 'absolute',
    left: '0',
    display: 'flex',
    right: '0',
    bottom: '2vh',
    justifyContent: 'center',
    gap: '1vw',
});
const Icon = styled(Box)({
    color: 'red',
    border: '1px solid #999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    ' :hover': {
        transform: 'scale(1.1)',
        border: '1px solid orange'
    }
})

