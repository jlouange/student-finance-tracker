const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('studentFinanceTheme');
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

document.documentElement.setAttribute('data-theme', initialTheme);



function updateThemeButton(){
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark mode';

    themeToggle.setAttribute('aria-pressed', String(isDarkMode));

}

themeToggle.addEventListener('click', function(){
    const currentTheme = document.documentElement.getAttribute('data-theme');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('studentFinanceTheme', newTheme);

    updateThemeButton();

});

updateThemeButton();
