import React from "react";
import EatSafePopup from "./components/popups/EatSafePopup";
import RecyclingPopup from "./components/popups/RecyclingPopup";
import ToiletMarker from "./components/markers/ToiletMarker";
import RecyclingMarker from "./components/markers/RecyclingMarker";
import EatSafeMarker from "./components/markers/EatSafeMarker";
import ToiletPopup from "./components/popups/ToiletPopup";
import DefibMarker from "./components/markers/DefibMarker";
import DefibPopup from "./components/popups/DefibPopup";
import BusStopMarker from "./components/markers/BusStopMarker";
import BusStopPopup from "./components/popups/BusStopPopup";
import CarparkMarker from "./components/markers/CarparkMarker";
import CarparkPopup from "./components/popups/CarparkPopup";
import config from "../config.json";
import EVChargerMarker from "./components/markers/EVChargerMarker";
import EVChargerPopup from "./components/popups/EVChargerPopup";

type MapItems = {
    [type in MapItemType]: MapItem;
}

export interface MapItem {
    label: string;
    icon: (item: any) => any;
    popup: (item: any) => any;
    fetchData: () => Promise<any[]>;
}

export type MapItemType = "eatsafe" | "recycling" | "toilet" | "defib" | "busStop" | "carpark" | "evCharger";

export const mapItems: MapItems = {
    eatsafe: {
        label: "Eatsafe ratings",
        icon: (item) => <EatSafeMarker location={item} />,
        popup: (item) => <EatSafePopup location={item} />,
        fetchData: () => _fetchData("eatsafe")
    },
    recycling: {
        label: "Recycling centres",
        icon: (item) => <RecyclingMarker location={item} />,
        popup: (item) => <RecyclingPopup location={item} />,
        fetchData: () => _fetchData("recycling")
    },
    toilet: {
        label: "Public toilets",
        icon: (item) => <ToiletMarker location={item} />,
        popup: (item) => <ToiletPopup location={item} />,
        fetchData: () => _fetchData("toilets")
    },
    defib: {
        label: "Defibrillators",
        icon: (item) => <DefibMarker location={item} />,
        popup: (item) => <DefibPopup location={item} />,
        fetchData: () => _fetchData("defibrillators")
    },
    busStop: {
        label: "Bus stops",
        icon: (item) => <BusStopMarker location={item} />,
        popup: (item) => <BusStopPopup location={item} />,
        fetchData: () => _fetchData("bus/stops")
    },
    carpark: {
        label: "Car parks",
        icon: (item) => <CarparkMarker location={item} />,
        popup: (item) => <CarparkPopup location={item} />,
        fetchData: () => _fetchData("carparks")
    },
    evCharger: {
        label: "EV chargers",
        icon: (item) => <EVChargerMarker location={item} />,
        popup: (item) => <EVChargerPopup location={item} />,
        fetchData: () => _fetchData("ev-stations")
    }
}

async function _fetchData(route: string): Promise<any[]> {
    try {
        const response = await fetch(`${config.apiUrl}/v1/${route}`);

        if (!response.ok) {
            throw new Error("Response was not ok");
        }

        const data = await response.json();
        return data?.results || data;
    } catch (e: any) {
        console.error(`Failed to fetch data for route ${route}: ${e.message}`);
        throw e;
    }
}