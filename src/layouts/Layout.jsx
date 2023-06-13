import { Footer, Header, PhoneRingRing } from "../components";
import {Outlet} from 'react-router-dom';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const Layout =()=>{
    const [lastScroolY, setLastScroolY] = useState(0); 
    const [show, setShow] = useState({});
    const controlScroll=()=>{
        window.scrollY>100? window.scrollY> lastScroolY? setShow({display:'none'}):setShow({position:'fixed',display:'block'}):setShow({position:'static',display:'block'});
        setLastScroolY(window.scrollY);
    }
    useEffect(()=>{
        window.addEventListener('scroll', controlScroll);
        return ()=> window.removeEventListener('scroll', controlScroll);
    },[lastScroolY]);

    return(
        <Box >  
            <Header show={show}/>
            <Box mt='20px'>
                <Outlet/>
            </Box>
            <PhoneRingRing/>
            <Footer/>
        </Box>
    )
}
export default Layout;