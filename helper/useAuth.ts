import { Session } from 'next-auth';
import { useState, useEffect } from 'react';

interface IUser {
    userName: string;
    userImage: string;
}

const useAuth = (session:Session | null, load:boolean): string[] => {
    const [user, setUser] = useState<IUser>({ userName: '', userImage: '' });

    useEffect(() => {
        if (session && !load) {
            const user = {
                userName: session.user?.name as string,
                userImage: session.user?.image as string,
            }
            setUser(user);
        }
    }, [session, load])

    return [user.userName, user.userImage];
}

export default useAuth;