# Changelog

## 2025
---
### Wednesday 19th November
* Added more Bus APIs 
* Added Bus Stop Departures to the [Map](/map)
* Make [Courts Lists](/tools/courts-lists) page public

### Sunday 16th November
* Fix FOI Search being case sensitive
* Add courts search page (in testing currently)

### Saturday 15th November
* Add caching to Bus Stops API endpoint
* Add rate limiting to Bus Stops API endpoint
* API refactoring under the hood
* Design improvements to the [Map](/map)
* Add [Account](/account) page to the navigation bar, along with redirects to [Login](/login) if not logged in
* Actually enforce User Agent requirement on the API
* Add [FOI Requests](/docs/endpoints/foi-requests) API documentation

### Friday 14th November
* Fix CORS issues on the API
* Improve dark mode styles

### Thursday 23rd October
* Improve date searching for vehicle endpoints:
  * Removed `startDate`, `endDate` and `dateType` fields
  * Added `firstRegisteredAfter`, `firstRegisteredBefore`, `firstRegisteredInJerseyAfter`, `firstRegisteredInJerseyBefore`
  * Improve query parameter documentation

### Wednesday 22nd October
* Change styling of docs sidebar
* Fix FOI search pagination

### Monday 20th October
* Update public toilet data
* Add authenticated vs unauthenticated request status to admin page
* Allow API keys to be passed via query parameter
* Begin work on "My Account" page 
* Change primary colour across the website

### Wednesday 15th October
* Add court data fetching in the background (not yet available via the API until further data is received)
* Fix charts page sidebar new styles on mobile
* Completely rewrite the `data-fetcher` tool

### Monday 13th October
* Update base url to `opendata.je` and API url to `api.opendata.je`
* Add FOI requests fetching and API endpoints (documentation coming soon)
* Added [FOI Search](/tools/foi-search) tool
* Add [FOI Stats](/charts/other/foi-stats) charts page
* Fix multiple chart display on desktop
* Add [Parking Stats](/charts/transport/parking-stats) chart page with 1 chart to start off with

### Saturday 4th October
* Update vehicles data with the latest from June 2025
* Remove `hash` from vehicles endpoint
* Change the response data for the Vehicle Lookup endpoint
* Add [Vehicle Search](/tools/vehicle-search) tool
* Improve display of charts on mobile

### Thursday 2nd October
* Remove `buildDate` and `tenure` from [Public Toilets](/docs/endpoints/toilets) response as it doesn't really serve a purpose
* Update [Public Access Defibrillators](/docs/endpoints/defibrillators) documentation and backend data to be accurate and change the response
* Improve display of other map popups
* Fix map errors when running in development mode
* Improve [About](/about) page

### Sunday 28th September
* Rename Bus Passengers chart page
* Added links to the documentation on each chart page
* Add the ability to save charts as an image
* Add new error type to [Errors](/docs/errors) page
* Change error response on API to return status code in the response body
* Updated Bus Passengers data
* Added [Registered Vehicles](/charts/transport/registered-vehicles) chart

### Saturday 27th September
* Added admin dashboard and user / api token management
* Added authentication
* Added request tracking on the backend
* Start cleaning up things under the hood

### Thursday 25th September
* Changed all API respones to return data from a root `results` array / object
* Added documentation for the charts endpoints:
  * [Parking Spaces Over Time](/docs/endpoints/charts/parking-over-time)
  * [Bus Passengers](/docs/endpoints/charts/bus-passengers)
  * [Driving Test Results](/docs/endpoints/charts/driving-test-results)
  * [Monthly Rainfall](/docs/endpoints/charts/monthly-rainfall)
  * [Road Traffic](/docs/endpoints/charts/road-traffic)
* Updated footer to remove the other projects

### Tuesday 13th May
* Fixed API health check endpoints
* Updated About page
* Improve Footer display using dark mode
* Other small improvements

### Wednesday 9th April
* Added [Monthly Rainfall](/charts/weather/monthly-rainfall) chart
* Better Chart loading state handling in the codebase
* Fix charts API endpoints being out of date
* Change [vehicle makes](/charts/transport/vehicle-makes) table size on charts page

### Tuesday 25th March
* Published rewrite of REST API
* Changed the following vehicle stats endpoint URLs: `colors`, `makes`, `models`
* Fixed some changelog links below
* Add health check endpoint for `data-fetcher` 
* Changed fetch time for product recalls to every 6 hours
* Add new mapbox token (maps are now fixed!)
* Fix latitude and longitude in bus stops response
* Add coordinates back to eatsafe data endpoint

## 2024
---
### Monday 30th December
* Added [Clip](https://clip.glitch.je) to the footer
* Begin adding support for a graph to track wait times at Customer & Local Services over time

### Wednesday 4th December
* Added fixed colours for the [Parking Spaces Over Time](/charts/transport/parking-over-time) chart (previously it would generate random colours on every request)

### Sunday 1st December
* Add proper date picker to [Parking Spaces Over Time](/charts/transport/parking-over-time) chart
* Changed eatsafe fetching job to run every 2 days rather than every hour (it cost a fortune in mapbox tokens!)
* Temporarily disabled coordinate fetching for eatsafe data until mapbox account issues are sorted out
* Added banner to Map page to state that the map is currently not working due to mapbox account issues
* Improve dark theme on chart buttons
* Make glitch.je text in footer actually clickable

### Thursday 14th November
* Changelog has been created!
* Added GitHub Actions workflow to automatically deploy the site