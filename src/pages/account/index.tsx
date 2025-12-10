import Layout from "@theme/Layout";
import React, { PropsWithChildren, useEffect, useState } from "react";
import config from "../../../config.json";
import styles from "./styles.module.css";
import EmptyState from "@site/src/components/ui/EmptyState";
import { FaKey, FaTrashCan } from "react-icons/fa6";
import Button from "@site/src/components/ui/Button";
import Modal from "@site/src/components/ui/Modal";
import FormGroup from "@site/src/components/ui/FormGroup";
import { toast } from "react-toastify";
import Flex from "@site/src/components/helper/Flex";
import { DataTable } from "@site/src/components/ui/DataTable";
import Input from "@site/src/components/ui/Input";

export default function Account() {
    const [email, setEmail] = useState("");
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    const [siteAdmin, setSiteAdmin] = useState(false);
    const [ok, setOk] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchSession();
        fetchApiKeys();
    }, []);

    const fetchSession = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/me/session`, { credentials: "include" });

            if (response.ok) {
                const data = await response.json();

                if (data && Object.keys(data).length !== 0) {
                    setOk(true);
                    setEmail(data?.user?.email);
                    setSiteAdmin(Boolean(data?.user?.siteAdmin));
                } else {
                    window.location.href = "/login";
                }
            } else {
                toast("Error fetching session", { type: "error" });
                window.location.href = "/login";
            }
        } catch (e: any) {
            toast(e.message, { type: "error" });
            console.error("Error fetching session", e);
            window.location.href = "/login";
        }
    }

    const fetchApiKeys = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/me/api-keys`, { credentials: "include" });

            if (response.ok) {
                const data = await response.json();
                setApiKeys(data?.results);
            } else {
                toast("Failed to fetch API Keys", { type: "error" });
            }
        } catch (e: any) {
            toast(e.message, { type: "error" });
            console.error("Error fetching API Keys", e);
        }
    }

    const deleteApiKey = async (key) => {
        try {
            const shouldDelete = confirm("Are you sure you want to delete this API key?");

            if (shouldDelete) {
                const response = await fetch(`${config.apiUrl}/me/api-keys/${key.id}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                window.location.reload();
            }
        } catch (e) {
            console.error("Error deleting API key:", e);
        }
    }

    if (!ok) {
        return <div>Loading...</div>
    }

    return (
        <Layout title="Account">
            <div className={styles.header}>
                <div className="container container-fluid margin-vert--lg">
                    <h1>My Account</h1>
                    <p style={{ fontSize: "18px" }}>
                        Manage your account settings here.
                    </p>
                </div>
            </div>
            <div className="container container-fluid margin-vert--lg">
                <Section title="Profile & Settings">
                    <div className={styles.profileSettingsGrid}>
                        <FormGroup
                            label="Email"
                            helpText="Email editing is currently being worked on"
                        >
                            <Input
                                type="email"
                                value={email}
                                disabled
                                maxLength={200}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <Button>
                        Update
                    </Button>
                </Section>

                <Section title="API Keys">
                    {apiKeys.length === 0 ? (
                        <EmptyState
                            icon={<FaKey />}
                            title="No API Keys"
                            description="Create a new API key below"
                        >
                            <Button
                                onClick={() => setCreateModalOpen(true)}
                            >
                                Create API key
                            </Button>
                        </EmptyState>
                    ) : (
                        <>
                            <Button
                                onClick={() => setCreateModalOpen(true)}
                                style={{ marginBottom: "20px" }}
                            >
                                Create API key
                            </Button>

                            <DataTable
                                data={apiKeys}
                                columns={[
                                    { key: "summary", header: "Label" },
                                    {
                                        key: "createdAt",
                                        header: "Created",
                                        render: (user: any) =>
                                            new Date(user.createdAt).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })
                                    },
                                    { key: "token", header: "Key" },
                                    { key: "totalUses", header: "Uses" },
                                    {
                                        key: "actions",
                                        header: "",
                                        render: (key: any) => (
                                            <Flex gap="6px">
                                                <Button useSmallerPadding variant="danger" onClick={() => deleteApiKey(key)}>
                                                    <FaTrashCan />
                                                </Button>
                                            </Flex>
                                        )
                                    }
                                ]}
                            />
                        </>
                    )}
                </Section>

                <a href={`${config.apiUrl}/auth/logout`}>Log out</a>
            </div>

            <CreateModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </Layout>
    )
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div className={styles.sectionContent}>{children}</div>
        </div>
    )
}


interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CreateModal({ isOpen, onClose }: CreateModalProps) {
    const [summary, setSummary] = useState("");

    useEffect(() => {
        setSummary("");
    }, [isOpen]);

    const createKey = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/me/api-keys/new`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ summary })
            });

            if (response.ok) {
                onClose();
                window.location.reload();
            } else {
                toast("Failed to create API key", { type: "error" });
            }
        } catch (e) {
            console.error("Error creating API key:", e);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create API Key"
        >
            <FormGroup
                label="Label"
                helpText="A short description of this API key to help you identify it in the future"
            >
                <Input
                    type="text"
                    value={summary}
                    maxLength={200}
                    onChange={(e) => setSummary(e.target.value)}
                />
            </FormGroup>

            <Button variant="secondary" onClick={() => createKey()}>
                Create
            </Button>
        </Modal>
    )
}