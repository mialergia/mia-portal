const React = require('react');
const { useState } = require("react");
const Head = require('react-declarative-head');
const Icon = require('../../components/assets/appIcon.png');

const { NavBar } = require("../../components/navBar");

const { Button, Form, Dropdown, DropdownButton } = require("react-bootstrap");

const roles = {
  medico: 'Medico',
  investigador: 'Investigador',
  admin: 'Administrador',
}

const View = () => {
  return (<div className="App">
    <NavBar />
    <Head>
      <title>MiaPortal | REGISTRAR USUARIO</title>
      <link rel="icon" href={Icon} />
    </Head>
    <div className="register__container">
      <h2 className='title'>
        REGISTRAR NUEVO USUARIO
      </h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingrese el correo electronico del usuario que quiere registrar</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <Dropdown className="register__select" onSelect={eventKey => setRole(eventKey)}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            {role ? roles[role] : 'Elija el rol del usuario'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="medico" active={role === 'medico'}>Médico</Dropdown.Item>
            <Dropdown.Item eventKey="investigador" active={role === 'investigador'}>Investigador</Dropdown.Item>
            <Dropdown.Item eventKey="admin" active={role === 'admin'}>Administrador</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" type="submit">
          Registrar usuario
        </Button>
      </Form>
    </div>
  </div>
  );
}

module.exports = { View };
