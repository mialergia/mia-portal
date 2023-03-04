const React = require("react");
const { Spinner } = require("react-bootstrap");

const Iframe = ({ iframeSrc, showSpinner, setShowSpinner }) => {

    return (
        <div className="iframe-container">
            {showSpinner && <div className="spinner-container"><Spinner className="loading-spinner" animation="border" /></div>}
            <iframe
                id="reports-iframe"
                className="reports-iframe"
                width="100%"
                height="100%"
                src={iframeSrc}
                onLoad={() => {
                    setShowSpinner(false)
                }}>
            </iframe>
            <div className="hide-nav"></div>
        </div>
    );
};

module.exports = Iframe;
