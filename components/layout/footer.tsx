import { NextComponentType } from 'next/types'
import Image from 'next/image';
import styles from '../../styles/Footer.module.css';
import Link from 'next/link';

const Footer: NextComponentType = () => {
    return (
        <div className={styles.container}>
            <Link href="https://github.com/chandan-02/note-san" passHref>
                <Image className={styles.git_img} src="/git.svg" height="38" width="38" alt="git_logo" />
            </Link>
            <Link href="https://github.com/chandan-02/note-san" passHref>
                <h1 className={styles.text}>note-san github</h1>
            </Link>
        </div>
    )
}

export default Footer;