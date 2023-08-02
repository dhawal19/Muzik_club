import {
    EditOutlined,
} from '@mui/icons-material'

import {CircularProgress} from '@mui/material'

import { Box, Typography, Divider, useTheme  } from '@mui/material'
import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'  
import { useEffect, useState } from 'react'

const UserWidget = ({email}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {palette} = useTheme();
    const token = useSelector(state => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3500/userinfo/${email}`, { // TODO: change to /userinfo/:id
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
       
        getUser();
        
        setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!user) return <CircularProgress />;

    const {Name, SID, Roles} = user;

    return (
        <WidgetWrapper>
            {/* first row */}
            <FlexBetween 
                gap="0.5rem"
                pb='1.1rem'
                onClick = {() => navigate(`/dash`)}
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
                            {Name}
                            </Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>

                {/* second row */}
               
                <Box p='1rem 0'>

                    <FlexBetween>
                        <Typography color = {medium}>SID</Typography>
                        <Typography color = {main} fontWeight='500'>
                            {SID}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color = {medium}>Role</Typography>
                        <Typography color = {main} fontWeight='500'>
                            {Roles}
                        </Typography>
                    </FlexBetween>
                </Box>

                <Divider/>
                {/* fourth row */}
                <Box p='1rem 0'>
                   

                    <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem'>
                            <Box>
                               
                            </Box>
                        </FlexBetween>
                    </FlexBetween>
                </Box>
        </WidgetWrapper>
    )
}


export default UserWidget