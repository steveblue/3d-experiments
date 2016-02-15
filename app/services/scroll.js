(function( define ) {
    'use strict';

    /**
     * Register the Basic class with RequireJS
     */
    define( [], function ()
    {
           var ScrollService = function(){
            this.scrollEvent = new CustomEvent('appScroll',
            	{
            		detail: {},
            		bubbles: true,
            		cancelable: true
            	}
            );

            this.elements = [];

           };

           ScrollService.prototype.start = function() {
             window.addEventListener('scroll', function(){
               window.requestAnimationFrame(this.scroller.bind(this));
             }.bind(this));
           };

           ScrollService.prototype.scroller = function(ev) {


            if(window.scrollY > 50 && window.scrollY < document.body.offsetHeight - 1000) {
              this.hitStart = false;
              this.hitEnd = false;
            } else if (window.scrollY > document.body.offsetHeight - 1000){
              this.hitEnd = true;
            } else {
              this.hitStart = true;
            }

            this.scrollEvent = new CustomEvent('appScroll',
             {
               detail: {
                 position: window.scrollY,
                 length: document.body.offsetHeight,
                 hitStart: this.hitStart,
                 hitEnd: this.hitEnd
               },
               bubbles: true,
               cancelable: true
             }
            );

             for(var i=0; i < this.elements.length; i++) {
               this.elements[i].dispatchEvent(this.scrollEvent);
             }
           };

           ScrollService.prototype.register = function(elem) {
             this.elements.push(elem);
           };

           ScrollService.prototype.stop = function() {

           };
        // Register as global constructor function

        return [ ScrollService ];

    });


}( define ));
