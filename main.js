var persons = [];
var clickedColors = ['#78746e', '#f3af4e', '#ead1a6', '#4a65ae', '#c28ba4', '#59b9c8', '#7b8f6d'];
var totalPerson = 14;
var cardMargin = 5;
var columnNum = 5;
var rowNum	= 3;
var currentClickNum = 0;
var isFirstLaunch;
var cardWidth, cardHeight;
var randomAnimThread, randomUserThread;

function getScreenSize() {
	cardWidth = (window.innerWidth - (columnNum * cardMargin * 2)) / columnNum;
	cardHeight = (window.innerHeight - (rowNum * cardMargin * 2)) / rowNum;
}

function initView() {
	getScreenSize();
	setCards();
}

function setCards() {
	for (var i = 0; i < totalPerson + 1; i++) {
		var item, index;

		if (i == 7) {
			item = new Card();
			if (isFirstLaunch) {
				$("#body table td:eq(" + i + ")").append(item.getHeader());	
			}
			continue;
		}
			
		index = i > 7 ? i-1 : i;
		if (!(item = persons[index])) {
			item = new Card();				
			persons.push(item);
		}

		if (isFirstLaunch) {
			$(item.getItem()).bind('click', clickCardCallback);
			$("#body table td:eq(" + i + ")").append(item.getItem());	
		}
		
		$(item.getItem()).find('.front p').text(index >= 7 ? i : i+1);
		$(item.getItem()).find('.back h3').text(users[index]['name']);
		$(item.getItem()).find('.back p').text(users[index]['description']);
	}

	isFirstLaunch = false;
	$('.front').css('line-height', cardHeight + 'px');
	$('.card, .transition-front, .transition-back, #title').width(cardWidth);
	$('.card, .transition-front, .transition-back, #title').height(cardHeight);
}

function clickCardCallback() {
	$(this).find('.front').removeClass('transition-front').addClass('transition-back');
	$(this).find('.back').removeClass('transition-back').addClass('transition-front');
	$(this).find('.card').removeClass('transition-card');

	$(this).find('.transition-front').css('background-color', clickedColors[Math.floor(currentClickNum / 2)]);
	currentClickNum++;
}

function startRandomAnim() {
	randomAnimThread = setInterval(function() {
		var index = Math.floor(Math.random() * totalPerson);
		if (index >= 7) {
			index++;
		}

		var cardDOM = $('.card').eq(index);
		cardDOM.addClass('random-anim');
		setTimeout(function() {
			cardDOM.removeClass('random-anim')
		}, 600);
	}, 100);
}

function startRandomUser() {
	randomUserThread = setInterval(function() {
		users.shuffle();
		setCards();
	}, 50);
}

(function() {
	window.addEventListener('resize', function() {
		$('#body .card-container').remove();
		isFirstLaunch = true;
		initView();
	});

	isFirstLaunch = true;
	initView();
	$('#start').bind('click', function(e) {
		e.preventDefault();
		startRandomAnim();
		startRandomUser();
	});
	$('#stop').bind('click', function(e) {
		e.preventDefault();
		clearInterval(randomAnimThread);
		clearInterval(randomUserThread);
		$('.random-anim').removeClass('random-anim');
	});
})();