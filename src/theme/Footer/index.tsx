import clsx from "clsx";
import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

function Footer() {
    const { colorMode } = useColorMode();

    return (
        <div className={styles.footer}>
            <div className={styles.author} data-theme={colorMode}>
                <p>Made by <a href="https://linkedin.com/in/lukejwyatt" data-theme={colorMode}>Luke</a> &bull; Source code available <a href="https://github.com/glitchjsy/data-frontend" data-theme={colorMode}>on GitHub</a>.</p>
            </div>
            <div className={styles.footerInner}>
                <div className={styles.title}>
                    <a className={styles.glitch} href="https://glitch.je">.</a>
                </div>
                <div className={styles.links}>
                    <a href="/legal/privacy">Privacy Policy</a>
                    <a href="/legal/terms">Terms of Use</a>
                </div>
            </div>
        </div>
    );
}
export default React.memo(Footer);
