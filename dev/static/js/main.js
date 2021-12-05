/* eslint-disable no-new */
(function() {
  'use strict';

  const body = document.querySelector('body');
  let unlock = true;

  function dynamicAdaptive() {
    // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
    // e.x. data-da=".item,992,2"

    function DynamicAdapt(type) {
      this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = document.querySelectorAll('[data-da]');

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (item) {
          return (
            '(' +
            this.type +
            '-width: ' +
            item.breakpoint +
            'px),' +
            item.breakpoint
          );
        },
        this
      );
      this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        }
      );

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(
          this.оbjects,
          function (item) {
            return item.breakpoint === mediaBreakpoint;
          }
        );
        matchMedia.addListener(function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
      } else {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
          }
        }
      }
    };

    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
      }
      if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
    };

    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
        parent.insertAdjacentElement('beforeend', element);
      }
    };

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === 'min') {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    };

    const da = new DynamicAdapt('min');
    da.init();
  }

  function bodyLock(delay) {
    const body = document.querySelector('body');
    if (body.classList.contains('_lock')) {
      bodyLockRemove(delay);
    } else {
      bodyLockAdd(delay);
    }
  }

  function bodyLockRemove(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, delay);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }

  function bodyLockAdd(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
      body.classList.add('_lock');

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }

  const getPopup = () => {
    const popup_link = document.querySelectorAll('._popup-link');
    const popups = document.querySelectorAll('.popup');
    for (let index = 0; index < popup_link.length; index += 1) {
      const el = popup_link[index];
      // eslint-disable-next-line no-loop-func
      el.addEventListener('click', (e) => {
        if (unlock) {
          const item = el.getAttribute('href').replace('#', '');
          const video = el.getAttribute('data-video');
          popup_open(item, video);
        }
        e.preventDefault();
      });
    }
    for (let index = 0; index < popups.length; index += 1) {
      const popup = popups[index];
      popup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__body')) {
          popup_close(e.target.closest('.popup'));
        }
      });
    }
    function popup_open(item, video = '') {
      const activePopup = document.querySelectorAll('.popup._active');
      if (activePopup.length > 0) {
        popup_close('', false);
      }
      let curent_popup = document.querySelector(`.popup_${item}`);
      if (curent_popup && unlock) {
        if (video != '' && video != null) {
          const popup_video = document.querySelector('.popup_video');
          popup_video.querySelector('.popup__video').innerHTML = `<iframe src="https://www.youtube.com/embed/${video}?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        }
        if (!document.querySelector('.menu__body._active')) {
          bodyLockAdd(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', `#${item}`);
      }
    }
    function popup_close(item, bodyUnlock = true) {
      if (unlock) {
        if (!item) {
          for (let index = 0; index < popups.length; index += 1) {
            const popup = popups[index];
            const video = popup.querySelector('.popup__video');
            if (video) {
              video.innerHTML = '';
            }
            popup.classList.remove('_active');
          }
        } else {
          const video = item.querySelector('.popup__video');
          if (video) {
            video.innerHTML = '';
          }
          item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
          bodyLockRemove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
      }
    }
    const popup_close_icon = document.querySelectorAll(
      '.popup__close,._popup-close'
    );
    if (popup_close_icon) {
      for (let index = 0; index < popup_close_icon.length; index += 1) {
        const el = popup_close_icon[index];
        el.addEventListener('click', () => {
          popup_close(el.closest('.popup'));
        });
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        popup_close();
      }
    });
  };

  const getPageVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const getCloudsHeight = () => {
    const clouds = document.querySelectorAll('.js-clouds');
    let windowWidth = document.documentElement.clientWidth;
    let heightRatio = windowWidth / 5.45;
    clouds.forEach(item => {
      heightRatio = heightRatio > 400 ? 400 : windowWidth / 5.45;
      item.style.height = `${heightRatio}`;
      item.style.top = `${-heightRatio + 4}`;
    });
  };

  const getResize = () => {
    const breakpointTablet = window.matchMedia('(min-width: 1280px)');
    const breakpointMobile = window.matchMedia('(min-width: 768px)');
    const nav = document.querySelector('.nav');
    const sandwich = document.querySelector('.sandwich');
    const order = document.querySelector('.order');
    if (breakpointTablet.matches === false) {
    }
    if (breakpointMobile.matches === false) {
    }
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 88);
      }
    }
    function actualResizeHandler() {
      getPageVh();
      getCloudsHeight();
      if (nav.classList.contains('_active')) {
        nav.classList.remove('_active');
        sandwich.classList.remove('_active');
        body.classList.remove('_overlay');
        body.classList.remove('_lock');
      }
      if (order) {
        order.classList.remove('order--index');
      }
      if (order.classList.contains('order--active')) {
        const orderOpenButton = document.querySelector('.order__toggle')
        order.classList.remove('order--active');
        body.classList.remove('_lock');
        orderOpenButton.classList.remove('_active');
      }
      if (breakpointTablet.matches === false) {
      }
    }
  }

  const getFixedHeader = () => {
    const header = document.querySelector('.header__wrapper');
    const headerPlaceholder = document.querySelector('.header__placeholder');
    if (header) {
      document.addEventListener('scroll', e => {
        if (window.pageYOffset > 0) {
          header.style.position = 'fixed';
          headerPlaceholder.style.display = 'block';
        } else {
          header.style.position = 'relative';
          headerPlaceholder.style.display = 'none';
        }
      });
    }
  };

  const getSandwich = () => {
    const sandwich = document.querySelector('.sandwich');
    const nav = document.querySelector('.nav');
    const order = document.querySelector('.order');

    if (sandwich != null) {
      const delay = 500;
      sandwich.addEventListener('click', function (e) {
        if (unlock) {
          bodyLock(delay);
          sandwich.classList.toggle('_active');
          nav.classList.toggle('_active');
          body.classList.toggle('_overlay');
        }
        if (order) {
          order.classList.toggle('order--index');
        }
      });
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('_active')) return;
        if (!e.target.closest('._active')) {
          bodyLock(delay);
          nav.classList.remove('_active');
          sandwich.classList.remove('_active');
          body.classList.remove('_overlay');
          if (order) {
            order.classList.remove('order--index');
          }
        }
      });
    }
  };

  const getSliderHero = () => {
    const heroSlider = document.querySelector('.hero__slider');
    if (heroSlider) {
      const indexHeroSliders = new Swiper(heroSlider, {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        pagination: {
          el: '.hero__bullets',
          bulletClass: 'hero__bullet',
          bulletActiveClass: 'hero__bullet--active',
          type: 'bullets',
          clickable: true
        },
        autoplay: {
          delay: 5000,
        },
      });
    }
  };

  const getFormsLabel = () => {
    const inputs = document.querySelectorAll('.quality-control__input');
    inputs.forEach(item => {
      const label = item.parentElement.querySelector('label');
      item.addEventListener('focus', () => {
        label.classList.add('_active');
      });
      item.addEventListener('blur', () => {
        if (!item.value) {
          label.classList.remove('_active');
        }
      });
    });
  };

  const getGalleryParkModalSlider = () => {
    const parkGalleryGeneralSliders = document.querySelector('.gallery-slider-modal__general');
    const parkGalleryThumbsSliders = document.querySelector('.gallery-slider-modal__thumbs');

    const thumbs = new Swiper(parkGalleryThumbsSliders, {
      direction: 'horizontal',
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      slidesPerView: 4,
      spaceBetween: 3,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      navigation: {
        nextEl: '.gallery-slider-modal__thumbs-nav--next',
        prevEl: '.gallery-slider-modal__thumbs-nav--prev',
        disabledClass: 'popup-nav--disabled',
      },
      breakpoints: {
        768: {
          spaceBetween: 10,
        },
      },
    });

    const general = new Swiper(parkGalleryGeneralSliders, {
      direction: 'horizontal',
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      slidesPerView: 1,
      spaceBetween: 0,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      thumbs: {
        swiper: thumbs,
        slideThumbActiveClass: 'gallery-slider-modal__thumbs-item--active',
      },
    });
  };

  const getMoreParkSliderModal = () => {
    const parkMoreSliders = document.querySelector('.more-slider-modal');

    const moreSlider = new Swiper(parkMoreSliders, {
      direction: 'horizontal',
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      slidesPerView: 1,
      spaceBetween: 0,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      navigation: {
        nextEl: '.more-slider-modal__nav--next',
        prevEl: '.more-slider-modal__nav--prev',
        disabledClass: 'popup-nav--disabled',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1440: {
          slidesPerView: 2,
          spaceBetween: 60,
        },
      },
    });
  };

  const sliders = () => {
    const breakpointTablet = window.matchMedia('(min-width: 768px)');
    const restaurantPageSlider = document.querySelector('.restaurant-hero__wrapper');
    const photoGalleyCategorySlider = document.querySelector('.photo-gallery__wrapper');
    const birthdayProgramsSlider = document.querySelector('.birthday-programs__wrapper');
    const calculatorSlider = document.querySelector('.calculator-steps__wrapper');
    let restaurantInitSlider;
    let photoGalleyCategoryInit;
    let birthdayProgramsSliderInit;
    let calculatorSliderInit;

    const breakpointChecker = function () {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          resizeHandlerTablet();
        }, 100);
      }

      function resizeHandlerTablet() {
        if (breakpointTablet.matches === true) {
          if (restaurantInitSlider !== undefined) {
            restaurantInitSlider.destroy(true, true);
          }
          if (photoGalleyCategoryInit !== undefined) {
            photoGalleyCategoryInit.destroy(true, true);
          }
          if (birthdayProgramsSliderInit !== undefined) {
            birthdayProgramsSliderInit.destroy(true, true);
          }
          if (calculatorSliderInit !== undefined) {
            calculatorSliderInit.destroy(true, true);
          }
        } else if (breakpointTablet.matches === false) {
          getTabletSlider();
        }
      }

      const getTabletSlider = function () {
        if (restaurantPageSlider) {
          restaurantInitSlider = new Swiper(restaurantPageSlider, {
            direction: 'horizontal',
            grabCursor: true,
            preventClicks: true,
            preventClicksPropagation: true,
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            pagination: {
              el: '.restaurant-hero__bullets',
              bulletClass: 'restaurant-hero__bullet',
              bulletActiveClass: 'restaurant-hero__bullet--active',
              type: 'bullets',
              clickable: true
            },
          });
        }
        if (photoGalleyCategorySlider) {
          photoGalleyCategoryInit = new Swiper(photoGalleyCategorySlider, {
            direction: 'horizontal',
            grabCursor: true,
            preventClicks: true,
            preventClicksPropagation: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          });
        }
        if (birthdayProgramsSlider) {
          birthdayProgramsSliderInit = new Swiper(birthdayProgramsSlider, {
            direction: 'horizontal',
            grabCursor: true,
            preventClicks: true,
            preventClicksPropagation: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            navigation: {
              nextEl: '.birthday-programs__slider-next',
              prevEl: '.birthday-programs__slider-prev',
              disabledClass: 'birthday-programs__slider-disabled',
            }
          });
        }
        if (calculatorSlider) {
          calculatorSliderInit = new Swiper(calculatorSlider, {
            direction: 'horizontal',
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slidesPerView: 'auto',
            spaceBetween: 6,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 20,
            centerInsufficientSlides: true,
          });
        }
      }
    };

    breakpointTablet.addListener(breakpointChecker);
    breakpointChecker();
  };

  const getLightGallery = () => {
    const allGallery = document.querySelectorAll('._gallery');
    const galleryInit = (item, addClass) => {
      item.addEventListener('lgBeforeOpen', () => {
        document.body.classList.add('_lock');
      });
      item.addEventListener('lgBeforeClose', () => {
        document.body.classList.remove('_lock');
      });
      lightGallery(item, {
        addClass: addClass,
        appendSubHtmlTo: ".lg-outer",
        mobileSettings: {
          controls: true,
          showCloseIcon: true,
          download: false,
          rotate: false
        }
      });
    };
    allGallery.forEach(item => {
      if (item) {
        const addClass = `lg-${item.className.split(' ')[0].slice(0, -6)}`;
        galleryInit(item, addClass);
      }
    });
  };

  const getMap = () => {
    const contactsMap = document.querySelector('.contacts__ya-map');
    if (contactsMap) {
      ymaps.ready(function () {
        const map = new ymaps.Map(contactsMap, {
          center: [59.858792, 30.248342],
          zoom: 16,
          controls: [],
        });
        const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        );
        const myPlacers = new ymaps.Placemark(
          map.getCenter(),
          {
            hintContent: 'Офис Intergator.Digital',
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: './static/images/common/map-pin.svg',
            // Размеры метки.
            iconImageSize: [80, 50],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38],
          }
        );
        map.geoObjects.add(myPlacers);
      });
    }
  };

  const holidaysSliders = () => {
    const sliders = document.querySelectorAll('._holiday-slider');
    sliders.forEach(item => {
      if (item) {
        const prevButton = item.parentElement.querySelector('.holiday__slider-prev');
        const nextButton = item.parentElement.querySelector('.holiday__slider-next');
        new Swiper(item, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
            disabledClass: 'holiday__slider-disabled',
          },
          breakpoints: {
            768: {
              spaceBetween: 20,
            },
            1024: {
              slidesOffsetAfter: 20,
              spaceBetween: 20,
            },
            1440: {
              slidesOffsetAfter: 0,
              spaceBetween: 30,
            }
          }
        });
      }
    })
  };

  const birthdayPageSliders = () => {
    const birthdaySlider = document.querySelectorAll('.birthday-banquet__wrapper');
    birthdaySlider.forEach((item) => {
      if (item) {
        const nextButton = item.querySelector('.birthday-banquet__slider-right');
        const prevButton = item.querySelector('.birthday-banquet__slider-left');
        new Swiper(item, {
          direction: 'horizontal',
          grabCursor: true,
          // preventClicks: true,
          // preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
            disabledClass: 'birthday-banquet__slider-disabled',
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              spaceBetween: 40,
            },
          },
        });
      }
    });
  };

  const animatorsBirthdaySlider = () => {
    const animatorsSlider = document.querySelectorAll('.birthday-animators__wrapper');
    animatorsSlider.forEach((item) => {
      if (item) {
        const nextButton = item.querySelector('.birthday-animators__slider-right');
        const prevButton = item.querySelector('.birthday-animators__slider-left');
        const animSlider = new Swiper(item, {
          direction: 'horizontal',
          grabCursor: false,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          loop: true,
          slideActiveClass: 'swiper-slide-active birthday-animators__item--active',
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
          breakpoints: {
            768: {
              slidesPerView: 'auto',
              spaceBetween: 0,
              loop: true,
              loopedSlides: 4,
            },
          },
        });
        animSlider.allowTouchMove = false;
        animSlider.on('resize', () => {
          animSlider.update();
          animSlider.updateSlides();
          animSlider.updateSize();
        });
        animSlider.on('slideChangeTransitionEnd', () => {
          console.log(animSlider.slides[animSlider.realIndex]);
        });
      }
    });
  };

  const amusementBirthdaySlider = () => {
    const amusementWrapper = document.querySelector('.birthday-amusement__wrapper');
    if (amusementWrapper) {
      const amusementSlider = new Swiper(amusementWrapper, {
        direction: 'horizontal',
        // autoHeight: true,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 1,
        spaceBetween: 110,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        loop: true,
        slideActiveClass: 'swiper-slide-active birthday-amusement__item--active',
        navigation: {
          nextEl: '.birthday-amusement__slider-right',
          prevEl: '.birthday-amusement__slider-left',
        },
        breakpoints: {
          768: {
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            loopedSlides: 4,
          },
        },
      });
    }
  };

  const getSelects = () => {
    const selectItems = document.querySelectorAll('._select');
    if (selectItems.length > 0) {
      selectItems.forEach(item => {
        new Choices(item, {
          searchEnabled: false,
          itemSelectText: '',
          shouldSort: false,
        });
      });
    }
  };

  const getInputNumberCalculator = () => {
    const upButton = document.querySelector('.calculator-time__button--top');
    const downButton = document.querySelector('.calculator-time__button--bottom');
    if (upButton && downButton) {
      upButton.addEventListener('click', () => {
        upButton.nextElementSibling.stepUp();
      });
      downButton.addEventListener('click', () => {
        downButton.previousElementSibling.stepDown();
      });
    }
  };

  const getDatePicker = () => {
    const calendarCalc = document.querySelector('.calculator-time__datepicker');
    const customDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const customMonth = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    if (calendarCalc) {
      const dateChoise = datepicker(calendarCalc, {
        formatter: (input, date, instance) => {
          input.value = 'c ' + date.toLocaleDateString();
        },
        disabledDates: [
          new Date(2021, 10, 5),
          new Date(2021, 10, 8),
          new Date(2021, 11, 10),
          new Date(2021, 10, 11),
          new Date(2021, 10, 19),
        ],
        alwaysShow: true,
        showAllDates: true,
        startDay: 1,
        customDays: customDays,
        customMonths: customMonth,
        overlayButton: 'Выбрать',
        overlayPlaceholder: 'Введите год',
      });
    }
  };

  const calculatorBanquetRooms = () => {
    const disabledRooms = document.querySelectorAll('.calculator-rooms__item--disabled');
    disabledRooms.forEach(item => {
      if (item.classList.contains('calculator-rooms__item--disabled')) {
        item.addEventListener('click', () => {
          for(let i = 0; i < disabledRooms.length; i += 1) {
            disabledRooms[i].classList.remove('calculator-rooms__item--disabled');
          }
        })
      }
    })
  }

  const orderMobileAction = () => {
    const orderOpenButton = document.querySelector('.order__toggle')
    const order = document.querySelector('.order');
    if (orderOpenButton) {
      const delay = 500;
      orderOpenButton.addEventListener('click', () => {
        if (order.classList.contains('order--active')) {
          orderOpenButton.parentElement.classList.remove('order--active');
          orderOpenButton.classList.remove('_active');
          bodyLock(delay);
        }
        else {
          orderOpenButton.parentElement.classList.add('order--active');
          orderOpenButton.classList.add('_active');
          bodyLock(delay);
        }
      });
    }
  }

  validate.init();
  // getPageVh();
  dynamicAdaptive();
  getPopup();
  // getPageVh();
  getResize();
  getFixedHeader();
  getSandwich();
  getSliderHero();
  getFormsLabel();
  getCloudsHeight();
  getGalleryParkModalSlider();
  getMoreParkSliderModal();
  sliders();
  getLightGallery();
  getMap();
  holidaysSliders();
  birthdayPageSliders();
  animatorsBirthdaySlider();
  amusementBirthdaySlider();
  getSelects();
  getInputNumberCalculator();
  getDatePicker();
  calculatorBanquetRooms();
  orderMobileAction();
  getPageVh();
}());
