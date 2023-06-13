import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Skeleton , { SkeletonTheme }from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonItem = ()=>{
    return(
        <SkeletonTheme baseColor="#ccc" borderRadius='2vmin' highlightColor="#ffaacb">
            <Grid2 p='0 2vw' container>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
                <Grid2 p='10px 1.5vw' xs={12} sm={6} lg={3} md={4}>
                    <Skeleton height='250px' width='100%' />
                    <Skeleton count={2} height={20}  width='100%'/>
                </Grid2>
            </Grid2>
        </SkeletonTheme>
    )
}
export default SkeletonItem;