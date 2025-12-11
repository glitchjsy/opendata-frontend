import React from "react";
import Navbar from "@theme-original/Navbar";
import styles from "./styles.module.css";

export default function NavbarWrapper(props) {
    return (
        <>
            <div className={styles.beta}>
                <p>Welcome to OpenData.je!</p>
                <a href="mailto:luke@glitch.je">Get in touch</a>
            </div>
            
            <Navbar {...props} />
        </>
    )
}
