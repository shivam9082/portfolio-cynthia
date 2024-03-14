
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//animating out first hero page using gsap.

function firstPageANim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
       y:"-10",
       opacity:0,
       duration: 1.5,
       ease: Expo.easeInOut
    })

    .to(".boundingelem" , {
        y:0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay:-1,
        stagger: .2
    })

    .from("#herofooter", {
        y:"-10",
        opacity:0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
     })
}


//jab mouse move ho to hum log skew kar paaye aur maximum skew and min skew
//define kar paye, jab mouse move ho to chapta ki value baddhe, anr jab mouse
//chalna ban ho jaaye to chapta hata lo

// timeout varibale is to bring circle shape in its og form when mousemove is stopped.

var timeout;

function circleChaptqaKaro() {

    clearTimeout(timeout);

    //define default variable
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;


    window.addEventListener("mousemove",function(dets){
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        var timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;

        },100);
       
    });
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        //dets will provide us two values clientX,clientY which will give 
        // the x and y axis of the screen.
        //console.log(dets.clientX,dets.clientY);

        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleChaptqaKaro();
circleMouseFollower();
firstPageANim();

//image animation...
/* teeno element ko select karo, uske baad teeno par ek mousemov lagao,
jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai
mouse ki x and y position pata karo, ab mouse ki x y position ke badle us
image ko show karo and us image ko move karo, move karte waqt rotate karo,
and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye.*/


document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function (details) {

        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });
});

document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove", function (details) {

        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.5),
        });
    });
});

