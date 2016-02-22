$(document).ready(function(argument) {

	var searchBtn = $('.search-pim-btn'),
		searchInput = $('.search-pim-field'),
		service = searchBtn.data('service');
	searchBtn.on('click', function(e) {
		$('.destinationcard').addClass('hidden');
		$.ajax({
			url: service + '/' + searchInput.val(),
			type: 'get',
			success: function(data) {
				paintPIM(data);
			},
			error: function(error) {

				paintPIM({
					name: 'not found service down',
					desc: 'not found'
				});
			},
		});

	});

	var paintPIM = function(data) {
		if (!data.image) {
			data.image = "http://images.tuinordic.com/travel/images/Blue/Gallery/480-320/gallery_turkey-marmariskusten__0228457_1501260929.jpg";
		}
		$('#hotel-name-link').html(data.name || 'not found');
		$('#hotel-detail').html(data.desc || 'not found');
		$('.destinationcard').removeClass('hidden');
		$('#hotel-image').attr('src',data.image);
	}

});