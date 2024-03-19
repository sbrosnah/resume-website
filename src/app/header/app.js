const sections = ['Home', 'Skills', 'Education', 'Experience', 'Projects'];

document.addEventListener('DOMContentLoaded', function() {
    configureDOMElements();
    window.addEventListener('resize', () => {
        //Add a listener to redraw the nav elements when the windo is resized
        configureDOMElements();
    });
});



function configureDOMElements() {
    let topNavBarContainer = document.querySelector("ul.nav-links");

    if(topNavBarContainer.children.length == 0) {
        for (let i = 0; i < sections.length; i++) {
            //Add the nav sections 
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = "#" + sections[i];
            a.classList.add("nav-link");
            a.innerHTML = sections[i];
            li.appendChild(a);
            topNavBarContainer.appendChild(li);
        }
    }
    let viewPortWidth = window.innerWidth;

    for (let i = 0; i < sections.length; i++) {
        let li = topNavBarContainer.children[i];
        if(viewPortWidth >= 800) {
            li.classList.add("movable");
        } else {
            li.classList.add("dropdown-link");
        }
    }

    //determine if movable should be on the dropdown toggle 
    let dropdownToggle = document.querySelector(".dropdown");
    if (viewPortWidth >= 800) {
        dropdownToggle.classList.remove("movable");
        dropdownToggle.classList.remove("clicked");
        let links = document.querySelectorAll(".dropdown-link");
        for(let i = 0; i < links.length; i++) {
            links[i].classList.remove("clicked");
        }
    } else {
        dropdownToggle.classList.add("movable");
        
    }


}


function toggleClickedMenu(el) {
    el.classList.toggle("clicked");

    //make other drowdown elements visible 
    let links = document.querySelectorAll(".dropdown-link");
    for(let i = 0; i < links.length; i++) {
        links[i].classList.toggle("clicked");
    }
}

function animateNav() {

    const Direction = Object.freeze({
        FORWARD: 0,
        BACKWARD: 1
    })

    let elements = document.querySelectorAll(".movable");

    elements = Array.from(elements).filter(element => {
        return window.getComputedStyle(element).display !== 'none';
    });

    if(elements.length <= 1) {
        return
    }
  
    function moveToNextElement(index, dir) {

        if (dir == Direction.BACKWARD && index < 0) {
            return; 
        }

        const element = elements[index];

        let dist;
        if(dir == Direction.FORWARD) {
            dist = elements[index + 1].getBoundingClientRect().left - element.getBoundingClientRect().right;
        }

        if(index == 0 && dir == Direction.FORWARD) {
            element.style.transition = "transform .7s ease-in";
        } else if (index == 0 && dir == Direction.BACKWARD) {
            element.style.transition = "transform 1.4s ease-out";
        } else {
            element.style.transition = "transform .07s ease-out";
        } 

        if(dir == Direction.FORWARD) {
            element.style.transform = `translateX(${dist}px)`; 
        } else {
            element.style.transform = '';
        }
        

        function handleTransitionEnd() {
            element.removeEventListener('transitionend', handleTransitionEnd); 

            let nextInd;
            //decide next index
            if(index < elements.length - 2 && dir == Direction.FORWARD) {
                nextInd = index + 1;
            } else if (index <= elements.length - 2 && dir == Direction.BACKWARD) {
                nextInd = index - 1;
            } else {
                nextInd = index;
            }

            //decide next direction
            //only switch when we are at our last movable element
            let nextDir;
            if(index == elements.length - 2) {
                nextDir = Direction.BACKWARD;
            } else {
                nextDir = dir;
            }

            moveToNextElement(nextInd, nextDir); 
        }

        element.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }
  
    moveToNextElement(0, Direction.FORWARD); 
  }

