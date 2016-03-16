(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

var stickyNavTop = $('#canvas2').offset().top;
 
var stickyNav = function(){
var scrollTop = $(window).scrollTop();
      
if (scrollTop > stickyNavTop) { 
    $('#nav2').removeClass('nav2')
    $('#nav2').show(400);
    $('#nav2').addClass('sticky');
    $('.navbarItem').addClass('appear');
} else {
	$('#nav2').hide();
    $('#nav2').removeClass('sticky'); 
    $('.navbarItem').removeClass('appear');
}
};
 
stickyNav();
 
$(window).scroll(function() {
    stickyNav();
});


  }); // end of document ready
})(jQuery); // end of jQuery name space