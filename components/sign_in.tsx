import { NextComponentType } from "next";
import styles from '../styles/SignIn.module.css';

const SignIn:NextComponentType= () => {
    return(
        <div className={styles.container}>
            <h1 className={styles.text}>sign in</h1>
        </div>
    )   
} 

export default SignIn;