import React from "react";
import { 
  LocationOn, 
  Phone, 
  Email,
  LinkedIn,
  Twitter
} from "@mui/icons-material";

const Contact = () => {
  return (
    <div
      style={{
        display: "flex",
        background: "linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)",
        color: "white",
        padding: "70px 50px",
        position: "relative",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Accent elements */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "5px",
          background: "linear-gradient(90deg, #ff3366, #ff6b3d)",
        }}
      ></div>
      
      {/* Left Side - Contact Info */}
      <div 
        style={{ 
          flex: 1, 
          padding: "20px",
          position: "relative",
          zIndex: "1"
        }}
      >
        <h2 
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600", 
            marginBottom: "15px",
            background: "linear-gradient(90deg, #ffffff, #cccccc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}
        >
          Get in touch
        </h2>
        
        <p 
          style={{ 
            marginBottom: "40px",
            fontSize: "1.1rem",
            color: "#a0a8bd",
            fontWeight: "300",
            letterSpacing: "0.5px"
          }}
        >
          We're here to answer your questions and discuss your requirements
        </p>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "25px" 
          }}
        >
          <div 
            style={{ 
              backgroundColor: "rgba(255,255,255,0.1)", 
              padding: "12px",
              borderRadius: "50%",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45px",
              height: "45px"
            }}
          >
            <LocationOn style={{ color: "#ff3366" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#e0e0e0" }}>Peerzadiguda, Hyderabad</p>
        </div>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "25px" 
          }}
        >
          <div 
            style={{ 
              backgroundColor: "rgba(255,255,255,0.1)", 
              padding: "12px",
              borderRadius: "50%",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45px",
              height: "45px"
            }}
          >
            <Phone style={{ color: "#ff3366" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#e0e0e0" }}>+91 9246344969</p>
        </div>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "40px" 
          }}
        >
          <div 
            style={{ 
              backgroundColor: "rgba(255,255,255,0.1)", 
              padding: "12px",
              borderRadius: "50%",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45px",
              height: "45px"
            }}
          >
            <Email style={{ color: "#ff3366" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#e0e0e0" }}>ups.pvr@gmail.com</p>
        </div>
        
        <div style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "1rem", color: "#a0a8bd", marginBottom: "15px" }}>Connect with us</p>
          <div style={{ display: "flex", gap: "15px" }}>
            <div 
              style={{ 
                backgroundColor: "rgba(255,255,255,0.1)", 
                padding: "12px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "45px",
                height: "45px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <LinkedIn style={{ color: "#ffffff" }} />
            </div>
            <div 
              style={{ 
                backgroundColor: "rgba(255,255,255,0.1)", 
                padding: "12px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "45px",
                height: "45px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <Twitter style={{ color: "#ffffff" }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div 
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,51,102,0.1) 0%, rgba(255,51,102,0) 70%)",
          zIndex: "0"
        }}
      ></div>
      
      <div 
        style={{
          position: "absolute",
          top: "-30px",
          left: "30%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,61,0.1) 0%, rgba(255,107,61,0) 70%)",
          zIndex: "0"
        }}
      ></div>
    </div>
  );
};

export default Contact;