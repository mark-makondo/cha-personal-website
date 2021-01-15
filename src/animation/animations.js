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
            navContentsListWs = document.querySelectorAll(".navbar__contents-ws ul li");
        
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
            scale = (target, scale, transformOrigin, label) => {
                this.master.to(target, { scale: scale, transformOrigin: transformOrigin}, label );
                return this.master;
            }
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
            mobile__navBurgerAnimation(){
                let circle__scale = 2.8, circle__transformOrigin= "center center";
                let line__scale = .5, line__transformOrigin = "top right";
                let lineTwo__x2_suppressed = "0%";
                let lineOne__rotate = -45, lineOne__x2 = "100%", lineOne__transformOrigin = "28% 0";
                let lineTwo__rotate = 45,  lineTwo__x2 = "100%", lineTwo__transformOrigin = "28% 0";
                let stagger = .2;
                let label = "navBurgerAnimation";

                this.master 
                    // scale down circle and lines
                    .add( this.scale( navCircle, circle__scale, circle__transformOrigin, label ) )
                    .add( this.scale( navLines, line__scale, line__transformOrigin, label ) )
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
            navResetAnimation = () => {
                let target = [ navLogo, navContentsListWs];
                let y = -50;

                this.master.fromTo(target, { y: y , autoAlpha: 0 }, {
                    y: 0,
                    autoAlpha: 1
                }, "navResetAnimation")
            }
            // featured animation is inside scrollTriggerArray()  
            // nav change background is inside scrollTriggerArray()
        //#endregion
    }

     // responsive animation 
     const responsiveAnimation = () => {

        // responsive animation
        ScrollTrigger.matchMedia({
            
            // desktop
            "(min-width: 769px)": function() {
                navChangeColorOnScroll("ws");

                scrollTriggerArray(".featured--selector", "center 60%", "center 10%", false, "f-active", "featured-ws");
                scrollTriggerArray(".content", "top 80%", "bottom 80%", false, "active", "navlink-ws");

                return function() {// tl.kill(); // tl.clear(); //reset value when viewport changes
                    ws__resetAnimation();
                };
            },

            // mobile
            "(max-width: 768px)": function() {
                navChangeColorOnScroll("mobile");

                scrollTriggerArray(".featured--selector", "center 60%", "center 20%", false, "f-active", "featured-mobile");
                scrollTriggerArray(".content", "top 80%", "bottom 80%", false, "link-active", "navlink-mobile");

                return function() {// tl.kill(); // tl.clear(); //reset value when viewport changes
                    mobile__resetAnimation();
                };
            },
            
            // all 
            "all": function() {
                scrollTriggerArray(".header", "top 10%", "80% 10%", false, "h-active", "header-all");
                scrollTriggerArray(".featured__main-title", "top-=30 30%", "bottom+=30 30%", false, "f-title-active", "featured-title-all");

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
        // reset back nav color
        gsap.set(".navbar .navbar__contents .navbar__lines line", { stroke: "#463333"})
        // reset back nav icons and hr ws animation for mobile
        gsap.set( navCircleEllipse, {fill: "#ebd4d4" })
        gsap.set( mobile__navHr, {autoAlpha: 0, width: 0 })
    }
    const mobile__resetAnimation = () => {
        // reset back nav link and hr mobile animation for ws
        gsap.set( navbar, {background: "transparent" })
        gsap.set( ws__navHr, {autoAlpha: 0, width: 0 });
        // reset back nav color
        gsap.set(".navbar .navbar__contents-ws ul li a", { color: "#463333"})
        gsap.set(".navbar .navbar__logo svg", { fill: "#463333"})
        // reset back featured mobile animation for ws
        gsap.set(".featured--selector .featured__box", { scale: 1, autoAlpha: 1} );
        gsap.set(".featured--selector .featured__info", { autoAlpha: 1} );
    }

    // section animations
    const sectionAnimations = () => {
        // header animation
        let navAnimationOnRefresh = new animate("", 1, false, false);
        let navAnimateOnRefresh = navAnimationOnRefresh.navResetAnimation();

        // nav animation
        let navAnimation = new animate( "", .5, paused, reversed );
        let navAnimate = navAnimation.mobile__navBurgerAnimation();

        // event listener animation handler
        eventListenersTween( click, navLines, navAnimate );
    }

    // #region scroll animations using gsap scroll trigger
    
        const scrollTriggerArray = (main__targetArr, start, end, marker, toggle, type)=> {
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
                    toggleClass: toggle,
                    start: start,
                    end: end,
                    markers: marker,
                    onEnter: () => tl.play(), 
                    onLeave: () => tl.reverse(),
                    onEnterBack: () => tl.play(), 
                    onLeaveBack: () => tl.reverse()
                }
                
                if(type === "header-all"){
                    let label = "header-mobile", offset = "+=1";
                    let duration = 1;
                    
                    let arrTarget__moveDown = [".header__info", ".header__pic"];
                    let headerLogo = [".header__logo svg"];
                    let headerP = ".header__info p";
                    let headerPicture = ".header__pic";

                    let moveDown__setAlpha = 0, moveDown__setY = -100, moveDown__alpha = 1, moveDown__Y = 0;
                    let changeColor__color = "#463333", changeColor__color2 ="#584242";
                    let mixBlendMode = "unset";

                    gsap.set(arrTarget__moveDown, { autoAlpha:moveDown__setAlpha, yPercent: moveDown__setY });

                    tl.to(arrTarget__moveDown, { duration:duration, autoAlpha:moveDown__alpha, yPercent:moveDown__Y, ease: "bounce.out"}, label)
                    .to(headerLogo, {duration:duration, fill: changeColor__color}, label+offset)
                    .to(headerP, {duration:duration, color: changeColor__color2 }, label+offset)
                    .to(headerPicture, { duration:duration, mixBlendMode: mixBlendMode}, label+offset)

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "featured-title-all"){
                    let featured__mainTitle = ".featured__main-title";
                    let changeColor = "#463333";

                    tl.to(featured__mainTitle, { color: changeColor });

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "featured-ws"){

                    let duration = 1;
                    let x, even__box, odd__box, even__info, odd__info, even__infoP, odd__infoP;
                    let label__even = "even", label__odd = "odd";
                    let xPercentBox_even = -5, xPercentInfo_even = 5, alphaInfo_even = 0;
                    let xPercentBox_odd = 5, xPercentInfo_odd = -5, alphaInfo_odd = 0;
                    let mixBlendMode = "unset", color = "#463333", color2 = "#584242";

                    x = i+1;
                    if(x%2 !==0 ){
                        even__box =".featured--selector:nth-child("+x+") .featured__box";
                        even__info =".featured--selector:nth-child("+x+") .featured__info";
                        even__infoP =".featured--selector:nth-child("+x+") .featured__info p";

                        gsap.set(even__box, { xPercent: xPercentBox_even } )
                        gsap.set(even__info, { xPercent: xPercentInfo_even, autoAlpha: alphaInfo_even} )

                        tl.to(even__box,  { duration: duration, xPercent: 0, mixBlendMode: mixBlendMode, ease: "bounce.out"}, label__even)
                        .to(even__info,  { duration: duration, xPercent: 0, autoAlpha: 1, color: color}, label__even)
                        .to(even__infoP, { duration: duration, color: color2 }, label__even)

                    }else{
                        odd__box =".featured--selector:nth-child("+x+") .featured__box";
                        odd__info =".featured--selector:nth-child("+x+") .featured__info";
                        odd__infoP =".featured--selector:nth-child("+x+") .featured__info p";

                        gsap.set(odd__box, { xPercent: xPercentBox_odd } )
                        gsap.set(odd__info, { xPercent: xPercentInfo_odd, autoAlpha: alphaInfo_odd} )

                        tl.to(odd__box,  { duration: duration, xPercent: 0, mixBlendMode: mixBlendMode, ease: "bounce.out"}, label__odd)
                        .to(odd__info, { duration: duration, xPercent: 0, autoAlpha: 1, color: color }, label__odd)
                        .to(odd__infoP, { duration: duration, color: color2 }, label__odd)

                    }

                    ScrollTrigger.create(scrollTriggerObj)

                }else if(type === "featured-mobile"){
                    let duration = .5, offset = "+=.5";
                    let box__setScale = 0, box__setAlpha = 0, box__scale = 1, box__alpha = 1;
                    let info__setAlpha = 0, info__alpha = 1;
                    let label = "featured__mobile"
                    let mixBlendMode = "unset", color = "#463333";

                    gsap.set(featured__box[i], { scale: box__setScale, autoAlpha: box__setAlpha} );
                    gsap.set(featured__info[i], { autoAlpha: info__setAlpha} );

                    tl.to(featured__box[i], { duration: duration, scale: box__scale, autoAlpha: box__alpha }, label )
                    .to(featured__info[i], { duration: duration, autoAlpha: info__alpha }, label )
                    .to(featured__box[i], { duration: duration, mixBlendMode: mixBlendMode  }, label+offset )
                    .to(featured__info[i], { duration: duration, color: color }, label+offset );

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

        const navChangeColorOnScroll = (type) => {
            let tl, offset, ieSupp__offset;

            tl = gsap.timeline({paused: true})

            if(type === "mobile"){
                tl.add(  mobile__navChangeColor() );
            }else if( type === "ws"){
                tl.add(  ws__navChangeColor() );
            }

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

        const mobile__navChangeColor = () => {
            let nav__circle = ".navbar__contents .navbar__circle ellipse";
            let nav__lines = ".navbar__contents .navbar__lines line";
            let nav__list = ".navbar__contents ul li a";
            let nav__hr = ".navbar__contents .navbar__li-hr";
            let color = "#ebd4d4", bgColor = "#463333";
            let label = "ws__navChangeColor", tl;

            tl = gsap.timeline({ })
            .to(nav__circle, {fill: bgColor }, label )
            .to(nav__lines, {stroke: color } , label )
            .to(nav__list, {color: color } , label )
            .to(nav__hr, {borderColor: color } , label )
            
            return tl;
        }
        const ws__navChangeColor = () => {
            let nav = ".navbar";
            let nav__list = ".navbar__contents-ws ul li a";
            let nav__hr = ".navbar__contents-ws .navbar__li-hr";
            let nav__logo = ".navbar .navbar__logo svg";
            let color = "#EBD4D4", bgColor = "#463333";
            let label = "ws__navChangeColor", tl;

            tl = gsap.timeline({ })
            .to(nav, {background: bgColor }, label)
            .to(nav__list, {color: color }, label)
            .to(nav__logo, {fill: color }, label)
            .to(nav__hr, {borderColor: color }, label);

            return tl;
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