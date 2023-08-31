//getting the menus in the navbar
const home_menu=document.querySelector(".home-tab-menu"),
about_menu=document.querySelector(".about-tab-menu"),
 contact_menu=document.querySelector(".contact-tab-menu");

// getting all the tabs
const home_tab=document.querySelector(".home-tab"),
 about_tab=document.querySelector(".about-tab"),
 contact_tab=document.querySelector(".contact-tab");

 //on loading the window, only show and select the home-tab
window.onload=function(){
    about_tab.style.display="none"
    contact_tab.style.display="none"
}

// after clicking on a menu, show its coresponding tab and hide the another two tabs

home_menu.onclick=function(){
    home_tab.style.display=""
    about_tab.style.display="none"
    contact_tab.style.display="none"
}

about_menu.onclick=function(){
    about_tab.style.display=""
    home_tab.style.display="none"
    contact_tab.style.display="none"
}

contact_menu.onclick=function(){
    contact_tab.style.display=""
    home_tab.style.display="none"
    about_tab.style.display="none"
}