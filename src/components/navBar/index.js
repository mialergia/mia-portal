const React = require("react");
const { Navbar, Container, Nav, NavDropdown } = require("react-bootstrap");
const Icon = require("../../components/assets/appIcon.png");

const NavBar = ({ onChangeMenuSelection }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Icon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          MIA Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <NavDropdown
              title="Reportes"
              id="basic-nav-dropdown"
              onSelect={(e, ev) => onChangeMenuSelection(e, ev)}
            >
              <NavDropdown.Item eventKey="tipo" value="tipo">Por tipo</NavDropdown.Item>
              <NavDropdown.Item eventKey="diario" value="diario">Reporte Diario</NavDropdown.Item>
              <NavDropdown.Item eventKey="meteorologico" value="meteorologico">Meteorológicos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

module.exports = { NavBar };
