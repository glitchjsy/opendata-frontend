import React from "react";

export default function EVChargerMarker({ location }) {
    const statuses = location.connectors.map(c => c.currentStatus.operativeStatus);

    let icon;

    if (statuses.every(status => status !== "Available")) {
        icon = "/img/maps/ev-charger-red.png"; // None available
    } else if (statuses.some(status => status === "Available") && statuses.some(status => status !== "Available")) {
        icon = "/img/maps/ev-charger-orange.png"; // Some available
    } else {
        icon = "/img/maps/ev-charger.png"; // All available
    }
    return <img src={icon} height="20" width="20" />
}