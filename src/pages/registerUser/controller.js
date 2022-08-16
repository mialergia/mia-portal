const React = require('react');
const { View } = require('./view');

exports.render = (req, res, next) => {
    res.render(View, {});
};
