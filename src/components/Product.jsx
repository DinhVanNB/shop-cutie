import { HOST } from "../api/apiServer";
import styled from "@emotion/styled";
import { Box, IconButton, Modal, Tooltip, Typography, useMediaQuery } from "@mui/material";
import {currencyFormat} from '../utilities/curencyFormat';
import { useNavigate} from 'react-router-dom';
import { ImEye } from "react-icons/im";
import { useState } from "react";
import { ModalComponent } from ".";
import { AiOutlineFullscreenExit } from "react-icons/ai";

const Product=({item, isOpen=true})=>{
    const navigation = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () =>setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const md = useMediaQuery('(min-width:900px)');
    const onImageClick =()=>{
        navigation(`/product/${item?.attributes?.title}`,{state:{...item}});
    };
    return(
        <Card>
            <Images>
                <ImageFront 
                    onClick={onImageClick}
                    loading="lazy" className="imgFront" alt="" src={HOST+item?.attributes?.img?.data[0].attributes?.url}/>
                <ImageBack
                    onClick={onImageClick}
                    className="imgBack" alt="" src={HOST+item?.attributes?.img?.data[1].attributes?.url}/>
                {md && isOpen &&
                    <>
                        <ImageButton onClick={handleOpen} className="imgBtn">
                           <ImEye/>
                        </ImageButton>
                        <Modal disableRestoreFocus  open={openModal} onClose={handleClose}>
                            <Box sx={{borderRadius:'2vmin', width:'65%', bgcolor:'white', m:'15vh auto'}}>
                                <Box bgcolor='#ffbfcb' borderRadius='2vmin 2vmin 0 0' display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography ml='10px' variant="h5" fontFamily='inherit'>{item?.attributes?.title}</Typography>
                                    <IconButton onClick={handleClose}>
                                        <AiOutlineFullscreenExit color="black"/>
                                    </IconButton>
                                </Box>
                                <ModalComponent item={item}/>
                            </Box>
                        </Modal>
                    </>
                }
            </Images>
            <TooltipCS disableInteractive title={item?.attributes?.title} followCursor enterDelay={1000} leaveDelay={200}>
                <Paragraph pl='5px' onClick={onImageClick} variant="h6" noWrap>
                    {item?.attributes?.title}
                </Paragraph>
            </TooltipCS>
            <Box pl='5px' display='flex' gap='1vw'>
                <Paragraph color='gray'><i><del>{currencyFormat(item?.attributes?.price*1.1)}</del></i></Paragraph>
                <Paragraph color='#e3564a'>{currencyFormat(item?.attributes?.price)}</Paragraph>
            </Box>
        </Card>
    )
}
export default Product;

const Card = styled(Box)({
    width:'100%',
    display:'flex',
    flexDirection: "column",
    gap: '1vh',
    cursor: 'alias',
})

const Images = styled('div')({
    width:'100%',
    height: '250px',
    overflow:'hidden',
    position:'relative',
    borderRadius:'10px',
    ':hover':{
        ' .imgFront': {
            transition: 'all 0.8s ease',
            transform: 'scale(0.1)',
            zIndex:0
            // opacity:0
        },
        '& .imgBack':{
            transition: 'all 0.8s ease',
            left: 0,
            zIndex:1
        },
        '& .imgBtn':{
            right:'42%',
            zIndex:2
        }
    }
})
const ImageFront= styled('img')({
    width:'100%',
    height: '100%',
    objectFit:'fill',
    position: 'absolute',
    zIndex:1
})
const ImageBack= styled('img')({
    width:'100%',
    height: '100%',
    objectFit:'fill',
    position: 'absolute',
    top: 0,
    left: '-100%',
    zIndex:0
})
const ImageButton = styled(IconButton)({
    position:'absolute',
    width:'30px',
    height:'20px',
    color:'red',
    backgroundColor:'#aaa',
    bottom: '10px',
    right: '-10%',
    zIndex:0,
    transition: 'all 1s ease',
})
const Paragraph = styled(Typography)({
    fontFamily: 'inherit',
    fontSize: '14px',
    textTransform: 'capitalize',
});
const TooltipCS = styled(({className,...props})=>(
    <Tooltip {...props} componentsProps={{tooltip: {className:className}}}/>))(`
    font-family: inherit;
    color: red;
    font-size:13px;
    font-weight:600;
    background-color: #eee
`)

