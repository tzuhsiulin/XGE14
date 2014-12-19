function Card() {
	var headerHTML = '<div class="card-container">' +
						'<div class="card">' + 
							'<div id="title">' +
								'<h1>Xmas</h1>' +
								'<h4>2014</h4>' +
								'<a href="" id="start" class="btn btn-warning">Start</a>' +
								'<a href="" id="stop" class="btn btn-danger">Stop</a>' + 
							'</div>' +
						'</div>' +
					'</div>';

	var itemHTML = '<div class="card-container">' +
				 		'<div class="transition-card card">' +
					 		'<div class="transition-front front">' +
					 			'<p></p>' +
						 	'</div>' + 
							'<div class="transition-back back">' +
								'<h3>Name</h3>'+
								'<p>Description</p>'+
							'</div>' +
						'</div>' +
					'</div>';

	this.itemDOM = $.parseHTML(itemHTML);
	this.headerDOM = $.parseHTML(headerHTML);
}

Card.prototype.getItem = function() {
	return this.itemDOM;
};

Card.prototype.getHeader = function() {
	return this.headerDOM;
}