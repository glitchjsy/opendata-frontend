import Layout from "@theme/Layout";
import React, { useState } from "react";
import styles from "./styles.module.css";
import FormGroup from "@site/src/components/ui/FormGroup";
import clsx from "clsx";
import config from "../../../config.json";
import Input from "@site/src/components/ui/Input";
import Button from "@site/src/components/ui/Button";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const register = async () => {
        try {
            if (password !== confirmPassword) {
                return setError("Passwords do not match");
            }
            const response = await fetch(`${config.apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ 
                    email, 
                    password,
                    recaptchaToken
                })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data?.message || "An error has occurred");
            } else {
                setError("");
                setSuccess(true);
            }

            const data = await response.json();
            console.log("Login successful:", data);
        } catch (e) {
            console.error("Error logging in:", e);
        }
    }

    const run = (callback: any) => {
        setError("");
        callback();
    }

    return (
        <Layout title="Register">
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
                <div className={styles.authCard}>
                    <h2 className={styles.title}>Register</h2>

                    {success && (
                        <div className={styles.success}>
                            Account successfully created, please check your email for a verification link.
                        </div>
                    )}

                    <FormGroup label="Email">
                        <Input
                            type="email"
                            value={email}
                            onChange={e => run(() => setEmail(e.target.value))}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Password">
                        <Input
                            type="password"
                            value={password}
                            onChange={e => run(() => setPassword(e.target.value))}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Confirm Password">
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={e => run(() => setConfirmPassword(e.target.value))}
                            required
                        />
                    </FormGroup>

                    <ReCAPTCHA
                        sitekey={config.recaptchaSiteKey}
                        onChange={(value) => setRecaptchaToken(value)}
                        style={{ marginBottom: "10px" }}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <Button
                        className={styles.loginButton}
                        onClick={() => register()}
                    >
                        Register
                    </Button>
                </div>
                
                <p className={styles.existingAccount}>Already have an account? <a href="/login">Log in</a></p>
            </div>
        </Layout>
    );
}
