const React = require("react");
const { useState, useEffect, useRef } = require("react");
const Head = require("react-declarative-head");

const { NavBar } = require("../../components/navBar");
const Iframe = require("../../components/iframe");

const Icon = require("../../components/assets/appIcon.png");

const MOBILE_REPORTE_POR_TIPO = "https://lookerstudio.google.com/s/hC_IB3htfBo"; //MOBILE
const MOBILE_REPORTE_DIARIO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc';
const MOBILE_REPORTE_DIARIO_METEOROLOGICO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc';

const DESKTOP_REPORTE_POR_TIPO = "https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac"; //DESKTOP
const DESKTOP_REPORTE_DIARIO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc';
const DESKTOP_REPORTE_DIARIO_METEOROLOGICO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc';


const View = () => {

  const innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const isMobile = innerWidth < 768;
  const [iframeSrc, setIframeSrc] = useState(isMobile ? MOBILE_REPORTE_POR_TIPO : DESKTOP_REPORTE_POR_TIPO);
  const [showSpinner, setShowSpinner] = useState(false);

  const onChangeMenuSelection = (e) => {
    setShowSpinner(true);
    if (e === 'tipo') {
      setIframeSrc(isMobile ? MOBILE_REPORTE_POR_TIPO : DESKTOP_REPORTE_POR_TIPO);
    } else if (e === 'diario') {
      setIframeSrc(isMobile ? MOBILE_REPORTE_DIARIO : DESKTOP_REPORTE_DIARIO);
    } else {
      setIframeSrc(isMobile ? MOBILE_REPORTE_DIARIO_METEOROLOGICO : DESKTOP_REPORTE_DIARIO_METEOROLOGICO)
    }
  };

  return (
    <>
      <NavBar onChangeMenuSelection={onChangeMenuSelection}  />
      <div className="main-section reports">
        <Head>
          <title>MiaPortal | LOGIN</title>
          <link rel="icon" href={Icon}></link>
        </Head>

        <Iframe iframeSrc={iframeSrc} setShowSpinner={setShowSpinner} showSpinner={showSpinner} />
      </div>
    </>
  );
};

module.exports = { View };
