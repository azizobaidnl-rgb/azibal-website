// ================= MOBILE MENU =================


const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");



if(menuToggle && navMenu){


menuToggle.addEventListener("click", function(){


    navMenu.classList.toggle("active");



    if(navMenu.classList.contains("active")){

        menuToggle.innerHTML = "✕";

    }

    else{

        menuToggle.innerHTML = "☰";

    }


});




// Close menu after clicking a link

document.querySelectorAll(".nav a").forEach(function(link){


    link.addEventListener("click", function(){


        navMenu.classList.remove("active");

        menuToggle.innerHTML = "☰";


    });


});


}
