$( document ).ready(function() {
    
    /*==Magnific-popup-Video-View==*/
   
    
    /*======Google-Map=========*/

    
function basicmap() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            scrollwheel: false,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(23.810332, 90.412518), // New York
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": .2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
        };
        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('contact-map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(23.810332, 90.412518),
            map: map,
            title: 'Cryptox'
        });
    }
    if ($('#contact-map').length != 0) {
        google.maps.event.addDomListener(window, 'load', basicmap);
    }
    
    
    /*=========COUNTER===========*/
    
      $('.counter').counterUp({
    delay: 10,
    time: 1000
});
    
    /*=========OWL-CARAOSEL==========*/
    
    $('.testimonial-item').owlCarousel({
        
        loop:true,
        navText: ['<i class="fas fa-angle-left">','<i class="fas fa-angle-right"></i>'],
        autoplay:true,
        autoplayTimeout:4000,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
    
    
    /*============SKILL-PROGRESS-BAR===================*/

       /*
* File: jquery.barfiller.js
* Version: 1.0.1
* Description: A plugin that fills bars with a percentage you set.
* Author: 9bit Studios
* Copyright 2012, 9bit Studios
* http://www.9bitstudios.com
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

    $.fn.barfiller = function (options) {

        var defaults = $.extend({
            barColor: '#16b597',
            tooltip: true,
            duration: 1000,
            animateOnResize: true,
            symbol: "%"
        }, options);


        /******************************
        Private Variables
        *******************************/         

        var object = $(this);
        var settings = $.extend(defaults, options);
        var barWidth = object.width();
        var fill = object.find('.fill');
        var toolTip = object.find('.tip');
        var fillPercentage = fill.attr('data-percentage');
        var resizeTimeout;
        var transitionSupport = false;
        var transitionPrefix;

        /******************************
        Public Methods
        *******************************/         
        
        var methods = {

            init: function() {
                return this.each(function () {
                    if(methods.getTransitionSupport()) {
                        transitionSupport = true;
                        transitionPrefix = methods.getTransitionPrefix();
                    }

                    methods.appendHTML();
                    methods.setEventHandlers();
                    methods.initializeItems();
                });
            },

            /******************************
            Append HTML
            *******************************/            

            appendHTML: function() {
                fill.css('background', settings.barColor);

                if(!settings.tooltip) {
                    toolTip.css('display', 'none');
                }
                toolTip.text(fillPercentage + settings.symbol);
            },
            

            /******************************
            Set Event Handlers
            *******************************/
            setEventHandlers: function() {
                if(settings.animateOnResize) {
                    $(window).on("resize", function(event){
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(function() { 
                        methods.refill(); 
                        }, 300);
                    });             
                }
            },              

            /******************************
            Initialize
            *******************************/            

            initializeItems: function() {
            var pctWidth = methods.calculateFill(fillPercentage);
            object.find('.tipWrap').css({ display: 'inline' });

            if(transitionSupport)
                methods.transitionFill(pctWidth);
            else
                methods.animateFill(pctWidth);
            },

            getTransitionSupport: function() {

                var thisBody = document.body || document.documentElement,
                thisStyle = thisBody.style;
                var support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
                return support;     
            },
                
            getTransitionPrefix: function() {
                if(/mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase())) {
                    return '-moz-transition';
                }
                if(/webkit/.test(navigator.userAgent.toLowerCase())) {
                    return '-webkit-transition';
                }
                if(/opera/.test(navigator.userAgent.toLowerCase())) {
                    return '-o-transition';
                }
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    return '-ms-transition';
                }
                else {
                    return 'transition';
                }
            },

            getTransition: function(val, time, type) {

                var CSSObj;
                if(type === 'width') {
                    CSSObj = { width : val };
                }
                else if (type === 'left') {
                    CSSObj = { left: val };
                }

                time = time/1000;
                CSSObj[transitionPrefix] = type+' '+time+'s ease-in-out';           
                return CSSObj;

            },              

            refill: function() {
                fill.css('width', 0);
                toolTip.css('left', 0);
                barWidth = object.width();
                methods.initializeItems();
            },

            calculateFill: function(percentage) {
                percentage = percentage *  0.01;
                var finalWidth = barWidth * percentage;
                return finalWidth;
            },       

            transitionFill: function(barWidth) {

                var toolTipOffset = barWidth - toolTip.width();
                fill.css( methods.getTransition(barWidth, settings.duration, 'width'));
                toolTip.css( methods.getTransition(toolTipOffset, settings.duration, 'left'));

            },  

            animateFill: function(barWidth) {
                var toolTipOffset = barWidth - toolTip.width();
                fill.stop().animate({width: '+=' + barWidth}, settings.duration);
                toolTip.stop().animate({left: '+=' + toolTipOffset}, settings.duration);
            }
            
        };
        
        if (methods[options]) {     // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {   // $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in barfiller plugin!');
        } 
    };

})(jQuery);


    
    
    
    
});