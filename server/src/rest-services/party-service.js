module.exports = function(RestApp, helper) {
	/**
	 * [getSeatsAndRoomsData description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getSeatsAndRoomsData = function(postJSON, cb) {
		console.log('---Triggering getSeatsAndRoomsData with: %j', postJSON);
		helper.getSearchDataSource().getSeatsAndRooms(postJSON, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getSeatsAndRoomsData');
		});
	};
	helper.registerRemoteMethod('getSeatsAndRoomsData', 'getSeatsAndRoomsData');
};