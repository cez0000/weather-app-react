import React from "react";

function Footer(): React.ReactElement {
  return (
    <footer
      style={{
        backgroundColor: "lightblue",
        height: "7vh",
        lineHeight: "7vh",
        marginTop: "auto",
      }}
    >
      <p style={{ margin: "0", padding: "0" }}>&copy; 2024 Cezary Kwiatek</p>
    </footer>
  );
}

export default Footer;
