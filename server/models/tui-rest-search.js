module.exports = function(TuiRestSearch) {
	try {

		var Helper = require('./../src/common/helper');
		var helper = new Helper(TuiRestSearch);

		var AirportService = require('./../src/rest-services/airport-service');
		var airportService = new AirportService(TuiRestSearch, helper);

		var DestinationService = require('./../src/rest-services/destination-service');
		var destinationService = new DestinationService(TuiRestSearch, helper);

		var DateService = require('./../src/rest-services/date-service');
		var dateService = new DateService(TuiRestSearch, helper);

		var PartyService = require('./../src/rest-services/party-service');
		var partyService = new PartyService(TuiRestSearch, helper);

		var ResultService = require('./../src/rest-services/result-service');
		var resultService = new ResultService(TuiRestSearch, helper);

		var PIMService = require('./../src/rest-services/pim-service');
		var pimService = new PIMService(TuiRestSearch, helper);


		TuiRestSearch.disableRemoteMethod('getCalendarData', true);
		TuiRestSearch.disableRemoteMethod('findDestinations', true);
		TuiRestSearch.disableRemoteMethod('fetchAllDestinations', true);
		TuiRestSearch.disableRemoteMethod('fetchAirports', true);
		TuiRestSearch.disableRemoteMethod('getSeatsAndRooms', true);
		TuiRestSearch.disableRemoteMethod('checkResults', true);
		TuiRestSearch.disableRemoteMethod('fetchResults', true);
	} catch (e) {
		console.log("Application Broke: " + e.message);
	}

};