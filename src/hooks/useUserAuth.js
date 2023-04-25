import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const Cookies = require('js-cookie');

function useUserAuth() {
    const [userAuth, setUserAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userInfoCookie = Cookies.get('userInfo')
        if (userInfoCookie) {
            const userInfo = JSON.parse(userInfoCookie);
            if (userInfo) {
                const roles = userInfo.roles.split(',');
                setUserAuth(roles);
            }
        } else {
            router.push('/login');
        }
    }, []);
    return userAuth;
}
    
    


export default useUserAuth;
