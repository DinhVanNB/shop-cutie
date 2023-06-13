import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { currencyFormat } from "../utilities/curencyFormat";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Box, Button, Container, IconButton,Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { HOST } from "../api/apiServer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { addToCart ,getCartTotal} from "../redux/cartSlice";
import usePut from "../hooks/usePut";
import axios from "axios";

const Modal = ({item})=>{
    const [imgShow, setImgShow] = useState(HOST + item?.attributes?.img?.data[0].attributes.url);
    const [currentThum, setCurrentThum] = useState(item?.attributes?.img?.data[0].id);
    const [itemToCart, setItemToCart] = 
    useState({img:HOST + item?.attributes?.imgcolors?.data[0].attributes.url,
        id:item?.id ,title:item?.attributes?.title,codeId:item?.attributes?.codeId,color:null,quantity:1,size:null,
        price: item?.attributes?.price
    });

    const [offset,setOffset] = useState({left:0,top:0});
    const [scale, setScale] = useState(1);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {data} = usePut(`/products/${item?.id}`,{...item, attributes:{...item?.attributes, view: (item?.attributes?.view+1)}});
    // console.log(item)
    useEffect(()=>{
        setImgShow(HOST + item?.attributes?.img?.data[0].attributes.url);
        setCurrentThum(item?.attributes?.img?.data[0].id);
        setItemToCart({
            img:HOST + item?.attributes?.imgcolors?.data[0].attributes.url,
            id:item?.id ,title:item?.attributes?.title,codeId:item?.attributes?.codeId,color:null,quantity:1,size:null,
            price: item?.attributes?.price,
            totalPrice:0
        });
        setScale(1);
        setOffset({left:0,top:0});
    }
    ,[item]);

    const onMouseZoom=(e)=>{
        const x = e.clientX - e.target.offsetLeft;
        const y= e.clientY - e.target.offsetTop;
        setOffset({left:x, top: y});
        setScale(2.5);
    }
    const onMouseleave=()=>{
        setScale(1);
        setOffset({left:0,top:0});
    }
    const onAddToCart = async(obj=false)=>{
        const conditionSize = item?.attributes?.sizes?.data?.length>0 && itemToCart.size ;
        const conditionColor = item?.attributes?.colors?.data?.length>0 && itemToCart.color;
        if(!conditionSize){
            window.confirm('Bạn chưa chọn size !!!')
        }
        else if(!conditionColor){
            window.confirm('Bạn chưa chọn màu sắc!!!')
        }
        else{
            dispatch(addToCart(itemToCart));
            dispatch(getCartTotal());
            if(obj){
                navigation('/cart');
            }
        }
        
    }

    return(
        <Container>
            <Grid2 container padding='10px' >
                <Grid2 xs={12} sm={6} padding='0 2vw' >
                    <Box overflow='hidden' >
                        <ImgTarget 
                            onMouseOver={onMouseZoom} 
                            onMouseMove={onMouseZoom} 
                            onMouseLeave={onMouseleave} 
                            numberScale={scale} 
                            numberOffset={offset} 
                            src={imgShow} alt=''
                        />
                    </Box>
                    <Box display='flex' flexWrap='wrap' gap='1px'  >
                        { item?.attributes?.img?.data?.map(data=><ThumImg 
                                onClick={()=>{setImgShow(HOST+data.attributes.url); setCurrentThum(data.id)}} 
                                isBorder={currentThum===data.id} key={data.id} src={HOST+ data.attributes.url} alt=''/>)
                        } 
                    </Box>
                </Grid2>
                <Grid2  xs={12} sm={6} padding='0 2vw' >
                    <Typography  m='10px 0'  fontFamily='inherit' variant="h5">{item?.attributes?.title}</Typography>
                    <Typography m='10px 0px' fontFamily='inherit' fontSize='14px' color='gray'>{item?.attributes?.view} lượt xem</Typography>
                    <Typography m='10px 0px' fontFamily='inherit' fontSize='14px' 
                        color='gray'>Danh mục: {item?.attributes?.sub_category?.data?.attributes?.name?.replace('-','&')} 
                    </Typography>
                    <Typography m='10px 0px' fontFamily='inherit' fontSize='14px' 
                        color='gray'>Mã hàng: <strong> {item?.attributes?.codeId}</strong>  
                    </Typography>
                    <Typography m='10px 0px' fontFamily='inherit' fontWeight={600} variant="h6" 
                        color='#ff0000'>{currencyFormat(item?.attributes?.price)} 
                    </Typography>
                    <Box ml='20px'>
                        {item?.attributes?.sizes?.data?.length>0 && 
                            (
                                <>
                                    <Typography fontFamily='inherit' color='gray' fontWeight={600} fontSize='14px'>Chọn Size</Typography>
                                    <RadioGroup row value={itemToCart?.size} onChange={({target})=>setItemToCart({...itemToCart,size:target.value})} >
                                            {item?.attributes?.sizes?.data?.map(size=>
                                                <Box
                                                    color='gray'
                                                    fontFamily='inherit'
                                                    key={size.attributes.type}
                                                    >
                                                    <Radio 
                                                        sx={{'& .MuiSvgIcon-root':
                                                        {fontSize: '16px'}}} value={size.attributes.type}/>
                                                    <span style={{fontSize:'14px'}}>{size.attributes.type}</span>
                                                </Box>)
                                            }
                                    </RadioGroup>
                                </>
                            )
                        }
                        {item?.attributes?.colors?.data?.length>0 && 
                            <>
                                <Typography fontFamily='inherit' color='gray' fontWeight={600} fontSize='14px'>Chọn Màu</Typography>
                                <Box display='flex' gap='5px' m='10px 10px' >
                                    { item?.attributes?.imgcolors?.data?.map((data,index)=>
                                            <TooltipCS key={data.id}  
                                                title={item?.attributes?.colors?.data[index].attributes.color} followCursor  enterDelay={500} leaveDelay={200}>    
                                                <ThumImg 
                                                    onClick={()=> 
                                                        setItemToCart(prev=> prev.color!==item?.attributes?.colors?.data[index].attributes.color? 
                                                           {...prev,color: item?.attributes?.colors?.data[index].attributes.color}: {...prev, color:null} )}
                                                    isBorder={itemToCart?.color===item?.attributes?.colors?.data[index].attributes.color} 
                                                    src={HOST+ data.attributes.url} 
                                                    alt=''
                                                />
                                            </TooltipCS>
                                        )
                                    } 
                                </Box>
                            </> 
                        }
                    </Box>
                    <Box display='flex' alignItems='center' margin='20px 0px' border='1px solid #ccc' bgcolor='#eeeeee' width='fit-content' borderRadius='20px'>
                        <IconButton onClick={()=>setItemToCart(prev=>prev.quantity===1? {...prev}:{...prev,quantity:prev.quantity-1})} 
                            sx={{border:'1px solid #ccc',fontSize:'14px'}}><AiOutlineMinus/></IconButton>
                        <span style={{margin:'0px 5px', padding:'0px 15px',backgroundColor:'white'}}>{itemToCart?.quantity}</span>
                        <IconButton onClick={()=>setItemToCart(prev=>({...prev,quantity:prev.quantity+1}))} 
                            sx={{border:'1px solid #ccc',fontSize:'14px'}}><AiOutlinePlus/></IconButton>
                    </Box>
                    <Box pb='10px' borderBottom='1px dotted #ccc'>
                        <ButtonCS 
                            onClick={()=>onAddToCart()}>
                            Thêm vào giỏ hàng
                        </ButtonCS>
                        <ButtonCS onClick={()=>{onAddToCart(true)}}>Mua ngay</ButtonCS>
                    </Box>
                </Grid2>
            </Grid2>
        </Container>
        
    )
}
export default Modal;

const ThumImg=styled('img')(({isBorder})=>({
    height:'45px',
    width: '45px',
    objectFit:'cover',
    border: isBorder? '1px solid red': 'none',
    borderRadius :'3px',
    ' :hover': {
        transform: 'scale(0.95)',
        border: '1px groove red',
    }
}));
const ButtonCS  = styled(Button)({
    backgroundColor:'#fff2e7',
    fontFamily:'inherit',
    textTransform:'initial',
    color:'#ff0000',
    marginRight:'10px',
    border:'2px solid #fd8b72',
    marginTop:'5px'
});
const ImgTarget = styled('img')(({numberScale,numberOffset })=>({
    height:'450px',
    width:'100%',
    borderRadius:'2vmin',
    cursor:'zoom-in',
    transformOrigin:`${numberOffset.left!==0||numberOffset.top!==0? `${numberOffset.left}px ${numberOffset.top}px`: 'center center'}`,
    transform:`scale(${numberScale})`,
}))
const TooltipCS = styled(({className,...props})=>(
    <Tooltip {...props} componentsProps={{tooltip: {className:className}}}/>))(`
    font-family: inherit;
    color: red;
    font-size:13px;
    font-weight:600;
    background-color: #eee
`)
