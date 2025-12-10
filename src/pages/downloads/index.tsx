import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const DATA_URL = "https://raw.githubusercontent.com/glitchjsy/opendata-downloads/refs/heads/master/data";
const INDEX_URL = DATA_URL + "/index.json";

export default function Downloads() {
    const [datasets, setDatasets] = useState([]);
    const [generatedAt, setGeneratedAt] = useState("");

    useEffect(() => {
        fetchDatasets();
    }, []);

    async function fetchDatasets() {
        try {
            const response = await fetch(INDEX_URL);

            if (response.ok) {
                const data = await response.json();

                setGeneratedAt(data.generatedAt);
                setDatasets(Object.entries(data.datasets));
            }
        } catch (e: any) {
            alert("Failed to fetch downloads");
        }
    }

    function formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB`;
    }

    function formatDateTime(isoString, useLocal = false) {
        const date = new Date(isoString);

        const get = useLocal
            ? { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(), hours: date.getHours(), minutes: date.getMinutes() }
            : { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear(), hours: date.getUTCHours(), minutes: date.getUTCMinutes() };

        const day = String(get.day).padStart(2, "0");
        const month = String(get.month).padStart(2, "0");
        const year = get.year;
        const hours = String(get.hours).padStart(2, "0");
        const minutes = String(get.minutes).padStart(2, "0");

        return `${day}/${month}/${year} at ${hours}:${minutes}`;
    }

    function getFileName(path) {
        const parts = path.split("/");
        return parts[parts.length - 1];
    }

    function downloadFile(url, filename) {
        fetch(url)
            .then(resp => resp.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }

    return (
        <Layout
            title="Downloads"
        >
            <div className={clsx("container", styles.container)}>
                <h1>Downloads</h1>
                <p>Do you need the full dataset, or would another format work better? Certain datasets are updated daily and can be downloaded in full from this page.</p>

                <p>
                    <strong>Last updated:</strong> {formatDateTime(generatedAt)}
                </p>

                <div className={styles.datasetGrid}>
                    {datasets.map(([name, dataset]) => (
                        <div key={name} className={styles.dataset}>
                            <h2>{name}</h2>
                            <ul>
                                {dataset.files.map(file => (
                                    <li key={file.path}>
                                        <a
                                            href={`${DATA_URL}/${file.path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                downloadFile(`${DATA_URL}/${file.path}`, getFileName(file.path));
                                            }}
                                        >
                                            {getFileName(file.path)}
                                        </a>{" "}
                                        — {formatSize(file.sizeBytes)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}