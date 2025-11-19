import React, { PropsWithChildren, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./styles.module.css";
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
    // @ts-ignore
} from "chart.js";

interface Props {
    includeDatePicker?: boolean;
}

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

export default function ParkingSpacesOverTime(props: Props) {
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const [failedLoadingSpaces, setFailedLoadingSpaces] = useState(false);

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
            setSelectedDate(dates[0]);
        }
    }, [dates]);

    const fetchData = async () => {
        setFailedLoadingSpaces(false);
        try {
            const response = await fetch(`https://api.opendata.je/v1/carparks/spaces/dates/${selectedDate}`);
            setData(((await response.json()).results).reverse());
        } catch (e) {
            console.error("Error fetching carpark spaces:", e);
            setFailedLoadingSpaces(true);
        }
    }

    const fetchDates = async () => {
        setFailedLoadingSpaces(false);
        try {
            const response = await fetch("https://api.opendata.je/v1/carparks/spaces/dates");
            setDates((await response.json()).results);
        } catch (e) {
            console.error("Error fetching carpark spaces:", e);
            setFailedLoadingSpaces(true);
        }
    };

    const formatChartData = () => {
        const groupedData = data.reduce((acc, item) => {
            const { name, createdAt, spaces } = item;
            if (!acc[name]) {
                acc[name] = [];
            }
            acc[name].push({ createdAt, spaces });
            return acc;
        }, {});

        const datasets = Object.keys(groupedData).map(carParkName => ({
            label: carParkName,
            data: groupedData[carParkName].map(item => item.spaces),
            borderColor: getRandomColor(),
            backgroundColor: "rgba(0,0,0,0)", // Transparent background
        }));

        const uniqueTimes = Array.from(new Set(data.map(item => new Date(item.createdAt).toLocaleTimeString())));

        return {
            labels: uniqueTimes,
            datasets
        }
    }

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div>
            {!failedLoadingSpaces ? (
                <>
                    <div className={styles.parkingSpacesDates}>
                        {dates.map(date => (
                            <div
                                key={date}
                                className={styles.parkingSpaceDateItem}
                                style={{
                                    backgroundColor: date === selectedDate ? "black" : "#ececec",
                                    color: date === selectedDate ? "white" : "black"
                                }}
                                onClick={() => setSelectedDate(date)}
                            >
                                <span>{new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}</span>
                            </div>
                        ))}
                    </div>

                    {selectedDate ? <p style={{ marginTop: "10px", marginBottom: 0 }}>Showing {new Date(selectedDate).toDateString()}</p> : false}

                    <Line
                        data={formatChartData()}
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
                                }
                            }
                        }}
                    />
                </>
            ) : (
                <div className={styles.failedLoadingSpaces}>
                    <p>Failed to load carpark spaces</p>
                    <button onClick={() => fetchDates()}>Retry</button>
                </div>
            )}
        </div>
    )
}