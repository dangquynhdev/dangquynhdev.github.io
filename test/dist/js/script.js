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
		$scrolltopFooter = $('.js-scrolltopFooter'),
		$side = $('.js-overlay-side'),
		$jsScrollTrigger = $('.js-scroll-trigger'),
		$jsFirstviewAnimation = $('.js-firstview-animation'),
		$headerHeight,
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

	function headerHeight() {
		$headerHeight = $header.outerHeight();
	}
	headerHeight();
	$(window).on("load", function() {
		$('.p-anchor').html($('.p-anchor').html() + 'load inside ready') 
	})
	$(window).on("scroll", function() {
		$('.p-anchor').html($('.p-anchor').html() + 'scroll inside ready') 
	})
	$(window).on("load scroll", function() {
		$('.p-anchor').html($('.p-anchor').html() + 'load scroll inside ready') 
	})
	function animation() {
		$(window).on("load scroll", function() {
			var scrollTop = $(this).scrollTop();
			var windowHeight = $(window).height();
			var scrollMax = 500;
			if($body.hasClass('page-index')) {
				scrollMax = windowHeight;
			}
			// side + header
			if(scrollTop > scrollMax) {
				$scrolltopFooter.addClass('is-fadeUp')
				$header.addClass('is-fixed')
			} else {
				$scrolltopFooter.removeClass('is-fadeUp')
				$header.removeClass('is-fixed')
			}
			if ( $('body').hasClass('page-index')) {
				if(scrollTop > 100) {
					$side.addClass('is-fadeUp')
				} else {
					$side.removeClass('is-fadeUp')
				}
			} else {
				$side.addClass('is-fadeUp')
			}
		
			if(scrollTop + windowHeight  > $footer.offset().top) {
				$side.css('bottom', scrollTop + windowHeight - $footer.offset().top + 20 + 'px');
			} else {
				$side.css('bottom', '');
			}
			// display each content
			$jsScrollTrigger.each(function() {
				$(this).css('transition-delay', ($(this).data('delay'))? $(this).data('delay')+'s' : '0s')
				if (scrollTop > $(this).offset().top - ($(window).height() * 7.5 / 10)) {
					$(this).addClass('is-active');
				}
			});
		})
	}
	
//
// scroll trigger
//------------------------------------
animation();


//
// swiper
//------------------------------------
if($('.js-modal-swiper').length != 0) {
	$('.js-modal-swiper').each(function() {
		
		let $nextEl = $(this).closest('.p-modal__swiper').find('.js-modal-slide__arrowR')[0]
		let $prevEl = $(this).closest('.p-modal__swiper').find('.js-modal-slide__arrowL')[0];
		// options
		let modalSwiper = new Swiper(this, {
			slidesPerView: 1,
			spaceBetween: 20,
			observer: true,
            observeParents: true,
            parallax:true,
			loop: true,
			navigation: {
				nextEl: $nextEl,
				prevEl: $prevEl,
			},
		});
		// $(window).on('resize orientationchange', function() {
		// 	modalSwiper.update()
		// })
	})
}


//
// スムーススクロール
//------------------------------------
	// ページ内リンク要
	$('a[href^="#"], area[href^="#"]').not('a[href="#"], area[href="#"]').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
			headerHeight();
			var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
			var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
			if ($target) {
				var targetOffset = $target.offset().top - $headerHeight - 30;
				$('body,html').stop().animate({
					scrollTop: targetOffset
				}, 500);
				return false;
			}
		}
	});


//
// header-menu-sp
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


//
// tabs
//------------------------------------
$('.js-tabs li').click(function(){
	$('.js-tabs li').removeClass('is-active');
	$(this).addClass('is-active');
	var index = $(this).index();
	var item = $('.js-tabItems .js-tabItem');
	item.hide();
	item.eq(index).show();

	//タブごとにリンクの切り替え
	if($(this).attr("id") == "all"){
		$("#active_tab").attr("href", "./news/?tab=all");
	}else if($(this).attr("id") == "notice"){
		$("#active_tab").attr("href", "./news/?tab=notice");
	}else if($(this).attr("id") == "doctor"){
		$("#active_tab").attr("href", "./news/?tab=doctor");
	}else if($(this).attr("id") == "staff"){
		$("#active_tab").attr("href", "./news/?tab=staff");
	};
})

//
// accordion
//------------------------------------
$('.js-accordion').click(function () {
	$(this).next().slideToggle();
	$(this).toggleClass('is-close');
})


//
// scrolltop
//------------------------------------
	$scrolltop.click(function() {
		$('body,html').stop().animate({
			scrollTop: 0
		}, 800);
		return false;
	})


//
// modal
//------------------------------------
	var $modalTrigger = $('.js-modal-trigger'),
	$modalClose = $('.js-modal-close'),
	$modal = $('.js-modal')

	$modalTrigger.click(function(){
		if($(this).data('modal')) {
			dataModal = $(this).data('modal');
			$modal = $('.js-modal[data-modal="'+ dataModal +'"]')
			$('html').css('overflow', 'hidden')
			$modalSwiper = $modal.find('.js-modal-swiper');
			$modal.fadeIn();
			if($modalSwiper.length != 0) {
				$index = $(this).parent().index() + 1;
				$modalSwiper[0].swiper.slideTo($index, 0)
			}
			return false;
		}
	})
	$modalClose.click(function(){
		$(this).closest('.js-modal').fadeOut();
		$('html').css('overflow', '')
	})
});




// ページ外リンクで#の位置へ飛ぶ
$(window).on('load', function() {
	$('.p-anchor').html($('.p-anchor').html() + 'load outside  ready') 
	var $jsFirstviewAnimation = $('.js-firstview-animation');

	if (location.hash && $(location.hash).length != 0) {
		var targetOffset = $(location.hash).offset().top  - $('.l-header').outerHeight() - 30;
		setTimeout(function() {
			$('body,html').stop().animate({
				scrollTop: targetOffset
			}, 200);
		})
	}

	// first view
	$jsFirstviewAnimation.each(function() {
		let delayTime = '0s';
		if ($(this).data('delay') != undefined) {
			delayTime = $(this).data('delay')+'s';
		}
		$(this).css('transition-delay', delayTime)
		$(this).addClass('is-active');
	});
})
