const React = require("react");
// const { useState } = React;
const Head = require("react-declarative-head");
const Icon = require("../../components/assets/appIcon.png");
const Background = require("../../components/assets/mialergia-fondo.jpeg");

const { Button, Form } = require("react-bootstrap");


const View = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(' ');

  const doSubmit = async () => {
    if (email && password) {
      setError(' ')
      await fetch("http://localhost:8080/users/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user": email,
          "password": password
        }),
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.login) {
          window.location.href = '/reports'
        } else {
          setError('Email o contraseña inválida')
        }
      }).catch(error => {
        setError('No se pudo iniciar sesión. Intente nuevamente.')
        console.log('Error en fetch', error)
      });
    } else {
      setError('Debe ingresar el Email y la Contraseña')
    }
  }

  return (
    <div className="main-section">
      <Head>
        <title>MiaPortal | LOGIN</title>
        <link rel="icon" href={Icon} />
      </Head>

      <div className="login__container">
        <img className="login__background-image" src={Background} />
        <div className="login__right-container">
          <img src={Icon}></img>
          <h1 className="title">MIAPortal</h1>
          <Form>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={(e) => {
                setError('')
                setEmail(e.target.value)
              }} required isValid={false} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {
                setError('')
                setPassword(e.target.value)
              }} required />
            </Form.Group>

            <div className="error_message">
              <p>{error}</p>
            </div> */}

            {/* <Button variant="primary" onClick={() => doSubmit()}>
              Ingresar
            </Button> */}
          </Form>
        </div>
      </div>

    </div>
  );
};

module.exports = { View };
