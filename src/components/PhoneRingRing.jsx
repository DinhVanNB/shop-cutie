import styled from "@emotion/styled";
import { Box, Tooltip } from "@mui/material";
import phoneImg from '../assets/phone-ring.png';

const PhoneRingRing =()=>(
        <Wrapper>
            <Tooltip title='Tel:190012346'>
                <Box>
                    <Box className="phone">
                    </Box>
                    <Box className="circle">
                    </Box>
                </Box>
            </Tooltip>
        </Wrapper>
)
    
export default PhoneRingRing;

const Wrapper = styled(Box)({
    position: 'fixed',
    bottom:'calc(2vw + 2vh)',
    left:'calc(2vw + 2vh)',
    zIndex:5,
    cursor:'pointer',
    '& .circle':{
        position: 'absolute',
        top:'-10px',
        left:'-10px',
        zIndex:2,
        borderRadius:'50%',
        width:'80px',
        height:'80px',
        backgroundColor:'red',
        animation: 'circle-ripple 1s infinite ease-in-out',
    },
    '& .phone':{
        width:'60px',
        zIndex:3,
        height:'60px',
        borderRadius:'50%',
        background: `rgba(240, 20, 20, 0.7) url(${phoneImg}) no-repeat center center`,
        animation: 'phone-rotate 1.5s infinite ease-in-out',
        position:'relative',
        '&::after':{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1s infinite ease-in-out',
            border: '2px solid red',
            content: '""',
        },
    },
    '@keyframes circle-ripple': {
    '0%': {
        transform: 'scale(1.1)',
        opacity: 0,
    },
    '100%': {
        transform: 'scale(0.8)',
        opacity: 0.5,
    },
  },
    '@keyframes ripple': {
    '0%': {
      transform: 'scale(1.1)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
  '@keyframes phone-rotate': {
        '0%': {
            transform: 'rotate(0)',
        },
        '10%': {
            transform:' rotate(-25deg)',
        },
        '20%': {
            transform: 'rotate(25deg)',
        },
        '30%': {
            transform: 'rotate(-25deg)'
        },
        '40%': {
            transform: 'rotate(25deg)'
        },
        '50%': {
            transform: 'rotate(0)'
        },
        '100%': {
            transform: 'rotate(0)'
        }
    },
})