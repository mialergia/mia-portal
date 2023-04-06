const React = require("react");
const { useState } = React;
const Head = require("react-declarative-head");
const Icon = require("../../components/assets/appIcon.png");
const Background = require("../../components/assets/mialergia-fondo.jpeg");

const { Button, Form, Alert } = require("react-bootstrap");
const Cookies = require('js-cookie');

const View = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState({})
  
  const saveUserData = (user, features) => {
    const userInfo = {
      username: user,
      roles: features.toString(),
    };
    // Guardamos una cookie que dura 2 semanas
    Cookies.set('userInfo', JSON.stringify(userInfo), 
      {expires: 14},
    )
  };

  const doSubmit = async () => {
    if (email && password) {
      setFeedbackMessage(' ')
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
          saveUserData(email, data.features);
          window.location.href = '/reports';
        } else {
          setFeedbackMessage({ variant: 'danger', message: 'Email o contraseña inválida'})
        }
      }).catch(error => {
        setFeedbackMessage({ variant: 'danger', message: 'No se pudo iniciar sesión. Intente nuevamente.'})
        console.log('Error en fetch', error)
      });
    } else {
      setFeedbackMessage({ variant: 'warning', message: 'Debe ingresar el Email y la Contraseña'})
    }
  }

  return (
    <div className="main-section">
      <Head>
        <title>MiaPortal | LOGIN</title>
        <link rel="icon" href={Icon} />
      </Head>
      <script src="login.js"></script>
      <link href="login.css" rel="stylesheet" type="text/css" />

      <div className="login__container">
        <img className="login__background-image" src={Background} />
        <div className="login__right-container">
          <img src={Icon}></img>
          <h1 className="title">MIAPortal</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={(e) => {
                setFeedbackMessage({})
                setEmail(e.target.value)
              }} required isValid={false} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {
                setFeedbackMessage({})
                setPassword(e.target.value)
              }} required />
            </Form.Group>

            {feedbackMessage && feedbackMessage.variant && <Alert variant={feedbackMessage.variant}>
              <p>{feedbackMessage.message}</p>
            </Alert>}

            <Button variant="primary" onClick={() => doSubmit()}>
              Ingresar
            </Button>
          </Form>
        </div>
      </div>

    </div>
  );
};

module.exports = { View };
