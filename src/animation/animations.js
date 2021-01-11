// initial
import React from 'react';

// libraries
import gsap from 'gsap';

const animations = () => {

    class animate{
        contructor(selector, duration, isPaused, isReversed){
            this.selector = selector;

            this.master = gsap.timeline
            ({
                paused: isPaused,
                reversed: isReversed,
                defaults: {
                    duration: duration
                }
            })
        }

        setElements(obj){
            gsap.set( this.selector , obj );
        }

        setAnimation(target ,obj, label){
            this.master.to(target, obj, label);
        }

        attributeAnimate(attrObj, label){
            this.master.to(this.selector, { setAttr: attrObj }, label);
            return this.master;
        }
    }

    //#region variables-queries 
        // queries
        let navCircle = document.querySelector("#nav-circle"),
            navLines = document.querySelector("#nav-lines");

        // variables
        let click = "click",
            hover = "hover",
            mouseenter = "mouseenter",
            mouseleave = "mouseleave",
            isPaused = true,
            isReversed = true;

        // custom
        let navClickObj, navAnimate , nav ,
            navAnimateClick, navClick;
    //#endregion

    // custom function
    const eventListeners = (event, target, tween) => {
        let event = event;

        if( event === click ){
            target.addEventListener(event, (e) =>{
                e.preventDefault();
                console.log("asdsadasd")
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

    const navbarSection = () => {
        // custom object 
        navClickObj = { width: "162", height: "172" };
        
        // nav animation
        navAnimate = new animate( navCircle, 1, isPaused, isReversed );
        nav = navAnimate.attributeAnimate( navClickObj );
        
        // event listener animation handler
        eventListeners( click, navLines, nav );

        
    }

  
    return(
        navbarSection()
    );

}

export default animations;