const React = require('react');
const Head = require('react-declarative-head');
const Icon = require('../../components/assets/appIcon.png');



const View = () => {
  return <div>
    <Head>
      <title>MiaPortal | LOGIN</title>
      <link rel="icon" href={Icon}></link>
    </Head>
    <img src={Icon}></img>
    <p>
      LOGIN
    </p>
  </div>;
}

module.exports = { View };
