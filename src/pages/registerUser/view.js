const React = require('react');
const Head = require('react-declarative-head');
const Icon = require('../../components/assets/appIcon.png');

const View = () => {
  return (<div className="App">
    <Head>
      <title>MiaPortal | REGISTRAR USUARIO</title>
      <link rel="icon" href={Icon}></link>
    </Head>
    <img src={Icon}></img>
    <p>
      REGISTRAR USUARIO
    </p>

  </div>);
}

module.exports = { View };