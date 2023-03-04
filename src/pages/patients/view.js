const React = require("react");
const { useState } = require("react");
const Head = require("react-declarative-head");

const { NavBar } = require("../../components/navBar");
const Iframe = require("../../components/iframe");

const Icon = require("../../components/assets/appIcon.png");

const MOBILE_REPORTE_SINTOMAS_CRONICOS = "https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3pj70dpp0c"; //MOBILE
const MOBILE_REPORTE_ENTRADA_DIARIA = 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_qhjuzrqp0c';
const MOBILE_REPORTE_TEST_PRICK = 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_zo0iy9ur0c';

const DESKTOP_REPORTE_SINTOMAS_CRONICOS = "https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3pj70dpp0c"; //DESKTOP
const DESKTOP_REPORTE_ENTRADA_DIARIA = 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_qhjuzrqp0c';
const DESKTOP_REPORTE_TEST_PRICK = 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_zo0iy9ur0c';

const View = () => {
  
  const innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const isMobile = innerWidth < 768;
  const [iframeSrc, setIframeSrc] = useState(isMobile ? MOBILE_REPORTE_SINTOMAS_CRONICOS : DESKTOP_REPORTE_SINTOMAS_CRONICOS);
  const [showSpinner, setShowSpinner] = useState(false);

  const onChangeMenuSelection = (e) => {
    setShowSpinner(true);
    if (e === 'sintomas-cronicos') {
      setIframeSrc(isMobile ? MOBILE_REPORTE_SINTOMAS_CRONICOS : DESKTOP_REPORTE_SINTOMAS_CRONICOS);
    } else if (e === 'entrada-diaria') {
      setIframeSrc(isMobile ? MOBILE_REPORTE_ENTRADA_DIARIA : DESKTOP_REPORTE_ENTRADA_DIARIA);
    } else {
      setIframeSrc(isMobile ? MOBILE_REPORTE_TEST_PRICK : DESKTOP_REPORTE_TEST_PRICK)
    }
  };

  return (
    <>
      <NavBar onChangeMenuSelection={onChangeMenuSelection} />
      <div className="main-section patients">
        <Head>
          <title>MiaPortal | LOGIN</title>
          <link rel="icon" href={Icon}></link>
        </Head>
        <Iframe iframeSrc={iframeSrc} setShowSpinner={setShowSpinner} />
      </div>
    </>
  );
};

module.exports = { View };
