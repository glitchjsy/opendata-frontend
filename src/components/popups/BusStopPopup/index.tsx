import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import config from "../../../../config.json";

export default function BusStopPopup({ location }) {
    const [departures, setDepartures] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchDepartures();
    }, [location]);

    async function fetchDepartures() {
        try {
            const response = await fetch(`${config.apiUrl}/v1/bus/stops/${location.stopNumber}`);

            if (!response.ok) {
                setError(true);
                return;
            }

            const data = await response.json();
            setDepartures(data?.results?.departures || []);
        } catch (e: any) {
            setError(true);
            console.error(e);
        }
    }

    function getEtaMinutes(eta: string) {
        const etaDate = new Date(eta);
        const now = new Date();
        const diff = Math.round((etaDate.getTime() - now.getTime()) / 60000);
        return diff <= 0 ? "<1 min" : `${diff} min`;
    }

    function formatTime(eta: string) {
        const date = new Date(eta);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <div className={styles.popup}>
            <p className={styles.name}>{location.name} ({location.stopNumber})</p>
            {location.shelter ? (
                <p className={styles.shelterAvailable}>Shelter available</p>
            ) : (
                <p className={styles.shelterUnavailable}>Shelter not available</p>
            )}

            <p className={styles.departuresTitle}>Departures</p>
            {error ? (
                <p className={styles.departuresError}>An error has occurred</p>
            ) : (
                <table className={styles.departuresTable}>
                    <thead>
                        <tr>
                            <th>ETA</th>
                            <th>Time</th>
                            <th>Route</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departures.map((departure, index) => (
                            <tr key={index}>
                                <td>{getEtaMinutes(departure.eta)}</td>
                                <td>{formatTime(departure.eta)}</td>
                                <td>{departure.serviceNumber}</td>
                                <td>{departure.destination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
