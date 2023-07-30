import React from 'react'
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material'
import Form from './Form'
const Login = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      {/* <Box
        padding="1rem 6%"
        backgroundColor={theme.palette.background.alt}
        width="100%"
        textAlign="center"
      >
      </Box> */}
      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant='h5' sx={{mb: "1.5rem"}}>
          Welcome To The Muzik Club, Please Login
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default Login