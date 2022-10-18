const React = require("react");
const Head = require("react-declarative-head");
const Icon = require("../../components/assets/appIcon.png");

const { Button, Form } = require("react-bootstrap");

const View = () => {
  return (
    <div className="main-section">
      <Head>
        <title>MiaPortal | LOGIN</title>
        <link rel="icon" href={Icon}></link>
      </Head>
      <img src={Icon}></img>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

module.exports = { View };
