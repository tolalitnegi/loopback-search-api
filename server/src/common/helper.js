module.exports = function helper(restApp) {
	this.restApp = restApp;
	/**
	 * Method for handling success callback of hybris service
	 * @param  {[type]}   err      [description]
	 * @param  {[type]}   response [description]
	 * @param  {[type]}   context  [description]
	 * @param  {Function} cb       [description]
	 * @param  {[type]}   intiator [description]
	 * @return {[type]}            [description]
	 */
	this.commonSuccessHandler = function(err, response, context, cb, intiator) {

		console.log('Completed call for URL : ' + (context)?context.request.href : ' please check IP Address of Server');
		if (err) {
			response = [];
		}
		console.log('Success Response length : ' + response.length );
		//console.log(response);
		cb(null, response);
	};

	/**
	 * returns the rest connector datasource 
	 * @return {[type]} [description]
	 */
	this.getSearchDataSource = function() {
		return this.restApp.app.dataSources.TUIHybrisRestDS;
	};

	/**
	 * Expose the method as restful service , mapping with
	 * method and path
	 * @param  {[type]} path   [description]
	 * @param  {[type]} method [description]
	 * @return {[type]}        [description]
	 */
	this.registerRemoteMethod = function(path, method) {
		if (!method) {
			method = path;
		}
		this.restApp.remoteMethod(path, {
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


}