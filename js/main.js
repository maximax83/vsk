// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ. |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const header = document.querySelector('.header');





// Блокировка / разблокировка скрола на станице |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const html = document.querySelector('html');
const scrollSwingContent = document.querySelectorAll('html, .js-scroll-swing-content');
const scrollSwingEl = document.querySelectorAll('.js-scroll-swing-elem');
const widthScroll = window.innerWidth - html.offsetWidth;
let statusLockScroll = false;

function lockPageScroll() {
	if (statusLockScroll === false) {
		for (let index = 0; index < scrollSwingContent.length; index++) {
			const current = scrollSwingContent[index];
			current.style.paddingRight = (+(getComputedStyle(current).paddingRight.replace('px', '')) + widthScroll + 'px');
		}
		for (let index = 0; index < scrollSwingEl.length; index++) {
			const current = scrollSwingEl[index];
			current.style.marginRight = (+(getComputedStyle(current).marginRight.replace('px', '')) + widthScroll + 'px');
		}
		html.classList.add('js-lock-scroll');
		statusLockScroll = true;
	}
}

function unlockPageScroll() {
	if (statusLockScroll === true) {
		for (let index = 0; index < scrollSwingContent.length; index++) {
			const current = scrollSwingContent[index];
			current.style.paddingRight = (+(getComputedStyle(current).paddingRight.replace('px', '')) - widthScroll + 'px');
		}
		for (let index = 0; index < scrollSwingEl.length; index++) {
			const current = scrollSwingEl[index];
			current.style.marginRight = (+(getComputedStyle(current).marginRight.replace('px', '')) - widthScroll + 'px');
		}
		html.classList.remove('js-lock-scroll');
		statusLockScroll = false;
	}
}





// Мобильное меню. ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.nav__item');

function moveMobileMenu() {
	burger.classList.toggle('js-menu-active');
	menu.classList.toggle('js-menu-active');

	if(burger.classList.contains('js-menu-active')) {
		lockPageScroll();
	} else {
		unlockPageScroll();
	}
}

if (burger) {
	burger.addEventListener('click', function (e) {
		moveMobileMenu();
	});
}

for (let index = 0; index < menuItems.length; index++) {
	const current = menuItems[index];
	current.addEventListener('click', function (e) {
		if (menu.classList.contains('js-menu-active')) {
			moveMobileMenu();
		}
	});
}





// Перемещение мессенджеров и кнопок авторизации в зависимости от ширины страницы. ||||||||||||||||||||||||||||||||||||
const logo = document.querySelector('.logo');
const login = document.querySelector('.login');
const messengers = document.querySelector('.header__messenger-group');
const menuContent = document.querySelector('.menu .wrapper');

function changeDeviceDOM() {
	if(window.innerWidth <= 600) {
		menuContent.prepend(messengers);
		menuContent.append(login);
	} else if ((window.innerWidth > 600) && (window.innerWidth <= 900)) {
		logo.after(messengers);
		menuContent.append(login);
	} else {
		logo.after(messengers);
		messengers.after(login);
	}
}

changeDeviceDOM();

window.addEventListener('resize', function() {
	changeDeviceDOM();
});





// Плавная прокрутка до якоря |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const linksGoto = document.querySelectorAll('[data-goto]');
let headerFixed = true;

for (let index = 0; index < linksGoto.length; index++) {
	const current = linksGoto[index];
	current.addEventListener('click', function(e) {
		e.preventDefault();
		const gotoBlock = document.querySelector(current.dataset.goto);
		if (current.dataset.goto && gotoBlock) {
			let headerHeight = header.offsetHeight;
			if (!headerFixed) {
				headerHeight = 0;
			}
			const gotoBlockScrolling = gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeight;
			window.scrollTo({
				top: gotoBlockScrolling,
				behavior: 'smooth'
			});
		}
	});
}





// Секция main. |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const main = document.querySelector('main');

function mainMarginTop() {
	main.style.marginTop = header.offsetHeight + 'px';
}

mainMarginTop();

window.addEventListener('resize', function() {
	mainMarginTop();
});





// Слайдер SWIPER. ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
new Swiper('.intro.swiper', {
	pagination: {
		el: '.intro .swiper-pagination',
		clickable: true,
	},
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	speed: 800,
});



new Swiper('.partners__slider .swiper', {
	navigation: {
		nextEl: '.partners__slider .swiper-button-next',
		prevEl: '.partners__slider .swiper-button-prev',
	},

	pagination: {
		el: '.partners__slider  .swiper-pagination', // .swiper-pagination
		clickable: true,
	},

	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	speed: 500,

	breakpoints: {
		0: {
			slidesPerView:2,
			spaceBetween: 15,
			slidesPerGroup:2,
		},
		600: {
			slidesPerView:3,
			spaceBetween: 15,
			slidesPerGroup:3,
		},
		900: {
			slidesPerView:4,
			spaceBetween: 30,
			slidesPerGroup:4,
		}
	},
});





// Секция guide - "Как это работает?". Размещение элементов. ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const step1 = document.querySelector('.guide__step_1');
const step2 = document.querySelector('.guide__step_2');
const step3 = document.querySelector('.guide__step_3');
const step4 = document.querySelector('.guide__step_4');
const step5 = document.querySelector('.guide__step_5');

const galeryItem1 = document.querySelector('.guide .galery__item:nth-child(1)');
const galeryItem2 = document.querySelector('.guide .galery__item:nth-child(2)');
const galeryItem3 = document.querySelector('.guide .galery__item:nth-child(3)');
const galeryItem4 = document.querySelector('.guide .galery__item:nth-child(4)');
const galeryItem5 = document.querySelector('.guide .galery__item:nth-child(5)');

function changeGalleryLayout() {
	if(window.innerWidth >= 900) {
		galeryItem1.prepend(step1);
		galeryItem2.prepend(step3);
		galeryItem3.prepend(step5);
		galeryItem4.prepend(step2);
		galeryItem5.prepend(step4);
	} else {
		galeryItem1.prepend(step1);
		galeryItem2.prepend(step2);
		galeryItem3.prepend(step3);
		galeryItem4.prepend(step4);
		galeryItem5.prepend(step5);
	}
}

changeGalleryLayout();

window.addEventListener('resize', function() {
	changeGalleryLayout();
});





// popups.js Попап. |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const popups = document.querySelectorAll('.popup');
const linksToPopup = document.querySelectorAll('.js-link-to-popup');
const elsToClosePopup = document.querySelectorAll('.js-close-popup');

const popupAnimationTiming = 800;
let lotActivePopups = false;
let animationNow = false;
let counterActivePopups = 0;

// Элементы открытия попапа
for (let index = 0; index < linksToPopup.length; index++) {
	const current = linksToPopup[index];
	current.addEventListener('click', function (e) {
		e.preventDefault();
		const popupName = current.getAttribute('href').replace('#', '');
		const curentPopup = document.getElementById(popupName);
		popupOpen(curentPopup);
	});
}

// Элементы закрытия попапа
for (let index = 0; index < elsToClosePopup.length; index++) {
	const current = elsToClosePopup[index];
	current.addEventListener('click', function (e) {
		e.preventDefault();
		popupClose(current.closest('.popup'));
	});
}

// Внешняя область контента попапа закрывающая попап
for (let index = 0; index < popups.length; index++) {
	const current = popups[index];
	current.addEventListener('click', function (e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	});
}

// Закрытие при нажатии клавиши esc
document.addEventListener('keydown', function (e) {
	if ((e.which === 27) && (lotActivePopups === false)) {
		const popupActive = document.querySelector('.popup.js-popup_open');
		if (popupActive) {
			popupClose(popupActive);
		}
	}
});

// Функция открытия попапа.
function popupOpen(curentPopup) {
	if (curentPopup && animationNow === false) {
		const popupActive = document.querySelector('.popup.js-popup_open');
		if (popupActive && lotActivePopups === false) {
			popupClose(popupActive);
		}
		counterActivePopups = ++counterActivePopups;
		animationNow = !animationNow;
		curentPopup.style.zIndex = 100 + counterActivePopups + '';
		curentPopup.classList.add('js-popup_open');
		if (counterActivePopups === 1) {lockPageScroll()}
		setTimeout(function () {
			animationNow = !animationNow;
		}, popupAnimationTiming);
	}
};

// Функция закрытия попапа.
function popupClose(popupActive) {
	if (popupActive && animationNow === false) {
		counterActivePopups = --counterActivePopups;
		animationNow = !animationNow;
		popupActive.classList.remove('js-popup_open');
		setTimeout(function () {
			if (counterActivePopups === 0) {unlockPageScroll()}
			animationNow = !animationNow;
		}, popupAnimationTiming);
	}
};