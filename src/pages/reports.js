/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'
import Iframe from '../components/iframe'

const reports_dictionary = {
    tipo: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3yy9piaryc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_5jryigxq1c'
    },
    diario: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_w40ygyrq3c'
    },
    diario_met: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_rvydwyrq3c'
    },
    sintomas: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3pj70dpp0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_kxvz4mtq3c' // AJUSTAR
    },
    entrada_diaria: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_qhjuzrqp0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_wy8wgntq3c'
    },
    test_prick: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_zo0iy9ur0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_bos5mntq3c'
    },
}

const MOBILE = 'mobile';
const DESKTOP = 'desktop'


function Reports() {
    const router = useRouter();
    const {userAuth, username} = useUserAuth();

    const {type = 'tipo'} = router.query;

    const [device, setDevice] = useState(MOBILE);
    const [iframeSrc, setIframeSrc] = useState(reports_dictionary[type][device]);

    useEffect(() => {
        if (userAuth && !userAuth.includes('reporte_tipo_polen')) {
            router.push('/login');
        }
        const innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        setDevice(innerWidth < 768 ? MOBILE : DESKTOP);
    }, []);

    useEffect(() => {
        setIframeSrc(reports_dictionary[type][device])
    }, [device, type]);

    const onChangeMenuSelection = (type) => {
        const report = reports_dictionary[type][device];
        setIframeSrc(report)
    };

    return <MainTheme onChangeMenuSelection={onChangeMenuSelection} userAuth={userAuth} username={username}>
        <div className="main-section reports">
            {iframeSrc && <Iframe iframeSrc={iframeSrc} />}
        </div>
    </MainTheme>;
}

export default Reports;