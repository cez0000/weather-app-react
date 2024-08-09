import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import useSelectedLanguage from "../hooks/useSelectedLanguage";
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { selectedLanguage } = useSelectedLanguage();

  const getLanguageLongName = (shortName: string): string => {
    switch (shortName) {
      case "pl":
        return "Polski";
      case "en":
        return "English";
      case "ru":
        return "Pусский";
      default:
        return "";
    }
  };
  return (
    <Navbar style={{ width: "100%", backgroundColor: "#d8d8d8" }} expand="lg">
      <Container>
        <Navbar.Brand href="#home">{t("Weather-App")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              {t("Home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/About">
              {t("About")}
            </Nav.Link>
          </Nav>
          <Nav style={{ marginLeft: "auto" }}>
            <NavDropdown
              title={getLanguageLongName(selectedLanguage)}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => changeLanguage("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("pl")}>
                Polski
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("ru")}>
                Pусский
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
