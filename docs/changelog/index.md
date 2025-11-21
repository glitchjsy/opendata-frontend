# Changelog

## 2025
---
## November

### Fri 21st 
* Added Petition data fetching and API (in development, not public currently)
* Added [Petition Stats](/charts/other/petition-stats) charts and statistics
* Added Privacy Policy & Terms of Use
* Cleaned up this changelog

### Wed 19th
* Added more Bus APIs
* Added Bus Stop Departures to the [Map](/map)
* Make [Courts Lists](/tools/courts-search) page public
* Add two new parking spaces endpoint docs

### Sun 16th
* Fix FOI Search being case sensitive
* Add courts search page (in testing currently)

### Sat 15th
* Add caching to Bus Stops API endpoint
* Add rate limiting to Bus Stops API endpoint
* API refactoring under the hood
* Design improvements to the [Map](/map)
* Add [Account](/account) page to the navigation bar, along with redirects to [Login](/login) if not logged in
* Actually enforce User Agent requirement on the API
* Add [FOI Requests](/docs/endpoints/foi-requests) API documentation

### Fri 14th 
* Fix CORS issues on the API
* Improve dark mode styles

## October

### Thu 23rd October
* Improve date searching for vehicle endpoints:
  * Removed `startDate`, `endDate` and `dateType` fields
  * Added `firstRegisteredAfter`, `firstRegisteredBefore`, `firstRegisteredInJerseyAfter`, `firstRegisteredInJerseyBefore`
  * Improve query parameter documentation

### Wed 22nd
* Change styling of docs sidebar
* Fix FOI search pagination

### Mon 20th
* Update public toilet data
* Add authenticated vs unauthenticated request status to admin page
* Allow API keys to be passed via query parameter
* Begin work on "My Account" page 
* Change primary colour across the website

### Wed 15th
* Add court data fetching in the background (not yet available via the API until further data is received)
* Fix charts page sidebar new styles on mobile
* Completely rewrite the `data-fetcher` tool

### Mon 13th
* Update base url to `opendata.je` and API url to `api.opendata.je`
* Add FOI requests fetching and API endpoints (documentation coming soon)
* Added [FOI Search](/tools/foi-search) tool
* Add [FOI Stats](/charts/other/foi-stats) charts page
* Fix multiple chart display on desktop
* Add [Parking Stats](/charts/transport/parking-stats) chart page with 1 chart to start off with

### Sat 4th
* Update vehicles data with the latest from June 2025
* Remove `hash` from vehicles endpoint
* Change the response data for the Vehicle Lookup endpoint
* Add [Vehicle Search](/tools/vehicle-search) tool
* Improve display of charts on mobile

### Thu 2nd
* Remove `buildDate` and `tenure` from [Public Toilets](/docs/endpoints/toilets) response as it doesn't really serve a purpose
* Update [Public Access Defibrillators](/docs/endpoints/defibrillators) documentation and backend data to be accurate and change the response
* Improve display of other map popups
* Fix map errors when running in development mode
* Improve [About](/about) page

## September

### Sun 28th
* Rename Bus Passengers chart page
* Added links to the documentation on each chart page
* Add the ability to save charts as an image
* Add new error type to [Errors](/docs/errors) page
* Change error response on API to return status code in the response body
* Updated Bus Passengers data
* Added [Registered Vehicles](/charts/transport/registered-vehicles) chart

### Sat 27th
* Added admin dashboard and user / api token management
* Added authentication
* Added request tracking on the backend
* Start cleaning up things under the hood

### Thu 25th 
* Changed all API respones to return data from a root `results` array / object
* Added documentation for the charts endpoints:
  * [Bus Passengers](/docs/endpoints/charts/bus-passengers)
  * [Driving Test Results](/docs/endpoints/charts/driving-test-results)
  * [Monthly Rainfall](/docs/endpoints/charts/monthly-rainfall)
  * [Road Traffic](/docs/endpoints/charts/road-traffic)
* Updated footer to remove the other projects

## May

### Tue 13th
* Fixed API health check endpoints
* Updated About page
* Improve Footer display using dark mode
* Other small improvements

## April

### Wed 9th
* Added [Monthly Rainfall](/charts/weather/monthly-rainfall) chart
* Better Chart loading state handling in the codebase
* Fix charts API endpoints being out of date
* Change [vehicle makes](/charts/transport/vehicle-makes) table size on charts page

## March

### Tue 25th
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
## December

### Mon 30th
* Added [Clip](https://clip.glitch.je) to the footer
* Begin adding support for a graph to track wait times at Customer & Local Services over time

### Wed 4th
* Added fixed colours for the Parking Spaces Over Time chart (previously it would generate random colours on every request)

### Sun 1st
* Add proper date picker to /charts/transport/parking-over-time chart
* Changed eatsafe fetching job to run every 2 days rather than every hour (it cost a fortune in mapbox tokens!)
* Temporarily disabled coordinate fetching for eatsafe data until mapbox account issues are sorted out
* Added banner to Map page to state that the map is currently not working due to mapbox account issues
* Improve dark theme on chart buttons
* Make glitch.je text in footer actually clickable

## November

### Thu 14th Nov
* Changelog has been created!
* Added GitHub Actions workflow to automatically deploy the site