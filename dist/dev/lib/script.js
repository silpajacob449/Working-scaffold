



$(function () {
    
    $('.hamburger').on('click', function() {
        $(this).find('.hamburger--line').toggleClass('hamburger--line__x');
        $(this).next('.nav-right').find('#navigation').slideToggle();
    });
    
});


////sticky header
$(document).ready(function(){
	$(document).scroll(function(e){	  
		var scrollTop = $(document).scrollTop();
	 
		if(scrollTop > 120){
			//console.log(scrollTop);
			$('.main-header').addClass('sticky');
	
		} else {
			$('.main-header').removeClass('sticky');
	
		}
	});






	///slider
	$("#owl-one").owlCarousel({
        margin: 0,
        nav: !1,
        items: 1,
        dots: !0,
        loop: !0,
        autoplay: !0,
        smartSpeed: 1e3,
        autoplayTimeout: 1e4,
        touchDrag: !1,
        mouseDrag: !1,
        animateOut: "fadeOut"
    })
});


