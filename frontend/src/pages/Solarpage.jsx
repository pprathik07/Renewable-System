import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container, 
  Divider, 
  IconButton, 
  useMediaQuery, 
  Tabs, 
  Tab, 
  Avatar, 
  Paper, 
  CardMedia, 
  Chip,
  CircularProgress,
  useTheme,
  Fade,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Import MUI icons instead of Lucide
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import NatureIcon from '@mui/icons-material/Nature';
import PieChartIcon from '@mui/icons-material/PieChart';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

// Assuming you have these images in your assets folder
import solarImg from "/src/assets/solar.webp";
import teamImg from "/src/assets/team.webp";
import installationImg from "/src/assets/installation.webp";

// Custom styled components with MUI
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  border: 0,
  color: 'white',
  padding: '12px 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  borderRadius: 50,
  fontWeight: 'bold',
  '&:hover': {
    boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
    transform: 'translateY(-2px)',
    transition: 'all 0.3s'
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
}));

const StatsCounter = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #111111 0%, #333333 100%)' 
    : 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&::before': {
    content: '"""',
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(2),
    fontSize: '4rem',
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    fontFamily: 'Georgia, serif',
    lineHeight: 0.8,
  }
}));

const ProductTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  minHeight: 64,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  }
}));

const ContactFormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SolarPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);
  const contactRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Counter animation for stats
  const [counters, setCounters] = useState({ installations: 0, savings: 0, carbon: 0 });
  const targetCounters = { installations: 5000, savings: 40, carbon: 25000 };
  const [statsVisible, setStatsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (statsVisible) {
      const interval = setInterval(() => {
        setCounters(prev => {
          const newCounters = { ...prev };
          let completed = true;
          
          Object.keys(targetCounters).forEach(key => {
            if (prev[key] < targetCounters[key]) {
              newCounters[key] = Math.min(
                prev[key] + Math.ceil(targetCounters[key] / 50),
                targetCounters[key]
              );
              completed = false;
            }
          });
          
          if (completed) clearInterval(interval);
          return newCounters;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [statsVisible]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Testimonial data
  const testimonials = [
    {
      name: "Michael Chen",
      position: "Homeowner",
      quote: "After installing solar panels, my electricity bill dropped by 85%. The team provided exceptional service from consultation to installation.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Sarah Johnson",
      position: "Business Owner",
      quote: "Converting our warehouse to solar power was the best decision we made. The ROI was realized within just 3 years.",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "David Patel",
      position: "School Administrator",
      quote: "Our school campus is now 100% solar powered thanks to this amazing team. Students love learning about renewable energy with our live monitoring system.",
      image: "https://i.pravatar.cc/150?img=13"
    }
  ];
  
  // Product options
  const productOptions = [
    {
      title: "Residential",
      icon: <HomeIcon fontSize="large" color="primary" />,
      features: ["5-15kW systems", "Roof or ground mounted", "Battery backup options", "Smart home integration"],
      description: "Perfect for homes looking to reduce electricity costs and increase property value."
    },
    {
      title: "Commercial",
      icon: <BusinessIcon fontSize="large" color="primary" />,
      features: ["25-500kW systems", "Flat roof optimization", "Energy management software", "Tax incentive guidance"],
      description: "Designed for businesses ready to reduce overhead and demonstrate environmental leadership."
    },
    {
      title: "Industrial",
      icon: <ApartmentIcon fontSize="large" color="primary" />,
      features: ["500kW+ systems", "Custom engineering", "Microgrid capabilities", "Full monitoring suite"],
      description: "Large-scale solutions for manufacturing facilities and industrial complexes."
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally handle the actual form submission to your backend
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      message: ''
    });
    
    // Reset notification after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${solarImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Slide direction="up" in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold" 
                color="white"
                sx={{ mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              >
                Revolutionary Solar Solutions
              </Typography>
              
              <Typography 
                variant="h5" 
                color="white" 
                sx={{ mb: 4, maxWidth: '600px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Harness the sun's power with cutting-edge technology designed for reliability, efficiency, and sustainability.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                <GradientButton 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowRightAltIcon />}
                  onClick={scrollToContact}
                >
                  Get free consultation
                </GradientButton>
              </Box>
            </Box>
          </Slide>
        </Container>
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: theme.spacing(4),
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateX(-50%) translateY(0)'
              },
              '40%': {
                transform: 'translateX(-50%) translateY(-10px)'
              },
              '60%': {
                transform: 'translateX(-50%) translateY(-5px)'
              }
            }
          }}
        >
          <IconButton sx={{ color: 'white', border: '2px solid white' }}>
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            component="span" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 'bold',
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              display: 'block',
              mb: 1
            }}
          >
            Why Choose Solar
          </Typography>
          
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            Benefits of Going Solar
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Investing in solar energy does more than reduce utility bills. It's a commitment to sustainable living and energy independence.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[
            { 
              title: "Lower Energy Bills", 
              desc: "Reduce or eliminate your electric bills with energy from the sun.", 
              icon: <SolarPowerIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            },
            { 
              title: "Energy Independence", 
              desc: "Protect yourself from rising energy costs and power outages.", 
              icon: <BatteryChargingFullIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
            },
            { 
              title: "Eco-Friendly", 
              desc: "Reduce your carbon footprint and contribute to a cleaner planet.", 
              icon: <NatureIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
            },
            { 
              title: "Increase Property Value", 
              desc: "Homes with solar installations sell for more and faster.", 
              icon: <PieChartIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
            }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} style={{ transitionDelay: `${200 * index}ms` }}>
                <FeatureCard>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Stats Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f5f8fa', py: { xs: 6, md: 10 } }} ref={statsRef}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            Our Impact
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
            We're proud of the difference we're making for our customers and the environment through renewable energy solutions.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StatsCounter>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={statsVisible ? 100 : 0} 
                      size={80} 
                      thickness={4} 
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SolarPowerIcon color="primary" />
                    </Box>
                  </Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {counters.installations.toLocaleString()}+
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Installations Completed
                  </Typography>
                </Box>
              </StatsCounter>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <StatsCounter>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={statsVisible ? 100 : 0} 
                      size={80} 
                      thickness={4}
                      sx={{ color: theme.palette.secondary.main }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PieChartIcon color="secondary" />
                    </Box>
                  </Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {counters.savings}%
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Average Energy Savings
                  </Typography>
                </Box>
              </StatsCounter>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <StatsCounter>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={statsVisible ? 100 : 0} 
                      size={80} 
                      thickness={4}
                      sx={{ color: theme.palette.success.main }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <NatureIcon color="success" />
                    </Box>
                  </Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {counters.carbon.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Tons of CO² Offset
                  </Typography>
                </Box>
              </StatsCounter>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Product Solutions Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Our Solutions
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
          We offer customized solar energy solutions for every need, from residential homes to large industrial facilities.
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            {productOptions.map((option, index) => (
              <ProductTab 
                key={index} 
                label={option.title} 
                icon={option.icon} 
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>
        
        {productOptions.map((option, index) => (
          <Fade in={activeTab === index} key={index}>
            <div style={{ display: activeTab === index ? 'block' : 'none' }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom fontWeight="medium">
                    {option.title} Solar Solutions
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {option.description}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {option.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={5} sx={{ overflow: 'hidden', borderRadius: 2, height: '100%', minHeight: '300px' }}>
                    <CardMedia
                      component="img"
                      image={index === 0 ? solarImg : (index === 1 ? teamImg : installationImg)}
                      alt={option.title}
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Fade>
        ))}
      </Container>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: { xs: 6, md: 10 },
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${installationImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Harness the Power of the Sun?
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Get a free consultation and estimate for your property. Our experts will help you design the perfect solar solution.
          </Typography>
          
          <GradientButton 
            variant="contained" 
            size="large" 
            endIcon={<ArrowRightAltIcon />}
            onClick={scrollToContact}
          >
            Contact Us Now
          </GradientButton>
        </Container>
      </Box>
      
      {/* Contact Section */}
      <Box 
        ref={contactRef} 
        id="contact"
        sx={{ 
          py: { xs: 6, md: 10 },
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f5f8fa',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
            Ready to start your solar journey? Fill out the form below for a free consultation and one of our experts will get back to you within 24 hours.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Get In Touch
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      Peerzadiguda, Hyderebad, Telangana, India
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      ups.pvr@gmail.com
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      9246344969
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Business Hours
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Monday - Sunday:</Typography>
                  <Typography variant="body1">9:00 AM - 8.00 PM</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>  
      </Box>
      
      {/* Footer Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#1a1a1a', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Solar Solutions
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Leading the way in sustainable energy solutions since 2005. We're committed to a greener future through innovative solar technology.
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              © {new Date().getFullYear()} Solar Solutions. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Add social media icons here if needed */}
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Notification */}
      <Snackbar open={formSubmitted} autoHideDuration={5000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Your request has been submitted! We'll contact you shortly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SolarPage;