// import { Button } from "@mui/material";
// import { useState } from "react";
import { Carousel, Products} from "../components";
// import Test from "../components/Test";

const Home =()=>{
    // const [show, setShow]= useState(true)
    return (
        <>
            {/* {show && <Test />}
            <Button onClick={()=>setShow(prev=>!prev)}>Toggle Form</Button> */}
            <Carousel/>
            <Products type='Trending'/>
            <Products type='Best sell'/>
        </>
    )
}
export default Home;