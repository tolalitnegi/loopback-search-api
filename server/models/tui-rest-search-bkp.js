module.exports = function(TuiRestSearch) {

	/**
	 * Method for handling success callback of hybris service
	 * @param  {[type]}   err      [description]
	 * @param  {[type]}   response [description]
	 * @param  {[type]}   context  [description]
	 * @param  {Function} cb       [description]
	 * @param  {[type]}   intiator [description]
	 * @return {[type]}            [description]
	 */
	var commonSuccessHandler = function(err, response, context, cb, intiator) {
		console.log('--- ' + intiator + ' call completed: isError : ' + err +
			'  else response : ', response);
		if (err) {
			response = [];
		}
		console.log('Success : ' + response.length + response.toString());

		cb(null, response);
	};

	/**
	 * returns the rest connector datasource 
	 * @return {[type]} [description]
	 */
	var getSearchDataSource = function() {
		return TuiRestSearch.app.dataSources.TUIHybrisRestDS;
	};

	/**
	 * Expose the method as restful service , mapping with
	 * method and path
	 * @param  {[type]} path   [description]
	 * @param  {[type]} method [description]
	 * @return {[type]}        [description]
	 */
	var registerRemoteMethod = function(path, method) {
		if (!method) {
			method = path;
		}
		TuiRestSearch.remoteMethod(path, {
			http: {
				path: '/' + path,
				verb: 'POST'
			},
			accepts: [{
				arg: 'postJSON',
				type: 'object',
				http: {
					source: 'body'
				}
			}],
			returns: {
				root: 'true',
				type: 'object'
			}
		});
	};

	/**
	 * Getting departure airports
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getDepartureAirports = function(postJSON, cb) {
		console.log('---Triggering getDepartureAirports with: %j', postJSON);
		getSearchDataSource().fetchAirports(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'getDepartureAirports');
		});
	};
	registerRemoteMethod('getDepartureAirports');

	/**
	 * [getAllDestination description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getAllDestination = function(postJSON, cb) {
		console.log('---Triggering getAllDestination with: %j', postJSON);
		getSearchDataSource().fetchAllDestinations(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'getAllDestination');
		});
	};
	registerRemoteMethod('getAllDestination');

	/**
	 * Autosuggest
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getDestinations = function(postJSON, cb) {
		console.log('---Triggering getDestinations with: %j', postJSON);
		getSearchDataSource().findDestinations(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'findDestinations');
		});
	};
	registerRemoteMethod('getDestinations');

	/**
	 * Get Calendar dates and duration
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getDurations = function(postJSON, cb) {
		console.log('---Triggering getCalendarData with: %j', postJSON);
		getSearchDataSource().getCalendarData(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'getCalendarData');
		});
	};
	registerRemoteMethod('getDurations', 'getDurations');

	/**
	 * [getDepartureDates description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getDepartureDates = function(postJSON, cb) {
		console.log('---Triggering getCalendarData with: %j', postJSON);
		getSearchDataSource().getCalendarData(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'getCalendarData');
		});
	};
	registerRemoteMethod('getDepartureDates', 'getDepartureDates');
	/**
	 * [getSeatsAndRoomsData description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getSeatsAndRoomsData = function(postJSON, cb) {
		console.log('---Triggering getSeatsAndRoomsData with: %j', postJSON);
		getSearchDataSource().getSeatsAndRooms(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'getSeatsAndRoomsData');
		});
	};
	registerRemoteMethod('getSeatsAndRoomsData', 'getSeatsAndRoomsData');
	/**
	 * validate results
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.checkResultsAvaliablity = function(postJSON, cb) {
		console.log('---Triggering checkResultsAvaliablity with: %j', postJSON);
		getSearchDataSource().checkResults(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'checkResultsAvaliablity');
		});
	};
	registerRemoteMethod('checkResultsAvaliablity', 'checkResultsAvaliablity');
	/**
	 * Get Result in  HTML Format
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	TuiRestSearch.getResults = function(searchdata, cb) {
		console.log('---Triggering fetchResults with: %j', searchdata);

		getSearchDataSource().fetchResults(searchdata, function(err, response, context) {
			console.log('context' + context.request.href)
			response = trimData(response);
			commonSuccessHandler(err, response, context, cb, 'fetchResults');
		});
	};

	var trimData = function(html) {
		var hotelDataSIdx = html.indexOf('hotelData');
		html = html.substring(hotelDataSIdx);
		var closingHotelDataIndex = html.indexOf('</script>');
		html = html.substring(0, closingHotelDataIndex);
		html = html.replace("hotelData =", "");
		html = html.replace("};", "}");
		var json = JSON.parse(html);
		json.showMoreService = '/api/TuiRestSearch/showNextPage';
		return json || {};
	};

	TuiRestSearch.remoteMethod('getResults', {
		http: {
			path: '/getResults',
			verb: 'GET'
		},
		accepts: [{
			arg: 'searchdata',
			type: 'string',
		}],
		returns: {
			root: 'true',
			type: 'object'
		}
	});

	TuiRestSearch.filterResults = function(postJSON, cb) {
		console.log('---Triggering getDestinations with: %j', postJSON);
		getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'filterResults');
		});
	};

	registerRemoteMethod('filterResults');

	TuiRestSearch.sortResults = function(postJSON, cb) {
		console.log('---Triggering sortResults with: %j', postJSON);
		getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'sortResults');
		});
	};

	registerRemoteMethod('sortResults');

	TuiRestSearch.showNextPage = function(postJSON, cb) {
		console.log('---Triggering showNextPage with: %j', postJSON);
		getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			commonSuccessHandler(err, response, context, cb, 'showNextPage');
		});
	};

	registerRemoteMethod('showNextPage');

	TuiRestSearch.disableRemoteMethod('getCalendarData', true);
	TuiRestSearch.disableRemoteMethod('findDestinations', true);
	TuiRestSearch.disableRemoteMethod('fetchAllDestinations', true);
	TuiRestSearch.disableRemoteMethod('fetchAirports', true);
	TuiRestSearch.disableRemoteMethod('getSeatsAndRooms', true);
	TuiRestSearch.disableRemoteMethod('checkResults', true);
	TuiRestSearch.disableRemoteMethod('fetchResults', true);



};