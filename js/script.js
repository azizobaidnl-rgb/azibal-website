// AziBal Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

    console.log("AziBal website loaded successfully");

});
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if(menuToggle){

menuToggle.addEventListener("click", function(){

navMenu.classList.toggle("active");

});

}
