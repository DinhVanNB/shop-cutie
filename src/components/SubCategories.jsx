import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSubCategories } from "../redux/subCategoriesSlice";
import query from "../api/query";

const SubCategories = ({category})=>{
    const dispatch = useDispatch();
    const {subCategories} = useSelector(state=>state.subCategory);
    useEffect(()=>{
        (async()=>{
            const {data} = await query.get(`/sub-categories?populate=*`);
            dispatch(fetchSubCategories(data));
        })()
    },[subCategories?.data?.length])
    
    return (
        <Box display='flex' flexDirection='column'>
          {subCategories?.data?.map(subcategory=>{
                if(subcategory.attributes.categories.data[0].attributes.name===category){
                    return  <LinkStyled to={`/1/${subcategory.attributes.name}/${subcategory.id}?page=1`} key={subcategory.id}>
                                {subcategory.attributes.name}
                            </LinkStyled>
                }
                    return null
                }
            )}
        </Box>    
    )
}
export default SubCategories;

const LinkStyled = styled(Link)({
    textDecoration: 'none',
    color: 'black',
    cursor:'pointer',
    padding: '5px',
    fontSize:'14px',
    ':hover': {
        textDecoration: 'underline',
        color:'#ff6a80',
        backgroundColor:'#eee',
        fontWeight:'600',
    }
})

