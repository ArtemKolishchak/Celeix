$(document).ready(function() {

    // Open Mob Menu
  
      $(".header__toggle").on("click", function(e) {
          e.preventDefault();
          $(".header-mob").slideToggle();
          $(this).toggleClass("header__toggle--active");
      });
  
    // Banner Slider
  
    $('.banner__slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        fade: true,
        cssEase: 'linear',
        appendDots: $(".banner__dots"),
        prevArrow: $(".banner-prev"),
        nextArrow: $(".banner-next"),
        responsive: [
          {
            breakpoint: 2500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
              dots: false
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              dots: true
            }
          }
        ]
      }); 
    });