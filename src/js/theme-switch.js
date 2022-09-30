const input = document.querySelector(".theme-switch__toggle")

const mops = document.querySelector('.theme-switch')

const bodyEL = document.querySelector('body')

const footer = document.querySelector(".footer__cover")

bodyEL.classList.add("light-theme")


function saveTheme() {
    if (localStorage.getItem('Theme') ==='dark') {
        bodyEL.classList.add('dark-theme');
        footer.classList.add('dark-theme_footer')
        input.setAttribute('checked', true)
    }
};

saveTheme();

function changeThemeDark() {
    bodyEL.classList.add('dark-theme');
    bodyEL.classList.remove('light-theme');
    footer.classList.add('dark-theme_footer');
    footer.classList.remove('light-theme');
localStorage.setItem('Theme', 'dark')
};
function changeThemeLight() {
    bodyEL.classList.add('light-theme');
    bodyEL.classList.remove('dark-theme');
    footer.classList.add('light-theme');
    footer.classList.remove('dark-theme_footer');

localStorage.setItem('Theme', 'light')
};
function changeTheme(e) {
    changeThemeDark()
    if (!e.target.checked) {
        changeThemeLight()
    }
};
input.addEventListener('change', changeTheme);
