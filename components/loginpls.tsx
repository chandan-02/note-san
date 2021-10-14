import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/LoginPls.module.css';
import useDimension from '../helper/getDimension';
import SignIn from '../components/sign_in';

interface IProps {
    text: string;
    loading: boolean;
}

const LoginPls: FC<IProps> = ({ text, loading }) => {

    const [width, height] = useDimension();

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Image src="/user.svg" height={width > 768 ? "140" : "80"} width={width > 768 ? "140" : "80"} alt="user.svg" />
                <h1 className="px-10 text-center font-poppins py-3 pb-5 text-base md:text-xl">{text}</h1>
                <div className="pb-2">
                    <SignIn loading={loading} />
                </div>
            </div>
        </div>
    )
}

export default LoginPls;