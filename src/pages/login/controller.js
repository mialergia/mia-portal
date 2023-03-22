const React = require('react');
const ReactDOMServer = require('react-dom/server')
const { View } = require('./view');

exports.render = (req, res) => {
    const html = ReactDOMServer.renderToString(<View />);
    res.send(html);
};
