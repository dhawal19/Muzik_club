import {CircularProgress} from '@mui/material'

import { Box, Typography, Divider, useTheme  } from '@mui/material'
import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'  
import { useEffect, useState } from 'react'

const SlotWidget = ({slots}) => {

    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;



    if(!slots) return <CircularProgress />;


    return (
        <WidgetWrapper>
            {/* first row */}
            <FlexBetween 
                gap="0.5rem"
               
            >
                <FlexBetween gap="0.25rem">
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}>
                            My Slots
                            </Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>

                {/* second row */}
               
                <Box p='1rem 0'>
                
                    {slots.map((slot, index)=>(<>
                        <FlexBetween gap='2rem' pt='0.5rem'>
                            <Typography color = {medium}>Performance: </Typography>
                            <Typography color = {main} fontWeight='500'>
                                {slot.performanceName}
                            </Typography>
                        </FlexBetween> 
                        <FlexBetween gap='2rem' pb='0.5rem'>  
                            <Typography color = {medium}>Timing: </Typography>
                            <Typography color = {main} fontWeight='500' justifyContent="flex-end">
                                {slot.time}
                            </Typography>
                        </FlexBetween>  
                        <Divider /> 
                        </>
                    ))}

                </Box>

                {/* fourth row */}
                {/* <Box p='1rem 0'>
                   

                    <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem'>
                            <Box>
                                <Typography color = {medium} >Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                    </FlexBetween>
                </Box> */}
        </WidgetWrapper>
    )
}


export default SlotWidget;