import Layout from "@theme/Layout";
import React, { useState } from "react";
import styles from "./styles.module.css";
import FormGroup from "@site/src/components/ui/FormGroup";
import clsx from "clsx";
import config from "../../../config.json";
import Input from "@site/src/components/ui/Input";
import Button from "@site/src/components/ui/Button";

export default function Login(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data?.message || "Failed to login");
                return;
            }
            window.location.href = "/";
        } catch (e) {
            console.error("Error logging in:", e);
            setError(e.message || "Failed to login");
        }
    }

    return (
        <Layout title="Login">
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
                <div className={styles.authCard}>
                    <h2 className={styles.title}>Login</h2>

                    <FormGroup label="Email">
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Password">
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    {error && <p className={styles.error}>{error}</p>}

                    <Button
                        className={styles.loginButton}
                        onClick={() => login()}
                    >
                        Login
                    </Button>
                </div>
                <p className={styles.regSignUp}>Don't have an account? <a href="/register">Register here!</a></p>
            </div>
        </Layout>
    );
}
