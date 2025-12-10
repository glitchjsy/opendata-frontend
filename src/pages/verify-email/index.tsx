import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import config from "../../../config.json";
import styles from "./styles.module.css";

export default function VerifyEmail(): JSX.Element {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        fetchToken(token);
    }, []);

    const fetchToken = async (token: string) => {
        try {
            const response = await fetch(`${config.apiUrl}/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                const data = await response.json();

                setError(data?.message || "An error has occurred");
                setSuccess(false);
            } else {
                setError("");
                setSuccess(true);

                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }

    return (
        <Layout title="Email Verification">
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
                <div className={styles.authCard}>
                    <h2 className={styles.title}>Email Verification</h2>

                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className={styles.success}>
                            Success! You will be redirected to login in a second...
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
