

const Iframe = ({ iframeSrc }) => {

    return (
        <div className="iframe-container">
            <iframe
                id="reports-iframe"
                className="reports-iframe"
                width="100%"
                height="100%"
                src={iframeSrc}
            >
            </iframe>
            <div className="hide-nav"></div>
        </div>
    );
};

export default Iframe;
