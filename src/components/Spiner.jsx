import styled from "@emotion/styled"
import { Box, keyframes } from "@mui/material"

const Spinner = ()=>(
    <Wrapper>
        <SpinnerElemnent/>
    </Wrapper>
)
export default Spinner

const rotate = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled(Box)({
   width:'100%',
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
});
const SpinnerElemnent = styled(Box)`
    border: 5px solid #f3f3f3;
    border-radius:50%;
    border-top:5px solid #3498db;
    width:35px;
    height:35px;
    animation: ${rotate} 1.5s linear infinite;
    -webkit-animation: ${rotate} 1.5s linear infinite;
`;



