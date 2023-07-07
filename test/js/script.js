jQuery(function($) {
//
// var
//------------------------------------
	var $body = $('body'),
		$header = $('.l-header'),
		$footer = $('.l-footer'),
		$menuButton = $('.js-hum-button'),
		$humMenu = $('.js-hum-menu'),
		$scrolltop = $('.js-scrolltop'),
		$breakpoint = 767;


//
// functions
//------------------------------------
	function breakpoints() {
		if( $(window).width() > $breakpoint ) {
			return "pc-tab"
		} else {
			return "sp"
		}
	}

//
// スムーススクロール
//------------------------------------
	// スムーススクロールのリンクをクリックした時の処理
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const header = document.querySelector('header');
				const headerHeight = header.offsetHeight;
				const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});

	window.addEventListener("load", function () {
		if (location.hash) {
		const target = document.querySelector(location.hash);
		const headerHeight = document.querySelector("header").offsetHeight;
		requestAnimationFrame(function () {
			window.scrollTo({
			top: target.offsetTop - headerHeight,
			behavior: "auto",
			});
		});
		}
	});

	
//
// header-menu
//------------------------------------
$menuButton.click(function(){
	if( $(this).hasClass('is-active') ) {
		$(this).removeClass('is-active');
		$humMenu.fadeOut();
		$body.css('overflow-y','scroll')
	} else {
		$(this).addClass('is-active');
		$humMenu.fadeIn();
		$body.css('overflow','hidden');
	}
})

$('.js-plus-minus').click(function(){
	if( $(this).hasClass('is-active')) {
		$(this).removeClass('is-active');
		$(this).siblings('.js-sub-nav').slideUp();
	} else {
		$(this).addClass('is-active');
		$(this).siblings('.js-sub-nav').slideDown();
	}
})

//
// scroll and load trigger
//------------------------------------
	$(window).on("scroll load", function() {
		var scrollTop = $(this).scrollTop();
		var windowHeight = $(window).height();

		//show scroll top
		if(scrollTop > 100) {
			$scrolltop.addClass('is-show')
		} else {
			$scrolltop.removeClass('is-show')
		}

		// set position scroll top relative to footer 
		if(scrollTop + windowHeight - 80 > $footer.offset().top) {
			$scrolltop.css('bottom', scrollTop + windowHeight - $footer.offset().top + 12 + 'px');
		} else {
			$scrolltop.css('bottom', '');
		}
	});

//
// scrolltop
//------------------------------------
	$scrolltop.click(function() {
		$('body,html').stop().animate({
			scrollTop: 0
		}, 800);
		return false;
	})
});
