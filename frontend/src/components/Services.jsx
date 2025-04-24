import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Chip,
  useTheme,
  alpha,
  Grow
} from '@mui/material';
import { 
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Engineering as EngineeringIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';

const homesImg = "/src/assets/homes.jpg";
const commercialsImg = "/src/assets/commercials.jpg";
const industrialImg = "/src/assets/industrial.jpg";

const ServiceCard = ({ image, title, icon, description, features }) => {
  const theme = useTheme();
  const [elevated, setElevated] = useState(false);
  
  return (
    <Grow in={true} timeout={800}>
      <Card 
        elevation={elevated ? 8 : 4}
        onMouseEnter={() => setElevated(true)}
        onMouseLeave={() => setElevated(false)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{
              transition: 'transform 0.6s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              p: 1,
            }}
          >
            <Typography variant="h6" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {icon}
              {title}
            </Typography>
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
          
          <Box sx={{ mt: 2, mb: 3, flexGrow: 1 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

const Services = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const services = [
    {
      id: 'residential',
      title: 'RESIDENTIAL',
      icon: <HomeIcon />,
      image: homesImg,
      description: 'Custom home building solutions tailored to your lifestyle and preferences. From luxury villas to efficient apartments.',
      features: [
        'Custom Home Design',
        'Renovations & Remodeling',
        'Interior Design',
        'Energy-Efficient Solutions',
        'Project Management'
      ]
    },
    {
      id: 'commercial',
      title: 'COMMERCIAL',
      icon: <ApartmentIcon />,
      image: commercialsImg,
      description: 'Professional commercial construction services delivering functional and attractive spaces for businesses of all sizes.',
      features: [
        'Office Buildings',
        'Retail Spaces',
        'Restaurants & Hotels',
        'Healthcare Facilities',
        'Turnkey Solutions'
      ]
    },
  ];

  return (
    <Box 
      sx={{ 
        py: 8, 
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.background.default, 0.4)})`
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip 
            label="OUR EXPERTISE" 
            color="primary" 
            sx={{ mb: 2 }} 
          />
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="bold" 
            gutterBottom
          >
            Our Services
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Comprehensive construction solutions tailored to meet your specific needs.
            Every project is executed with precision, quality materials, and exceptional craftsmanship.
          </Typography>
        </Box>
        
        <Paper
          elevation={0}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 4, 
            bgcolor: 'transparent' 
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="service categories"
          >
            <Tab icon={<HomeIcon />} iconPosition="start" label="Residential" />
            <Tab icon={<ApartmentIcon />} iconPosition="start" label="Commercial" />
          </Tabs>
        </Paper>
        
        <Grid container spacing={4} justifyContent="center">
  {services.map((service, index) => (
    <Grid item xs={12} md={4} key={service.id}>
      <ServiceCard 
        title={service.title}
        icon={service.icon}
        image={service.image}
        description={service.description}
        features={service.features}
      />
    </Grid>
  ))}
</Grid>

      </Container>
    </Box>
  );
};

export default Services;