import React, { useState, useEffect } from "react";
import { 
  Button, 
  Typography, 
  Box, 
  Container, 
  Grid, 
  Paper, 
  IconButton, 
  Fade, 
  Slide,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CallIcon from "@mui/icons-material/Call";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SavingsIcon from "@mui/icons-material/Savings";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated stats data
  const stats = [
    { icon: <WbSunnyIcon fontSize="large" />, value: "10k+", label: "Solar Installations" },
    { icon: <BatteryChargingFullIcon fontSize="large" />, value: "98%", label: "Energy Efficiency" },
    { icon: <SavingsIcon fontSize="large" />, value: "30%", label: "Avg. Savings" }
  ];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/src/assets/homes.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1
        }
      }}
    >
      {/* Floating particles effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          opacity: 0.4,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />
      
      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 3
        }}
      >
        <Fade in={isLoaded} timeout={1000}>
          <Box textAlign="center" maxWidth="md">
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              color="white"
              sx={{
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                mb: 2
              }}
            >
              The <Box component="span" sx={{ color: "#4caf50" }}>Future</Box> of <br />
              <Box component="span" sx={{ fontWeight: 800 }}>Renewable Energy</Box> is Here.
            </Typography>
            
            <Typography 
              variant="h6" 
              color="white" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                textShadow: "1px 1px 3px rgba(0,0,0,0.3)" 
              }}
            >
              Experience the next-gen solar and battery solutions for your home & business.
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button 
                  component={Link} 
                  to="/services" 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                      transition: "all 0.3s ease"
                    }
                  }}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  component={Link} 
                  to="/calculator" 
                  variant="outlined" 
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)"
                    }
                  }}
                >
                  Calculate Savings
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Stats section */}
        <Slide direction="up" in={isLoaded} timeout={1200}>
          <Paper
            elevation={10}
            sx={{
              mt: 6,
              p: 3,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              display: { xs: "none", md: "block" }
            }}
          >
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item key={index} xs={12} sm={4} textAlign="center">
                  <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="p" fontWeight={700} color="text.primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Slide>

        {/* Scroll down indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0) translateX(-50%)" },
              "40%": { transform: "translateY(-20px) translateX(-50%)" },
              "60%": { transform: "translateY(-10px) translateX(-50%)" }
            },
            display: scrolled ? "none" : "block"
          }}
        >
          <IconButton
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.2)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Container>

      {/* Floating contact button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10
        }}
      >
        <Button
          component={Link}
          to="/contact"
          variant="contained"
          color="primary"
          startIcon={<CallIcon />}
          sx={{
            borderRadius: 8,
            px: 3,
            py: 1.5,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "transform 0.3s ease"
            }
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;