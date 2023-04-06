const React = require('react');
const { useState, useEffect } = require("react");
const Head = require('react-declarative-head');
const Icon = require('../../components/assets/appIcon.png');

const { NavBar } = require("../../components/navBar");

const { Button, Form, Dropdown, Spinner, Alert } = require("react-bootstrap");

const roles = {
  Medico: 'Medico',
  Investigador: 'Investigador',
  Administrador: 'Administrador',
}

const View = () => {

  const [role, setRole] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordValidate, setPasswordValidate] = useState('')

  const [loading, setLoading] = useState(false)

  const buttonEnabled = !!(email && (password === passwordValidate) && role);

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setFeedbackMessage({});
      return true;
    }
    setFeedbackMessage({ variant: 'warning', message: 'Debe ingresar un email válido' })
    return false
  }

  useEffect(() => {
    if (password && passwordValidate && (password !== passwordValidate)) {
      setFeedbackMessage({ variant: 'warning', message: 'Las contraseñas no coinciden' })
    } else {
      setFeedbackMessage('')
    }
  }, [password, passwordValidate])

  // useEffect(() => {
  //   email && ValidateEmail(email);
  // }, [email])

  const doSubmit = async () => {
    if (email && password) {
      setFeedbackMessage({})
      setLoading(true);
      await fetch("http://localhost:8080/users/create", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user": email,
          "password": password,
          "role": role
        }),
      }).then((response) => {
        return response;
      }).then((data) => {
        if (data.status === 400) {
          setFeedbackMessage({ variant: 'danger', message: 'El usuario ya existe en el sistema.' })
          return false;
        }
        setFeedbackMessage({ variant: 'success', message: `Se creó correctamente el usuario ${email} con password ${password}` })
      }).catch(error => {
        setFeedbackMessage({ variant: 'danger', message: 'No se pudo crear el usuario. Intente nuevamente.' })
        console.log('Error en fetch', error)
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setFeedbackMessage({ variant: 'warning', message: 'Debe ingresar el Email y la Contraseña' })
    }
  }

  return (<div className="App">
    <NavBar />
    <Head>
      <title>MiaPortal | REGISTRAR USUARIO</title>
      <link rel="icon" href={Icon} />
    </Head>
    <script src="register.js"></script>
    <link href="register.css" rel="stylesheet" type="text/css" />

    <div className="register__container">
      <h2 className='title'>
        REGISTRAR NUEVO USUARIO
      </h2>
      <Form className="register-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingrese el correo electronico del usuario que quiere registrar</Form.Label>
          <Form.Control type="email" placeholder="Email" onChange={(e) => {
            setFeedbackMessage({})
            setEmail(e.target.value)
          }} required isValid={false} onBlur={() => ValidateEmail()} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {
            setPassword(e.target.value)
          }} required />
          <Form.Label>Reingrese la contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {
            setPasswordValidate(e.target.value)
          }} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rol</Form.Label>
          <Dropdown className="register__select" onSelect={eventKey => setRole(eventKey)}>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              {role ? roles[role] : 'Elija el rol del usuario'}
            </Dropdown.Toggle>

            <Dropdown.Menu onChange={(e) => setRole(e.target.value)}>
              <Dropdown.Item eventKey="Investigador" active={role === 'Investigador'}>Investigador</Dropdown.Item>
              <Dropdown.Item eventKey="Medico" active={role === 'Medico'}>Medico</Dropdown.Item>
              <Dropdown.Item eventKey="Administrador" active={role === 'Administrador'}>Administrador</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        {feedbackMessage && feedbackMessage.variant && <Alert variant={feedbackMessage.variant}>
          <p>{feedbackMessage.message}</p>
        </Alert>}

        <Button variant="primary" onClick={() => doSubmit()} className="main-button" disabled={!buttonEnabled || loading}>
          {loading ? 'Creando Usuario...' : 'Registrar usuario'}
        </Button>


      </Form>
    </div>
  </div>
  );
}

module.exports = { View };
