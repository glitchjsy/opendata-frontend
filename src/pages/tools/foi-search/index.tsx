import FormGroup from "@site/src/components/ui/FormGroup";
import Layout from "@theme/Layout";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import { FaX } from "react-icons/fa6";
import clsx from "clsx";
import config from "../../../../config.json";
import Input from "@site/src/components/ui/Input";
import Select from "@site/src/components/ui/Select";
import Button from "@site/src/components/ui/Button";

export default function FoiSearchPage(): JSX.Element {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState("");

    const [title, setTitle] = useState("");
    const [publishDateStart, setPublishDateStart] = useState("");
    const [publishDateEnd, setPublishDateEnd] = useState("");
    const [author, setAuthor] = useState("");
    const [producer, setProducer] = useState("");
    const [requestText, setRequestText] = useState("");
    const [responseText, setResponseText] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const [jumpToPage, setJumpToPage] = useState("");
    const [jumpToPageError, setJumpToPageError] = useState("");

    const [allProducers, setAllProducers] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);
    const [totalsPerYear, setTotalPerYear] = useState([]);

    const [results, setResults] = useState<any[]>([]);
    const [totalResults, setTotalResults] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [compactView, setCompactView] = useState(false);

    const firstRun = useRef(true);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }

        const params = new URLSearchParams(window.location.search);

        if (requestModalOpen && selectedRequestId !== null) {
            params.set("id", String(selectedRequestId));
        } else {
            params.delete("id");
        }

        const newQuery = params.toString();
        const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "");
        history.replaceState(null, "", newUrl);
    }, [requestModalOpen, selectedRequestId]);

    useEffect(() => {
        setRequestModalOpen(false);

        const params = new URLSearchParams(window.location.search);
        const value = params.get("id");

        if (value) {
            if (!isNaN(Number(value))) {
                setSelectedRequestId(value);
                setRequestModalOpen(true);
            } else {
                params.delete("id");
                const newQuery = params.toString();
                const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "");
                history.replaceState(null, "", newUrl);
            }
        }

        fetchAuthors();
        fetchProducers();
        fetchTotalsPerYear();
    }, []);

    useEffect(() => {
        searchRequests();
    }, [page, limit]);

    async function fetchAuthors() {
        try {
            setError("");
            const response = await fetch(`${config.apiUrl}/v1/foi-requests/authors`);
            const data = await response.json();

            if (response.ok) {
                setAllAuthors(data?.results ?? []);
            } else {
                setError(data?.message || "Failed to load authors");
            }
        } catch (e: any) {
            setError("Failed to load authors");
            console.error(e);
        }
    }

    async function fetchProducers() {
        try {
            setError("");
            const response = await fetch(`${config.apiUrl}/v1/foi-requests/producers`);
            const data = await response.json();

            if (response.ok) {
                setAllProducers(data?.results ?? []);
            } else {
                setError(data?.message || "Failed to load producers");
            }
        } catch (e: any) {
            setError("Failed to load producers");
            console.error(e);
        }
    }

    async function fetchTotalsPerYear() {
        try {
            setError("");
            const response = await fetch(`${config.apiUrl}/v1/foi-requests/stats`);
            const data = await response.json();

            if (response.ok) {
                setTotalPerYear(data?.results?.totalsPerYear ?? []);
            } else {
                setError(data?.message || "Failed to load totals per year");
            }
        } catch (e: any) {
            setError("Failed to load totals per year");
            console.error(e);
        }
    }

    async function searchRequests() {
        try {
            setError("");
            setLoading(true);

            const query = buildQueryParams();
            const url = `${config.apiUrl}/v1/foi-requests${query ? `?${query}` : ""}`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setResults(data?.results);
                setTotalResults(data?.pagination?.totalItems);
                setTotalPages(data?.pagination?.totalPages ?? 1);
            } else {
                setError(data?.message || "Failed to search FOI requests");
            }
        } catch (e: any) {
            setError("Failed to search FOI requests");
            console.error(e);
        }
        setLoading(false);
    }


    function buildQueryParams() {
        const params = new URLSearchParams();

        params.append("limit", limit.toString());

        if (title) params.append("title", title);
        if (publishDateStart) params.append("startDate", publishDateStart);
        if (publishDateEnd) params.append("endDate", publishDateEnd);
        if (author) params.append("author", author);
        if (producer) params.append("producer", producer);
        if (requestText) params.append("requestText", requestText);
        if (responseText) params.append("responseText", responseText);
        if (page) params.append("page", page.toString());

        return params.toString();
    }

    function handleJumpToPage(e) {
        const value = e.target.value;

        setJumpToPage(value);

        if (value === "") {
            setJumpToPageError("");
            return;
        }

        if (/^[0-9]+$/.test(value) && Number.isInteger(Number(value))) {
            setJumpToPageError("");
        } else {
            setJumpToPageError("Not a number");
        }
    }

    function jumpToPageGo() {
        if (jumpToPage === "") {
            return;
        }
        if (Number(jumpToPage) > Number(totalPages)) {
            setJumpToPageError("Not a page");
            return;
        }
        setPage(Number(jumpToPage));
        setJumpToPage("");
    }

    return (
        <Layout title="FOI Search">
            <div className={styles.header}>
                <div className={"container container-fluid margin-vert--lg"}>
                    <h1 className={styles.title}>FOI Search</h1>
                    <p className={styles.summary}>
                        Search through Freedom of Information requests.
                    </p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={"container container-fluid margin-vert--lg"}>
                    <div className={styles.grid}>
                        <div className={styles.inputColumn}>
                            {error && (
                                <div className={styles.error}>
                                    <FaExclamationCircle /> {error}
                                </div>
                            )}

                            <FormGroup label="Title">
                                <Input
                                    type="text"
                                    value={title}
                                    placeholder=""
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Author">
                                <Select
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                >
                                    <option value="">-- none --</option>
                                    {allAuthors.map(author => <option key={author} value={author}>{author}</option>)}
                                </Select>
                            </FormGroup>

                            <FormGroup label="Producer">
                                <Select
                                    value={producer}
                                    onChange={(e) => setProducer(e.target.value)}
                                >
                                    <option value="">-- none --</option>
                                    {allProducers.map(producer => <option key={producer} value={producer}>{producer}</option>)}
                                </Select>
                            </FormGroup>

                            <FormGroup label="Request Text">
                                <Input
                                    type="text"
                                    value={requestText}
                                    placeholder=""
                                    onChange={(e) => setRequestText(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Response Text">
                                <Input
                                    type="text"
                                    value={responseText}
                                    placeholder=""
                                    onChange={(e) => setResponseText(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Year Published">
                                <div className={styles.totalsPerYear}>
                                    {Object.entries(totalsPerYear).map(([key, value]) => (
                                        <div key={key} className={styles.totalsCheckbox}>
                                            <input
                                                type="checkbox"
                                                id={key}
                                                checked={selectedYear === key}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedYear(key);
                                                        setPublishDateStart(`${key}/01/01`);
                                                        setPublishDateEnd(`${key}/12/31`);
                                                    } else {
                                                        setSelectedYear("");
                                                        setPublishDateStart("");
                                                        setPublishDateEnd("");
                                                    }
                                                }}
                                            />
                                            <label htmlFor={key}>{key} <span>({value})</span></label>
                                        </div>
                                    ))}
                                </div>
                            </FormGroup>

                            <br />

                            <Button
                                onClick={() => searchRequests()}
                            >
                                Search
                            </Button>
                        </div>
                        <div className={styles.outputColumn}>
                            <h2>Search Results</h2>

                            {results.length !== 0 && (
                                <p>Showing {results.length} of {totalResults} results</p>
                            )}

                            <div className={clsx(styles.results, compactView ? styles.resultsCompact : undefined)}>
                                {results.map(request => (
                                    <div
                                        key={request.id}
                                        className={clsx(styles.request, compactView ? styles.requestCompact : undefined )}
                                        onClick={(e) => {
                                            setSelectedRequestId(request.id);
                                            setRequestModalOpen(true);
                                        }}
                                    >
                                        <div className={compactView ? styles.reqTitleCompact : styles.reqTitle}>{request.title}</div>
                                        {!compactView && <div className={styles.reqAuthor}>Authored by {request.author} &bull; Produced by {request.producer}</div>}
                                        <div className={compactView ? styles.reqDateCompact : styles.reqDate}>
                                            Published on <span>{new Date(request.publishDate).toLocaleDateString("en-GB", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}</span>
                                        </div>
                                    </div>
                                ))}
                                {totalPages > 1 && (
                                    <>
                                        <div className={styles.pagination}>
                                            <button
                                                className="btn"
                                                disabled={page === 1}
                                                onClick={() => setPage(p => p - 1)}
                                            >
                                                Previous
                                            </button>

                                            <span className={styles.pageInfo}>
                                                Page {page} of {totalPages}
                                            </span>

                                            <button
                                                className="btn"
                                                disabled={page === totalPages}
                                                onClick={() => setPage(p => p + 1)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <div className={styles.jumpToPage}>
                                            <span>Jump to page</span>
                                            <input
                                                type="number"
                                                value={jumpToPage}
                                                onChange={handleJumpToPage}
                                            />
                                            <button
                                                className="btn"
                                                disabled={jumpToPage === ""}
                                                onClick={() => jumpToPageGo()}
                                            >
                                                Go
                                            </button>
                                        </div>
                                        {jumpToPageError && <div className={styles.jumpToPageError}>{jumpToPageError}</div>}
                                    </>
                                )}
                                <div>
                                    <span style={{ marginRight: "6px" }}>Items per page:</span>

                                    <select
                                        value={limit}
                                        onChange={(e) => setLimit(Number(e.target.value))}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                        <option value="60">60</option>
                                        <option value="70">70</option>
                                        <option value="80">80</option>
                                        <option value="90">90</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {requestModalOpen && (
                            <RequestModal
                                open={requestModalOpen}
                                onClose={() => setRequestModalOpen(false)}
                                requestId={selectedRequestId}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.disclaimer}>
                <div className={"container container-fluid margin-vert--lg"}>
                    To access this data programatically, please see <a href="/docs/endpoints/foi-requests">the documentation</a>.
                </div>
            </div>
        </Layout>
    )
}

function RequestModal({ open, onClose, requestId }: any) {
    const [request, setRequest] = useState<any>({})
    const [error, setError] = useState("");
    const [state, setState] = useState("loading");

    useEffect(() => {
        fetchRequest();
    }, [open]);

    async function fetchRequest() {
        try {
            setError("");
            setState("loading");

            const response = await fetch(`${config.apiUrl}/v1/foi-requests/${requestId}`);
            const data = await response.json();

            if (response.ok) {
                setRequest(data?.results);

                setTimeout(() => setState("loaded"), 50);
            } else {
                setError(data?.message || "Failed to load FOI request");
                setState("error");
            }
        } catch (e: any) {
            setError("Failed to load FOI request");
            setState("error");
            console.error(e);
        }
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>{state === "loading" ? "" : request?.title}</h3>
                    <button className={styles.modalCloseBtn} onClick={onClose}>
                        <FaX />
                    </button>
                </div>

                {error && (
                    <div className={styles.error}>
                        <FaExclamationCircle /> {error}
                    </div>
                )}

                {state === "loaded" && (
                    <>
                        <div className={styles.reqAuthor}>Authored by {request.author} &bull; Produced by {request.producer}</div>
                        <div>
                            Published on <span>{new Date(request.publishDate).toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}</span>
                        </div>
                        <br />
                        <div className={styles.requestHeadingModal}>Request</div>
                        <div dangerouslySetInnerHTML={{ __html: request.requestText }}></div>

                        <div className={styles.requestHeadingModal}>Response</div>
                        <div dangerouslySetInnerHTML={{ __html: request.responseText?.replace(/href="(\/[^"]*)"/g, 'href="https://gov.je$1"') }}></div>

                        <div className={styles.modalFooter}>
                            <div className={styles.requestIdModal}>Request ID: {request.id} &bull; <a target="_blank" href={`https://www.gov.je/government/freedomofinformation/pages/foi.aspx?ReportID=${request.id}`}>View on gov.je</a></div>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}