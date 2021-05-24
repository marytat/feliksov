let navLinks = document.querySelectorAll('.header-menu-item a');
navLinks.forEach(function (nav) {
  nav.onclick = function (event) {
    event.preventDefault();
    let link = nav.getAttribute('href');
    document.getElementById(link).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
});

let htmlElement = document.querySelectorAll('body');
let modalBtns = document.querySelectorAll('.modal-call');
let closeBtns = document.querySelectorAll('.modal-card_close');
let modals = document.querySelectorAll('.modal');

function modalOpen(modal) {
  document.getElementById(modal).classList.add('active');
  htmlElement[0].classList.add('is-clipped');
}

function modalClose(modal) {
  modal.classList.remove('active');
  htmlElement[0].classList.remove('is-clipped');
}

function resetForm(form) {
  let dangerFields = form.querySelectorAll('.has-error');
  let dangerInputs = form.querySelectorAll('.form-field-error');
  form.reset();
  dangerFields.forEach(function (el) {
    el.classList.remove('has-error');
  });
  dangerInputs.forEach(function (el) {
    el.textContent = '';
  });
}

modals.forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    let modalCard = modal.querySelector('.modal-card');
    let isClickInside = modalCard.contains(event.target);
    if (!isClickInside && modal.classList.contains('active')) {
      modalClose(modal);
      if (modalCard.querySelector('form')) {
        resetForm(modalCard.querySelector('form'));
      }
    }
  });
});

modalBtns.forEach(function (btn) {
  btn.onclick = function (event) {
    //event.preventDefault();
    let modal = btn.getAttribute('data-modal');
    modalOpen(modal);
  };
});

closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    let modal = btn.closest('.modal');
    modalClose(modal);
    if (modal.querySelector('form')) {
      resetForm(modal.querySelector('form'));
    }
  };
});

let nextBtns = document.querySelectorAll('.modal-next');

nextBtns.forEach(function (btn) {
  btn.onclick = function () {
    let thisModal = btn.closest('.modal'),
      nextModal = btn.getAttribute('data-modal');
    thisModal.classList.remove('active');
    setTimeout(function () {
      document.getElementById(nextModal).classList.add('active');
    }, 500)
  };
});

$(document).ready(function () {
  //плавная прокрутка к  #
  $('.menu-left_item__link').bind('click', function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 600, function () {
      location.hash = target;
    });
    return false;
  });

  // изменение пункта меню при прокрутке

  $(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    $('.text_block').each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $('.menu-left_item a.active').removeClass('active');
        $('.menu-left_item a').eq(i).addClass('active');
      }
    });
  }).scroll();
  $('.main-slider').slick({
    arrows: true,
    dots: true,
    slidesPerRow: 1,
    rows: 1,
    centerMode: true,
    centerPadding: 0,
    fade: true
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: false,
    focusOnSelect: true
  });

  let slickDotsWidth = $('.slick-dots').width(),
    slickArrowMargin = slickDotsWidth / 2;

  $('.slick-next').css('margin-right', -slickArrowMargin);
  $('.slick-prev').css('margin-left', -slickArrowMargin);

  $(".tab_btn").click(function () {
    if ($(this).hasClass("not_active_tab")) {
      $('.tab_btn').each(function () {
        $(this).toggleClass('button-gray not_active_tab');
      });
      $('.delivery_method').each(function () {
        $(this).toggleClass('hide_form');
      });
      $('.feedback_form').each(function () {
        $(this).toggleClass('hide_form');
      });
    }
  });

  $(".delivery_method__show").click(function () {
    if ($(this).hasClass("map-show")) {
      $(this).text('Скрыть карту');
      $(this).removeClass('map-show');
      $('.delivery_method__showmap').removeClass('hidden');
    } else {
      $(this).text('Показать на карте');
      $(this).addClass('map-show');
      $('.delivery_method__showmap').addClass('hidden');
    }
  });

  $(".burger").click(function () {
    $(this).toggleClass("open");
    $(".menu-mobile").toggleClass("open");
  });
  $(".menu-mobile_personal__title").click(function () {
    $(this).toggleClass("open");
    $(".menu-mobile_personal_list").toggleClass("open");
  });

  $(".menu-footer__title").click(function () {
    if ($(this).parent().hasClass("open")) {
      $(".menu-footer").removeClass("open");
    } else {
      $(".menu-footer").removeClass("open");
      $(this).parent().addClass("open");
    }
  });

  $(".icon-filter").click(function () {
    $('.catalog-filter').toggleClass("open");
  });
  $(".icon-close").click(function () {
    $('.catalog-filter').toggleClass("open");
  });

  $("[data-mask=phone]").mask('+7 (999) 999-99-99', {
    autoclear: false
  }).on('click', function () {
    if ($(this).val() === '+7 (___) ___-__-__') {
      $(this).get(0).setSelectionRange(0, 0);
    }
  });

  $("[data-mask=date]").mask('99.99.9999', {
    autoclear: false
  }).on('click', function () {
    if ($(this).val() === '__.__.____') {
      $(this).get(0).setSelectionRange(0, 0);
    }
  });

  // Валидация имени

  $.validator.addMethod("nameValidate", function (value, element) {
    return /^[А-Яа-яЁё\s]+$/.test(value);
  }, "Только русские буквы");

  // Валидация email

  $.validator.addMethod("emailValidate", function (value, element) {
    return /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
  }, "Формат ввода email@mail.ru");

  // Валидация телефона

  $.validator.addMethod("phoneValidate", function (value, element) {
    return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
  }, "Формат ввода +7 (999) 999-9999");

  var optionsOrderForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      name: {
        required: true
        // nameValidate: true
      },
      email: {
        required: true,
        // email: true,
        emailValidate: true
      },
      phone: {
        required: true,
        phoneValidate: true
      },
      personaldata: {
        required: true
      },
      sms_code: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Представьтесь пожалуйста"
      },
      email: {
        required: "Укажите email",
        email: "Формат ввода email@mail.ru"
      },
      phone: {
        required: "Укажите номер телефона"
      },
      sms_code: {
        required: "Введите код "
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function submitHandler(form) {
      //sendAjaxForm(form);
      $(form).submit(function (event) {
        event.preventDefault();
        $('#modal-order-success').addClass('active');
      });
    }
  };
  $('#product-order').bind('keyup blur click', function () {
    if ($('#product-order').validate(optionsOrderForm).checkForm()) {
      $('#order_submit').removeAttr('disabled');
    } else {
      $('#order_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsDeliverySelfForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      pick_pay_method: {
        required: true
      },
      name: {
        required: true
        // nameValidate: true
      },
      sname: {
        required: true
        // nameValidate: true
      },
      phone: {
        required: true,
        phoneValidate: true
      },
      personaldata: {
        required: true
      },
      sms_code: {
        required: true
      }
    },
    messages: {
      pick_pay_method: {
        required: "Укажите способ оплаты"
      },
      name: {
        required: "Представьтесь пожалуйста"
      },
      sname: {
        required: "Укажите фамилию"
      },
      phone: {
        required: "Укажите номер телефона"
      },
      sms_code: {
        required: "Введите код "
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function submitHandler(form) {
      sendAjaxForm(form);
    }
  };
  $('#delivery_self_form').bind('keyup blur click', function () {
    if ($('#delivery_self_form').validate(optionsDeliverySelfForm).checkForm()) {
      $('#delivery_self_submit').removeAttr('disabled');
    } else {
      $('#delivery_self_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsDeliveryForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      city: {
        required: true
      },
      adress: {
        required: true
      },
      pay_method: {
        required: true
      },
      name: {
        required: true
        // nameValidate: true
      },
      sname: {
        required: true
        // nameValidate: true
      },
      phone: {
        required: true,
        phoneValidate: true
      },
      personaldata: {
        required: true
      },
      sms_code: {
        required: true
      }
    },
    messages: {
      city: {
        required: "Укажите город доставки"
      },
      adress: {
        required: "Укажите адрес доставки"
      },
      pick_pay_method: {
        required: "Укажите способ оплаты"
      },
      name: {
        required: "Представьтесь пожалуйста"
      },
      sname: {
        required: "Укажите фамилию"
      },
      phone: {
        required: "Укажите номер телефона"
      },
      sms_code: {
        required: "Введите код "
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function submitHandler(form) {
      sendAjaxForm(form);
    }
  };
  $('#delivery_form').bind('keyup blur click', function () {
    if ($('#delivery_form').validate(optionsDeliveryForm).checkForm()) {
      $('#delivery_submit').removeAttr('disabled');
    } else {
      $('#delivery_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsCallbackForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      name: {
        required: true
        // nameValidate: true

      },
      phone: {
        required: true,
        phoneValidate: true
      },
      message: {
        required: false
        // minlength: 10

      },
      personaldata: {
        required: true
      },
      sms_code: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Представьтесь пожалуйста"
      },
      email: {
        required: "Укажите email",
        email: "Формат ввода email@mail.ru"
      },
      phone: {
        required: "Укажите номер телефона"
      },
      message: {
        required: "Напишите вопрос"
        // minlength: "Минимальная длина 10 символов"

      },
      personaldata: {
        required: "Дайте согласие "
      },
      sms_code: {
        required: "Введите код "
      }
    },
    submitHandler: function submitHandler(form) {
      // sendAjaxForm(form);
      $(form).submit(function (event) {
        event.preventDefault();
        $('#modal-feedback-success').addClass('active');
      });
    }
  };
  $('#callback_form').bind('keyup blur click', function () {
    if ($('#callback_form').validate(optionsCallbackForm).checkForm()) {
      $('#callback_submit').removeAttr('disabled');
    } else {
      $('#callback_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsPersonForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      surname: {
        required: true
        // nameValidate: true
      },
      name: {
        required: true
        // nameValidate: true
      },
      midlename: {
        required: true
        // nameValidate: true
      },
      birthday: {
        required: true
      },
      email: {
        required: true,
        // email: true,
        emailValidate: true
      },
      gender: {
        required: true
      },
      phone: {
        required: true,
        phoneValidate: true
      },
      personaldata: {
        required: true
      },
      sms_code: {
        required: true
      }
    },
    messages: {
      surname: {
        required: "Представьтесь пожалуйста"
      },
      name: {
        required: "Представьтесь пожалуйста"
      },
      midlename: {
        required: "Представьтесь пожалуйста"
      },
      birthday: {
        required: "Укажите дату рождения"
      },
      email: {
        required: "Укажите email",
        email: "Формат ввода email@mail.ru"
      },
      phone: {
        required: "Укажите номер телефона"
      },
      gender: {
        required: "Укажите пол"
      },
      sms_code: {
        required: "Введите код "
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function submitHandler(form) {
      //sendAjaxForm(form);
      $(form).submit(function (event) {
        event.preventDefault();
        $('#modal-personal-change').addClass('active');
      });
    }
  };
  $('#person_form').bind('keyup blur click', function () {
    if ($('#person_form').validate(optionsPersonForm).checkForm()) {
      $('#person_submit').removeAttr('disabled');
    } else {
      $('#person_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsFeedbackForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      name: {
        required: true
        // nameValidate: true
      },
      email: {
        required: true,
        emailValidate: true
      },
      message: {
        required: true
        // minlength: 10
      },
      personaldata: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Представьтесь пожалуйста"
      },
      email: {
        required: "Укажите email",
        email: "Формат ввода email@mail.ru"
      },
      message: {
        required: "Напишите вопрос"
        // minlength: "Минимальная длина 10 символов"
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function (form) {
      // sendAjaxForm(form);
      $(form).submit(function (event) {
        event.preventDefault();
        $('#modal-feedback-success').addClass('active');
      });
    }
  };
  $('#feedback_form').bind('keyup blur click', function () {
    if ($('#feedback_form').validate(optionsFeedbackForm).checkForm()) {
      $('#feedback_submit').removeAttr('disabled');
    } else {
      $('#feedback_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  var optionsLoginForm = {
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent("div").find("label"));
    },
    rules: {
      phone: {
        required: true,
        phoneValidate: true
      },
      personaldata: {
        required: true
      }
    },
    messages: {
      phone: {
        required: "Укажите номер телефона"
      },
      personaldata: {
        required: "Дайте согласие "
      }
    },
    submitHandler: function (form) {
      // sendAjaxForm(form);
      $(form).submit(function (event) {
        event.preventDefault();
        let loginPhone = $('#login_phone');
        loginPhone.closest('.input_block').addClass('is-disabled');
        loginPhone.attr('disabled', 'disabled');
        loginPhone.next('.note').addClass('hidden');
        loginPhone.closest('form').find('.checkbox_personal').addClass('hidden');
        loginPhone.closest('form').find('input[type="submit"]').addClass('hidden');
        $('#sms_code').closest('.input_block').removeClass('hidden');
      });
    }
  };
  $('#login_form').bind('keyup blur click', function () {
    if ($('#login_form').validate(optionsLoginForm).checkForm()) {
      $('#login_submit').removeAttr('disabled');
    } else {
      $('#login_submit').addClass('button_disabled').attr('disabled', true);
    }
  });

  $('.input_change').click(function (event) {
    event.preventDefault();
    $(this).closest('.input_block').removeClass('is-disabled');
    $(this).closest('.input_block').find('input').removeAttr('disabled');
    $(this).closest('form').find('input[type="submit"]').removeClass('hidden');
    $('#sms_code').closest('.input_block').addClass('hidden');
  });

  $('.sms_code_btn').click(function (event) {
    event.preventDefault();
    //send sms code
    // let request;
    // if (request) {
    //     request.abort();
    // }
    //
    // var serializedData = $(this).serialize();
    // var url = "";//set url
    // var type = "POST";
    //
    // request = $.ajax({
    //     url: url,
    //     type: type,
    //     data: serializedData
    // });
    //
    // request.done(function (response, textStatus, jqXHR) {
    //     if (response.status === "error") {
    //
    //         $(response.errors).each(function (indx, element) {
    //             error += "<p>" + element + "</p>";
    //         });
    //
    //     }
    //     if (response.status === "ok") {
    //         //sms-code sended
    //     }
    // });
    //
    // request.fail(function (jqXHR, textStatus, errorThrown) {
    //     console.error(
    //         "Error: " +
    //         textStatus, errorThrown
    //     );
    // });
    //
    // request.always(function () {
    //     console.log("Request sended");
    // });
  });

  function sendAjaxForm(event) {
    // var request;
    event.preventDefault();
    // $.fancybox.open({
    //   src: '#modal_ans',
    //   type: 'inline'
    // }); 
    //
    // if (request) {
    //     request.abort();
    // }
    //
    // var serializedData = $(this).serialize();
    // var url = $(this).attr("action");
    // var type = $(this).attr("method");
    //
    // request = $.ajax({
    //     url: url,
    //     type: type,
    //     data: serializedData
    // });
    //
    // request.done(function (response, textStatus, jqXHR) {
    //     if (response.status === "error") {
    //
    //         $(response.errors).each(function (indx, element) {
    //             error += "<p>" + element + "</p>";
    //         });
    //
    //     }
    //     if (response.status === "ok") {
    //
    //     }
    // });
    //
    // request.fail(function (jqXHR, textStatus, errorThrown) {
    //     console.error(
    //         "Error: " +
    //         textStatus, errorThrown
    //     );
    // });
    //
    // request.always(function () {
    //     console.log("Request sended");
    // });



  }

  var myMap;
  var placemarkCollections = {};
  var placemarkList = {};

  var shopList = [
    {
      'cityName': 'Санкт-Петербург',
      'shops': [
        { 'coordinates': [59.932464, 30.351801], 'adress': 'Санкт-Петербург, Невский просп., 88', 'timing': 'Пн-вс: 11.00-21.00', 'phone': '8 (800) 222-32-32' },
        { 'coordinates': [60.091361, 30.380358], 'adress': 'Санкт-Петербург, КАД, 117-й километр, внешнее кольцо, 1', 'timing': 'Пн-пт: 9.00-22.00<br/>Сб-вс: 9.30-23.00', 'phone': '8 (800) 222-32-32' }
      ]
    }
  ];

  ymaps.ready(init);
  function init() {

    // Создаем карту
    myMap = new ymaps.Map("map", {
      center: [59.938951, 30.315635],
      zoom: 8,
      controls: [],
      zoomMargin: [20]
    });



    for (var i = 0; i < shopList.length; i++) {

      var cityCollection = new ymaps.GeoObjectCollection();

      for (var c = 0; c < shopList[i].shops.length; c++) {
        var shopInfo = shopList[i].shops[c];

        var html = '<div class="map_point__greet">Ждем в нашем магазине!</div>';
        html += '<div class="map_point__adress">' + shopInfo.adress + '</div>';
        html += '<div class="map_point__phone">' + shopInfo.phone + '</div>';
        html += '<div class="map_point__timing">' + shopInfo.timing + '</div>';

        var shopPlacemark = new ymaps.Placemark(
          shopInfo.coordinates,
          {
            hintContent: shopInfo.adress,
            balloonContent: html
          }, {
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: '../img/map-point.svg',
          // Размеры метки.
          iconImageSize: [58, 72],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-29, -72],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [58, -72],
          hideIconOnBalloonOpen: false
        }
        );

        if (!placemarkList[i]) placemarkList[i] = {};
        placemarkList[i][c] = shopPlacemark;

        // Добавляем метку в коллекцию
        cityCollection.add(shopPlacemark);

        shopPlacemark.events.add('click', function (e) {
          if (!shopPlacemark.balloon.isOpen()) {
            coords = e.get('coords');
            var target = e.get('target').properties.get('hintContent');
            $('.delivery_method__adress').text(target);
          }
        });

      }

      placemarkCollections[i] = cityCollection;

      // Добавляем коллекцию на карту
      myMap.geoObjects.add(cityCollection);

    }
  }
});