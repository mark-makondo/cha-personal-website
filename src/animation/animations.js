// libraries
import gsap from 'gsap';

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
        
    }

    //#region variables-queries 
    // queries
    let navCircle = document.querySelector("#nav-circle"),
        navLines = document.querySelector("#nav-lines"),
        navLineOne = document.querySelector("#nav-line-one"),
        navLineTwo = document.querySelector("#nav-line-two"),
        navLineThree = document.querySelector("#nav-line-three"),
        navContents = document.querySelector(".navbar__contents"),
        navContentsList = document.querySelectorAll(".navbar__contents ul li");
       
    // variables
    let click = "click",
        hover = "hover",
        mouseenter = "mouseenter",
        mouseleave = "mouseleave",
        paused = true,
        reversed = true;

    // custom
    let attr__circleScaleUp, attr__linesScaleDown, attr__linesSuppresed, attr__linesSlantUp, attr__linesSlantDown,
        navAnimation , navAnimate, label__nav, anim__moveRightDisplay, set__navContentList, anim__displayAlpha;

    //#endregion

    // custom function
    const eventListeners = (targetEvet, target, tween) => {
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

    // section animations
    const navbarSection = () => {
        // custom object animations
        label__nav = "navAnimate"
        attr__circleScaleUp = { attr: { width: "162", height: "172"} };
        attr__linesScaleDown = { attr: { width: "20", height: "30" } };
        attr__linesSuppresed = { attr: { x2: "0%" } };
        attr__linesSlantUp = { rotate:-45 ,attr: { x2: "100%" }, transformOrigin: "28% 0"};
        attr__linesSlantDown = { rotate:45, attr: { x2: "100%" }, transformOrigin: "28% 0"};
        anim__displayAlpha = { display: "unset", autoAlpha: 1};
        set__navContentList =  { x:"-20" ,y:"-20", autoAlpha: 0 };
        anim__moveRightDisplay = { autoAlpha: 1, x:"0", y:"0", stagger: .2};
        
        // nav animation
        navAnimation = new animate( navCircle, .5, paused, reversed );
        // scale down circle and lines
        navAnimate = navAnimation.setAnimation( navCircle, attr__circleScaleUp, label__nav);
        navAnimate = navAnimation.setAnimation( navLines, attr__linesScaleDown, label__nav);
        // mid line 0
        navAnimate = navAnimation.setAnimation( navLineTwo, attr__linesSuppresed, label__nav);
        // cross
        navAnimate = navAnimation.setAnimation( navLineOne, attr__linesSlantUp, label__nav);
        navAnimate = navAnimation.setAnimation( navLineThree, attr__linesSlantDown, label__nav);
        // show nav content and stagger
        navAnimate = navAnimation.setAnimation( navContents, anim__displayAlpha, label__nav);
        navAnimate = navAnimation.setElements( navContentsList, set__navContentList, label__nav);
        navAnimate = navAnimation.setAnimation( navContentsList, anim__moveRightDisplay, label__nav);

        // event listener animation handler
        eventListeners( click, navLines, navAnimate );
    }
  
    return(
        navbarSection()
    );

}

export default animations;