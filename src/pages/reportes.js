/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'
import Iframe from '../components/iframe'

import { getIframeSrc } from '@/components/utils';

const MOBILE = 'mobile';
const DESKTOP = 'desktop'

function Reportes() {
    const router = useRouter();
    const { userAuth, username } = useUserAuth();

    const { tipo = 'reporte_tipo_polen' } = router.query;

    const [device, setDevice] = useState(MOBILE);
    const [iframeSrc, setIframeSrc] = useState(getIframeSrc(userAuth, tipo, device));

    useEffect(() => {
        if (userAuth && !userAuth.includes('reporte_tipo_polen')) {
            router.push('/login');
        }
        const innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        setDevice(innerWidth < 768 ? MOBILE : DESKTOP);
    }, []);

    useEffect(() => {
        setIframeSrc(getIframeSrc(userAuth, tipo, device))
    }, [device, tipo, userAuth]);

    const onChangeMenuSelection = (type) => {
        const report = getIframeSrc(userAuth, type, device);
        setIframeSrc(report)
    };

    return <>
        <Head>
            <title>MIA Portal | Reportes</title>
        </Head>
        <MainTheme onChangeMenuSelection={onChangeMenuSelection} userAuth={userAuth} username={username} selectedReport={tipo}>
            <div className="main-section reports">
                {iframeSrc && <Iframe iframeSrc={iframeSrc} />}
            </div>
        </MainTheme>
    </>;
}

export default Reportes;