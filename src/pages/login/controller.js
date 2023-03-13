const React = require('react');
const { View } = require('./view');

exports.render = (req, res) => {
    res.render(View, {});
};
