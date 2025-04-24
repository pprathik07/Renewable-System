import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  Drawer, List, ListItem, ListItemText, Collapse, Fade, 
  Avatar, Badge, Menu, MenuItem, useScrollTrigger, Slide,
  Divider
} from "@mui/material";
import { 
  Menu as MenuIcon, KeyboardArrowDown, Notifications, 
  AccountCircle, ChevronRight, LightMode, DarkMode
} from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme, isDark }) => ({
  backgroundImage: isDark 
    ? "linear-gradient(90deg, #001a24 0%, #003544 100%)"
    : "linear-gradient(90deg, #002b36 0%, #006273 100%)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  transition: "all 0.4s ease",
}));

const NavButton = styled(Button)(({ theme, isDark }) => ({
  color: "white",
  margin: "0 8px",
  fontSize: "0.95rem",
  textTransform: "capitalize",
  padding: "6px 16px",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    bottom: "2px",
    left: "50%",
    background: isDark ? "#80deea" : "#66cfdb",
    transition: "width 0.3s ease, left 0.3s ease",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.08),
    "&:after": { width: "80%", left: "10%" },
  },
}));

const DropdownMenu = styled(Box)(({ theme, isDark }) => ({
  position: "absolute",
  top: "45px",
  backgroundColor: isDark ? "#001a24" : "#002b36",
  minWidth: "200px",
  borderRadius: "8px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  zIndex: 20,
}));

const DropdownItem = styled(MenuItem)(() => ({
  padding: "12px 16px",
  color: "white",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.08),
    color: "#80deea",
  },
}));

// HideOnScroll component for hiding AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  // States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  
  // Navigation items with nested structure
  const navItems = [
    { name: "Home", link: "/" },
    { 
      name: "Services", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Battery", link: "/services/battery" },
        { name: "Solar", link: "/services/solar" },
      ]
    },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  
  // Sample notifications
  const notifications = [
    { id: 1, text: "Your project proposal has been approved", isRead: false },
    { id: 2, text: "New message from the development team", isRead: false },
  ];

  // Event handlers
  const handleThemeToggle = () => setDarkMode(!darkMode);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleServicesHover = (isHovering) => setServicesMenuOpen(isHovering);
  const handleMobileServicesToggle = () => setMobileServicesOpen(!mobileServicesOpen);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);
  const handleMenuClose = () => {
    setNotificationAnchor(null);
    setProfileAnchor(null);
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false); // Close mobile drawer if open
  };

  // Navigate to home
  const navigateToHome = () => {
    navigate("/");
    setMobileOpen(false);
  };

  const notificationsOpen = Boolean(notificationAnchor);
  const profileMenuOpen = Boolean(profileAnchor);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 280, pt: 2, backgroundColor: darkMode ? "#001a24" : "#002b36", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ fontWeight: "bold", color: "#ffffff", cursor: "pointer" }}
          onClick={navigateToHome}
        >
          Vajra Enterprises
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <List>
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.hasDropdown ? (
              <>
                <ListItem button onClick={handleMobileServicesToggle}
                  sx={{ color: "white", py: 1.5, "&:hover": { backgroundColor: alpha("#ffffff", 0.08) } }}>
                  <ListItemText primary={item.name} />
                  <ChevronRight sx={{ transform: mobileServicesOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s" }} />
                </ListItem>
                <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((subItem, subIndex) => (
                      <ListItem 
                        button 
                        key={subIndex} 
                        onClick={() => handleNavigation(subItem.link)}
                        sx={{ 
                          pl: 4, 
                          color: "white", 
                          "&:hover": { backgroundColor: alpha("#ffffff", 0.08), color: "#80deea" }
                        }}
                      >
                        <ListItemText primary={subItem.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem 
                button 
                onClick={() => handleNavigation(item.link)}
                sx={{ 
                  color: "white", 
                  py: 1.5, 
                  "&:hover": { backgroundColor: alpha("#ffffff", 0.08), color: "#80deea" }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <StyledAppBar position="sticky" isDark={darkMode}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          {/* Left: Company Name & Logo */}
          <Box 
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={navigateToHome}  // Add navigation to home on logo click
          >
            <Avatar sx={{ bgcolor: darkMode ? "#80deea" : "#66cfdb", color: darkMode ? "#001a24" : "#002b36", mr: 1.5 }}>V</Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff", letterSpacing: "0.5px" }}>
              Vajra Enterprises
            </Typography>
          </Box>

          {/* Middle: Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", flex: 1, ml: 4 }}>
            {navItems.map((item, index) => (
              <Box key={index} sx={{ position: "relative" }}
                onMouseEnter={() => item.hasDropdown && handleServicesHover(true)}
                onMouseLeave={() => item.hasDropdown && handleServicesHover(false)}>
                <NavButton 
                  isDark={darkMode} 
                  endIcon={item.hasDropdown ? <KeyboardArrowDown /> : null}
                  onClick={() => !item.hasDropdown && handleNavigation(item.link)}
                >
                  {item.name}
                </NavButton>
                
                {/* Dropdown menu for Services */}
                {item.hasDropdown && (
                  <Fade in={servicesMenuOpen}>
                    <DropdownMenu isDark={darkMode}>
                      {item.dropdownItems.map((subItem, subIndex) => (
                        <DropdownItem 
                          key={subIndex} 
                          isDark={darkMode}
                          onClick={() => handleNavigation(subItem.link)}
                        >
                          {subItem.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Fade>
                )}
              </Box>
            ))}
          </Box>

          {/* Right: Theme Toggle */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Theme Toggle */}
            <IconButton onClick={handleThemeToggle} sx={{ color: "white", mr: 1 }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            {/* Mobile Menu Toggle */}
            <IconButton sx={{ display: { xs: "block", md: "none" }, color: "white", ml: { xs: 0, sm: 1 } }}
              onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        
        {/* Mobile Drawer */}
        <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', backgroundColor: darkMode ? "#001a24" : "#002b36" },
          }}>
          {drawerContent}
        </Drawer>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default Navbar;