var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

function closeCookie() {
  $('.cookiePolicy').removeClass('.cookiePolicy').addClass('cookiePolicy-2');
}
(function() {
  $(document).ready(function() {
    var slickOpts = {
      dots: true,
      infinite: true,
      speed: 800,
      arrows: false,
      autoplay: true
    };

    var slickOpts2 = {
      dots: true,
      infinite: true,
      speed: 800,
      customPaging: function(slider, i) {
        var title = $(slider.$slides[i]).data('title');
        return '<a><h6>'+title+'</h6></a>';
      }
    };

    var slickOpts3 = {
      dots: true,
      infinite: true,
      speed: 800,
      autoplay: true,
      fade: true
    };

    var slickOpts4 = {
      infinite: true,
      autoplaySpeed: 2500,
      speed: 800,
      arrows: true,
      autoplay: true
    };

    $('.single-item').slick(slickOpts2);
    $('.single-item-2').slick(slickOpts);
    $('.single-item-3').slick(slickOpts4);
    $('.single-item-4').slick(slickOpts3);
    
    bindPollAnswerAltTrigger();

    $('.single-item-3').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('iframe').each(function(){
          $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
      });
    });

    $('.single-item-3 .slick-arrow').click(function(){
      $('.single-item-3').slick('slickPause');
    });
  });
})();


function setActiveTab(tab) {}

/** STICKY HEADER **/

$(document).ready(function() {
  pollVote();
  initPageAnim();
  downloadPDFmodal();
  wechatModal();
  formSubmit();
  $('html').easeScroll();
  // console.log('ready');

  var width = $(window).width();
  var s = $('#stickyHeader');
  var pos = s.position();
  var hitachiLogo = $('.hitachi-scroll');
  $(window).scroll(function() {
    var windowpos = $(window).scrollTop();
    if (windowpos >= 154) {
      s.addClass('stick');
      hitachiLogo.addClass('scrolled');
    } else {
      s.removeClass('stick');
      hitachiLogo.removeClass('scrolled');
    }
  });

  if (width <= 992) {
    $('.carousel-indicators').click(function() {
      $('.carousel-indicators a').css('display', 'block');
      // console.log('click main');
    });

    $('#select-1').on('click', function(f) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children('a').removeClass('show');
      } else {
        $(this).addClass('active');
        $(this).children('a').addClass('show');
      }
    });

    $('#select-1 a').on('click', function(f) {
      if ($(this).hasClass('active')) {
      } else {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      }
    });

    $('.carousel-indicators a').click(function() {
      // console.log($('.carousel-indicators').height());
      if ($('.carousel-indicators').height() > 0) {
        // console.log('height > 0');
        // $(".carousel-indicators").height('0px');
        $('.carousel-indicators').animate(
          {
            scrollTop: 0
          },
          400
        );
        $('.carousel-indicators').removeClass('noHeight');
      } else {
        // $(".carousel-indicators").height('auto');
        $('.carousel-indicators').addClass('noHeight');
      }
    });
  } else {
  }

  // $('.map-location-marker').hover(over, out);

  // function over() {
  //     TweenMax.to($(this).find('.bubble'), 0.3, { opacity: 1, y: 0, scale: 1, ease: Expo.easeInOut });
  //     // TweenMax.to($(this) ,0.3,{zIndex: 10});
  //     $('body').removeClass('blinked');
  //     $(this).addClass('mouseOn');

  //     // dotsAnimations.kill();

  // }

  // function out() {
  //     TweenMax.to($(this).find('.bubble'), 0.3, { opacity: 0, y: 5, scale: 0, ease: Expo.easeInOut });
  //     // TweenMax.to($(this) ,0.3,{zIndex: 10});
  //     // dotsAnimations.resume();
  //     $('body').addClass('blinked');
  //     $(this).removeClass('mouseOn');
  // }

  $('#content-page .single-item .slick-prev').attr(
    'onclick',
    "ga('send', 'event', 'carousel', 'click', 'carousel-arrowleft');"
  );

  $('#content-page .single-item .slick-next').attr(
    'onclick',
    "ga('send', 'event', 'carousel', 'click', 'carousel-arrowright');"
  );
});

function socialButton() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 300) {
      $('.social-button').addClass('scrolled');
    } else {
      $('.social-button').removeClass('scrolled');
    }
  });
}

function readCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
$(window).resize(function() {
  // videoRemove();
  menubar();
});

$(window).load(function() {
  if (isMobile.any()) {
    $('.hero-image .background').remove('video');
  } else {
  }
});
$(document).ready(function() {
  // videoRemove();
  elementAnimation();
  menubar();
  socialMedia();
  // console.log(sessionStorage.getItem('advertOnce') + ">>>> ADVERT ONCE");
  // mapItems();

  // Remove video
  if ('ontouchstart' in window) {
    $('.hero-image .background video').remove();
  } else {
  }
  $('.back-to-top').on('click', function(e) {
    // console.log('test');
    e.preventDefault();
    $('html,body').animate(
      {
        scrollTop: 0
      },
      700
    );
  });

  $('#advert-once').on('click', function() {
    $('#advert-once').hide();
  });
  $('#advert-btn').on('click', function() {
    $('.feature-content').slideToggle();
  });

  $('.icon-close').on('click', function() {
    $('.feature-content').slideUp();
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) $('.scrollup').fadeIn();
    else $('.scrollup').fadeOut();
  });

  $('.scrollup').click(function() {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      600
    );
    return false;
  });

  $('.cross').hide();
  $('.menu').hide();
  $('.hamburger').on('click', function() {
    $('.menu').slideToggle('slow', function() {
      $('.hamburger').hide();
      $('.cross').show();
    });
  });

  $('.cross').on('click', function() {
    $('.menu').slideToggle('slow', function() {
      $('.cross').hide();
      $('.hamburger').show();
    });
  });

  if (readCookie('advertOnce') !== 'true') {
    $('.cookie-container').append(
      '<section class="section-cookie"><div id="advert-once" class="cookiePolicy" style="z-index:100;"> <div style="background-color:#D7EAF4;border-bottom:2px solid #C0D1DA;font-size:12px;text-align:center;color:#333;position:relative;"> <p style="padding:6px 50px 6px 10px;margin:0;">This website uses cookies to store your data, for more information see our  <a href="http://www.economistgroup.com/results_and_governance/governance/privacy" target="_blank" style="text-decoration:underline;color:#0D394D;font-weight:bold;">privacy policy</a> and <a style="text-decoration:underline;color:#0D394D;font-weight:bold;" target="_blank" href="http://www.economist.com/cookies-info">change your settings</a> at any time<a id="close-cookie" onClick="closeCookie();" style="cursor: pointer; cursor: hand;text-decoration:none;color:#0D394D;font-weight:bold;position:absolute;top:6px;right:10px;">Close</a></p></div></div></section>'
    );

    var date = new Date();
    date.setTime(date.getTime() + 60 * 24 * 60 * 60 * 1000);
    var expires = date.toGMTString();
    document.cookie = 'advertOnce=true; expires=' + expires + ';';
  }

  $('#advert-once .advert-button').on('click', function() {
    $('#advert-once').hide();
  });

  $('#reset-session').on('click', function() {
    var date = new Date();
    date.setTime(date.getTime() + 300 * 24 * 60 * 60 * 1000);
    var expires = date.toGMTString();
    document.cookie = 'advertOnce=false; expires=' + expires + ';';
    // console.log('click 1');
  });

  $('#close-cookie').on('click', function() {
    $('.cookie-container').css({
      'margin-top': '0px',
      'transition-duration': '0.5s'
    });
  });

  $('[data-fancybox]').fancybox({
    slideShow: false,
    fullScreen: false,
    thumbs: false,
    infobar: false
  });
});

function elementAnimation() {
  var $animation_elements = $('.animation-element');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = window_top_position + window_height;

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = element_top_position + element_height;

      //check to see if this current container is within viewport
      if (
        element_bottom_position >= window_top_position &&
        element_top_position <= window_bottom_position
      ) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');
}

function menubar() {
  var winWidth = $(window).width();
  var menuItem = $('.main-menu .menu-bar nrav ul li:nth-child(3) a');
  $('.hamburger-menu').on('click', function() {
    $('.hamburger-menu').toggleClass('active');
    $('.overlay-exit').toggleClass('active');
  });
  $('.overlay-exit').on('click', function() {
    $('.hamburger-menu').toggleClass('active');
    $('.overlay-exit').toggleClass('active');
  });

  $('.main-menu .menu-bar nav ul li').on('click', function() {
    if ($(this).hasClass('active')) {
      $('.main-menu .menu-bar nav ul li').removeClass('active');
    } else {
      $('.overlay-exit-2').addClass('active');
      $('.main-menu .menu-bar nav ul li.active').removeClass('active');
      $(this).addClass('active');
    }
  });
  $('.overlay-exit-2').on('click', function() {
    $('.main-menu .menu-bar nav ul li.active').removeClass('active');
    $('.overlay-exit-2').removeClass('active');
  });

  if (winWidth <= 992) {
    $('.accordion__panel').on('click', function() {
      $(this).toggleClass('accordion__panel--collapsed');
      $(this)
        .children('.accordion__panel-container')
        .toggleClass('accordion__panel-container--collapsed');

      $('.overlay-exit-3').addClass('active');
      // console.log('test');
    });
    $(
      '.navigation__main-navigation-link.navigation__sections-link.navigation--tappable-icon'
    ).on('click', function() {
      $('.hamburger-mobile')
        .toggleClass('balloon--visible')
        .toggleClass('balloon--not-visible');
      $('.overlay-exit-3').addClass('active');
      // console.log('triggered');
    });
  } else {
    $('.navigation__main-navigation-link--search').on('click', function() {
      $('.navigation__primary-inner').addClass('hide');
      $('.navigation__search.navigation__search--top-of-page').removeClass(
        'hide'
      );
    });
    $(
      '.navigation__search .navigation__search-close-button'
    ).on('click', function() {
      $('.navigation__primary-inner').removeClass('hide');
      $('.navigation__search.navigation__search--top-of-page').addClass('hide');
    });

    $('.topics-menu').on('click', function() {
      $(this)
        .toggleClass('balloon--visible')
        .toggleClass('balloon--not-visible');
      $('.balloon-content');
      $('.more-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.login-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.overlay-exit-3').addClass('active');
      if ($('.overlay-exit-3').hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    });
    $('.more-menu').on('click', function() {
      $(this)
        .toggleClass('balloon--visible')
        .toggleClass('balloon--not-visible');
      $('.topics-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.login-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');

      $('.overlay-exit-3').addClass('active');
    });
    $('.login-menu').on('click', function() {
      $(this)
        .toggleClass('balloon--visible')
        .toggleClass('balloon--not-visible');
      $('.topics-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.more-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.overlay-exit-3').addClass('active');
    });
    $('.overlay-exit-3').on('click', function() {
      $('.topics-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.more-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.login-menu.balloon--visible')
        .removeClass('balloon--visible')
        .addClass('balloon--not-visible');
      $('.overlay-exit-3').removeClass('active');
    });
  }
}

function mapItems() {
  var mapItem = $('.carousel-inner .item');
  mapItem.on('click', function() {
    if ($(this).hasClass('active')) {
      mapItem.removeClass('active');
    } else {
      $('.carousel-inner .item.active').removeClass('active');
      $(this).addClass('active');
    }
  });

  var $container = $('.dropdown-menu'),
    $list = $('.dropdown-menu ul'),
    listItem = $list.find('li');

  $('.dropdown .title').click(function() {
    if ($container.height() > 0) {
      closeMenu(this);
    } else {
      openMenu(this);
    }
  });

  $('.dropdown-menu li').click(function() {
    closeMenu(this);
  });

  function closeMenu(el) {
    $(el)
      .closest('.dropdown')
      .toggleClass('closed')
      .find('.title')
      .text($(el).text());
    $container.css('height', 0);
    $list.css('top', 0);
  }

  function openMenu(el) {
    $(el).parent().toggleClass('closed');

    $container
      .css({
        height: 200
      })
      .mousemove(function(e) {
        var heightDiff = $list.height() / $container.height(),
          offset = $container.offset(),
          relativeY = e.pageY - offset.top,
          top =
            relativeY * heightDiff > $list.height() - $container.height()
              ? $list.height() - $container.height()
              : relativeY * heightDiff;

        $list.css('top', -top);
      });
  }
}

function socialMedia() {
  //jQuery
  $(location).attr('href');

  //Pure JavaScript
  var pathname = window.location.pathname;

  $('.twitter-share').sharrre({
    share: {
      // twitter: true
    },
    enableHover: false,
    enableTracking: true,
    click: function(api, options) {
      api.simulateClick();
      api.openPopup('twitter');
    }
  });
  $('.linkedin-share').sharrre({
    share: {
      // linkedin: false
    },
    enableHover: false,
    enableTracking: true,
    click: function(api, options) {
      api.simulateClick();
      api.openPopup('linkedin');
    }
  });
  $('.facebook-share').sharrre({
    share: {
      // facebook: false
    },
    enableHover: false,
    enableTracking: true,
    click: function(api, options) {
      api.simulateClick();
      api.openPopup('facebook');
    }
  });
  $('.google-plus-share').sharrre({
    share: {
      // googlePlus: true
    },
    enableHover: false,
    enableTracking: true,
    click: function(api, options) {
      api.simulateClick();
      api.openPopup('googlePlus');
    }
  });
}

var bg1 = document.querySelector('.bg1');
var bg2 = document.querySelector('.bg2');
var bg3 = document.querySelector('.bg3');

window.addEventListener('scroll', function() {
  var scrolledHeight = window.pageYOffset;

  // bg1.style.backgroundPositionY = (scrolledHeight - bg1.offsetTop) / 1.4 + "px";
  // bg2.style.backgroundPositionY = (scrolledHeight - bg2.offsetTop) / 1.4 + "px";
  // bg3.style.backgroundPositionY = (scrolledHeight - bg3.offsetTop) / 1.4 + "px";
});

function adjustBgDesc() {
  $('.bg-desc').each(function() {
    var parent = $(this).parent('.full-width');
    var ph = parent.height();
    var dh = $(this).height();
    var offset = (ph - dh) / 2;
    $(this).css({ top: offset + 'px' });
  });
}

$(document).ready(function() {
  chartSet();
  $(window).scrollTop(0);
  $(document).ready(function() {
    $('.cta-wrap a[href*=#]').click(function(event) {
      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top
        },
        500
      );
      event.preventDefault();
    });
  });
  var height = $(window).height();
  var width = $(window).width();

  $(window).scroll(function() {
    var x = $(this).scrollTop();
    if (width <= 1024) {
      $(bg1).css(
        'background-position',
        'center -' + (parseInt(x / 5) - 180) + 'px'
      );
      $(bg2).css(
        'background-position',
        'center -' + (parseInt(x / 5) - 380) + 'px'
      );
      $(bg3).css(
        'background-position',
        'center -' + (parseInt(x / 13) + 5) + 'px'
      );
    } else {
      $(bg1).css(
        'background-position',
        'center -' + (parseInt(x / 4) - 220) + 'px'
      );
      $(bg2).css(
        'background-position',
        'center -' + (parseInt(x / 4) - 420) + 'px'
      );
      $(bg3).css(
        'background-position',
        'center -' + (parseInt(x / 4) - 920) + 'px'
      );
    }
  });
  adjustBgDesc();
});
$(window).load(function() {
  adjustBgDesc();
});
$(window).resize(function() {
  adjustBgDesc();
});

/** AMMENDS JUNE 16 **/

$(document).ready(function() {
  if ($(window).width() <= 1024) {
    $('.chart-value').each(function() {
      var countval = $(this).attr('data-chartnum');
      $(this).text(countval);
    });
    TweenMax.to('.pie-label-women, .pie-label-men', 1, {
      opacity: 1,
      ease: Expo.easeOut
    });
  }

});
$('.back-to-top a').click(function() {
  $('html, body').animate(
    {
      scrollTop: 0
    },
    400
  );
});
function initPageAnim(viewport) {
  $('.animated').appear(
    function() {
      var element = $(this);

      var animation = element.data('animation');
      var animationDelay = element.data('delay');
      if (animationDelay) {
        setTimeout(function() {
          element.addClass(animation + ' visible');
          element.removeClass('hiding');
        }, animationDelay);
      } else {
        element.addClass(animation + ' visible');
        element.removeClass('hiding');
      }
    },
    { accY: -50 }
  );
}

var blue_pie = $('.blue-circle'),
  gray_pie = $('.gray-circle');
$(window).load(function() {
  // formSubmit();
});

/*var chart_top = $('#chart-carousel').offset().top,
  chart_bottom = chart_top + $('#chart-carousel').height();
var chart_animated = false;
$(window).scroll(function() {
  var wintop = $(window).scrollTop();
  // console.log(wintop);

  if (
    wintop >= chart_top / 1.5 &&
    wintop < chart_bottom &&
    chart_animated == false &&
    $(window).width() > 1024
  ) {
    chartSet();
    countChart();
    chart_animated = true;
  }

  if (wintop > chart_bottom) {
    chart_animated = false;
  }
});

function chartSet() {
  if ($(window).width() > 1024) {
    TweenMax.set($('.pie-chart'), { rotateZ: -90 });
    TweenMax.set(blue_pie, { drawSVG: '0' });
    TweenMax.set(gray_pie, { drawSVG: '80% 80%' });
  } else {
    TweenMax.set($('.pie-chart'), { rotateZ: -90 });
    TweenMax.set(blue_pie, { drawSVG: '79.5%' });
    TweenMax.set(gray_pie, { drawSVG: '80% 98.8%' });
  }
}*/

function countChart() {
  jQuery('.chart-value').each(function() {
    jQuery(this).prop('Counter', 0).animate(
      {
        Counter: jQuery(this).attr('data-chartnum')
      },
      {
        duration: 2500,
        easing: 'swing',
        step: function(now) {
          jQuery(this).text(Math.ceil(now));
        }
      }
    );
  });

  TweenMax.to(blue_pie, 1.5, { drawSVG: '79.5%' });
  TweenMax.to(gray_pie, 1, { drawSVG: '80% 98.8%', delay: 1.5 });

  TweenMax.to('.pie-label-women, .pie-label-men', 1, {
    opacity: 1,
    ease: Expo.easeOut,
    delay: 3
  });
}

function bindPollAnswerAltTrigger(){
  $('.select-trigger').bind('click',function(){
    var target = $(this).attr('data-key');
    var radioElem = $('input[type="radio"][data-key="'+target+'"]'); 
    var pseudoRadioElem = $('input[type="radio"][data-key="'+target+'"]').next('.pseudo-radio');
    var pseudoRadioElems = pseudoRadioElem.parent().parent().parent().parent().find('.pseudo-radio');
    pseudoRadioElems.removeClass('selected-item');
    pseudoRadioElem.removeClass('selected-item').addClass('selected-item');
    radioElem.prop('checked', true);
  });
}

function downloadPDFmodal() {
  $ = jQuery;

  $('.pdf-link').click(function(e) {
    // e.preventDefault();
    if (!($(this)).hasClass('no-modal')) {
        $('body').addClass('modal-active');
    }
  });

  $('.modal-trigger, .modal-close').click(function() {
    $('body').removeClass('modal-active');
  });
}

function wechatModal() {
  $('.wechat-modal-btn').click(function(ev){
      ev.preventDefault();
      $('body').addClass('wechat-modal-on');
  });

  $('.wechat-modal .modal-trigger, .wechat-modal .modal-close').click(function() {
    if ($('body').hasClass('wechat-modal-on')) {
      $('body').removeClass('wechat-modal-on');
    }
  });
}

function pollVote() {
  $('#poll-1-1').submit(function(e) {
    e.preventDefault();
    var _this = $(this);

    if ($('input[name="eMBA-poll"]').is(':checked')) {
      var _value = $('input[name="eMBA-poll"]:checked').val();

      if (_value) {
// console.log(_value)


        polls.add('poll1', _value);
      }
    }
    // TweenMax.to($('#poll-1-1 .poll-submit-wrap'), 0.5, {
    //   opacity: 0,
    //   ease: Expo.easeInOut,
    //   onComplete: function() {
    //     $('#poll-1-1 .poll-submit-wrap input').css('pointer-events', 'none');
    //   }
    // });
  });

  // 2nd POll graph
  $('#poll-2-1').submit(function(e) {
    e.preventDefault();
    var _this = $(this);

    if ($('input[name="eMBA-poll-2"]').is(':checked')) {
      var _value = $('input[name="eMBA-poll-2"]:checked').val();

      if (_value) {
        polls.add('poll2', _value);
      }
    }

    // TweenMax.to($('#poll-2-1 .poll-submit-wrap'), 0.5, {
    //   opacity: 0,
    //   ease: Expo.easeInOut,
    //   onComplete: function() {
    //     $('#poll-2-1 .poll-submit-wrap input').css('pointer-events', 'none');
    //   }
    // });
  });
}

function formSubmit() {
  $('#newsletter').submit(function(e) {
    e.preventDefault();
    var status = formValidation();
    if (status) {
      var _this = $(this);

      var _name = $('input[name="name"]').val();
      var _email = $('input[name="email"]').val();
      var _noEconomist = ($('input[name="choice1"]').is(':checked')) ? 1 : 0;
      var _noHKUST = ($('input[name="choice2"]').is(':checked')) ? 1 : 0;

      if (_name && _email) {
        subscribe.add(_name,_email,_noEconomist,_noHKUST);
        onclick="ga('send', 'event', 'formsubmit', 'click', 'formsubmit');"
        $('.modal-box').addClass('thankyou');
      }
    }
  });
}

function keyPressValidation() {
  $('.modal-content-pdf input').each(function() {
    var input = $(this);
    if (input.attr('type') && input.attr('type') === 'text') {
      keyLetterValidation(input);
    }
    if (
      input.attr('type') &&
      (input.attr('type') === 'tel' || input.attr('type') === 'number')
    ) {
      keyNumberValidation(input);
    }
  });
}

function formValidation() {
  var formStatus = false,
    errorClass = 'error-validation',
    wrapper = $('.modal-content-pdf'),
    inputWrap = wrapper.find('.input-wrapper');
  inputWrap.each(function() {
    var input = $(this).find('input');

    if (input.attr('type') && input.attr('type') !== 'submit') {
      var status = checkEmptyField(input, errorClass);
      if (!status) {
        if (input.attr('type') === 'email') {
          checkEmailField(input, errorClass);
        }
      }
    }
  });

  var errorWrap = wrapper.find('.' + errorClass);
  return errorWrap.length === 0 ? true : false;
}

function checkEmptyField(el, errorClass) {
  var isEmpty;
  if (el.val() === '') {
    el.parent().addClass(errorClass);
    isEmpty = true;
  } else {
    el.parent().removeClass(errorClass);
    isEmpty = false;
  }
  return isEmpty;
}

function checkEmailField(el, errorClass) {
  var isValid;
  if (!validateEmail(el.val())) {
    el.parent().addClass(errorClass);
    isValid = true;
  } else {
    el.parent().removeClass(errorClass);
    isValid = false;
  }
  return isValid;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function keyLetterValidation(el) {
  el.bind('keypress', letterValidation);
}

var spaceCount = 0;

function letterValidation(event) {
  if (event.keyCode !== 9) {
    if (event.keyCode == 32) {
      spaceCount++;
      if (spaceCount >= 2) {
        return false;
      } else {
        return true;
      }
    } else {
      var value = String.fromCharCode(event.which);
      var pattern;
      pattern = new RegExp(/[a-zA-Z\-,\.\s]/i);
      spaceCount = 0;
      return pattern.test(value);
    }
  }
}
