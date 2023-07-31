import React from 'react';
import { Typography, Box } from '@mui/material/';
import { useTheme } from '@emotion/react';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  return (
    <footer className='footer'>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="body1">
            Connect with us on social media!
          </Typography>
          <Box sx ={{display : "flex", flexDirection : "row", mb:"5px"}}>
              <InstagramIcon sx={{ color: dark, cursor: 'pointer', mr: "10px"}} onClick={event => window.location.href = 'https://www.instagram.com/pecmusicclub/'} />
              <YouTubeIcon sx={{ color: dark, cursor: 'pointer', mr: "10px", ml:"10px"}} onClick={event => window.location.href = 'https://www.youtube.com/@musicclub-pec3032'} />
              <EmailIcon sx={{ color: dark, cursor: 'pointer', ml : "10px" }} onClick={event => window.location.href = 'mailto:pecmuzik@gmail.com'} />
          </Box>
          <Typography variant="body2">
            © {new Date().getFullYear()} Music Club. All rights reserved.
          </Typography>
        </Box>
    </footer>
  );
};

export default Footer;
