// AziBal Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

    console.log("AziBal website loaded successfully");

});
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    if(nav.classList.contains("active")){
        menuBtn.innerHTML = "✕";
    }else{
        menuBtn.innerHTML = "☰";
    }
});

document.querySelectorAll(".nav a").forEach(link=>{
    link.addEventListener("click",()=>{
        nav.classList.remove("active");
        menuBtn.innerHTML="☰";
    });
});
