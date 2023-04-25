import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'
import Iframe from '../components/iframe'

const MOBILE_REPORTE_POR_TIPO = "https://lookerstudio.google.com/s/hC_IB3htfBo"; //MOBILE
const MOBILE_REPORTE_DIARIO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc';
const MOBILE_REPORTE_DIARIO_METEOROLOGICO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc';

const DESKTOP_REPORTE_POR_TIPO = "https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac"; //DESKTOP
const DESKTOP_REPORTE_DIARIO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc';
const DESKTOP_REPORTE_DIARIO_METEOROLOGICO = 'https://datastudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc';

function Reports() {
    const router = useRouter();
    const userAuth = useUserAuth();

    const innerWidth = 1000//(window.innerWidth > 0) ? window.innerWidth : screen.width;
    const isMobile = innerWidth < 768;
    const [iframeSrc, setIframeSrc] = useState(isMobile ? MOBILE_REPORTE_POR_TIPO : DESKTOP_REPORTE_POR_TIPO);

    useEffect(() => {
        if (userAuth && !userAuth.includes('reporte_tipo_polen')) {
            router.push('/login');
        }
    }, []);

    const onChangeMenuSelection = (e) => {
        if (e === 'tipo') {
            setIframeSrc(isMobile ? MOBILE_REPORTE_POR_TIPO : DESKTOP_REPORTE_POR_TIPO);
        } else if (e === 'diario') {
            setIframeSrc(isMobile ? MOBILE_REPORTE_DIARIO : DESKTOP_REPORTE_DIARIO);
        } else {
            setIframeSrc(isMobile ? MOBILE_REPORTE_DIARIO_METEOROLOGICO : DESKTOP_REPORTE_DIARIO_METEOROLOGICO)
        }
    };

    return <MainTheme onChangeMenuSelection={onChangeMenuSelection}>
        <div className="main-section reports">
            <Iframe iframeSrc={iframeSrc} />
        </div>
    </MainTheme>;
}

export default Reports;