const React = require("react");
const Head = require("react-declarative-head");
const Icon = require("../../components/assets/appIcon.png");
const Background = require("../../components/assets/mialergia-fondo.jpeg");

const { Button, Form } = require("react-bootstrap");

var raw = JSON.stringify({
  "user": "ale@gmail.com",
  "password": 123
});

var requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  },
  body: raw,
};

const View = () => {
  return (
    <div className="main-section">
      <Head>
        <title>MiaPortal | LOGIN</title>
        <link rel="icon" href={Icon}></link>
      </Head>

      <div className="login__container">
        <img className="login__background-image" src={Background}></img>
        <div className="login__right-container">
          <img src={Icon}></img>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Button variant="primary" onClick={() => {
              fetch("http://localhost:8080/users/login", requestOptions)
                .then(response => console.log(result))
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            }}>
              Ingresar
            </Button>
          </Form>
        </div>
      </div>

    </div>
  );
};

module.exports = { View };
