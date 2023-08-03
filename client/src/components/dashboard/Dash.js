import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import UserWidget from './UserWidget';
import { useSelector , useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { setEvents } from '../../state';
import SlotsWidget from './SlotsWidget';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import { setLogin } from '../../state';

const Dash = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const navigate = useNavigate();

  const refresh = async () => {
    const response = await fetch('http://localhost:3500/refresh', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setLogin({
        token: data.accessToken
      }));
    }
    else {
      navigate('/login');
    }
  }

  const getEvents = async () => { 
    const response = await fetch('http://localhost:3500/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})

      const events = await response.json();
      if (response.ok) {
        dispatch(setEvents(events));
      }
      else {
        console.log(events);
      }
  }
  useEffect(() => {
    if(!token) {
      refresh();
    }

    else getEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const user = useSelector(state => state.user);
  return (
    <>
      <Box
      width='100%'
      padding='2rem 6%'
      gap='0.5rem'
      justifyContent='space-between'
      display={isNonMobile ? "flex" : "block"}
    >
      <Box flexBasis={isNonMobile ? "26%" : undefined}>
        {user.email!==undefined?<UserWidget email = {user.email} /> : null}
      </Box>   
        {isNonMobile && (
          <Box flexBasis="26%">
          </Box>)}  
      </Box>
      <Box
      width='100%'
      padding='2rem 6%'
      gap='0.5rem'
      justifyContent='space-between'
      display={isNonMobile ? "flex" : "block"}
    >
      <Box flexBasis={isNonMobile ? "26%" : undefined}>
        <SlotsWidget userId = {user._id}/>
      </Box>   
        {isNonMobile && (
          <Box flexBasis="26%">
          </Box>)}  
      </Box>
    </>
  )
}

export default Dash