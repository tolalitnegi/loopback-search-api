module.exports = function(RestApp, helper) {
	/**
	 * validate results
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.checkResultsAvaliablity = function(postJSON, cb) {
		console.log('---Triggering checkResultsAvaliablity with: %j', postJSON);
		helper.getSearchDataSource().checkResults(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'checkResultsAvaliablity');
		});
	};
	helper.registerRemoteMethod('checkResultsAvaliablity', 'checkResultsAvaliablity');
	/**
	 * Get Result in  HTML Format
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getResults = function(searchdata, cb) {
		console.log('---Triggering fetchResults with: %j', searchdata);

		helper.getSearchDataSource().fetchResults(searchdata, function(err, response, context) {
			console.log('context' + context.request.href)
			response = trimData(response);
			helper.commonSuccessHandler(err, response, context, cb, 'fetchResults');
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

	RestApp.remoteMethod('getResults', {
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

	RestApp.getSearchResults = function(postJSON, cb) {
		console.log('---Triggering fetchResults with: %j', postJSON);

		helper.getSearchDataSource().getResultsData(postJSON, function(err, response, context) {
			console.log('context' + context.request.href)
			helper.commonSuccessHandler(err, response, context, cb, 'getResultsData');
		});
	};

	helper.registerRemoteMethod('getSearchResults');

	RestApp.filterResults = function(postJSON, cb) {
		console.log('---Triggering getDestinations with: %j', postJSON);
		helper.getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'filterResults');
		});
	};

	helper.registerRemoteMethod('filterResults');

	RestApp.filterSearchResults = function(postJSON, cb) {
		console.log('---Triggering filterSearchResults------ with: %j', postJSON);
		helper.getSearchDataSource().filterSearchResultsFromHybris(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'filterSearchResults');
		});
	};

	helper.registerRemoteMethod('filterSearchResults');

	RestApp.sortResults = function(postJSON, cb) {
		console.log('---Triggering sortResults with: %j', postJSON);
		helper.getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'sortResults');
		});
	};

	helper.registerRemoteMethod('sortResults');

	RestApp.showNextPage = function(postJSON, cb) {
		console.log('---Triggering showNextPage with: %j', postJSON);
		helper.getSearchDataSource().getChangedResults(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'showNextPage');
		});
	};

	helper.registerRemoteMethod('showNextPage');
};