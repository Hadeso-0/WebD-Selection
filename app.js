let selected_menu = "Dashboard";
let selected_menu_p = document.getElementById("selected_menu");
let menus = ["dashboard","account","downloads","alerts","about"];

const radios = document.forms["side_menu_buttons"].elements["side_menu"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        selected_menu = this.value;
        selected_menu_p.innerText = selected_menu;
        let str = selected_menu.toLowerCase();
        
        menus.forEach((item)=>{
            let section = document.getElementById(item);
            section.style.zIndex = "-1";
        })

        document.getElementById(str).style.zIndex = "0";
        
    }
}

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const ThemeToggleButton = document.querySelector('.theme-toggle');
const MoonIcon = document.querySelector('.to_dark');
const SunIcon = document.querySelector('.to_light');

const getCSSCustomProp = propKey => {
let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

if (response.length) {
    response = response.replace(/\"/g, '').trim();
}

return response;
};
  
const applyTheme = passedSetting => {
let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    if(currentSetting === 'light')
    {
        let Imgs = document.getElementsByClassName("lig-img");
        for(i=0;i<3;i++){
            Imgs[i].style.display="block";
        }
        Imgs = document.getElementsByClassName("dark-img");
        for(i=0;i<3;i++){
            Imgs[i].style.display="none";
        }
        MoonIcon.style.display = 'block';
        MoonIcon.style.opacity = '1';
        SunIcon.style.display = 'none';
        SunIcon.style.opacity = '0';
    }
    else{
        let Imgs = document.getElementsByClassName("lig-img");
        for(i=0;i<3;i++){
            Imgs[i].style.display="none";
        }
        Imgs = document.getElementsByClassName("dark-img");
        for(i=0;i<3;i++){
            Imgs[i].style.display="block";
        }
        MoonIcon.style.display = 'none';
        MoonIcon.style.opacity = '0';
        SunIcon.style.display = 'block';
        SunIcon.style.opacity = '1';
    }
}
};
const toggleTheme = () => {
let currentSetting = localStorage.getItem(STORAGE_KEY);
switch (currentSetting) {
    case null:
    currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
    break;
    case 'light':
    currentSetting = 'dark';
    break;
    case 'dark':
    currentSetting = 'light';
    break;
}
localStorage.setItem(STORAGE_KEY, currentSetting);
return currentSetting;
};
ThemeToggleButton.addEventListener('input', evt => {
    evt.preventDefault();
    applyTheme(toggleTheme());
});
  
applyTheme();
          