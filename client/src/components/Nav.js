import React from 'react'
import { useState } from 'react'
import { 
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material'

import {
  DarkMode,
  LightMode,
  Menu,
  Close
} from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import {setMode, setLogout} from '../state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'


const Nav = () => {
  const [isMobileMenuToggeld, setIsMobileMenuToggeld] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const isAuth = Boolean(useSelector(state => state.token));
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primary = theme.palette.primary.light;
  const alt = theme.palette.background.alt;


  const handleAuth = async () => {
    if (isAuth) {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(setLogout());
        window.location.replace("/");
      }
    } else {
      navigate("/login");
    }
  };


  return (
    <FlexBetween padding = "1rem 6%" backgroundColor = {alt}>
      <FlexBetween gap= "1.75rem" >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primary,
            },
          }}
          >Muzik Club
          </Typography>
      </FlexBetween>
      {/** Desktop Nav */}
      {isNonMobile ? (
        <FlexBetween gap="2rem">
          <IconButton onClick = {() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx = {{fontSize: "25px"}}/>
            ) : (
              <LightMode sx = {{color : dark, fontSize: "25px"}}/>
            )}
          </IconButton>
          <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => navigate("/media")}>Media</Button>
          <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => navigate("/media")}>Members</Button>
          <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => {handleAuth()}}>{isAuth?'Logout':'Login'}</Button>
        </FlexBetween>) : 
        (<IconButton 
          onClick={() => setIsMobileMenuToggeld(!isMobileMenuToggeld)}
        >
          <Menu />
        </IconButton>
        )}
      {/** Mobile Nav */}
      {!isNonMobile && isMobileMenuToggeld && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height='100%'
          zIndex='10'
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          >
            {/** Close Button */}
            <Box display="flex" justifyContent="flex-end" p='1rem'>
              <IconButton onClick={() => setIsMobileMenuToggeld(!isMobileMenuToggeld)}>
                <Close />
              </IconButton>
            </Box>

            {/** Menu Items */}
            <FlexBetween 
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton 
              onClick = {() => dispatch(setMode())}
              sx={{fontSize: "25px"}}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx = {{fontSize: "25px"}}/>
                ) : (
                  <LightMode sx = {{color : dark, fontSize: "25px"}}/>
                )}
              </IconButton>
              <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => navigate("/media")}>Media</Button>
              <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => navigate("/media")}>Members</Button>
              <Button variant='contained' sx={{borderRadius: "0.25rem", "&:hover": {backgroundColor: theme.palette.primary.light}}} onClick={() => {handleAuth()}}>{isAuth?'Logout':'Login'}</Button>
          </FlexBetween>
        </Box>
        
      )}
    </FlexBetween>
  )
}

export default Nav;