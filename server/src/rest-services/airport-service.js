module.exports = function(RestApp, helper) {
	/**
	 * Getting departure airports
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getDepartureAirports = function(postJSON, cb) {
		console.log('---Triggering getDepartureAirports with: %j', postJSON);
		helper.getSearchDataSource().fetchAirports(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getDepartureAirports');
		});
	};
	helper.registerRemoteMethod('getDepartureAirports');
};