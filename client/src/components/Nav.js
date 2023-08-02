import React from 'react'
import { useState } from 'react'
import { 
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material'

import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import { unmountComponentAtNode } from 'react-dom'
import {setMode, setLogout} from '../state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'


const Nav = () => {
  const [isMobileMenuToggeld, setIsMobileMenuToggeld] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const isAuth = Boolean(useSelector(state => state.token));
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primary = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = 'user';
  // `${user.firstName} ${user.lastName}`;

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
        unmountComponentAtNode(Dash)
        navigate("/");
        
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
        {/* {isNonMobile && (
          // <FlexBetween backgroundColor = {neutralLight} borderRadius = "9px" gap= "3rem" padding="0.1rem 1.5rem">
          //   <InputBase placeholder="Search..." />
          //   <IconButton>
          //     <Search />
          //   </IconButton>
          // </FlexBetween>
        )} */}
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
          <Button variant='contained' sx={{borderRadius: "0.25rem"}} onClick={() => navigate("/media")}>Media</Button>
          <Button variant='contained' sx={{borderRadius: "0.25rem"}} onClick={() => navigate("/media")}>Members</Button>
          <Button variant='contained' sx={{borderRadius: "0.25rem", '&:hover':{}}} onClick={() => {handleAuth()}}>{isAuth?'Logout':'Login'}</Button>
          {/* <FormControl variant='standard' value = {fullName}>
            <Select 
              value={fullName}
              sx = {{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                '& .MuiSvgIcon-root': {
                  pr: "0.25rem",
                  width: "3rem"
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography> {fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl> */}
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
              <Message sx = {{fontSize: "25px"}}/>
              <Notifications sx = {{fontSize: "25px"}}/>
              <Help sx = {{fontSize: "25px"}}/>
              <FormControl variant='standard' value = {fullName}>
                <Select 
                  value={fullName}
                  sx = {{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    '& .MuiSvgIcon-root': {
                      pr: "0.25rem",
                      width: "3rem"
                    },
                    '& .MuiSelect-select:focus': {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                <MenuItem value={fullName}>
                  <Typography> {fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
              </FormControl>
          </FlexBetween>
        </Box>
        
      )}
    </FlexBetween>
  )
}

export default Nav;