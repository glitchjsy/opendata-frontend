/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: "category",
      label: "Information",
      collapsible: false,
      collapsed: false,
      items: [
        "getting-started/index",
        "changelog/index",
        "errors/index",
      ]
    },
    {
      type: "category",
      label: "Endpoints",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Carparks",
          items: [
            "endpoints/carparks/index",
            "endpoints/carparks/lookup",
            {
              type: "category",
              label: "Parking Spaces",
              items: [
                "endpoints/carparks/parking-spaces/index",
                "endpoints/carparks/parking-spaces/list-dates",
                "endpoints/carparks/parking-spaces/all-info-for-date"
              ]
            }
          ]
        },
        {
          type: "category",
          label: "Vehicles",
          items: [
            "endpoints/vehicles/index",
            "endpoints/vehicles/lookup",
            "endpoints/vehicles/colors",
            "endpoints/vehicles/makes",
            "endpoints/vehicles/models"
          ]
        },
        {
          type: "category",
          label: "Buses",
          items: [
            "endpoints/buses/stops",
            "endpoints/buses/stop-info",
            "endpoints/buses/updates",
            "endpoints/buses/updates-minimal"
          ]
        },
        {
          type: "category",
          label: "Charts",
          items: [
            "endpoints/charts/bus-passengers",
            "endpoints/charts/driving-test-results",
            "endpoints/charts/monthly-rainfall",
            "endpoints/charts/road-traffic",
            "endpoints/charts/registered-vehicles"
          ]
        },
        {
          type: "category",
          label: "Freedom of Information",
          items: [
            "endpoints/foi-requests/index",
            "endpoints/foi-requests/authors",
            "endpoints/foi-requests/producers",
            "endpoints/foi-requests/stats",
          ]
        },
        "endpoints/recycling/index",
        "endpoints/defibrillators/index",
        // "endpoints/product-recalls/index",
        "endpoints/toilets/index",
        "endpoints/eatsafe/index"
      ]
    }
  ]
};

module.exports = sidebars;
