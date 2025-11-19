import ChartsPageLayout from "@site/src/components/ChartsPageLayout";
import Heading from "@theme/Heading";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
// @ts-ignore
import ChartWrapper, { ChartState } from "@site/src/components/ChartWrapper";
import { useColorMode } from "@docusaurus/theme-common";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import config from "../../../../../config.json";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

export default function ParkingCharts() {
    return (
        <ChartsPageLayout
            title="Parking Spaces Over Time"
            subCategory="Transport"
        >
            <ParkingChartsContent />
        </ChartsPageLayout>
    )
}

const colors = {
    "Les Jardin": "blue",
    "Green Street": "orange",
    "Minden Place": "green",
    "Patriotic Street": "black",
    "Sand Street": "teal",
    "Pier Road": "purple",
    "Charles Street": "red"
}

function ParkingChartsContent() {
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [state, setState] = useState(ChartState.Loading);
    const [selection, setSelection] = useState(0);

    const { colorMode } = useColorMode();

    useEffect(() => {
        if (selectedDate !== "") {
            fetchData();
            let interval = setInterval(() => fetchData(), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchDates();
    }, []);

    useEffect(() => {
        if (dates.length !== 0) {
            setSelection(dates.length - 1)
            setSelectedDate(dates[dates.length - 1]); // Set to todays date
        }
    }, [dates]);

    async function fetchData() {
        try {
            const response = await fetch(`${config.apiUrl}/v1/carparks/spaces/dates/${selectedDate}`);
            setState(ChartState.Loaded);
            setData((await response.json()).results.reverse());
        } catch (e) {
            setState(ChartState.Failed);
        }
    }

    async function fetchDates() {
        try {
            const response = await fetch(`${config.apiUrl}/v1/carparks/spaces/dates`);
            setDates((await response.json()).results.reverse());
        } catch (e) {
            setState(ChartState.Failed);
        }
    }

    function formatChartData() {
        const groupedData = data.reduce((acc, item) => {
            const { name, createdAt, spaces } = item;
            if (!acc[name]) {
                acc[name] = [];
            }
            acc[name].push({ createdAt, spaces });
            return acc;
        }, {});

        const datasets = Object.keys(groupedData).map(carParkName => {
            return {
                label: carParkName,
                data: groupedData[carParkName].map(item => item.spaces),
                borderColor: colors.hasOwnProperty(carParkName) ? colors[carParkName] : getRandomColor(),
                backgroundColor: "rgba(0,0,0,0)" // Transparent background
            }
        });

        const uniqueTimes = Array.from(new Set(data.map(item => new Date(item.createdAt).toLocaleTimeString([], { timeStyle: "short" }))));

        return {
            labels: uniqueTimes,
            datasets
        }
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function handleNext() {
        if (selection < dates.length - 1) {
            const nextSelection = selection + 1;
            setSelection(nextSelection);
            setSelectedDate(dates[nextSelection]);
        }
    }

    function handlePrev() {
        if (selection > 0) {
            const prevSelection = selection - 1;
            setSelection(prevSelection);
            setSelectedDate(dates[prevSelection]);
        }
    }

    const chartRef = useRef<any>();

    return (
        <>
            <Heading as="h1">Parking Spaces Over Time</Heading>
            <p>
                Available parking spaces in multi storey carparks, displayed over time. The information is updated roughly every 5 minutes.
            </p>
            <p>
                To access this information programmatically, please see the <a href="/docs/endpoints/carparks/parking-spaces/all-info-for-date">documentation</a>.
            </p>

            {/* Before 3rd October 2025, there is some spotiness in the data collection due to issues on the backend. This has been resolved. */}

            <ChartWrapper
                title="Parking Spaces Over Time"
                state={state}
                onRetry={() => fetchDates()}
                onSave={() => {
                    if (chartRef.current) {
                        const base64Image = chartRef.current.toBase64Image();
                        const link = document.createElement("a");
                        link.href = base64Image;
                        link.download = "chart.png";
                        link.click();
                    }
                }}
            >
                <div className={styles.chartOptionsWrapper}>
                    <div>
                        <button
                            onClick={handlePrev}
                            disabled={selection === 0}
                            data-theme={colorMode === "dark" ? "dark" : "light"}
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={selection === dates.length - 1}
                            data-theme={colorMode === "dark" ? "dark" : "light"}
                        >
                            {">"}
                        </button>
                    </div>

                    <div>
                        <DatePicker
                            className={styles.datePicker}
                            dateFormat="dd MMM yy"
                            selected={new Date(selectedDate)}
                            onChange={(date: Date) => {
                                const formattedDate = date.toISOString().split("T")[0];
                                const index = dates.findIndex(d => new Date(d).getTime() === date.getTime());

                                setSelection(index);
                                setSelectedDate(formattedDate);
                            }}
                            includeDates={dates.map(date => new Date(date))}
                            popperPlacement="bottom-start"
                            showIcon
                        />
                    </div>
                </div>

                {selectedDate ? <p style={{ marginTop: "10px", marginBottom: 0 }}><strong>{new Date(selectedDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "2-digit" })}</strong></p> : false}

                <div className={styles.chartContainer}>
                    <Line
                        ref={chartRef}
                        data={formatChartData() as any}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    position: "top"
                                },
                                legend: {
                                    display: true,
                                    position: "top"
                                },
                                tooltip: {
                                    mode: "point",
                                    intersect: false
                                },
                                datalabels: null
                            },
                            maintainAspectRatio: false
                        }}
                        height={600}
                    />
                </div>
            </ChartWrapper>
        </>
    )
}
