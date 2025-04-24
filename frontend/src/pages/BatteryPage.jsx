import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container, 
  Paper,
  CardMedia,
  Chip,
  CircularProgress,
  useTheme,
  Fade,
  Slide,
  Divider,
  IconButton,
  Tooltip,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Import MUI icons
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

// Assuming you have these images in your assets folder
import batteryImg from "/src/assets/battery.webp";
import batteryInstallImg from "/src/assets/battery-install.webp"; // You'll need to add this
import batteryTechImg from "/src/assets/battery-tech.webp"; // You'll need to add this

// Custom styled components with MUI
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #8243F0 90%)`,
  border: 0,
  color: 'white',
  padding: '12px 30px',
  boxShadow: '0 3px 5px 2px rgba(130, 67, 240, .3)',
  borderRadius: 50,
  fontWeight: 'bold',
  '&:hover': {
    boxShadow: '0 6px 10px 4px rgba(130, 67, 240, .3)',
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

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  height: '100%',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)' 
    : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
  boxShadow: theme.shadows[3],
}));

const BatterySpec = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(50, 50, 50, 0.5)' 
    : 'rgba(240, 240, 240, 0.8)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const ContactInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
  },
}));

const BatteryPage = () => {
  const theme = useTheme();
  const [activeModel, setActiveModel] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const contactFormRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form or show success message
    alert("Thank you for your inquiry! We'll contact you shortly.");
  };
  
  // Scroll to contact form
  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Battery models
  const batteryModels = [
    {
      name: "PowerWall Ultra",
      capacity: "15 kWh",
      power: "7.5 kW",
      efficiency: "95%",
      lifespan: "15 years",
      warranty: "10 years",
      features: ["Backup power for essential circuits", "Intelligent energy management", "Mobile app control", "Compatibility with existing solar"],
      image: batteryImg,
      price: "$8,999"
    },
    {
      name: "PowerWall Pro",
      capacity: "10 kWh",
      power: "5 kW",
      efficiency: "92%",
      lifespan: "12 years",
      warranty: "8 years",
      features: ["Compact design", "Scalable capacity", "Silent operation", "Advanced thermal management"],
      image: batteryTechImg,
      price: "$6,499"
    },
    {
      name: "PowerWall Standard",
      capacity: "7 kWh",
      power: "3.5 kW",
      efficiency: "90%",
      lifespan: "10 years",
      warranty: "5 years",
      features: ["Budget-friendly", "Easy installation", "Low maintenance", "Weather-resistant enclosure"],
      image: batteryInstallImg,
      price: "$4,999"
    }
  ];
  
  // Counter animation for stats
  const [counters, setCounters] = useState({ installations: 0, savings: 0, hours: 0 });
  const targetCounters = { installations: 2500, savings: 35, hours: 10000 };
  
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(${batteryImg})`,
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
                Advanced Battery Solutions
              </Typography>
              
              <Typography 
                variant="h5" 
                color="white" 
                sx={{ mb: 4, maxWidth: '600px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Store power for when you need it most with our reliable, high-performance battery systems.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                <GradientButton 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowRightAltIcon />}
                  onClick={scrollToContact}
                >
                  Get Free Consultation
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
      
      {/* Why Choose Our Batteries Section */}
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
            Benefits of Our Solutions
          </Typography>
          
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            Why Choose Our Battery Systems?
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Our battery solutions provide reliable power backup, optimize energy consumption, and help you save money while protecting the environment.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[
            { 
              title: "Energy Independence", 
              desc: "Reduce reliance on the grid and protect against outages and price fluctuations.", 
              icon: <BatteryChargingFullIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            },
            { 
              title: "Cost Savings", 
              desc: "Store energy when rates are low and use it during peak hours to reduce utility bills.", 
              icon: <ElectricBoltIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
            },
            { 
              title: "Long Lifespan", 
              desc: "High-cycle lithium batteries with extended durability for years of reliable service.", 
              icon: <AccessTimeIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
            },
            { 
              title: "Smart Integration", 
              desc: "Seamlessly connects with solar systems and smart home devices for optimal performance.", 
              icon: <SettingsIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Powering Homes & Businesses
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                Our battery systems are trusted by thousands of homeowners and businesses nationwide to provide reliable backup power and energy management.
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                  Premium lithium-ion technology
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                  Intelligent energy management
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                  Professional installation
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                  Comprehensive warranty
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoCard>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <BatteryChargingFullIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {counters.installations.toLocaleString()}+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Battery Systems Installed
                      </Typography>
                    </Box>
                  </InfoCard>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <InfoCard>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <ElectricBoltIcon sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {counters.savings}%
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Average Energy Bill Savings
                      </Typography>
                    </Box>
                  </InfoCard>
                </Grid>
                
                <Grid item xs={12}>
                  <InfoCard>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <AccessTimeIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 2 }} />
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {counters.hours.toLocaleString()}+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Hours of Backup Power Provided
                      </Typography>
                    </Box>
                  </InfoCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
      {/* How It Works Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f5f8fa', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            How Battery Storage Works
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
            Our advanced battery systems provide reliable power whenever you need it, seamlessly integrating with your existing infrastructure.
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${batteryTechImg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Fade in={true}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main, 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold'
                      }}>
                        1
                      </Box>
                      Store Energy
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                      Our battery system stores excess energy from your solar panels or during off-peak grid hours.
                    </Typography>
                  </Box>
                </Fade>
                
                <Fade in={true} style={{ transitionDelay: '200ms' }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main, 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold'
                      }}>
                        2
                      </Box>
                      Intelligent Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                      Smart software optimizes when to store and when to use energy based on your usage patterns and utility rates.
                    </Typography>
                  </Box>
                </Fade>
                
                <Fade in={true} style={{ transitionDelay: '400ms' }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main, 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold'
                      }}>
                        3
                      </Box>
                      Power When Needed
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                      During power outages or peak rate periods, your battery automatically provides clean, reliable electricity.
                    </Typography>
                  </Box>
                </Fade>
                
                <Fade in={true} style={{ transitionDelay: '600ms' }}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main, 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold'
                      }}>
                        4
                      </Box>
                      Monitor & Control
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
                      Track performance and control your system from anywhere using our intuitive mobile app.
                    </Typography>
                  </Box>
                </Fade>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Applications Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Applications
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}>
          Our battery systems are designed to meet a wide range of energy storage needs, from residential backup to commercial applications.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Fade in={true}>
              <Card sx={{ 
                borderRadius: 2, 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[10],
                }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={batteryImg}
                    alt="Residential Battery Application"
                    height="240"
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    bgcolor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    bgcolor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3
                  }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <HomeIcon sx={{ fontSize: 50, color: 'white', mb: 2 }} />
                    <Typography variant="h4" fontWeight="bold" color="white">
                      Residential
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" paragraph>
                  Perfect for homeowners looking to reduce electricity bills, provide backup power during outages, and maximize self-consumption of solar energy.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="Backup Power" size="small" />
                  <Chip label="Peak Shaving" size="small" />
                  <Chip label="Solar Integration" size="small" />
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>

              </Box>
            </Card>
          </Fade>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <Card sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: theme.shadows[10],
              }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={batteryTechImg}
                  alt="Commercial Battery Application"
                  height="240"
                />
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  bgcolor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BusinessIcon sx={{ fontSize: 50, color: 'white', mb: 2 }} />
                    <Typography variant="h4" fontWeight="bold" color="white">
                      Commercial
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" paragraph>
                  Designed for businesses seeking to reduce demand charges, ensure operational continuity, and achieve sustainability goals with clean energy solutions.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="Demand Charge Reduction" size="small" />
                  <Chip label="Business Continuity" size="small" />
                  <Chip label="Grid Services" size="small" />
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
              </Box>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Container>
    
    {/* Contact Section */}
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }} ref={contactFormRef}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Get Started?
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Contact us today for a free consultation and custom quote for your battery storage needs.
          </Typography>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HomeIcon color="primary" sx={{ mr: 2 }} />
              Peerzadiguda, Hyderabad, Telangana, India
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon color="primary" sx={{ mr: 2 }} />
              9246344969
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon color="primary" sx={{ mr: 2 }} />
              ups.pvr@gmail.com
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Business Hours
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body2">Monday - Sunday:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">9:00 AM - 8:00 PM</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            boxShadow: theme.shadows[3],
            height: '100%'
          }}>
          </Card>
        </Grid>
      </Grid>
    </Container>
    
    {/* Footer */}
    <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'primary.main', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are committed to providing innovative energy storage solutions that enhance energy independence and sustainability for homes and businesses.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Products
            </Typography>
            <Typography variant="body2" component="div">
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>Amaron</Box>
                <Box component="li" sx={{ mb: 1 }}>Exide</Box>
                <Box component="li" sx={{ mb: 1 }}>Luminous</Box>
              </Box>
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2" component="div">
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>Installation Guide</Box>
                <Box component="li" sx={{ mb: 1 }}>FAQs</Box>
                <Box component="li" sx={{ mb: 1 }}>Support</Box>
              </Box>
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
            © {new Date().getFullYear()} Battery Solutions. All rights reserved.
          </Typography>
          <Box>
            <Typography variant="body2" component="span" sx={{ mx: 1 }}>Privacy Policy</Typography>
            <Typography variant="body2" component="span" sx={{ mx: 1 }}>Terms of Service</Typography>
            <Typography variant="body2" component="span" sx={{ mx: 1 }}>Sitemap</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  </Box>
  );
};

export default BatteryPage;