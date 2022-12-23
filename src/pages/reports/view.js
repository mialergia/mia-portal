const React = require("react");
const { useState } = require("react");
const Head = require("react-declarative-head");

const { NavBar } = require("../../components/navBar");

const Icon = require("../../components/assets/appIcon.png");

const REPORTE_POR_TIPO = "https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3yy9piaryc";
const REPORTE_DIARIO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc';
const REPORTE_DIARIO_METEOROLOGICO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc';

const View = () => {
  const [iframSrc, setIframeSrc] = useState(REPORTE_POR_TIPO);
  const [title, setTitle] = useState('Reporte por tipo');

  const onChangeMenuSelection = (e) => {
    if (e === 'tipo') {
      setIframeSrc(REPORTE_POR_TIPO);
      setTitle('Reporte por tipo');
    } else if (e === 'diario') {
      setIframeSrc(REPORTE_DIARIO);
      setTitle('Reporte diario');
    } else {
      setIframeSrc(REPORTE_DIARIO_METEOROLOGICO)
      setTitle('Reporte por diario + meteorológico');
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

        {iframeSrc && (
          <iframe
            className="reports-iframe"
            width="100%"
            height="100%"
            src={iframeSrc}
          />
        )}
      </div>
    </>
  );
};

module.exports = { View };
