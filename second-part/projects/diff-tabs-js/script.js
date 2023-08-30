const home_menu=document.querySelector(".home-tab-menu");
const about_menu=document.querySelector(".about-tab-menu");
const contact_menu=document.querySelector(".contact-tab-menu");


const home_tab=document.querySelector(".home-tab");
const about_tab=document.querySelector(".about-tab");
const contact_tab=document.querySelector(".contact-tab");

window.onload=function(){
    about_tab.style.display="none"
    contact_tab.style.display="none"
}

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