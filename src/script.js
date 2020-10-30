const unscrolledBG = 'none';
const html = document.documentElement;

var navbar = document.getElementById('navbar');
var yup = document.getElementById('yeah');

function px_to_int(str) {
    return parseInt(str.substr(0, str.length - 2));
}

const updateNav = () => {
    if (window.scrollY <= 36) {
        window.navbar.style.background = unscrolledBG;
    } else {
        window.navbar.style.background = '';
    }
};

const updateYup = () => {
    window.yup.style.display = '';
    // console.log(window.yup.getBoundingClientRect().x + ', ' + (window.yup.parentElement.getBoundingClientRect().x + px_to_int(window.getComputedStyle(window.yup).marginLeft)))
    // console.log("yup");
    if (
        window.yup.getBoundingClientRect().x >
        window.yup.parentElement.getBoundingClientRect().x +
            px_to_int(window.getComputedStyle(window.yup).marginLeft)
    ) {
        if (window.innerHeight + window.scrollY >= Math.max(html.clientHeight, html.offsetHeight)) {
            window.yup.style.opacity = '1';
            window.yup.style.display = '';
        }
    } else {
        // console.log("hidden");
        window.yup.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.navbar = document.getElementById('navbar');
    window.yup = document.getElementById('yeah');

    updateNav();

    setTimeout(() => {
        window.navbar.style.transition = 'background-color 500ms ease-in';
    }, 1);

    Object.values(document.getElementsByTagName('a')).forEach((elem) => {
        const href = elem.getAttribute('href');
        if (href && href != '/' && !href.startsWith('#')) elem.setAttribute('target', '_blank');
    });

    if (!CSS.supports('scroll-behavior', 'smooth')) {
        document.getElementById('more').removeAttribute('href');
    }
});

document.addEventListener('scroll', () => {
    updateNav();
    updateYup();
});

window.addEventListener('resize', () => {
    updateYup();
});
