(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.tingle = factory();
    }
}(this, function() {


    var transitionEvent = whichTransitionEvent();

    function Modal(options) {

        var defaults = {
            onClose: null,
            onOpen: null,
            beforeOpen: null,
            beforeClose: null,
            stickyFooter: false,
            footer: false,
            cssClass: [],
            closeLabel: 'Close',
            closeMethods: ['overlay', 'button', 'escape']
        };

        // extends config
        this.opts = extend({}, defaults, options);

        // init modal
        this.init();
    }

    Modal.prototype.init = function() {
        if (this.modal) {
            return;
        }

        _build.call(this);
        _bindEvents.call(this);

        // insert modal in dom
        document.body.insertBefore(this.modal, document.body.firstChild);

        if (this.opts.footer) {
            this.addFooter();
        }
    };

    Modal.prototype.destroy = function() {
        if (this.modal === null) {
            return;
        }

        // unbind all events
        _unbindEvents.call(this);

        // remove modal from dom
        this.modal.parentNode.removeChild(this.modal);

        this.modal = null;
    };


    Modal.prototype.open = function() {

        var self = this;

        // before open callback
        if (typeof self.opts.beforeOpen === 'function') {
            self.opts.beforeOpen();
        }

        if (this.modal.style.removeProperty) {
            this.modal.style.removeProperty('display');
        } else {
            this.modal.style.removeAttribute('display');
        }

        // prevent double scroll
        this._scrollPosition = window.pageYOffset;
        document.body.classList.add('tingle-enabled');
        document.body.style.top = -this._scrollPosition + 'px';

        // sticky footer
        this.setStickyFooter(this.opts.stickyFooter);

        // show modal
        this.modal.classList.add('tingle-modal--visible');

        if (transitionEvent) {
            this.modal.addEventListener(transitionEvent, function handler() {
                if (typeof self.opts.onOpen === 'function') {
                    self.opts.onOpen.call(self);
                }

                // detach event after transition end (so it doesn't fire multiple onOpen)
                self.modal.removeEventListener(transitionEvent, handler, false);

            }, false);
        } else {
            if (typeof self.opts.onOpen === 'function') {
                self.opts.onOpen.call(self);
            }
        }

        // check if modal is bigger than screen height
        this.checkOverflow();
    };

    Modal.prototype.isOpen = function() {
        return !!this.modal.classList.contains("tingle-modal--visible");
    };

    Modal.prototype.close = function() {

        //  before close
        if (typeof this.opts.beforeClose === "function") {
            var close = this.opts.beforeClose.call(this);
            if (!close) return;
        }

        document.body.classList.remove('tingle-enabled');
        window.scrollTo(0, this._scrollPosition);
        document.body.style.top = null;

        this.modal.classList.remove('tingle-modal--visible');

        //Using similar setup as onOpen
        //Reference to the Modal that's created
        var self = this;

        if (transitionEvent) {
            //Track when transition is happening then run onClose on complete
            this.modal.addEventListener(transitionEvent, function handler() {
                // detach event after transition end (so it doesn't fire multiple onClose)
                self.modal.removeEventListener(transitionEvent, handler, false);

                self.modal.style.display = 'none';

                // on close callback
                if (typeof self.opts.onClose === "function") {
                    self.opts.onClose.call(this);
                }

            }, false);
        } else {
            self.modal.style.display = 'none';
            // on close callback
            if (typeof self.opts.onClose === "function") {
                self.opts.onClose.call(this);
            }
        }
    };

    Modal.prototype.setContent = function(content) {
        // check type of content : String or Node
        if (typeof content === 'string') {
            this.modalBoxContent.innerHTML = content;
        } else {
            this.modalBoxContent.innerHTML = "";
            this.modalBoxContent.appendChild(content);
        }
    };

    Modal.prototype.getContent = function() {
        return this.modalBoxContent;
    };

    Modal.prototype.addFooter = function() {
        // add footer to modal
        _buildFooter.call(this);
    };

    Modal.prototype.setFooterContent = function(content) {
        // set footer content
        this.modalBoxFooter.innerHTML = content;
    };

    Modal.prototype.getFooterContent = function() {
        return this.modalBoxFooter;
    };

    Modal.prototype.setStickyFooter = function(isSticky) {
        // if the modal is smaller than the viewport height, we don't need sticky
        if (!this.isOverflow()) {
            isSticky = false;
        }

        if (isSticky) {
            if (this.modalBox.contains(this.modalBoxFooter)) {
                this.modalBox.removeChild(this.modalBoxFooter);
                this.modal.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky');
                _recalculateFooterPosition.call(this);
                this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight + 20 + 'px';
            }
        } else if (this.modalBoxFooter) {
            if (!this.modalBox.contains(this.modalBoxFooter)) {
                this.modal.removeChild(this.modalBoxFooter);
                this.modalBox.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.style.width = 'auto';
                this.modalBoxFooter.style.left = '';
                this.modalBoxContent.style['padding-bottom'] = '';
                this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky');
            }
        }
    };


    Modal.prototype.addFooterBtn = function(label, cssClass, callback) {
        var btn = document.createElement("button");

        // set label
        btn.innerHTML = label;

        // bind callback
        btn.addEventListener('click', callback);

        if (typeof cssClass === 'string' && cssClass.length) {
            // add classes to btn
            cssClass.split(" ").forEach(function(item) {
                btn.classList.add(item);
            });
        }

        this.modalBoxFooter.appendChild(btn);

        return btn;
    };

    Modal.prototype.resize = function() {
        console.warn('Resize is deprecated and will be removed in version 1.0');
    };


    Modal.prototype.isOverflow = function() {
        var viewportHeight = window.innerHeight;
        var modalHeight = this.modalBox.clientHeight;

        return modalHeight >= viewportHeight;
    };

    Modal.prototype.checkOverflow = function() {
        // only if the modal is currently shown
        if (this.modal.classList.contains('tingle-modal--visible')) {
            if (this.isOverflow()) {
                this.modal.classList.add('tingle-modal--overflow');
            } else {
                this.modal.classList.remove('tingle-modal--overflow');
            }

            // TODO: remove offset
            //_offset.call(this);
            if (!this.isOverflow() && this.opts.stickyFooter) {
                this.setStickyFooter(false);
            } else if (this.isOverflow() && this.opts.stickyFooter) {
                _recalculateFooterPosition.call(this);
                this.setStickyFooter(true);
            }
        }
    }


    /* ----------------------------------------------------------- */
    /* == private methods */
    /* ----------------------------------------------------------- */

    function _recalculateFooterPosition() {
        if (!this.modalBoxFooter) {
            return;
        }
        this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px';
        this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px';
    }

    function _build() {

        // wrapper
        this.modal = document.createElement('div');
        this.modal.classList.add('tingle-modal');

        // remove cursor if no overlay close method
        if (this.opts.closeMethods.length === 0 || this.opts.closeMethods.indexOf('overlay') === -1) {
            this.modal.classList.add('tingle-modal--noOverlayClose');
        }

        this.modal.style.display = 'none';

        // custom class
        this.opts.cssClass.forEach(function(item) {
            if (typeof item === 'string') {
                this.modal.classList.add(item);
            }
        }, this);

        // close btn
        if (this.opts.closeMethods.indexOf('button') !== -1) {
            this.modalCloseBtn = document.createElement('button');
            this.modalCloseBtn.classList.add('tingle-modal__close');

            this.modalCloseBtnIcon = document.createElement('span');
            this.modalCloseBtnIcon.classList.add('tingle-modal__closeIcon');
            this.modalCloseBtnIcon.innerHTML = '×';

            this.modalCloseBtnLabel = document.createElement('span');
            this.modalCloseBtnLabel.classList.add('tingle-modal__closeLabel');
            this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel;

            this.modalCloseBtn.appendChild(this.modalCloseBtnIcon);
            this.modalCloseBtn.appendChild(this.modalCloseBtnLabel);
        }

        // modal
        this.modalBox = document.createElement('div');
        this.modalBox.classList.add('tingle-modal-box');

        // modal box content
        this.modalBoxContent = document.createElement('div');
        this.modalBoxContent.classList.add('tingle-modal-box__content');

        this.modalBox.appendChild(this.modalBoxContent);

        if (this.opts.closeMethods.indexOf('button') !== -1) {
            this.modal.appendChild(this.modalCloseBtn);
        }

        this.modal.appendChild(this.modalBox);

    }

    function _buildFooter() {
        this.modalBoxFooter = document.createElement('div');
        this.modalBoxFooter.classList.add('tingle-modal-box__footer');
        this.modalBox.appendChild(this.modalBoxFooter);
    }

    function _bindEvents() {

        this._events = {
            clickCloseBtn: this.close.bind(this),
            clickOverlay: _handleClickOutside.bind(this),
            resize: this.checkOverflow.bind(this),
            keyboardNav: _handleKeyboardNav.bind(this)
        };

        if (this.opts.closeMethods.indexOf('button') !== -1) {
            this.modalCloseBtn.addEventListener('click', this._events.clickCloseBtn);
        }

        this.modal.addEventListener('mousedown', this._events.clickOverlay);
        window.addEventListener('resize', this._events.resize);
        document.addEventListener("keydown", this._events.keyboardNav);
    }

    function _handleKeyboardNav(event) {
        // escape key
        if (this.opts.closeMethods.indexOf('escape') !== -1 && event.which === 27 && this.isOpen()) {
            this.close();
        }
    }

    function _handleClickOutside(event) {
        // if click is outside the modal
        if (this.opts.closeMethods.indexOf('overlay') !== -1 && !_findAncestor(event.target, 'tingle-modal') &&
        event.clientX < this.modal.clientWidth) {
            this.close();
        }
    }

    function _findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function _unbindEvents() {
        if (this.opts.closeMethods.indexOf('button') !== -1) {
            this.modalCloseBtn.removeEventListener('click', this._events.clickCloseBtn);
        }
        this.modal.removeEventListener('mousedown', this._events.clickOverlay);
        window.removeEventListener('resize', this._events.resize);
        document.removeEventListener("keydown", this._events.keyboardNav);
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('tingle-test-transition');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    return {
        modal: Modal
    };

}));


;(function ($) {
  
    //FlexSlider: Object Instance
    $.flexslider = function(el, options) {
      var slider = $(el);
      
      // slider DOM reference for use outside of the plugin
      $.data(el, "flexslider", slider);
  
      slider.init = function() {
        slider.vars = $.extend({}, $.flexslider.defaults, options);
        $.data(el, 'flexsliderInit', true);
          slider.container = $('.slides', slider).eq(0);
          slider.slides = $('.slides:first > li', slider);
        slider.count = slider.slides.length;
        slider.animating = false;
        slider.currentSlide = slider.vars.slideToStart;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide == 0) ? true : false;
        slider.eventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
        slider.cloneCount = 0;
        slider.cloneOffset = 0;
        slider.manualPause = false;
        slider.vertical = (slider.vars.slideDirection == "vertical");
        slider.prop = (slider.vertical) ? "top" : "marginLeft";
        slider.args = {};
        
        //Test for webbkit CSS3 Animations
        slider.transitions = "webkitTransition" in document.body.style && slider.vars.useCSS;
        if (slider.transitions) slider.prop = "-webkit-transform";
        
        //Test for controlsContainer
        if (slider.vars.controlsContainer != "") {
          slider.controlsContainer = $(slider.vars.controlsContainer).eq($('.slides').index(slider.container));
          slider.containerExists = slider.controlsContainer.length > 0;
        }
        //Test for manualControls
        if (slider.vars.manualControls != "") {
          slider.manualControls = $(slider.vars.manualControls, ((slider.containerExists) ? slider.controlsContainer : slider));
          slider.manualExists = slider.manualControls.length > 0;
        }
        
        ///////////////////////////////////////////////////////////////////
        // FlexSlider: Randomize Slides
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }
        ///////////////////////////////////////////////////////////////////
        
        ///////////////////////////////////////////////////////////////////
        // FlexSlider: Slider Animation Initialize
        if (slider.vars.animation.toLowerCase() == "slide") {
          if (slider.transitions) {
            slider.setTransition(0);
          }
          slider.css({"overflow": "hidden"});
          if (slider.vars.animationLoop) {
            slider.cloneCount = 2;
            slider.cloneOffset = 1;
            slider.container.append(slider.slides.filter(':first').clone().addClass('clone')).prepend(slider.slides.filter(':last').clone().addClass('clone'));
          }
          //create newSlides to capture possible clones
          slider.newSlides = $('.slides:first > li', slider);
          var sliderOffset = (-1 * (slider.currentSlide + slider.cloneOffset));
          if (slider.vertical) {
            slider.newSlides.css({"display": "block", "width": "100%", "float": "left"});
            slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
            //Timeout function to give browser enough time to get proper height initially
            setTimeout(function() {
              slider.css({"position": "relative"}).height(slider.slides.filter(':first').height());
              slider.args[slider.prop] = (slider.transitions) ? "translate3d(0," + sliderOffset * slider.height() + "px,0)" : sliderOffset * slider.height() + "px";
              slider.container.css(slider.args);
            }, 100);
  
          } else {
            slider.args[slider.prop] = (slider.transitions) ? "translate3d(" + sliderOffset * slider.width() + "px,0,0)" : sliderOffset * slider.width() + "px";
            slider.container.width((slider.count + slider.cloneCount) * 200 + "%").css(slider.args);
            //Timeout function to give browser enough time to get proper width initially
            setTimeout(function() {
              slider.newSlides.width(slider.width()).css({"float": "left", "display": "block"});
            }, 100);
          }
          
        } else { //Default to fade
          //Not supporting fade CSS3 transitions right now
          slider.transitions = false;
          slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%"}).eq(slider.currentSlide).fadeIn(slider.vars.animationDuration); 
        }
        ///////////////////////////////////////////////////////////////////
        
        ///////////////////////////////////////////////////////////////////
        // FlexSlider: Control Nav
        if (slider.vars.controlNav) {
          if (slider.manualExists) {
            slider.controlNav = slider.manualControls;
          } else {
            var controlNavScaffold = $('<ol class="flex-control-nav"></ol>');
            var j = 1;
            for (var i = 0; i < slider.count; i++) {
              controlNavScaffold.append('<li><a>' + j + '</a></li>');
              j++;
            }
  
            if (slider.containerExists) {
              $(slider.controlsContainer).append(controlNavScaffold);
              slider.controlNav = $('.flex-control-nav li a', slider.controlsContainer);
            } else {
              slider.append(controlNavScaffold);
              slider.controlNav = $('.flex-control-nav li a', slider);
            }
          }
  
          slider.controlNav.eq(slider.currentSlide).addClass('active');
  
          slider.controlNav.bind(slider.eventType, function(event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
              (slider.controlNav.index($(this)) > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
              slider.flexAnimate(slider.controlNav.index($(this)), slider.vars.pauseOnAction);
            }
          });
        }
        ///////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider: Direction Nav
        if (slider.vars.directionNav) {
          var directionNavScaffold = $('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="next" href="#">' + slider.vars.nextText + '</a></li></ul>');
          
          if (slider.containerExists) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.flex-direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.flex-direction-nav li a', slider);
          }
          
          //Set initial disable styles if necessary
          if (!slider.vars.animationLoop) {
            if (slider.currentSlide == 0) {
              slider.directionNav.filter('.prev').addClass('disabled');
            } else if (slider.currentSlide == slider.count - 1) {
              slider.directionNav.filter('.next').addClass('disabled');
            }
          }
          
          slider.directionNav.bind(slider.eventType, function(event) {
            event.preventDefault();
            var target = ($(this).hasClass('next')) ? slider.getTarget('next') : slider.getTarget('prev');
            
            if (slider.canAdvance(target)) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        //////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider: Keyboard Nav
        if (slider.vars.keyboardNav && $('ul.slides').length == 1) {
          function keyboardMove(event) {
            if (slider.animating) {
              return;
            } else if (event.keyCode != 39 && event.keyCode != 37){
              return;
            } else {
              if (event.keyCode == 39) {
                var target = slider.getTarget('next');
              } else if (event.keyCode == 37){
                var target = slider.getTarget('prev');
              }
          
              if (slider.canAdvance(target)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }
          }
          $(document).bind('keyup', keyboardMove);
        }
        //////////////////////////////////////////////////////////////////
        
        ///////////////////////////////////////////////////////////////////
        // FlexSlider: Mousewheel interaction
        if (slider.vars.mousewheel) {
          slider.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
          slider.bind(slider.mousewheelEvent, function(e) {
            e.preventDefault();
            e = e ? e : window.event;
            var wheelData = e.detail ? e.detail * -1 : e.originalEvent.wheelDelta / 40,
                target = (wheelData < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            
            if (slider.canAdvance(target)) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        ///////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider: Slideshow Setup
        if (slider.vars.slideshow) {
          //pauseOnHover
          if (slider.vars.pauseOnHover && slider.vars.slideshow) {
            slider.hover(function() {
              slider.pause();
            }, function() {
              if (!slider.manualPause) {
                slider.resume();
              }
            });
          }
  
          //Initialize animation
          slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
        }
        //////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider: Pause/Play
        if (slider.vars.pausePlay) {
          var pausePlayScaffold = $('<div class="flex-pauseplay"><span></span></div>');
        
          if (slider.containerExists) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.flex-pauseplay span', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.flex-pauseplay span', slider);
          }
          
          var pausePlayState = (slider.vars.slideshow) ? 'pause' : 'play';
          slider.pausePlay.addClass(pausePlayState).text((pausePlayState == 'pause') ? slider.vars.pauseText : slider.vars.playText);
          
          slider.pausePlay.bind(slider.eventType, function(event) {
            event.preventDefault();
            if ($(this).hasClass('pause')) {
              slider.pause();
              slider.manualPause = true;
            } else {
              slider.resume();
              slider.manualPause = false;
            }
          });
        }
        //////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider:Touch Swip Gestures
        //Some brilliant concepts adapted from the following sources
        //Source: TouchSwipe - http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
        //Source: SwipeJS - http://swipejs.com
        if ('ontouchstart' in document.documentElement && slider.vars.touch) {
          //For brevity, variables are named for x-axis scrolling
          //The variables are then swapped if vertical sliding is applied
          //This reduces redundant code...I think :)
          //If debugging, recognize variables are named for horizontal scrolling
          var startX,
            startY,
            offset,
            cwidth,
            dx,
            startT,
            scrolling = false;
                
          slider.each(function() {
            if ('ontouchstart' in document.documentElement) {
              this.addEventListener('touchstart', onTouchStart, false);
            }
          });
          
          function onTouchStart(e) {
            if (slider.animating) {
              e.preventDefault();
            } else if (e.touches.length == 1) {
              slider.pause();
              cwidth = (slider.vertical) ? slider.height() : slider.width();
              startT = Number(new Date());
              offset = (slider.vertical) ? (slider.currentSlide + slider.cloneOffset) * slider.height() : (slider.currentSlide + slider.cloneOffset) * slider.width();
              startX = (slider.vertical) ? e.touches[0].pageY : e.touches[0].pageX;
              startY = (slider.vertical) ? e.touches[0].pageX : e.touches[0].pageY;
              slider.setTransition(0);
  
              this.addEventListener('touchmove', onTouchMove, false);
              this.addEventListener('touchend', onTouchEnd, false);
            }
          }
  
          function onTouchMove(e) {
            dx = (slider.vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
            scrolling = (slider.vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));
  
            if (!scrolling) {
              e.preventDefault();
              if (slider.vars.animation == "slide" && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = dx/((slider.currentSlide == 0 && dx < 0 || slider.currentSlide == slider.count - 1 && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                }
                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + (-offset - dx) + "px,0)": "translate3d(" + (-offset - dx) + "px,0,0)";
                slider.container.css(slider.args);
              }
            }
          }
          
          function onTouchEnd(e) {
            slider.animating = false;
            if (slider.animatingTo == slider.currentSlide && !scrolling && !(dx == null)) {
              var target = (dx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
              if (slider.canAdvance(target) && Number(new Date()) - startT < 550 && Math.abs(dx) > 20 || Math.abs(dx) > cwidth/2) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else if (slider.vars.animation !== "fade") {
                slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction);
              }
            }
            
            //Finish the touch by undoing the touch session
            this.removeEventListener('touchmove', onTouchMove, false);
            this.removeEventListener('touchend', onTouchEnd, false);
            startX = null;
            startY = null;
            dx = null;
            offset = null;
          }
        }
        //////////////////////////////////////////////////////////////////
        
        //////////////////////////////////////////////////////////////////
        //FlexSlider: Resize Functions (If necessary)
        if (slider.vars.animation.toLowerCase() == "slide") {
          $(window).resize(function(){
            if (!slider.animating && slider.is(":visible")) {
              if (slider.vertical) {
                slider.height(slider.slides.filter(':first').height());
                slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.slides.filter(':first').height() + "px";
                if (slider.transitions) {
                  slider.setTransition(0);
                  slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
                }
                slider.container.css(slider.args);
              } else {
                slider.newSlides.width(slider.width());
                slider.args[slider.prop] = (-1 * (slider.currentSlide + slider.cloneOffset))* slider.width() + "px";
                if (slider.transitions) {
                  slider.setTransition(0);
                  slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
                }
                slider.container.css(slider.args);
              }
            }
          });
        }
        //////////////////////////////////////////////////////////////////
        
        //FlexSlider: start() Callback
        slider.vars.start(slider);
      }
      
      //FlexSlider: Animation Actions
      slider.flexAnimate = function(target, pause) {
        if (!slider.animating && slider.is(":visible")) {
          //Animating flag
          slider.animating = true;
          
          //FlexSlider: before() animation Callback
          slider.animatingTo = target;
          slider.vars.before(slider);
          
          //Optional paramter to pause slider when making an anmiation call
          if (pause) {
            slider.pause();
          }
          
          //Update controlNav   
          if (slider.vars.controlNav) {
            slider.controlNav.removeClass('active').eq(target).addClass('active');
          }
          
          //Is the slider at either end
          slider.atEnd = (target == 0 || target == slider.count - 1) ? true : false;
          if (!slider.vars.animationLoop && slider.vars.directionNav) {
            if (target == 0) {
              slider.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');
            } else if (target == slider.count - 1) {
              slider.directionNav.removeClass('disabled').filter('.next').addClass('disabled');
            } else {
              slider.directionNav.removeClass('disabled');
            }
          }
          
          if (!slider.vars.animationLoop && target == slider.count - 1) {
            slider.pause();
            //FlexSlider: end() of cycle Callback
            slider.vars.end(slider);
          }
          
          if (slider.vars.animation.toLowerCase() == "slide") {
            var dimension = (slider.vertical) ? slider.slides.filter(':first').height() : slider.slides.filter(':first').width();
            
            if (slider.currentSlide == 0 && target == slider.count - 1 && slider.vars.animationLoop && slider.direction != "next") {
              slider.slideString = "0px";
            } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.vars.animationLoop && slider.direction != "prev") {
              slider.slideString = (-1 * (slider.count + 1)) * dimension + "px";
            } else {
              slider.slideString = (-1 * (target + slider.cloneOffset)) * dimension + "px";
            }
            slider.args[slider.prop] = slider.slideString;
  
            if (slider.transitions) {
                slider.setTransition(slider.vars.animationDuration); 
                slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.slideString + ",0)" : "translate3d(" + slider.slideString + ",0,0)";
                slider.container.css(slider.args).one("webkitTransitionEnd transitionend", function(){
                  slider.wrapup(dimension);
                });   
            } else {
              slider.container.animate(slider.args, slider.vars.animationDuration, function(){
                slider.wrapup(dimension);
              });
            }
          } else { //Default to Fade
            slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationDuration);
            slider.slides.eq(target).fadeIn(slider.vars.animationDuration, function() {
              slider.wrapup();
            });
          }
        }
      }
      
      //FlexSlider: Function to minify redundant animation actions
      slider.wrapup = function(dimension) {
        if (slider.vars.animation == "slide") {
          //Jump the slider if necessary
          if (slider.currentSlide == 0 && slider.animatingTo == slider.count - 1 && slider.vars.animationLoop) {
            slider.args[slider.prop] = (-1 * slider.count) * dimension + "px";
            if (slider.transitions) {
              slider.setTransition(0);
              slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
            }
            slider.container.css(slider.args);
          } else if (slider.currentSlide == slider.count - 1 && slider.animatingTo == 0 && slider.vars.animationLoop) {
            slider.args[slider.prop] = -1 * dimension + "px";
            if (slider.transitions) {
              slider.setTransition(0);
              slider.args[slider.prop] = (slider.vertical) ? "translate3d(0," + slider.args[slider.prop] + ",0)" : "translate3d(" + slider.args[slider.prop] + ",0,0)";
            }
            slider.container.css(slider.args);
          }
        }
        slider.animating = false;
        slider.currentSlide = slider.animatingTo;
        //FlexSlider: after() animation Callback
        slider.vars.after(slider);
      }
      
      //FlexSlider: Automatic Slideshow
      slider.animateSlides = function() {
        if (!slider.animating) {
          slider.flexAnimate(slider.getTarget("next"));
        }
      }
      
      //FlexSlider: Automatic Slideshow Pause
      slider.pause = function() {
        clearInterval(slider.animatedSlides);
        if (slider.vars.pausePlay) {
          slider.pausePlay.removeClass('pause').addClass('play').text(slider.vars.playText);
        }
      }
      
      //FlexSlider: Automatic Slideshow Start/Resume
      slider.resume = function() {
        slider.animatedSlides = setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
        if (slider.vars.pausePlay) {
          slider.pausePlay.removeClass('play').addClass('pause').text(slider.vars.pauseText);
        }
      }
      
      //FlexSlider: Helper function for non-looping sliders
      slider.canAdvance = function(target) {
        if (!slider.vars.animationLoop && slider.atEnd) {
          if (slider.currentSlide == 0 && target == slider.count - 1 && slider.direction != "next") {
            return false;
          } else if (slider.currentSlide == slider.count - 1 && target == 0 && slider.direction == "next") {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }  
      }
      
      //FlexSlider: Helper function to determine animation target
      slider.getTarget = function(dir) {
        slider.direction = dir;
        if (dir == "next") {
          return (slider.currentSlide == slider.count - 1) ? 0 : slider.currentSlide + 1;
        } else {
          return (slider.currentSlide == 0) ? slider.count - 1 : slider.currentSlide - 1;
        }
      }
      
      //FlexSlider: Helper function to set CSS3 transitions
      slider.setTransition = function(dur) {
        slider.container.css({'-webkit-transition-duration': (dur/1000) + "s"});
      }
  
      //FlexSlider: Initialize
      slider.init();
    }
    
    //FlexSlider: Default Settings
    $.flexslider.defaults = {
      animation: "slide",              //String: Select your animation type, "fade" or "slide"
      slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
      directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
      controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
      mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
      prevText: "Previous",           //String: Set the text for the "previous" directionNav item
      nextText: "Next",               //String: Set the text for the "next" directionNav item
      pausePlay: false,               //Boolean: Create pause/play dynamic element
      pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
      playText: 'Play',               //String: Set the text for the "play" pausePlay item
      randomize: false,               //Boolean: Randomize slide order
      slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
      animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
      pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
      useCSS: true,                   //Boolean: Override the use of CSS3 Translate3d animations
      touch: true,                    //Boolean: Disable touchswipe events
      controlsContainer: "",          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
      manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
      start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
      before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
      after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
      end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    }
    
    //FlexSlider: Plugin Function
    $.fn.flexslider = function(options) {
      return this.each(function() {
        var $slides = $(this).find('.slides > li');
        if ($slides.length === 1) {
          $slides.fadeIn(400);
          if (options && options.start) options.start($(this));
        }
        else if ($(this).data('flexsliderInit') != true) {
          new $.flexslider(this, options);
        }
      });
    }
  
  })(jQuery);
  