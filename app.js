function toggleClickedMenu(el) {
    el.classList.toggle("clicked");
}

let moveLogoBack;
let logo;
let home;
let skills;

function setGlobals() {
    moveLogoBack = new CustomEvent('moveLogoBack');
    logo = document.querySelector(".logo")
    home = document.querySelector(".nav-links li:nth-child(1)"); 
    skills = document.querySelector(".nav-links li:nth-child(2)"); 
}

function animateNav() {
    setGlobals();
    //Add the transition information to the element styles
    //calculate the distance to the edge of nav-links
    //select the nav list
    let right = home.getBoundingClientRect().left;
    let left = logo.getBoundingClientRect().right;
    let dist = right - left;
    
    //we need the clicked class to make it so this element can't be clicked while moving and to translate back   
    if(!logo.classList.contains("clicked")) {
        logo.classList.add("clicked");
        logo.style.transform = `translateX(${dist}px)`
        logo.style.transition = "transform .5s ease-in";

        logo.addEventListener("transitionend", () => {
            animateHome();
        });

        logo.addEventListener("moveLogoBack", ()=> {
            logo.classList.remove('clicked')
            logo.style.transform = null;
            logo.style.transition = 'transform .5s ease-out'
        });
    }
}

function animateHome() {
    let right = skills.getBoundingClientRect().left;
    let left = home.getBoundingClientRect().right;
    let dist = right - left;

    home.addEventListener("transitionend", () => {
        home.style.transform = null;
        console.log("adding listener")
        dispatchEvent(moveLogoBack)
    });

    home.style.transform = `translateX(${dist}px)`
    home.style.transition = "transform .1s ease-out";


    
}