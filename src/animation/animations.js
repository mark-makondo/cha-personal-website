// libraries
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const animations = () => {

    class animate{
        constructor(target, duration, isPaused, isReversed){
            this.selector = target;

            this.master = gsap.timeline({
                paused: isPaused,
                reversed: isReversed,
                defaults: {
                    duration: duration
                }
            })
        }
        setElements(target, obj){
            gsap.set( target , obj );
        }
        setAnimation(target ,obj, label){
            this.master.to(target, obj, label);
            return this.master;
        }
        setAnimationFromTo(target ,objFrom, objTo , label){
            this.master.fromTo(target, objFrom , objTo, label);
            return this.master;
        }
    }

    //#region variables-queries 
    // queries
    let navCircle = document.querySelector("#nav-circle"),
        navCircleEllipse = document.querySelector("#nav-circle ellipse"),
        navbar = document.querySelector(".navbar"),
        navLines = document.querySelector("#nav-lines"),
        navLineOne = document.querySelector("#nav-line-one"),
        navLineTwo = document.querySelector("#nav-line-two"),
        navLineThree = document.querySelector("#nav-line-three"),
        navLogo = document.querySelector(".navbar__logo"),
        navContentsList = document.querySelectorAll(".navbar__contents ul li"),
        navContentsListWs = document.querySelectorAll(".navbar__contents-ws ul li"),
        // header
        headerLogo = document.querySelector(".header__logo"),
        headerDescription = document.querySelector(".header p");
       
    // variables
    let click = "click",
        hover = "hover",
        mouseenter = "mouseenter",
        mouseleave = "mouseleave",
        paused = true,
        reversed = true;

    // custom
    let attr__circleScaleUp, attr__linesScaleDown, attr__linesSuppresed, attr__linesSlantUp, attr__linesSlantDown,
        navAnimation , navAnimate, label__nav, anim__moveRightDisplay, set__navContentList;
    let arr__fadeInTarget, fadeInAnimation, fadeInAnimate, label__fadeIn;

    //#endregion

    //#region section animations
        const displayFadeInContents = () => {
            // fade page content animations

            label__fadeIn = "fadeInAnimate"
            arr__fadeInTarget =  [navLogo, navContentsListWs,headerLogo,headerDescription]
            set__navContentList = { y:"-50", autoAlpha: 0}
            anim__moveRightDisplay = { autoAlpha: 1, x:"0", y:"0"};


            fadeInAnimation = new animate("",1, paused, reversed);
            fadeInAnimate = fadeInAnimation.setAnimationFromTo( arr__fadeInTarget, set__navContentList,
                anim__moveRightDisplay, label__fadeIn 
            )

            fadeInAnimate.play();
        }
        const navbarSection = () => {
            // custom object animations
            label__nav = "navAnimate"
            attr__circleScaleUp = { attr: { width: "162", height: "172"} };
            attr__linesScaleDown = { attr: { width: "20", height: "30" } };
            attr__linesSuppresed = { attr: { x2: "0%" } };
            attr__linesSlantUp = { rotate:-45 ,attr: { x2: "100%" }, transformOrigin: "28% 0"};
            attr__linesSlantDown = { rotate:45, attr: { x2: "100%" }, transformOrigin: "28% 0"};
            set__navContentList =  { display: "unset", x:"-20" ,y:"-20", autoAlpha: 0 };
            anim__moveRightDisplay = { autoAlpha: 1, x:"0", y:"0", stagger: .2};
            
            // nav animation
            navAnimation = new animate( "", .5, paused, reversed );
            // scale down circle and lines
            navAnimate = navAnimation.setAnimation( navCircle, attr__circleScaleUp, label__nav);
            navAnimate = navAnimation.setAnimation( navLines, attr__linesScaleDown, label__nav);
            // mid line 0
            navAnimate = navAnimation.setAnimation( navLineTwo, attr__linesSuppresed, label__nav);
            // cross
            navAnimate = navAnimation.setAnimation( navLineOne, attr__linesSlantUp, label__nav);
            navAnimate = navAnimation.setAnimation( navLineThree, attr__linesSlantDown, label__nav);
            // show nav content and stagger
            navAnimate = navAnimation.setAnimationFromTo( navContentsList, set__navContentList, 
                anim__moveRightDisplay, label__nav
            );

            // event listener animation handler
            eventListenersTween( click, navLines, navAnimate );

        }
        const navbarSmoothScroll = () => {

            gsap.utils.toArray(".navbar__li-title a").forEach(item => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();

                    let href = item.getAttribute("href");
                    let query = document.querySelector(href);
                    let topY = query.offsetTop;

                    gsap.to(window, {duration: 1, scrollTo:{y: topY, autoKill: false }, overwrite: "auto", ease:"Power3.easeOut"});
                    console.log(href);
                })
            })
        }
    //#endregion

    //#region custom functions
        // responsive animation with gsap scroll trigger
        const responsiveAnimation = () => {
            // responsive animation
            ScrollTrigger.matchMedia({
                
                // desktop
                "(min-width: 800px)": function() {
                    navChangeColorOnScroll(navbar);

                    return function() {// tl.kill(); // tl.clear(); 
                    };
                },

                // mobile
                "(max-width: 799px)": function() {
                    navChangeColorOnScroll(navCircleEllipse);
                
                    return function() {// tl.kill(); // tl.clear(); 
                    };

                },
                
                // all 
                "all": function() {
                    scrollTriggerArray(".featured--selector", "center 60%", "center 20%", false);
                }
            });
        }
        
        // on scroll functions // event listener
        const scrollTriggerArray = (target, start, end, marker) => {
            gsap.utils.toArray(target).forEach( box => {
                ScrollTrigger.create({
                    trigger: box,
                    toggleClass: "active",
                    start: start,
                    end: end,
                    markers: marker
                })
            })
        }
        const navChangeColorOnScroll = (target) => {
            window.addEventListener('scroll', () => {
                let offset = window.scrollY;
                let ieSupp__offset = document.documentElement.scrollTop;

                if(offset > 5 || ieSupp__offset > 5){
                    target.classList.add("active");
                }else{
                    target.classList.remove("active");
                }
            });
        }
        const eventListenersTween = (targetEvet, target, tween) => {
            let event = targetEvet;

            if( event === click ){
                target.addEventListener(event, (e) =>{
                    e.preventDefault();
                    tween.reversed() ? tween.play() : tween.reverse();
                })

            }else if( event === hover ){
                target.addEventListener(mouseenter, (e) =>{
                    e.preventDefault();

                    tween.play();
                })
                target.addEventListener(mouseleave, (e) =>{
                    e.preventDefault();
                    
                    tween.reverse();
                })

            }else{
                console.log("event not recognized: " + event)
            }
        }

    //#endregion
    


    return(
        displayFadeInContents(),
        navbarSection(),
        navbarSmoothScroll(),
        responsiveAnimation()
    );
}

export default animations;