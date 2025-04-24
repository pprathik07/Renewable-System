import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Container,
  Grow 
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import batteryImg from "/src/assets/battery.webp";
import solarImg from "/src/assets/solar.webp";

const slides = [
  {
    img: solarImg,
    text: "Explore Solar Options",
    intro: "Harness the power of the sun with our cutting-edge solar solutions. Save energy and reduce costs.",
    link: "/solar",
    color: "#f9a825" // Solar yellow theme
  },
  {
    img: batteryImg,
    text: "Explore Batteries",
    intro: "Reliable and long-lasting battery storage solutions for your home and business needs.",
    link: "/battery",
    color: "#43a047" // Battery green theme
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ 
      width: "100%", 
      height: "90vh", 
      overflow: "hidden",
      position: "relative"
    }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false
        }}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        effect="fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                textAlign: "center",
                color: "white",
                transition: "all 0.5s ease-in-out",
              }}
            >
              {/* Enhanced Dark Overlay with gradient */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), 
                               radial-gradient(circle at 50% 50%, rgba(${slide.color === "#f9a825" ? "249, 168, 37" : "67, 160, 71"}, 0.1), 
                               rgba(0, 0, 0, 0.5))`,
                  zIndex: 1,
                }}
              />

              {/* Text & Button Content */}
              <Container maxWidth="md" sx={{ 
                zIndex: 2, 
                px: isMobile ? 2 : 4,
                transform: activeIndex === index ? "translateY(0)" : "translateY(20px)",
                opacity: activeIndex === index ? 1 : 0,
                transition: "all 0.8s ease-in-out",
              }}>
                <Grow in={activeIndex === index} timeout={800}>
                  <Typography 
                    variant={isMobile ? "h4" : "h2"} 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      mb: 2,
                      letterSpacing: "0.5px"
                    }}
                  >
                    {slide.text}
                  </Typography>
                </Grow>
                
                <Grow in={activeIndex === index} timeout={1000}>
                  <Typography 
                    variant={isMobile ? "body1" : "h6"} 
                    mb={4}
                    sx={{
                      maxWidth: "80%",
                      mx: "auto",
                      lineHeight: 1.6,
                      textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.intro}
                  </Typography>
                </Grow>
                
                <Grow in={activeIndex === index} timeout={1200}>
                  <Box>
                    <Button
                      variant="contained"
                      size={isMobile ? "medium" : "large"}
                      sx={{
                        backgroundColor: slide.color,
                        "&:hover": { 
                          backgroundColor: theme.palette.mode === 'light' 
                            ? alpha(slide.color, 0.8)
                            : alpha(slide.color, 1.2),
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[8],
                        },
                        padding: isMobile ? "8px 16px" : "12px 28px",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "bold",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        textTransform: "capitalize",
                        boxShadow: theme.shadows[4],
                      }}
                      onClick={() => navigate(slide.link)}
                    >
                      {slide.text}
                    </Button>
                  </Box>
                </Grow>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Indicator */}
      <Box 
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: activeIndex === index ? 30 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: activeIndex === index ? slides[index].color : "rgba(255,255,255,0.5)",
              margin: "0 5px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;