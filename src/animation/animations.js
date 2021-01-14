// libraries
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const animations = () => {
    
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
            headerDescription = document.querySelector(".header p"),
            featuredTitle = document.querySelector(".featured__main-title");
        
        // variables
        let click = "click",
            hover = "hover", 
            mouseenter = "mouseenter",
            mouseleave = "mouseleave",
            paused = true,
            reversed = true;

        // gsap array // alternative for queryselectorall for all browser compatibility 
        let navLinks = gsap.utils.toArray(".navbar__li-title a"),
            ws__navHr = gsap.utils.toArray(".navbar__contents-ws .navbar__li-hr"),
            mobile__navHr = gsap.utils.toArray(".navbar__contents .navbar__li-hr"),
            featured__box = gsap.utils.toArray(".featured--selector .featured__box"),
            featured__info = gsap.utils.toArray(".featured--selector .featured__info");

    //#endregion
   
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
        //#region // animation methods
            fromUp = (target, y, alpha ,label) => {
                this.master.from( target, { y: y , autoAlpha: alpha }, label);
                return this.master;
            }

            fade = (target, alpha, label) =>{
                this.master.to(target, { autoAlpha: alpha }, label);
                return this.master;
            }
            width = (target, width, label) => {
                this.master.to(target, { width: width }, label);
                return this.master;
            }
            background = (target, background, label) => {
                this.master.to(target, { background: background, fill: background }, label);
                return this.master;
            }
            attr__widthHeight = (target, width, height, label) => {
                this.master.to(target, { attr:{ width: width, height: height } }, label);
                return this.master;
            }
            attr__x2 = (target, x2, label) => {
                this.master.to(target, { attr: { x2: x2 } }, label);
                return this.master;
            }
            custom__rotateExpandX2 = (target, rotate, x2, transformOrigin, label) => {
                this.master.to(target, { rotate: rotate, attr: { x2: x2 }, transformOrigin: transformOrigin }, label);
                return this.master;
            }
            custom__fromUpToDownAlpha = (target, stagger ,label) => {
                this.master.fromTo(target, { display: "unset", x: "-20", y: "-20", autoAlpha: 0 }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    stagger: stagger
                }, label)
            }
        //#endregion

        //#region // timeline animations
            // navbar
            navLinkAnimation(target){
                this.master 
                    .add( this.fade(target, 1, "navLinkAnimation"))
                    .add( this.width(target, "100%", "navLinkAnimation"))
                return this.master;
            }
            navChangeBackgroundOnScroll(target){
                this.master 
                    .add( this.background(target, "black", "navChangeBackgroundOnScroll") );
                return this.master;
            }
            mobile__navBurgerAnimation(){
                let circle__width = "162", circle__height ="172";
                let line__width = "20", line__height = "30";
                let lineTwo__x2_suppressed = "0%";
                let lineOne__rotate = -45, lineOne__x2 = "100%", lineOne__transformOrigin = "28% 0";
                let lineTwo__rotate = 45,  lineTwo__x2 = "100%", lineTwo__transformOrigin = "28% 0";
                let stagger = .2;
                let label = "navBurgerAnimation";

                this.master 
                    // scale down circle and lines
                    .add( this.attr__widthHeight( navCircle, circle__width, circle__height, label ) )
                    .add( this.attr__widthHeight( navLines, line__width, line__height, label ) )
                    // mid line 0
                    .add( this.attr__x2( navLineTwo, lineTwo__x2_suppressed, label) )
                    // cross
                    .add( this.custom__rotateExpandX2( navLineOne, lineOne__rotate, lineOne__x2, lineOne__transformOrigin, label) )
                    .add( this.custom__rotateExpandX2( navLineThree, lineTwo__rotate, lineTwo__x2, lineTwo__transformOrigin, label) )
                    // show nav content and stagger
                    .add( this.custom__fromUpToDownAlpha ( navContentsList, stagger, label))
                return this.master;
            }
            // header
            headerAnimation = () => {
                let target = [ navLogo, navContentsListWs, headerLogo, headerDescription, featuredTitle];
                let y = -50;

                this.master.fromTo(target, { y: y , autoAlpha: 0 }, {
                    y: 0,
                    autoAlpha: 1
                }, "headerAnimation")
            }
            // featured animation is inside scrollTriggerArray()  
        //#endregion
    }

     // responsive animation 
     const responsiveAnimation = () => {

        // responsive animation
        ScrollTrigger.matchMedia({
            
            // desktop
            "(min-width: 769px)": function() {
                navChangeColorOnScroll(navbar);
                scrollTriggerArray(".featured--selector", "center 60%", "center 10%", false, "featured-ws");
                scrollTriggerArray(".content", "top 80%", "bottom 80%", false, "navlink-ws");

                return function() {// tl.kill(); // tl.clear(); //reset value when viewport changes
                    ws__resetAnimation();
                };
            },

            // mobile
            "(max-width: 768px)": function() {
                navChangeColorOnScroll(navCircleEllipse);
                scrollTriggerArray(".featured--selector", "center 60%", "center 20%", false, "featured-mobile");
                scrollTriggerArray(".content", "top 80%", "bottom 80%", false, "navlink-mobile");

                return function() {// tl.kill(); // tl.clear(); //reset value when viewport changes
                    mobile__resetAnimation();
                };
            },
            
            // all 
            "all": function() {
                navbarSmoothScroll();
                sectionAnimations();
            }
        });
    }

    // reset animation here per new animation in responsiveAnimation() 
    const ws__resetAnimation  = () =>{
        // reset back featured ws animation for mobile
        gsap.set( ".featured--selector .featured__box", { xPercent: 0, autoAlpha:1 });
        gsap.set( ".featured--selector .featured__info", { xPercent: 0, autoAlpha:1 });
         // reset back nav icons and hr ws animation for mobile
        gsap.set( navCircleEllipse, {fill: "none" })
        gsap.set( mobile__navHr, {autoAlpha: 0, width: 0 })
    }
    const mobile__resetAnimation = () => {
        // reset back nav link and hr mobile animation for ws
        gsap.set( navbar, {background: "transparent" })
        gsap.set( ws__navHr, {autoAlpha: 0, width: 0 });
        // reset back featured mobile animation for ws
        gsap.set(".featured--selector .featured__box", { scale: 1, autoAlpha: 1} );
        gsap.set(".featured--selector .featured__info", { autoAlpha: 1} );
    }

    // section animations
    const sectionAnimations = () => {
        let navAnimation, navAnimate;
        let headerAnimation, headerAnimate;

        // header animation
        headerAnimation = new animate("", 1, false, false);
        headerAnimate = headerAnimation.headerAnimation();

        // nav animation
        navAnimation = new animate( "", .5, paused, reversed );
        navAnimate = navAnimation.mobile__navBurgerAnimation();

        // event listener animation handler
        eventListenersTween( click, navLines, navAnimate );
    }

    // #region scroll animations using gsap scroll trigger
    
        const scrollTriggerArray = (main__targetArr, start, end, marker, type)=> {
            gsap.utils.toArray(main__targetArr).forEach( (box, i) => {
               
                //#region // mobile animation from constructor

                    // nav links animate
                    let mobile__setNavAnimation, mobile__setNavAnimate;
                    mobile__setNavAnimation = new animate("", .5, true, false);
                    mobile__setNavAnimate = mobile__setNavAnimation.navLinkAnimation(mobile__navHr[i]);

                //#endregion

                //#region // ws animation from constructor

                    // nav links animate
                    let ws__setNavAnimation, ws__setNavAnimate;
                    ws__setNavAnimation = new animate("", .5, true, false);
                    ws__setNavAnimate = ws__setNavAnimation.navLinkAnimation(ws__navHr[i]);

                //#endregion
                
                let tl, scrollTriggerObj;

                tl = gsap.timeline({paused: true});

                scrollTriggerObj = {
                    trigger: box,
                    toggleClass: "active",
                    start: start,
                    end: end,
                    markers: marker,
                    onEnter: () => tl.play(), 
                    onLeave: () => tl.reverse(),
                    onEnterBack: () => tl.play(), 
                    onLeaveBack: () => tl.reverse()
                }

                if(type === "featured-ws"){

                    let duration = 1;
                    let x, even__box, odd__box, even__info, odd__info;
                    let label__even = "even", label__odd = "odd";
                    let yPercentBox_even = -50, yPercentInfo_even = 50, alphaInfo_even = 0;
                    let yPercentBox_odd = 50, yPercentInfo_odd = -50, alphaInfo_odd = 0;

                    x = i+1;
                    if(x%2 !==0 ){
                        even__box =".featured--selector:nth-child("+x+") .featured__box";
                        even__info =".featured--selector:nth-child("+x+") .featured__info";

                        tl  .from(even__box,  {duration: duration, xPercent: yPercentBox_even }, label__even)
                            .from(even__info,  {duration: duration, xPercent: yPercentInfo_even, autoAlpha: alphaInfo_even }, label__even)
                    }else{
                        odd__box =".featured--selector:nth-child("+x+") .featured__box";
                        odd__info =".featured--selector:nth-child("+x+") .featured__info";

                        tl  .from(odd__box,  {duration: duration, xPercent: yPercentBox_odd }, label__odd)
                            .from(odd__info, {duration: duration, xPercent: yPercentInfo_odd, autoAlpha: alphaInfo_odd }, label__odd)
                    }

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "featured-mobile"){
                    let duration = .5;
                    let box__setScale = 0, box__setAlpha = 0, box__scale = 1, box__alpha = 1;
                    let info__setAlpha = 0, info__alpha = 1;
                    let label = "featured__mobile"

                    gsap.set(featured__box[i], { scale: box__setScale, autoAlpha: box__setAlpha} );
                    gsap.set(featured__info[i], { autoAlpha: info__setAlpha} );

                    tl.to(featured__box[i], { duration: duration, scale: box__scale, autoAlpha: box__alpha }, label )
                      .to(featured__info[i], { duration: duration, autoAlpha: info__alpha }, label );

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "navlink-ws"){
                    tl.add( ws__setNavAnimate.play() );

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "navlink-mobile"){
                    tl.add( mobile__setNavAnimate.play() );

                    ScrollTrigger.create(scrollTriggerObj)

                }else{ console.log("invalid type") }
            })
        }

        const navChangeColorOnScroll = (target) => {
            let tl, setAnimation, animate__nav, offset, ieSupp__offset;
            // nav background animate
            setAnimation = new animate("", .3, true, false);
            animate__nav = setAnimation.navChangeBackgroundOnScroll(target);

            tl = gsap.timeline({paused: true}).add( animate__nav.play() );

            window.addEventListener('scroll', (e) => {
                e.preventDefault();

                offset = window.scrollY;
                ieSupp__offset = document.documentElement.scrollTop;

                if(offset > 5 || ieSupp__offset > 5){
                    tl.play();
                }else{
                    tl.reverse();
                }
            });
        }

        const navbarSmoothScroll = () => {
            navLinks.forEach((item, i) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();

                    let href = item.getAttribute("href");
                    let query = document.querySelector(href);
                    let topY = query.offsetTop;

                    gsap.to(window, {duration: 1, scrollTo:topY, overwrite: "all", ease:"Power3.easeOut"});
                })
            })
        }

    //#endregion

    // event listener function for animation
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

    return(
        responsiveAnimation()
    );
}

export default animations;