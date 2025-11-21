import React from "react";
import Navbar from "@theme-original/Navbar";
import styles from "./styles.module.css";

export default function NavbarWrapper(props) {
    return (
        <>
            <div className={styles.beta}>
                <p>The API is currently in beta testing and is not ready for public use yet.</p>
                <a href="mailto:luke@glitch.je">Get in touch</a>
            </div>
            
            <Navbar {...props} />
        </>
    )
}
