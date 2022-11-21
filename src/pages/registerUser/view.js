const React = require('react');
const Head = require('react-declarative-head');
const Icon = require('../../components/assets/appIcon.png');

const { Button, Form, Dropdown, DropdownButton } = require("react-bootstrap");

const View = () => {
  return (
    <div className="App">
    <Head>
      <title>MiaPortal | REGISTRAR USUARIO</title>
      <link rel="icon" href={Icon}/>
    </Head>
    <div className="register__container">
      <div className="register__content">
        <p className="register__title">
          REGISTRAR NUEVO USUARIO
        </p>
        <img className="register__image" src={Icon}/>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingrese el correo electronico del usuario que quiere registrar</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>
          <Dropdown className="register__select">
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Elija el rol del usuario
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item active>Médico</Dropdown.Item>
              <Dropdown.Item>Investigador</Dropdown.Item>
              <Dropdown.Item>Administrador</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" type="submit">
            Registrar usuario
          </Button>
        </Form>
      </div>
    </div>

  </div>);
}

module.exports = { View };
