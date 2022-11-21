const React = require("react");
const { useState } = require("react");
const Head = require("react-declarative-head");

const { NavBar } = require("../../components/navBar");

const Icon = require("../../components/assets/appIcon.png");

const View = () => {
  const [iframSrc, setIframeSrc] = useState("https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3yy9piaryc");

  const onChangeMenuSelection = (e) => {
    console.log(e);
    if (e === 'tipo') {
      setIframeSrc(
        "https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3yy9piaryc"
      );
    } else  if (e === 'diario') {
      setIframeSrc('https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc');
    } else {
      setIframeSrc('https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc')
    }
    
  };

  return (
    <>
      <NavBar onChangeMenuSelection={onChangeMenuSelection} />
      <div className="main-section reports">
        <Head>
          <title>MiaPortal | LOGIN</title>
          <link rel="icon" href={Icon}></link>
        </Head>

        {iframSrc && (
          <iframe
            className="reports-iframe"
            width="100%"
            height="100%"
            src={iframSrc}
          />
        )}
      </div>
    </>
  );
};

module.exports = { View };
