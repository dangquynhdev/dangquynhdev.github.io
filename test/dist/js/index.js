jQuery(function($) {
	// mainvisual
    const mySwiper = new Swiper('.js-main-swiper', {
		loop: true,
		effect: 'fade',
		speed: 2000,
		pagination: {
			el: '.js-main-swiper__pagination',
			clickable: true,
		},
		autoplay: {
			delay: 4000,
		}
	});
});