module.exports = function(RestApp, helper) {
	/**
	 * [getAllDestination description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getAllDestination = function(postJSON, cb) {
		console.log('---Triggering getAllDestination with: %j', postJSON);
		helper.getSearchDataSource().fetchAllDestinations(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getAllDestination');
		});
	};
	helper.registerRemoteMethod('getAllDestination');

	/**
	 * Autosuggest
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getDestinations = function(postJSON, cb) {
		console.log('---Triggering getDestinations with: %j', postJSON);
		helper.getSearchDataSource().findDestinations(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'findDestinations');
		});
	};
	helper.registerRemoteMethod('getDestinations');
};