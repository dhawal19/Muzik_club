// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },

  grey2: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },

  primary2:{
    50: "#f2e6ff",
    100: "#e1cafa",
    200: "#bd87fa",
    300: "#924be3",
    400: "#7430c2",
    500: "#5e1bab",
    600: "#3d0e73",
    700: "#290652",
    800: "#1d023b",
    900: "#16012e"
  }
  
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            // primary: {
            //   dark: colorTokens.primary[200],
            //   main: colorTokens.primary[500],
            //   light: colorTokens.primary[800],
            // },
            // neutral: {
            //   dark: colorTokens.grey[100],
            //   main: colorTokens.grey[200],
            //   mediumMain: colorTokens.grey[300],
            //   medium: colorTokens.grey[400],
            //   light: colorTokens.grey[700],
            // },
            // background: {
            //   default: colorTokens.grey[700],
            //   alt: colorTokens.grey[800],
            // },
            primary: {
              dark: colorTokens.primary2[200],
              main: colorTokens.primary2[300],
              light: colorTokens.primary2[200],
            },
            neutral: {
              dark: colorTokens.grey2[100],
              main: colorTokens.grey2[200],
              mediumMain: colorTokens.grey2[300],
              medium: colorTokens.grey2[400],
              light: colorTokens.grey2[700],
            },
            background: {
              default: colorTokens.grey2[700],
              alt: colorTokens.grey2[800],
            },
          }
        : {
            // palette values for light mode
            // primary: {
            //   dark: colorTokens.primary[700],
            //   main: colorTokens.primary[500],
            //   light: colorTokens.primary[50],
            // },
            // neutral: {
            //   dark: colorTokens.grey[700],
            //   main: colorTokens.grey[500],
            //   mediumMain: colorTokens.grey[400],
            //   medium: colorTokens.grey[300],
            //   light: colorTokens.grey[50],
            // },
            // background: {
            //   default: colorTokens.grey[10],
            //   alt: colorTokens.grey[0],
            // },
            primary: {
              dark: colorTokens.primary2[700],
              main: colorTokens.primary2[500],
              light: colorTokens.primary2[400],
            },
            neutral: {
              dark: colorTokens.grey2[700],
              main: colorTokens.grey2[500],
              mediumMain: colorTokens.grey2[400],
              medium: colorTokens.grey2[300],
              light: colorTokens.grey2[200],
            },
            background: {
              default: colorTokens.grey2[10],
              alt: colorTokens.grey2[0],
            },
          }),
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Poppins', 'sans-serif'].join(","),
        fontSize: 14,
      },
    },
  };
};