import React from "react";
import { Box, useTheme, useMediaQuery, Typography, Grid } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import SlidingCarousel from './SlidingCarousel.js'

const images = [
  {
    src: "/client/src/assets/club.jpg",
    caption: "Image 1",
  },
  {
    src: "/client/src/assets/club.jpg",
    caption: "Image 2",
  },
];

function ImageCarousel(props) {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Item key={index} image={image} />
      ))}
    </Carousel>
  );
}

function Item({ image }) {
  return (
    <Paper>
      <img src={image.src} alt={image.caption} />
    </Paper>
  );
}

const Home = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <main style={{ color: theme.palette.primary.main}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{ border: "1px solid #ccc", borderRadius: 8, padding: "10px" }}
          >
            <ImageCarousel array="images" />
          </Box>
        </Grid>
        <Grid item xs={6}> 
          <Box style={{ margin: "15px" }}>
            <Typography variant="h1">Music Club</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
              netus et malesuada fames ac. Auctor urna nunc id cursus. Diam quis
              enim lobortis scelerisque fermentum dui faucibus. Posuere ac ut
              consequat semper viverra. Suspendisse sed nisi lacus sed viverra
              tellus in hac habitasse. Diam sollicitudin tempor id eu nisl nunc
              mi. A arcu cursus vitae congue mauris rhoncus. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Fames ac turpis
              egestas sed. Vulputate sapien nec sagittis aliquam malesuada
              bibendum arcu vitae. Bibendum enim facilisis gravida neque.
              Vestibulum mattis ullamcorper velit sed ullamcorper morbi
              tincidunt ornare massa.
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <SlidingCarousel />
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
