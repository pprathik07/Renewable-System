import React from "react";
import { 
  Phone, 
  Email,
  Link,
  Home
} from "@mui/icons-material";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)",
        color: "white",
        padding: "25px 50px",
        borderTop: "5px solid",
        borderImage: "linear-gradient(90deg, #ff3366, #ff6b3d) 1",
        width: "100%",
        position: "relative",
        marginTop: "0"
      }}
    >
      {/* Left Side - Large Company Name */}
      <div 
        style={{ 
          fontSize: "22px", 
          fontWeight: "bold", 
          letterSpacing: "2px",
          background: "linear-gradient(90deg, #ffffff, #cccccc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        VAJRA ENTERPRISES
      </div>

      {/* Right Side - Contact Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            padding: "10px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <Phone style={{ color: "#ff3366", fontSize: "20px" }} />
        </div>
        <div 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            padding: "10px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <Email style={{ color: "#ff3366", fontSize: "20px" }} />
        </div>
        <div 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            padding: "10px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <Link style={{ color: "#ff3366", fontSize: "20px" }} />
        </div>
        <div 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            padding: "10px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <Home style={{ color: "#ff3366", fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Footer;