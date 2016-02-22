module.exports = function(RestApp, helper) {
	/**
	 * [getSeatsAndRoomsData description]
	 * @param  {[type]}   postJSON [description]
	 * @param  {Function} cb       [description]
	 * @return {[type]}            [description]
	 */
	RestApp.getAccomodationDetails = function(accomodationid, cb) {
		console.log('---Triggering getAccomodationDetails with: %j', accomodationid);
		helper.getSearchDataSource().getAccomDetails(accomodationid, function(err, response, context) {
			helper.commonSuccessHandler(err, response, context, cb, 'getAccomDetails');
		});
	};

	RestApp.remoteMethod('getAccomodationDetails', {
		http: {
			path: '/getAccomodationDetails/:accomodationid',
			verb: 'GET'
		},
		accepts: [{
			arg: 'accomodationid',
			type: 'string'
		}],
		returns: {
			root: 'true',
			type: 'object'
		}
	});
};