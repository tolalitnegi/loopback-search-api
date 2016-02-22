module.exports = function(RestApp, helper) {
	/**
	 * Get Calendar dates and duration
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getDurations = function(postJSON, cb) {
		console.log('---Triggering getCalendarData with: %j', postJSON);
		helper.getSearchDataSource().getCalendarData(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getCalendarData');
		});
	};
	helper.registerRemoteMethod('getDurations', 'getDurations');

	/**
	 * [getDepartureDates description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getDepartureDates = function(postJSON, cb) {
		console.log('---Triggering getCalendarData with: %j', postJSON);
		helper.getSearchDataSource().getCalendarData(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getCalendarData');
		});
	};
	helper.registerRemoteMethod('getDepartureDates', 'getDepartureDates');
};