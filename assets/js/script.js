$(document).ready(function() {
	$('.cover-container').click(function(click) {
		// I dont know why but click event was calling twice, this will solve
		click.stopImmediatePropagation();

		// Check if the click was inside an column
		if ($(click.target).attr('id')) {

			// Change background color to red
			$(click.target).toggleClass('unavaible-lot');
		}
	});
});