import FormGroup from "@site/src/components/ui/FormGroup";
import Layout from "@theme/Layout";
import React, { useEffect, useRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import clsx from "clsx";
import config from "../../../../config.json";
import Input from "@site/src/components/ui/Input";
import Select from "@site/src/components/ui/Select";
import Button from "@site/src/components/ui/Button";
import styles from "./styles.module.css";
import CourtResultCard from "@site/src/components/court/CourtResultCard";
import CourtHearingCard from "@site/src/components/court/CourtHearingCard";

export default function CourtSearchPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<"hearings" | "results">("hearings");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // global filters
    const [defendant, setDefendant] = useState("");
    const [courtRoom, setCourtRoom] = useState("");

    const [allCourtRooms, setAllCourtRooms] = useState([]);

    // hearings pagination + data
    const [hResults, setHResults] = useState<any[]>([]);
    const [hTotalResults, setHTotalResults] = useState(0);
    const [hPage, setHPage] = useState(1);
    const [hLimit, setHLimit] = useState(5);
    const [hTotalPages, setHTotalPages] = useState(1);

    // results pagination + data
    const [rResults, setRResults] = useState<any[]>([]);
    const [rTotalResults, setRTotalResults] = useState(0);
    const [rPage, setRPage] = useState(1);
    const [rLimit, setRLimit] = useState(5);
    const [rTotalPages, setRTotalPages] = useState(1);

    // jump to page
    const [jumpToPage, setJumpToPage] = useState("");
    const [jumpToPageError, setJumpToPageError] = useState("");

    useEffect(() => {
        fetchCourtRooms();
    }, []);

    useEffect(() => {
        if (activeTab === "hearings") {
            searchHearings();
        }
    }, [hPage, hLimit, activeTab]);

    useEffect(() => {
        if (activeTab === "results") {
            searchResults();
        }
    }, [rPage, rLimit, activeTab]);

    function buildQueryParams(page: number, limit: number) {
        const params = new URLSearchParams();

        params.append("limit", String(limit));
        params.append("page", String(page));

        if (defendant) params.append("defendant", defendant);
        if (courtRoom) params.append("courtRoom", courtRoom);

        return params.toString();
    }

    async function fetchCourtRooms() {
        try {
            const res = await fetch(`${config.apiUrl}/v1/courts/magistrates/hearings/fields`);
            const data = await res.json();

            if (res.ok) {
                setAllCourtRooms(data?.results?.courtRoom ?? []);
            }
        } catch (e) {
            setError("Failed to load court rooms");
        }
    }

    async function searchHearings() {
        try {
            setLoading(true);
            const query = buildQueryParams(hPage, hLimit);
            const res = await fetch(`${config.apiUrl}/v1/courts/magistrates/hearings?${query}`);
            const data = await res.json();

            if (res.ok) {
                setHResults(data.results);
                setHTotalResults(data.pagination.totalItems);
                setHTotalPages(data.pagination.totalPages);
            } else {
                setError(data?.message || "Failed to load hearings");
            }
        } finally {
            setLoading(false);
        }
    }

    async function searchResults() {
        try {
            setLoading(true);
            const query = buildQueryParams(rPage, rLimit);
            const res = await fetch(`${config.apiUrl}/v1/courts/magistrates/results?${query}`);
            const data = await res.json();

            if (res.ok) {
                setRResults(data.results);
                setRTotalResults(data.pagination.totalItems);
                setRTotalPages(data.pagination.totalPages);
            } else {
                setError(data?.message || "Failed to load results");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleSearchButton() {
        if (activeTab === "hearings") {
            setHPage(1);
            searchHearings();
        } else {
            setRPage(1);
            searchResults();
        }
    }

    function handleJumpToPage(e) {
        const value = e.target.value;
        setJumpToPage(value);
        if (!value || /^[0-9]+$/.test(value)) setJumpToPageError("");
        else setJumpToPageError("Not a number");
    }

    function jumpToPageGo() {
        if (!jumpToPage) return;

        const target = Number(jumpToPage);

        if (activeTab === "hearings") {
            if (target > hTotalPages) {
                return setJumpToPageError("Page does not exist");
            }
            setHPage(target);
        } else {
            if (target > rTotalPages) {
                return setJumpToPageError("Page does not exist");
            }
            setRPage(target);
        }

        setJumpToPage("");
    }

    const results = activeTab === "hearings" ? hResults : rResults;
    const page = activeTab === "hearings" ? hPage : rPage;
    const totalPages = activeTab === "hearings" ? hTotalPages : rTotalPages;
    const limit = activeTab === "hearings" ? hLimit : rLimit;
    const totalResults = activeTab === "hearings" ? hTotalResults : rTotalResults;
    const setLimit = activeTab === "hearings" ? setHLimit : setRLimit;
    const setPage = activeTab === "hearings" ? setHPage : setRPage;

    return (
        <Layout title="Courts Search">
            <div className={styles.header}>
                <div className={"container container-fluid margin-vert--lg"}>
                    <h1 className={styles.title}>Courts Search</h1>
                    <p className={styles.summary}>
                        Search through Magistrates court hearings & results.
                    </p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={"container container-fluid margin-vert--lg"}>
                    <div className={styles.tabs}>
                        <button
                            onClick={() => setActiveTab("hearings")}
                            className={clsx(styles.tab, activeTab === "hearings" && styles.activeTab)}
                        >
                            Hearings
                        </button>

                        <button
                            onClick={() => setActiveTab("results")}
                            className={clsx(styles.tab, activeTab === "results" && styles.activeTab)}
                        >
                            Results
                        </button>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputColumn}>
                            {error && (
                                <div className={styles.error}>
                                    <FaExclamationCircle /> {error}
                                </div>
                            )}

                            <FormGroup label="Defendant">
                                <Input value={defendant} onChange={e => setDefendant(e.target.value)} />
                            </FormGroup>

                            <FormGroup label="Court Room">
                                <Select value={courtRoom} onChange={e => setCourtRoom(e.target.value)}>
                                    <option value="">-- none --</option>
                                    {allCourtRooms.map(room => (
                                        <option key={room} value={room}>
                                            {room}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>

                            <Button onClick={handleSearchButton}>Search</Button>
                        </div>

                        <div className={styles.outputColumn}>
                            <h2>{activeTab === "hearings" ? "Hearings" : "Results"}</h2>

                            {results.length > 0 && (
                                <>
                                <p>
                                    Showing {results.length} of {totalResults} results
                                </p>
                                {activeTab === "results" && <p style={{ color: "var(--purple)", fontWeight: "bold" }}>Click an entry to view additional information</p>}
                                </>
                            )}

                            <div className={styles.results}>
                                {results.map(item => activeTab === "hearings" ? <CourtHearingCard key={item.id} item={item} /> : <CourtResultCard key={item.id} item={item} />)}

                                {totalPages > 1 && (
                                    <>
                                        <div className={styles.pagination}>
                                            <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                                                Previous
                                            </button>

                                            <span className={styles.pageInfo}>
                                                Page {page} of {totalPages}
                                            </span>

                                            <button
                                                className="btn"
                                                disabled={page === totalPages}
                                                onClick={() => setPage(page + 1)}
                                            >
                                                Next
                                            </button>
                                        </div>

                                        <div className={styles.jumpToPage}>
                                            Jump to page
                                            <input
                                                type="number"
                                                value={jumpToPage}
                                                onChange={handleJumpToPage}
                                            />
                                            <button className="btn" disabled={!jumpToPage} onClick={jumpToPageGo}>
                                                Go
                                            </button>
                                        </div>

                                        {jumpToPageError && (
                                            <div className={styles.jumpToPageError}>{jumpToPageError}</div>
                                        )}
                                    </>
                                )}

                                <div>
                                    Items per page:{" "}
                                    <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
                                        {[5, 10, 15, 20, 30, 40, 50].map(n => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
