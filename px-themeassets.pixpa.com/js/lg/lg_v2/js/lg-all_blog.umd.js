/*!
 * lightgallery | 2.5.0 | June 13th 2022
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lightGallery = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * List of lightGallery events
     * All events should be documented here
     * Below interfaces are used to build the website documentations
     * */
    var lGEvents = {
        afterAppendSlide: 'lgAfterAppendSlide',
        init: 'lgInit',
        hasVideo: 'lgHasVideo',
        containerResize: 'lgContainerResize',
        updateSlides: 'lgUpdateSlides',
        afterAppendSubHtml: 'lgAfterAppendSubHtml',
        beforeOpen: 'lgBeforeOpen',
        afterOpen: 'lgAfterOpen',
        slideItemLoad: 'lgSlideItemLoad',
        beforeSlide: 'lgBeforeSlide',
        afterSlide: 'lgAfterSlide',
        posterClick: 'lgPosterClick',
        dragStart: 'lgDragStart',
        dragMove: 'lgDragMove',
        dragEnd: 'lgDragEnd',
        beforeNextSlide: 'lgBeforeNextSlide',
        beforePrevSlide: 'lgBeforePrevSlide',
        beforeClose: 'lgBeforeClose',
        afterClose: 'lgAfterClose',
        rotateLeft: 'lgRotateLeft',
        rotateRight: 'lgRotateRight',
        flipHorizontal: 'lgFlipHorizontal',
        flipVertical: 'lgFlipVertical',
        autoplay: 'lgAutoplay',
        autoplayStart: 'lgAutoplayStart',
        autoplayStop: 'lgAutoplayStop',
    };

    var lightGalleryCoreSettings = {
        mode: 'lg-slide',
        easing: 'ease',
        speed: 400,
        licenseKey: '7F193690-F34A4CE8-ADC3DF78-F29AE100',
        height: '100%',
        width: '100%',
        addClass: '',
        startClass: 'lg-start-zoom',
        backdropDuration: 300,
        container: '',
        startAnimationDuration: 400,
        zoomFromOrigin: true,
        hideBarsDelay: 0,
        showBarsAfter: 10000,
        slideDelay: 0,
        supportLegacyBrowser: true,
        allowMediaOverlap: false,
        videoMaxSize: '1280-720',
        loadYouTubePoster: true,
        defaultCaptionHeight: 0,
        ariaLabelledby: '',
        ariaDescribedby: '',
        resetScrollPosition: true,
        hideScrollbar: false,
        closable: true,
        swipeToClose: false, //pixpa code added
        closeOnTap: false, //pixpa code added
        showCloseIcon: true,
        showMaximizeIcon: false,
        loop: true,
        escKey: true,
        keyPress: true,
        trapFocus: true,
        controls: true,
        slideEndAnimation: true,
        hideControlOnEnd: false,
        mousewheel: false,
        getCaptionFromTitleOrAlt: true,
        appendSubHtmlTo: '.lg-sub-html',
        subHtmlSelectorRelative: false,
        preload: 5,
        numberOfSlideItemsInDom: 10,
        selector: '',
        selectWithin: '',
        nextHtml: '',
        prevHtml: '',
        index: 0,
        iframeWidth: '100%',
        iframeHeight: '100%',
        iframeMaxWidth: '100%',
        iframeMaxHeight: '100%',
        download: false,
        counter: true,
        photoaccent: false,
        photoaccentOpacity: 20,
        appendCounterTo: '.lg-toolbar-left-side',
        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,
        dynamic: false,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: '',
        isMobile: undefined,
        mobileSettings: {
            controls: true,
            showCloseIcon: true,
            download: false,
        },
        plugins: [],
        strings: {
            closeGallery: 'Close gallery',
            toggleMaximize: 'Toggle maximize',
            previousSlide: 'Previous slide',
            nextSlide: 'Next slide',
            download: 'Download',
            playVideo: 'Play video',
        },
    };

    function initLgPolyfills() {
        (function () {
            if (typeof window.CustomEvent === 'function')
                return false;
            function CustomEvent(event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: null,
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
            window.CustomEvent = CustomEvent;
        })();
        (function () {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.msMatchesSelector ||
                        Element.prototype.webkitMatchesSelector;
            }
        })();
    }
    var lgQuery = /** @class */ (function () {
        function lgQuery(selector) {
            this.cssVenderPrefixes = [
                'TransitionDuration',
                'TransitionTimingFunction',
                'Transform',
                'Transition',
            ];
            this.selector = this._getSelector(selector);
            this.firstElement = this._getFirstEl();
            return this;
        }
        lgQuery.generateUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        };
        lgQuery.prototype._getSelector = function (selector, context) {
            if (context === void 0) { context = document; }
            if (typeof selector !== 'string') {
                return selector;
            }
            context = context || document;
            var fl = selector.substring(0, 1);
            if (fl === '#') {
                return context.querySelector(selector);
            }
            else {
                return context.querySelectorAll(selector);
            }
        };
        lgQuery.prototype._each = function (func) {
            if (!this.selector) {
                return this;
            }
            if (this.selector.length !== undefined) {
                [].forEach.call(this.selector, func);
            }
            else {
                func(this.selector, 0);
            }
            return this;
        };
        lgQuery.prototype._setCssVendorPrefix = function (el, cssProperty, value) {
            // prettier-ignore
            var property = cssProperty.replace(/-([a-z])/gi, function (s, group1) {
                return group1.toUpperCase();
            });
            if (this.cssVenderPrefixes.indexOf(property) !== -1) {
                el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                el.style['webkit' + property] = value;
                el.style['moz' + property] = value;
                el.style['ms' + property] = value;
                el.style['o' + property] = value;
            }
            else {
                el.style[property] = value;
            }
        };
        lgQuery.prototype._getFirstEl = function () {
            if (this.selector && this.selector.length !== undefined) {
                return this.selector[0];
            }
            else {
                return this.selector;
            }
        };
        lgQuery.prototype.isEventMatched = function (event, eventName) {
            var eventNamespace = eventName.split('.');
            return event
                .split('.')
                .filter(function (e) { return e; })
                .every(function (e) {
                return eventNamespace.indexOf(e) !== -1;
            });
        };
        lgQuery.prototype.attr = function (attr, value) {
            if (value === undefined) {
                if (!this.firstElement) {
                    return '';
                }
                return this.firstElement.getAttribute(attr);
            }
            this._each(function (el) {
                el.setAttribute(attr, value);
            });
            return this;
        };
        lgQuery.prototype.find = function (selector) {
            return $LG(this._getSelector(selector, this.selector));
        };
        lgQuery.prototype.first = function () {
            if (this.selector && this.selector.length !== undefined) {
                return $LG(this.selector[0]);
            }
            else {
                return $LG(this.selector);
            }
        };
        lgQuery.prototype.eq = function (index) {
            return $LG(this.selector[index]);
        };
        lgQuery.prototype.parent = function () {
            return $LG(this.selector.parentElement);
        };
        lgQuery.prototype.get = function () {
            return this._getFirstEl();
        };
        lgQuery.prototype.removeAttr = function (attributes) {
            var attrs = attributes.split(' ');
            this._each(function (el) {
                attrs.forEach(function (attr) { return el.removeAttribute(attr); });
            });
            return this;
        };
        lgQuery.prototype.wrap = function (className) {
            if (!this.firstElement) {
                return this;
            }
            var wrapper = document.createElement('div');
            wrapper.className = className;
            this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
            this.firstElement.parentNode.removeChild(this.firstElement);
            wrapper.appendChild(this.firstElement);
            return this;
        };
        lgQuery.prototype.addClass = function (classNames) {
            if (classNames === void 0) { classNames = ''; }
            this._each(function (el) {
                // IE doesn't support multiple arguments
                classNames.split(' ').forEach(function (className) {
                    if (className) {
                        el.classList.add(className);
                    }
                });
            });
            return this;
        };
        lgQuery.prototype.removeClass = function (classNames) {
            this._each(function (el) {
                // IE doesn't support multiple arguments
                classNames.split(' ').forEach(function (className) {
                    if (className) {
                        el.classList.remove(className);
                    }
                });
            });
            return this;
        };
        lgQuery.prototype.hasClass = function (className) {
            if (!this.firstElement) {
                return false;
            }
            return this.firstElement.classList.contains(className);
        };
        lgQuery.prototype.hasAttribute = function (attribute) {
            if (!this.firstElement) {
                return false;
            }
            return this.firstElement.hasAttribute(attribute);
        };
        lgQuery.prototype.toggleClass = function (className) {
            if (!this.firstElement) {
                return this;
            }
            if (this.hasClass(className)) {
                this.removeClass(className);
            }
            else {
                this.addClass(className);
            }
            return this;
        };
        lgQuery.prototype.css = function (property, value) {
            var _this = this;
            this._each(function (el) {
                _this._setCssVendorPrefix(el, property, value);
            });
            return this;
        };
        // Need to pass separate namespaces for separate elements
        lgQuery.prototype.on = function (events, listener) {
            var _this = this;
            if (!this.selector) {
                return this;
            }
            events.split(' ').forEach(function (event) {
                if (!Array.isArray(lgQuery.eventListeners[event])) {
                    lgQuery.eventListeners[event] = [];
                }
                lgQuery.eventListeners[event].push(listener);
                _this.selector.addEventListener(event.split('.')[0], listener);
            });
            return this;
        };
        // @todo - test this
        lgQuery.prototype.once = function (event, listener) {
            var _this = this;
            this.on(event, function () {
                _this.off(event);
                listener(event);
            });
            return this;
        };
        lgQuery.prototype.off = function (event) {
            var _this = this;
            if (!this.selector) {
                return this;
            }
            Object.keys(lgQuery.eventListeners).forEach(function (eventName) {
                if (_this.isEventMatched(event, eventName)) {
                    lgQuery.eventListeners[eventName].forEach(function (listener) {
                        _this.selector.removeEventListener(eventName.split('.')[0], listener);
                    });
                    lgQuery.eventListeners[eventName] = [];
                }
            });
            return this;
        };
        lgQuery.prototype.trigger = function (event, detail) {
            if (!this.firstElement) {
                return this;
            }
            var customEvent = new CustomEvent(event.split('.')[0], {
                detail: detail || null,
            });
            this.firstElement.dispatchEvent(customEvent);
            return this;
        };
        // Does not support IE
        lgQuery.prototype.load = function (url) {
            var _this = this;
            fetch(url)
                .then(function (res) { return res.text(); })
                .then(function (html) {
                _this.selector.innerHTML = html;
            });
            return this;
        };
        lgQuery.prototype.html = function (html) {
            if (html === undefined) {
                if (!this.firstElement) {
                    return '';
                }
                return this.firstElement.innerHTML;
            }
            this._each(function (el) {
                el.innerHTML = html;
            });
            return this;
        };
        lgQuery.prototype.append = function (html) {
            this._each(function (el) {
                if (typeof html === 'string') {
                    el.insertAdjacentHTML('beforeend', html);
                }
                else {
                    el.appendChild(html);
                }
            });
            return this;
        };
        lgQuery.prototype.prepend = function (html) {
            this._each(function (el) {
                el.insertAdjacentHTML('afterbegin', html);
            });
            return this;
        };
        lgQuery.prototype.remove = function () {
            this._each(function (el) {
                el.parentNode.removeChild(el);
            });
            return this;
        };
        lgQuery.prototype.empty = function () {
            this._each(function (el) {
                el.innerHTML = '';
            });
            return this;
        };
        lgQuery.prototype.scrollTop = function (scrollTop) {
            if (scrollTop !== undefined) {
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                return this;
            }
            else {
                return (window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0);
            }
        };
        lgQuery.prototype.scrollLeft = function (scrollLeft) {
            if (scrollLeft !== undefined) {
                document.body.scrollLeft = scrollLeft;
                document.documentElement.scrollLeft = scrollLeft;
                return this;
            }
            else {
                return (window.pageXOffset ||
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft ||
                    0);
            }
        };
        lgQuery.prototype.offset = function () {
            if (!this.firstElement) {
                return {
                    left: 0,
                    top: 0,
                };
            }
            var rect = this.firstElement.getBoundingClientRect();
            var bodyMarginLeft = $LG('body').style().marginLeft;
            // Minus body margin - https://stackoverflow.com/questions/30711548/is-getboundingclientrect-left-returning-a-wrong-value
            return {
                left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                top: rect.top + this.scrollTop(),
            };
        };
        lgQuery.prototype.style = function () {
            if (!this.firstElement) {
                return {};
            }
            return (this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement));
        };
        // Width without padding and border even if box-sizing is used.
        lgQuery.prototype.width = function () {
            var style = this.style();
            return (this.firstElement.clientWidth -
                parseFloat(style.paddingLeft) -
                parseFloat(style.paddingRight));
        };
        // Height without padding and border even if box-sizing is used.
        lgQuery.prototype.height = function () {
            var style = this.style();
            return (this.firstElement.clientHeight -
                parseFloat(style.paddingTop) -
                parseFloat(style.paddingBottom));
        };
        lgQuery.eventListeners = {};
        return lgQuery;
    }());
    function $LG(selector) {
        initLgPolyfills();
        return new lgQuery(selector);
    }

    var defaultDynamicOptions = [
        'src',
        'sources',
        'thumb',
        'type',
        'subHtml',
        'subHtmlUrl',
        'html',
        'video',
        'poster',
        'slideName',
        'responsive',
        'srcset',
        'sizes',
        'iframe',
        'downloadUrl',
        // 'width',
        'zoomwidth', //width replace to zoomwidth
        'download',
        'width',
        'facebookShareUrl',
        'tweetText',
        'iframeTitle',
        'twitterShareUrl',
        'pinterestShareUrl',
        'pinterestText',
        'fbHtml',
        'disqusIdentifier',
        'disqusUrl',
        'photoaccent',
        'photoaccentOpacity',
    ];
    // Convert html data-attribute to camalcase
    function convertToData(attr) {
        // FInd a way for lgsize
        if (attr === 'href') {
            return 'src';
        }
        attr = attr.replace('data-', '');
        attr = attr.charAt(0).toLowerCase() + attr.slice(1);
        attr = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        return attr;
    }
    var utils = {
        /**
         * get possible width and height from the lgSize attribute. Used for ZoomFromOrigin option
         */
        getSize: function (el, container, spacing, defaultLgSize) {
            if (spacing === void 0) { spacing = 0; }
            var LGel = $LG(el);
            var lgSize = LGel.attr('data-lg-size') || defaultLgSize;
            if (!lgSize) {
                return;
            }
            var isResponsiveSizes = lgSize.split(',');
            // if at-least two viewport sizes are available
            if (isResponsiveSizes[1]) {
                var wWidth = window.innerWidth;
                for (var i = 0; i < isResponsiveSizes.length; i++) {
                    var size_1 = isResponsiveSizes[i];
                    var responsiveWidth = parseInt(size_1.split('-')[2], 10);
                    if (responsiveWidth > wWidth) {
                        lgSize = size_1;
                        break;
                    }
                    // take last item as last option
                    if (i === isResponsiveSizes.length - 1) {
                        lgSize = size_1;
                    }
                }
            }
            var size = lgSize.split('-');
            var width = parseInt(size[0], 10);
            var height = parseInt(size[1], 10);
            var cWidth = container.width();
            var cHeight = container.height() - spacing;
            var maxWidth = Math.min(cWidth, width);
            var maxHeight = Math.min(cHeight, height);
            var ratio = Math.min(maxWidth / width, maxHeight / height);
            return { width: width * ratio, height: height * ratio };
        },
        /**
         * @desc Get transform value based on the imageSize. Used for ZoomFromOrigin option
         * @param {jQuery Element}
         * @returns {String} Transform CSS string
         */
        getTransform: function (el, container, top, bottom, imageSize) {
            if (!imageSize) {
                return;
            }
            var LGel = $LG(el).find('img').first();
            if (!LGel.get()) {
                return;
            }
            var containerRect = container.get().getBoundingClientRect();
            var wWidth = containerRect.width;
            // using innerWidth to include mobile safari bottom bar
            var wHeight = container.height() - (top + bottom);
            var elWidth = LGel.width();
            var elHeight = LGel.height();
            var elStyle = LGel.style();
            var x = (wWidth - elWidth) / 2 -
                LGel.offset().left +
                (parseFloat(elStyle.paddingLeft) || 0) +
                (parseFloat(elStyle.borderLeft) || 0) +
                $LG(window).scrollLeft() +
                containerRect.left;
            var y = (wHeight - elHeight) / 2 -
                LGel.offset().top +
                (parseFloat(elStyle.paddingTop) || 0) +
                (parseFloat(elStyle.borderTop) || 0) +
                $LG(window).scrollTop() +
                top;
            var scX = elWidth / imageSize.width;
            var scY = elHeight / imageSize.height;
            var transform = 'translate3d(' +
                (x *= -1) +
                'px, ' +
                (y *= -1) +
                'px, 0) scale3d(' +
                scX +
                ', ' +
                scY +
                ', 1)';
            return transform;
        },
        getIframeMarkup: function (iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
            var title = iframeTitle ? 'title="' + iframeTitle + '"' : '';
            return "<div class=\"lg-video-cont lg-has-iframe\" style=\"width:" + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + "\">\n                    <iframe class=\"lg-object\" frameborder=\"0\" " + title + " src=\"" + src + "\"  allowfullscreen=\"true\"></iframe>\n                </div>";
        },
        getImgMarkup: function (index, src, altAttr, srcset, sizes, sources) {
            var srcsetAttr = srcset ? "srcset=\"" + srcset + "\"" : '';
            var sizesAttr = sizes ? "sizes=\"" + sizes + "\"" : '';
            var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + " class=\"lg-object lg-image\" data-index=\"" + index + "\" src=\"" + src + "\" />";
            var sourceTag = '';
            if (sources) {
                var sourceObj = typeof sources === 'string' ? JSON.parse(sources) : sources;
                sourceTag = sourceObj.map(function (source) {
                    var attrs = '';
                    Object.keys(source).forEach(function (key) {
                        // Do not remove the first space as it is required to separate the attributes
                        attrs += " " + key + "=\"" + source[key] + "\"";
                    });
                    return "<source " + attrs + "></source>";
                });
            }
            return "" + sourceTag + imgMarkup;
        },
        // Get src from responsive src
        getResponsiveSrc: function (srcItms) {
            var rsWidth = [];
            var rsSrc = [];
            var src = '';
            for (var i = 0; i < srcItms.length; i++) {
                var _src = srcItms[i].split(' ');
                // Manage empty space
                if (_src[0] === '') {
                    _src.splice(0, 1);
                }
                rsSrc.push(_src[0]);
                rsWidth.push(_src[1]);
            }
            var wWidth = window.innerWidth;
            for (var j = 0; j < rsWidth.length; j++) {
                if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
            }
            return src;
        },
        isImageLoaded: function (img) {
            if (!img)
                return false;
            // During the onload event, IE correctly identifies any images that
            // weren’t downloaded as not complete. Others should too. Gecko-based
            // browsers act like NS4 in that they report this incorrectly.
            if (!img.complete) {
                return false;
            }
            // However, they do have two very useful properties: naturalWidth and
            // naturalHeight. These give the true size of the image. If it failed
            // to load, either of these should be zero.
            if (img.naturalWidth === 0) {
                return false;
            }
            // No other way of checking: assume it’s ok.
            return true;
        },
        getVideoPosterMarkup: function (_poster, dummyImg, videoContStyle, playVideoString, _isVideo, settings_mode, currentGalleryItem) {
            var videoClass = '';
            if (_isVideo && _isVideo.youtube) {
                videoClass = 'lg-has-youtube';
            }
            else if (_isVideo && _isVideo.vimeo) {
                videoClass = 'lg-has-vimeo';
            }
            else {
                videoClass = 'lg-has-html5';
            }

            // pixpa code added
            if (!_poster) {
              dummyImg = dummyImg;
            } else{
              dummyImg = '';
            }

            // var currentGalleryItem = this.galleryItems[index];
            var videophoto_title = currentGalleryItem.title;
            var videophoto_subtitle = currentGalleryItem.photodesc;            
            if (videophoto_title) {
              videophoto_title = "<p><b>" + videophoto_title + "</b></p>";
            } else {
              videophoto_title = ""; // Set an empty string if photo_title is falsey
            }

            if (videophoto_subtitle) {
              videophoto_subtitle = videophoto_subtitle;
            } else {
              videophoto_subtitle = ""; // Set an empty string if photo_title is falsey
            }
            // return "<div class=\"lg-video-cont " + videoClass + "\" style=\"" + videoContStyle + "\">\n                <div class=\"lg-video-play-button\">\n                <svg\n                    viewBox=\"0 0 20 20\"\n                    preserveAspectRatio=\"xMidYMid\"\n                    focusable=\"false\"\n                    aria-labelledby=\"" + playVideoString + "\"\n                    role=\"img\"\n                    class=\"lg-video-play-icon\"\n                >\n                    <title>" + playVideoString + "</title>\n                    <polygon class=\"lg-video-play-icon-inner\" points=\"1,0 20,10 1,20\"></polygon>\n                </svg>\n                <svg class=\"lg-video-play-icon-bg\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle></svg>\n                <svg class=\"lg-video-play-icon-circle\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle>\n                </svg>\n            </div>\n            " + (dummyImg || '') + "\n            <img class=\"lg-object lg-video-poster\" src=\"" + _poster + "\" />\n        </div>";
            // if (this.settings.slideshowImageMode == 'image' || this.settings.slideshowImageMode == 'thumbnail' || this.settings.slideshowImageMode == 'caption-right') {
            if (settings_mode == 'image' || settings_mode == 'thumbnail' || settings_mode == 'caption-right') {
              var img_caption_video = '';
            } else{
              var img_caption_video = '<div data-lenis-prevent class=\"pixpa-lg-sub-html lg-sub-html not-captioned\">'+videophoto_title +' '+ videophoto_subtitle+'</div>'
            }

            return "<div class=\"lg-video-cont " + videoClass + "\" style=\"" + videoContStyle + "\">\n          <div class=\"lg-video\">      <div class=\"lg-video-play-button\">\n  <img class=\"lg-video-play\" src=\"/img/video-play.svg\"/>               </div>\n            " + (dummyImg || '') + "\n             <img class=\"lg-object lg-video-poster\" src=\"" + _poster + "\" >   </div>"  +  img_caption_video + "</div>";

        },
        getFocusableElements: function (container) {
            var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
            var visibleElements = [].filter.call(elements, function (element) {
                var style = window.getComputedStyle(element);
                return style.display !== 'none' && style.visibility !== 'hidden';
            });
            return visibleElements;
        },
        /**
         * @desc Create dynamic elements array from gallery items when dynamic option is false
         * It helps to avoid frequent DOM interaction
         * and avoid multiple checks for dynamic elments
         *
         * @returns {Array} dynamicEl
         */
        getDynamicOptions: function (items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
            var dynamicElements = [];
            var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
            [].forEach.call(items, function (item) {
                var dynamicEl = {};
                for (var i = 0; i < item.attributes.length; i++) {
                    var attr = item.attributes[i];
                    if (attr.specified) {
                      var dynamicAttr = convertToData(attr.name);
                      var label = '';
                      if (availableDynamicOptions.indexOf(dynamicAttr) > -1) {
                          label = dynamicAttr;
                      }
                      if (label) {
                          dynamicEl[label] = attr.value;
                      }
                    }
                }
                var currentItem = $LG(item);
                var alt = currentItem.find('img').first().attr('alt');
                var title = currentItem.attr('title');
                var photofilename = currentItem.attr('data-photofilename');
                dynamicEl.photofilename = photofilename;
                // var thumb = exThumbImage
                //     ? currentItem.attr(exThumbImage)
                //     : currentItem.find('img').first().attr('src');
                // pixpa code added
                var thumb = exThumbImage
                    ? currentItem.attr(exThumbImage)
                    : currentItem.attr('data-thumb');

                dynamicEl.thumb = thumb;

                if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) {
                    dynamicEl.subHtml = title || alt || '';
                }
                dynamicEl.alt = alt || title || '';
                dynamicElements.push(dynamicEl);
            });
            return dynamicElements;
        },
        isMobile: function () {
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        /**
         * @desc Check the given src is video
         * @param {String} src
         * @return {Object} video type
         * Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
         *
         * @todo - this information can be moved to dynamicEl to avoid frequent calls
         */
        isVideo: function (src, isHTML5VIdeo, index) {
            if (!src) {
                if (isHTML5VIdeo) {
                    return {
                        html5: true,
                    };
                }
                else {
                    // console.error('lightGallery :- data-src is not provided on slide item ' +
                    //     (index + 1) +
                    //     '. Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/');
                    return;
                }
            }
            var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
            var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
            var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
            if (youtube) {
                return {
                    youtube: youtube,
                };
            }
            else if (vimeo) {
                return {
                    vimeo: vimeo,
                };
            }
            else if (wistia) {
                return {
                    wistia: wistia,
                };
            }
        },
    };

    // @ref - https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
    // @ref - https://2ality.com/2017/04/setting-up-multi-platform-packages.html
    // Unique id for each gallery
    var lgId = 0;
    var LightGallery = /** @class */ (function () {
        function LightGallery(element, options) {
            this.lgOpened = false;
            this.index = 0;
            // lightGallery modules
            this.plugins = [];
            // false when lightGallery load first slide content;
            this.lGalleryOn = false;
            // True when a slide animation is in progress
            this.lgBusy = false;
            this.currentItemsInDom = [];
            // Scroll top value before lightGallery is opened
            this.prevScrollTop = 0;
            this.bodyPaddingRight = 0;
            this.isDummyImageRemoved = false;
            this.dragOrSwipeEnabled = false;
            this.mediaContainerPosition = {
                top: 0,
                bottom: 0,
            };
            if (!element) {
                return this;
            }
            lgId++;
            this.lgId = lgId;
            this.el = element;
            this.LGel = $LG(element);
            this.generateSettings(options);
            this.buildModules();
            // When using dynamic mode, ensure dynamicEl is an array
            if (this.settings.dynamic &&
                this.settings.dynamicEl !== undefined &&
                !Array.isArray(this.settings.dynamicEl)) {
                throw 'When using dynamic mode, you must also define dynamicEl as an Array.';
            }
            this.galleryItems = this.getItems();
            this.normalizeSettings();
            // Gallery items
            this.init();
            this.validateLicense();
            return this;
        }
        LightGallery.prototype.generateSettings = function (options) {
            // lightGallery settings
            this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
            if (this.settings.isMobile &&
                typeof this.settings.isMobile === 'function'
                ? this.settings.isMobile()
                : utils.isMobile()) {
                var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                this.settings = __assign(__assign({}, this.settings), mobileSettings);
            }
        };
        LightGallery.prototype.normalizeSettings = function () {
            if (this.settings.slideEndAnimation) {
                this.settings.hideControlOnEnd = false;
            }
            if (!this.settings.closable) {
                this.settings.swipeToClose = false;
            }
            // And reset it on close to get the correct value next time
            this.zoomFromOrigin = this.settings.zoomFromOrigin;
            // At the moment, Zoom from image doesn't support dynamic options
            // @todo add zoomFromOrigin support for dynamic images
            if (this.settings.dynamic) {
                this.zoomFromOrigin = false;
            }
            if (!this.settings.container) {
                this.settings.container = document.body;
            }
            // settings.preload should not be grater than $item.length
            this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
        };
        LightGallery.prototype.init = function () {
            var _this = this;            
            this.addSlideVideoInfo(this.galleryItems);
            this.buildStructure();
            this.LGel.trigger(lGEvents.init, {
                instance: this,
            });
            if (this.settings.keyPress) {
                this.keyPress();
            }
            setTimeout(function () {
                _this.enableDrag();
                _this.enableSwipe();
                _this.triggerPosterClick();
            }, 50);
            this.arrow();
            if (this.settings.mousewheel) {
                this.mousewheel();
            }
            if (!this.settings.dynamic) {
                this.openGalleryOnItemClick();
            }
        };
        LightGallery.prototype.openGalleryOnItemClick = function () {
            var _this = this;
            var _loop_1 = function (index) {
                var element = this_1.items[index];
                var $element = $LG(element);
                // Using different namespace for click because click event should not unbind if selector is same object('this')
                // @todo manage all event listners - should have namespace that represent element
                var uuid = lgQuery.generateUUID();
                $element
                    .attr('data-lg-id', uuid)
                    .on("click.lgcustom-item-" + uuid, function (e) {
                    e.preventDefault();
                    var currentItemIndex = _this.settings.index || index;
                    _this.openGallery(currentItemIndex, element);
                    window.scroll_img_id = $(window).scrollTop();
                    setTimeout(function() {
                      $('body').addClass('lg-overflow-hidden');

                    }, 100);
                });
            };
            var this_1 = this;
            // Using for loop instead of using bubbling as the items can be any html element.
            for (var index = 0; index < this.items.length; index++) {
                _loop_1(index);
            }
        };
        /**
         * Module constructor
         * Modules are build incrementally.
         * Gallery should be opened only once all the modules are initialized.
         * use moduleBuildTimeout to make sure this
         */
        LightGallery.prototype.buildModules = function () {
            var _this = this;
            this.settings.plugins.forEach(function (plugin) {
                _this.plugins.push(new plugin(_this, $LG));
            });
        };
        LightGallery.prototype.validateLicense = function () {
            if (!this.settings.licenseKey) {
                console.error('Please provide a valid license key');
            }
            else if (this.settings.licenseKey === '0000-0000-000-0000') {
                console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            }
        };
        LightGallery.prototype.getSlideItem = function (index) {
            return $LG(this.getSlideItemId(index));
        };
        LightGallery.prototype.getSlideItemId = function (index) {
            return "#lg-item-" + this.lgId + "-" + index;
        };
        LightGallery.prototype.getIdName = function (id) {
            return id + "-" + this.lgId;
        };
        LightGallery.prototype.getElementById = function (id) {
            return $LG("#" + this.getIdName(id));
        };
        LightGallery.prototype.manageSingleSlideClassName = function () {
            if (this.galleryItems.length < 2) {
                this.outer.addClass('lg-single-item');
            }
            else {
                this.outer.removeClass('lg-single-item');
            }
        };
        LightGallery.prototype.buildStructure = function () {
            var _this = this;            
            var container = this.$container && this.$container.get();
            var overlay_container = this.$containerOverlay && this.$containerOverlay.get();
            if (overlay_container) {
                return;
            }
            if (container) {
                return;
            }
            var controls = '';
            var subHtmlCont = '';
            // Create controls
            if (this.settings.controls) {              
                // controls = "<button type=\"button\" id=\"" + this.getIdName('lg-prev') + "\" aria-label=\"" + this.settings.strings['previousSlide'] + "\" class=\"lg-prev lg-icon\"> " + this.settings.prevHtml + " </button>\n                <button type=\"button\" id=\"" + this.getIdName('lg-next') + "\" aria-label=\"" + this.settings.strings['nextSlide'] + "\" class=\"lg-next lg-icon\"> " + this.settings.nextHtml + " </button>";
              // pixpa code added
                controls = "<div class=\"lg-actions\"> <div type=\"button\" id=\"" + this.getIdName('lg-prev') + "\" aria-label=\"" + this.settings.strings['previousSlide'] + "\" class=\"lg-prev lg-icon menu-svg-icon\"> " + this.settings.prevHtml + " </div>\n                <div type=\"button\" id=\"" + this.getIdName('lg-next') + "\" aria-label=\"" + this.settings.strings['nextSlide'] + "\" class=\"lg-next lg-icon menu-svg-icon\"> " + this.settings.nextHtml + " </div></div>";
              
            }
            if (this.settings.appendSubHtmlTo !== '.lg-item') {
                subHtmlCont =
                    '<div class="pixpa-lg-sub-html lg-sub-html" data-lenis-prevent role="status" aria-live="polite"></div>';
            }
            var addClasses = '';
            if (this.settings.allowMediaOverlap) {
                // Do not remove space before last single quote
                addClasses += 'lg-media-overlap ';
            }
            var ariaLabelledby = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : '';
            var ariaDescribedby = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : '';
            var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? 'lg-inline' : '');
            var containerGalleryId = "lg-pixpa-" + this.settings.galleryId + " ";
            // pixpa code added
            var closeIcon = this.settings.closable && this.settings.showCloseIcon
                ? "<div type=\"button\" aria-label=\"" + this.settings.strings['closeGallery'] + "\" id=\"" + this.getIdName('lg-close') + "\" class=\"lg-close lg-icon menu-svg-icon\"><svg viewBox=\"0 0 448 512\"><use xlink:href=\"#pixpa-lg-cross-icon\" width=\"448\" height=\"512\"></use></svg></div>"
                : '';
            var maximizeIcon = this.settings.showMaximizeIcon
                ? "<button type=\"button\" aria-label=\"" + this.settings.strings['toggleMaximize'] + "\" id=\"" + this.getIdName('lg-maximize') + "\" class=\"lg-maximize lg-icon\"></button>"
                : '';
            
            // prince code added start
            var photo_info = '';
            if (this.settings.photoInfo === true) {
              photo_info = '<div id=\"lg-photo-info\" class=\"js-photo-info-btn lg-photo-info lg-icon lg-icon-hide menu-svg-icon\"><svg viewBox=\"0 0 512 512\"><use xlink:href=\"#pixpa-lg-info-pixpa-icon\" width=\"512\" height=\"512\"></use></svg></div>';
            }


            // var template = "\n        <div class=\"" + containerClassName + "\" id=\"" + this.getIdName('lg-container') + "\" tabindex=\"-1\" aria-modal=\"true\" " + ariaLabelledby + " " + ariaDescribedby + " role=\"dialog\"\n        >\n            <div id=\"" + this.getIdName('lg-backdrop') + "\" class=\"lg-backdrop\"></div>\n\n            <div id=\"" + this.getIdName('lg-outer') + "\" class=\"lg-outer lg-use-css3 lg-css3 lg-hide-items " + addClasses + " \">\n\n              <div id=\"" + this.getIdName('lg-content') + "\" class=\"lg-content\">\n                <div id=\"" + this.getIdName('lg-inner') + "\" class=\"lg-inner\">\n                </div>\n                " + controls + "\n              </div>\n                <div id=\"" + this.getIdName('lg-toolbar') + "\" class=\"lg-toolbar lg-group\">\n                    " + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === '.lg-outer'
            //     ? subHtmlCont
            //     : '') + "\n                <div id=\"" + this.getIdName('lg-components') + "\" class=\"lg-components\">\n                    " + (this.settings.appendSubHtmlTo === '.lg-sub-html'
            //     ? subHtmlCont
            //     : '') + "\n                </div>\n            </div>\n        </div>\n        ";
            // pixpa code added
            var template = "\n        <div class=\"lg-overlay-container custom-lg-overlay-container overlay-container overlay-zindex js-overlay-container " + containerGalleryId + "\" id=\"" + this.getIdName('lg-overlay-container') + "\" ><div class=\"" + containerClassName + "\" id=\"" + this.getIdName('lg-container') + "\" tabindex=\"-1\" aria-modal=\"true\" " + ariaLabelledby + " " + ariaDescribedby + " role=\"dialog\"\n        >\n            <div id=\"" + this.getIdName('lg-backdrop') + "\" class=\"lg-backdrop\"></div>\n\n            <div id=\"" + this.getIdName('lg-outer') + "\" class=\"lg-outer lg-use-css3 lg-css3 lg-hide-items " + addClasses + " \">\n\n              <div id=\"" + this.getIdName('lg-content') + "\" class=\"lg-content\">\n                <div id=\"" + this.getIdName('lg-inner') + "\" class=\"lg-inner"+ (this.settings.fillMode === true ? ' fill-full-image ' : ' scale-fit-image ') + "  \">\n                </div>\n                " + controls + "\n              </div>\n                <div id=\"" + this.getIdName('lg-toolbar') + "\" class=\"lg-toolbar lg-group\">\n                    <div class=\"lg-toolbar-left-side\">\n                    </div>\n                   " + maximizeIcon + "\n                    <div class=\"lg-toolbar-right-side\">\n    <div class=\"lg-toolbar-option\">\n       " + photo_info + "\n    </div>\n   " + closeIcon + "\n                 </div>\n </div>\n                    " + (this.settings.appendSubHtmlTo === '.lg-outer'
                ? subHtmlCont
                : '') + "\n                <div id=\"" + this.getIdName('lg-components') + "\" class=\"lg-components\">\n                    " + (this.settings.appendSubHtmlTo === '.lg-sub-html'
                ? subHtmlCont
                : '') + "\n                </div>\n            </div>\n        </div>\n    </div>\n ";
            $LG(this.settings.container).append(template);            
            if (document.body !== this.settings.container) {
                $LG(this.settings.container).css('position', 'relative');
            }
            this.outer = this.getElementById('lg-outer');
            this.$lgComponents = this.getElementById('lg-components');
            this.$backdrop = this.getElementById('lg-backdrop');
            this.$container = this.getElementById('lg-container');
            this.$containerOverlay = this.getElementById('lg-overlay-container');
            this.$inner = this.getElementById('lg-inner');
            this.$content = this.getElementById('lg-content');
            this.$toolbar = this.getElementById('lg-toolbar');
            this.$backdrop.css('transition-duration', this.settings.backdropDuration + 'ms');
            var outerClassNames = this.settings.mode + " ";
            this.manageSingleSlideClassName();
            if (this.settings.enableDrag) {
                outerClassNames += 'lg-grab ';
            }
            this.outer.addClass(outerClassNames);
            this.$inner.css('transition-timing-function', this.settings.easing);
            this.$inner.css('transition-duration', this.settings.speed + 'ms');
            if (this.settings.download) {
                this.$toolbar.append("<a id=\"" + this.getIdName('lg-download') + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + this.settings.strings['download'] + "\" download class=\"lg-download lg-icon\"></a>");
            }
            this.counter();
            $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function () {
                _this.refreshOnResize();
            });
            this.hideBars();
            this.manageCloseGallery();
            this.toggleMaximize();
            this.initModules();
        };
        LightGallery.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
                var currentGalleryItem = this.galleryItems[this.index];
                var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                if (__slideVideoInfo) {
                    this.resizeVideoSlide(this.index, this.currentImageSize);
                }
                if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    this.outer
                        .find('.lg-current .lg-dummy-img')
                        .first()
                        .attr('style', imgStyle);
                }
                this.LGel.trigger(lGEvents.containerResize);
            }
        };
        LightGallery.prototype.resizeVideoSlide = function (index, imageSize) {
            var lgVideoStyle = this.getVideoContStyle(imageSize);
            var currentSlide = this.getSlideItem(index);
            currentSlide.find('.lg-video-cont').attr('style', lgVideoStyle);
        };
        /**
         * Update slides dynamically.
         * Add, edit or delete slides dynamically when lightGallery is opened.
         * Modify the current gallery items and pass it via updateSlides method
         * @note
         * - Do not mutate existing lightGallery items directly.
         * - Always pass new list of gallery items
         * - You need to take care of thumbnails outside the gallery if any
         * - user this method only if you want to update slides when the gallery is opened. Otherwise, use `refresh()` method.
         * @param items Gallery items
         * @param index After the update operation, which slide gallery should navigate to
         * @category lGPublicMethods
         * @example
         * const plugin = lightGallery();
         *
         * // Adding slides dynamically
         * let galleryItems = [
         * // Access existing lightGallery items
         * // galleryItems are automatically generated internally from the gallery HTML markup
         * // or directly from galleryItems when dynamic gallery is used
         *   ...plugin.galleryItems,
         *     ...[
         *       {
         *         src: 'img/img-1.png',
         *           thumb: 'img/thumb1.png',
         *         },
         *     ],
         *   ];
         *   plugin.updateSlides(
         *     galleryItems,
         *     plugin.index,
         *   );
         *
         *
         * // Remove slides dynamically
         * galleryItems = JSON.parse(
         *   JSON.stringify(updateSlideInstance.galleryItems),
         * );
         * galleryItems.shift();
         * updateSlideInstance.updateSlides(galleryItems, 1);
         * @see <a href="/demos/update-slides/">Demo</a>
         */
        LightGallery.prototype.updateSlides = function (items, index) {
            if (this.index > items.length - 1) {
                this.index = items.length - 1;
            }
            if (items.length === 1) {
                this.index = 0;
            }
            if (!items.length) {
                this.closeGallery();
                return;
            }
            var currentSrc = this.galleryItems[index].src;
            this.galleryItems = items;
            this.updateControls();
            this.$inner.empty();
            this.currentItemsInDom = [];
            var _index = 0;
            // Find the current index based on source value of the slide
            this.galleryItems.some(function (galleryItem, itemIndex) {
                if (galleryItem.src === currentSrc) {
                    _index = itemIndex;
                    return true;
                }
                return false;
            });
            this.currentItemsInDom = this.organizeSlideItems(_index, -1);
            this.loadContent(_index, true);
            this.getSlideItem(_index).addClass('lg-current');
            this.index = _index;
            this.updateCurrentCounter(_index);
            this.LGel.trigger(lGEvents.updateSlides);
        };
        // Get gallery items based on multiple conditions
        LightGallery.prototype.getItems = function () {
            // Gallery items
            this.items = [];
            if (!this.settings.dynamic) {
                if (this.settings.selector === 'this') {
                    this.items.push(this.el);
                }
                else if (this.settings.selector) {
                    if (typeof this.settings.selector === 'string') {
                        if (this.settings.selectWithin) {
                            var selectWithin = $LG(this.settings.selectWithin);
                            this.items = selectWithin
                                .find(this.settings.selector)
                                .get();
                        }
                        else {
                            this.items = this.el.querySelectorAll(this.settings.selector);
                        }
                    }
                    else {
                        this.items = this.settings.selector;
                    }
                }
                else {
                    this.items = this.el.children;
                }
                return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
            }
            else {
                return this.settings.dynamicEl || [];
            }
        };
        LightGallery.prototype.shouldHideScrollbar = function () {
            return (this.settings.hideScrollbar &&
                document.body === this.settings.container);
        };
        LightGallery.prototype.hideScrollbar = function () {
            if (!this.shouldHideScrollbar()) {
                return;
            }
            this.bodyPaddingRight = parseFloat($LG('body').style().paddingRight);
            var bodyRect = document.documentElement.getBoundingClientRect();
            var scrollbarWidth = window.innerWidth - bodyRect.width;
            $LG(document.body).css('padding-right', scrollbarWidth + this.bodyPaddingRight + 'px');
            $LG(document.body).addClass('lg-overlay-open');
        };
        LightGallery.prototype.resetScrollBar = function () {
            if (!this.shouldHideScrollbar()) {
                return;
            }
            $LG(document.body).css('padding-right', this.bodyPaddingRight + 'px');
            $LG(document.body).removeClass('lg-overlay-open');
        };
        /**
         * Open lightGallery.
         * Open gallery with specific slide by passing index of the slide as parameter.
         * @category lGPublicMethods
         * @param {Number} index  - index of the slide
         * @param {HTMLElement} element - Which image lightGallery should zoom from
         *
         * @example
         * const $dynamicGallery = document.getElementById('dynamic-gallery-demo');
         * const dynamicGallery = lightGallery($dynamicGallery, {
         *     dynamic: true,
         *     dynamicEl: [
         *         {
         *              src: 'img/1.jpg',
         *              thumb: 'img/thumb-1.jpg',
         *              subHtml: '<h4>Image 1 title</h4><p>Image 1 descriptions.</p>',
         *         },
         *         ...
         *     ],
         * });
         * $dynamicGallery.addEventListener('click', function () {
         *     // Starts with third item.(Optional).
         *     // This is useful if you want use dynamic mode with
         *     // custom thumbnails (thumbnails outside gallery),
         *     dynamicGallery.openGallery(2);
         * });
         *
         */
        LightGallery.prototype.openGallery = function (index, element) {
            var _this = this;
            if (index === void 0) { index = this.settings.index; }
            // prevent accidental double execution
            if (this.lgOpened)
                return;
            this.lgOpened = true;
            this.outer.removeClass('lg-hide-items');
            this.hideScrollbar();
            // Add display block, but still has opacity 0
            this.$container.addClass('lg-show');
            this.$containerOverlay.addClass('overlay-active');

            var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
            this.currentItemsInDom = itemsToBeInsertedToDom;
            var items = '';
            itemsToBeInsertedToDom.forEach(function (item) {
                items = items + ("<div data-lenis-prevent id=\"" + item + "\" class=\"lg-item\"></div>");
            });
            this.$inner.append(items);
            this.addHtml(index);
            var transform = '';
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
            if (!this.settings.allowMediaOverlap) {
                this.setMediaContainerPosition(top, bottom);
            }
            var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
            if (this.zoomFromOrigin && element) {
                this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
            }
            if (!this.zoomFromOrigin || !transform) {
                this.outer.addClass(this.settings.startClass);
                this.getSlideItem(index).removeClass('lg-complete');
            }
            var timeout = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
            setTimeout(function () {
                _this.outer.addClass('lg-components-open');
            }, timeout);
            this.index = index;
            this.LGel.trigger(lGEvents.beforeOpen);
            // add class lg-current to remove initial transition
            this.getSlideItem(index).addClass('lg-current');
            this.lGalleryOn = false;
            // Store the current scroll top value to scroll back after closing the gallery..
            this.prevScrollTop = $LG(window).scrollTop();
            setTimeout(function () {
                // Need to check both zoomFromOrigin and transform values as we need to set set the
                // default opening animation if user missed to add the lg-size attribute
                if (_this.zoomFromOrigin && transform) {
                    var currentSlide_1 = _this.getSlideItem(index);
                    currentSlide_1.css('transform', transform);
                    setTimeout(function () {
                        currentSlide_1
                            .addClass('lg-start-progress lg-start-end-progress')
                            .css('transition-duration', _this.settings.startAnimationDuration + 'ms');
                        _this.outer.addClass('lg-zoom-from-image');
                    });
                    setTimeout(function () {
                        currentSlide_1.css('transform', 'translate3d(0, 0, 0)');
                    }, 100);
                }
                setTimeout(function () {
                    _this.$backdrop.addClass('in');
                    _this.$container.addClass('lg-show-in');
                    _this.$containerOverlay.addClass('overlay-active');
                    // $('.overlay-container').addClass('overlay-active');
                }, 10);
                setTimeout(function () {
                    if (_this.settings.trapFocus &&
                        document.body === _this.settings.container) {
                        _this.trapFocus();
                    }
                }, _this.settings.backdropDuration + 50);
                // lg-visible class resets gallery opacity to 1
                if (!_this.zoomFromOrigin || !transform) {
                    setTimeout(function () {
                        _this.outer.addClass('lg-visible');
                    }, _this.settings.backdropDuration);
                }
                // initiate slide function
                _this.slide(index, false, false, false);
                _this.LGel.trigger(lGEvents.afterOpen);
            });
            if (document.body === this.settings.container) {
                $LG('html').addClass('lg-on');
            }
        };
        /**
         * Note - Changing the position of the media on every slide transition creates a flickering effect.
         * Therefore, The height of the caption is calculated dynamically, only once based on the first slide caption.
         * if you have dynamic captions for each media,
         * you can provide an appropriate height for the captions via allowMediaOverlap option
         */
        LightGallery.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) {
                return {
                    top: 0,
                    bottom: 0,
                };
            }
            var top = this.$toolbar.get().clientHeight || 0;
            if(top == 0){
              top = 45;
            }
            var subHtml = this.outer.find('.lg-components .lg-sub-html').get();
            // prince code added
            var captionHeight = 0;
            if(this.settings.slideshowImageMode == 'image' || this.settings.slideshowImageMode == 'caption' || this.settings.slideshowImageMode == 'caption-right'){
              captionHeight = 45;
            }
            // var captionHeight = this.settings.defaultCaptionHeight ||
            //     (subHtml && subHtml.clientHeight) ||
            //     0;
            var thumbContainer = this.outer.find('.lg-thumb-outer').get();
            var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
            var bottom = thumbHeight + captionHeight;
            return {
                top: top,
                bottom: bottom,
            };
        };
        LightGallery.prototype.setMediaContainerPosition = function (top, bottom) {
            if (top === void 0) { top = 0; }
            if (bottom === void 0) { bottom = 0; }
            this.$content.css('top', top + 'px').css('bottom', bottom + 'px');
        };
        LightGallery.prototype.hideBars = function () {
            var _this = this;
            // Hide controllers if mouse doesn't move for some period
            setTimeout(function () {
                _this.outer.removeClass('lg-hide-items');
                if (_this.settings.hideBarsDelay > 0) {
                    _this.outer.on('mousemove.lg click.lg touchstart.lg', function () {
                        _this.outer.removeClass('lg-hide-items');
                        clearTimeout(_this.hideBarTimeout);
                        // Timeout will be cleared on each slide movement also
                        _this.hideBarTimeout = setTimeout(function () {
                            _this.outer.addClass('lg-hide-items');
                        }, _this.settings.hideBarsDelay);
                    });
                    _this.outer.trigger('mousemove.lg');
                }
            }, this.settings.showBarsAfter);
        };
        LightGallery.prototype.initPictureFill = function ($img) {
            if (this.settings.supportLegacyBrowser) {
                try {
                    picturefill({
                        elements: [$img.get()],
                    });
                }
                catch (e) {
                    console.warn('lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.');
                }
            }
        };
        /**
         *  @desc Create image counter
         *  Ex: 1/10
         */
        LightGallery.prototype.counter = function () {
            if (this.settings.counter) {
              // pixpa code added
              var filename = ''
              if (this.settings.photofilename === true) {
                var filename = this.galleryItems[this.index].photofilename; // img photo info title in alt tag
              }

              // var counterHtml = "<div class=\"lg-counter\" role=\"status\" aria-live=\"polite\">\n                <span id=\"" + this.getIdName('lg-counter-current') + "\" class=\"lg-counter-current\">" + (this.index + 1) + " </span> /\n                <span id=\"" + this.getIdName('lg-counter-all') + "\" class=\"lg-counter-all\">" + this.galleryItems.length + " </span></div>";
              var counterHtml = "<div id=\"lg-counter\" class=\"lg-counter\" role=\"status\" aria-live=\"polite\">\n                <span id=\"" + this.getIdName('lg-counter-current') + "\" class=\"lg-counter-current\">" + (this.index + 1) + " </span> /\n                <span id=\"" + this.getIdName('lg-counter-all') + "\" class=\"lg-counter-all\">" + this.galleryItems.length + " </span><div class=\"pixpa-filename\">"+filename+"</div></div>";
              var counterMobileHtml = "<div id=\"lg-counter-mobile\" class=\"lg-counter\" role=\"status\" aria-live=\"polite\">\n                <span id=\"" + this.getIdName('lg-counter-current-mobile') + "\" class=\"lg-counter-current\">" + (this.index + 1) + " </span> / \n                <span id=\"" + this.getIdName('lg-counter-all-mobile') + "\" class=\"lg-counter-all\">" + this.galleryItems.length + " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(counterHtml);
              this.outer.find(this.settings.appendCounterMobileTo).append(counterMobileHtml);

            }
        };
        /**
         *  @desc add sub-html into the slide
         *  @param {Number} index - index of the slide
         */
        LightGallery.prototype.addHtml = function (index) {
            var subHtml;
            var subHtmlUrl;
            var currentSlide = $LG(this.getSlideItemId(index));

            if (this.galleryItems[index].subHtmlUrl) {
                subHtmlUrl = this.galleryItems[index].subHtmlUrl;
            } else {
              var photo_title = this.galleryItems[index].title;
              var photo_subtitle = this.galleryItems[index].photodesc;              

              if(photo_title == null){
                photo_title = '';
              }

              if(photo_title == '' || photo_title == null){
                photo_title = '';
              } else {
                photo_title = '<p><b>'+photo_title+'</b></p>'
              }

              if(photo_subtitle == '' || photo_subtitle == null){
                photo_subtitle = '';
              }

              var subHtml_desc = photo_title + photo_subtitle
              subHtml = subHtml_desc;
              // subHtml = this.galleryItems[index].subHtml;
            }
            if (!subHtmlUrl) {
              if (subHtml) {
                  // get first letter of sub-html
                  // if first letter starts with . or # get the html form the jQuery object
                  var fL = subHtml.substring(0, 1);
                  if (fL === '.' || fL === '#') {
                      if (this.settings.subHtmlSelectorRelative &&
                          !this.settings.dynamic) {
                          subHtml = $LG(this.items)
                              .eq(index)
                              .find(subHtml)
                              .first()
                              .html();
                      }
                      else {
                          subHtml = $LG(subHtml).first().html();
                      }
                  }
              }
              else {
                  subHtml = '';
              }
            }
            if (this.settings.appendSubHtmlTo !== '.lg-item') {
              
              if (subHtmlUrl) {
                // pixpa code added
                // this.outer.find('.lg-sub-html').load(subHtmlUrl);
                if(this.settings.slideshowImageMode == 'caption-right'){
                  currentSlide.find('.pixpa-lg-sub-html').load(subHtmlUrl);
                } else{
                  currentSlide.find('.pixpa-lg-sub-html').load(subHtmlUrl);
                }
              } else {
                // pixpa code added
                // this.outer.find('.lg-sub-html').html(subHtml);
                if(this.settings.slideshowImageMode == 'caption-right'){
                  if (subHtml == '') {
                    // subHtml = 'Caption not available';
                    // this.outer.find('.pixpa-lg-sub-html').html(subHtml);
                    if (this.settings.slideshowImageMode == 'caption-right') {
                      currentSlide.find('.pixpa-lg-sub-html').html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                    } else if (this.settings.slideshowImageMode == 'caption') {
                    } else {
                      currentSlide.find('.pixpa-lg-sub-html').html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                    }
                  } else{
                    currentSlide.find('.pixpa-lg-sub-html').html(subHtml);
                  }
                } else{
                  if (subHtml == '') {
                    // subHtml = 'Caption not available';
                    var subHtml_val =  'Caption not available';
                    // currentSlide.find('.pixpa-lg-sub-html').html(subHtml);

                    if (this.settings.slideshowImageMode == 'caption-right') {
                      currentSlide.find('.pixpa-lg-sub-html').html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                    } else if (this.settings.slideshowImageMode == 'caption') {
                      currentSlide.find('.pixpa-lg-sub-html').html('');
                    } else {
                      currentSlide.find('.pixpa-lg-sub-html').html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                    }

                  } else{
                    currentSlide.find('.pixpa-lg-sub-html').html(subHtml);                    
                  }
                }

              }
            } else {
              var currentSlide = $LG(this.getSlideItemId(index));
              if (subHtmlUrl) {
                  currentSlide.load(subHtmlUrl);
              } else {

                // pixpa code added
                // currentSlide.append("<div class=\"lg-sub-html\">" + subHtml + "</div>");
                

                setTimeout(function() {
                  currentSlide.find('.lg-img-wrap').append("<div class=\"pixpa-lg-sub-html lg-sub-html not-captioned\" data-lenis-prevent>" + subHtml + "</div>");
                }, 100);
              }
            }
            // Add lg-empty-html class if title doesn't exist
            if (typeof subHtml !== 'undefined' && subHtml !== null) {

              if (subHtml === '') {
                currentSlide.find(this.settings.appendSubHtmlTo).addClass('lg-empty-html');
                // pixpa code added
                $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').addClass('not-captioned');
                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').removeClass('captioned');

                if (this.settings.slideshowImageMode == 'caption-right') {
                  currentSlide.parent().parent().parent().find(this.settings.appendSubHtmlTo).html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                } else if (this.settings.slideshowImageMode == 'caption') {
                  currentSlide.find(this.settings.appendSubHtmlTo).html('');
                } else {
                  currentSlide.find(this.settings.appendSubHtmlTo).html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                }

              } else if(subHtml == "<p>​</p>") {
                // pixpa code added
                $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
                currentSlide.find(this.settings.appendSubHtmlTo).addClass('lg-empty-html');

                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').addClass('not-captioned');
                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').removeClass('captioned');

                // prince text added
                if (this.settings.slideshowImageMode == 'caption-right' || this.settings.slideshowImageMode == 'image') {
                  currentSlide.find(this.settings.appendSubHtmlTo).html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                } else if (this.settings.slideshowImageMode == 'caption') {
                  currentSlide.find(this.settings.appendSubHtmlTo).html('');
                } else {
                  currentSlide.find(this.settings.appendSubHtmlTo).html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                }
                // pixpa code added

              } else if(subHtml == '<p><p></p></p>') {
                currentSlide.find(this.settings.appendSubHtmlTo).addClass('lg-empty-html');
                // pixpa code added
                $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').addClass('not-captioned');
                currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').removeClass('captioned');

                if (this.settings.slideshowImageMode != 'caption') {
                  currentSlide.parent().parent().parent().find(this.settings.appendSubHtmlTo).html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                } else if (this.settings.slideshowImageMode == 'caption') {
                  currentSlide.find(this.settings.appendSubHtmlTo).html('');
                } else {
                  currentSlide.find(this.settings.appendSubHtmlTo).html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                }
              } else {
                // pixpa code added
                // this.outer.find(this.settings.appendSubHtmlTo).removeClass('lg-empty-html');
                // pixpa code change start
                if (subHtml == '') {
                  $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
                  if (this.settings.slideshowImageMode != 'caption') {
                    currentSlide.parent().parent().parent().find(this.settings.appendSubHtmlTo).html(typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available');
                  } else if (this.settings.slideshowImageMode == 'caption') {
                    currentSlide.find(this.settings.appendSubHtmlTo).html('');
                  } else {
                    currentSlide.find(this.settings.appendSubHtmlTo).html((typeof window.labels != 'undefined' ? window.labels.common_gallery_caption : 'Caption not available') + "<br><a href='javascript:void(0);' class='js-photo-info-btn-desc-close'><u>" + (typeof window.labels != 'undefined' ? window.labels.common_gallery_hide : 'Hide') + "</u></a>");
                  }

                } else{

                  if (this.settings.slideshowImageMode != 'caption') {                    
                    currentSlide.parent().parent().parent().find(this.settings.appendSubHtmlTo).html(subHtml);
                  }

                  $('.js-photo-info-btn, .js-photo-info-btn-close').show();
                  currentSlide.find(this.settings.appendSubHtmlTo).removeClass('lg-empty-html');
                  setTimeout(function() {
                    currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').addClass('captioned');
                    currentSlide.find('.pixpa-lg-sub-html, .lg-img-wrap, .show-image-caption-bottom, .lg-video-cont').removeClass('not-captioned');  
                  }, 100);
                  

                }
                // pixpa code change end

              }
            }
            this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                index: index,
            });
        };
        /**
         *  @desc Preload slides
         *  @param {Number} index - index of the slide
         * @todo preload not working for the first slide, Also, should work for the first and last slide as well
         */
        LightGallery.prototype.preload = function (index) {
            for (var i = 1; i <= this.settings.preload; i++) {
                if (i >= this.galleryItems.length - index) {
                    break;
                }
                this.loadContent(index + i, false);
            }
            for (var j = 1; j <= this.settings.preload; j++) {
                if (index - j < 0) {
                    break;
                }
                this.loadContent(index - j, false);
            }
        };
        LightGallery.prototype.getDummyImgStyles = function (imageSize) {
            if (!imageSize)
                return '';
            return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
        };
        LightGallery.prototype.getVideoContStyle = function (imageSize) {
            if (!imageSize)
                return '';

            if (window.innerWidth <= 767) {
              return "width: calc(" + imageSize.width + "px - 4vw);\n                height:" + imageSize.height + "px";
            } else{
              // pixpa code added
              // var videoimg_width = imageSize.width - 15;
              // var videoimg_height = imageSize.height - 15;
              var videoimg_width = isNaN(imageSize.width) ? localStorage.getItem("videoimgWidth") : imageSize.width - 15;
              var videoimg_height = isNaN(imageSize.height) ? localStorage.getItem("videoimgHeight") : imageSize.height - 15;

              if (isNaN(imageSize.width) || isNaN(imageSize.height)) {
                // If imageSize dimensions are NaN, retrieve values from localStorage
                videoimg_width = parseFloat(videoimg_width);
                videoimg_height = parseFloat(videoimg_height);
                // console.log('imageSize: Using values from localStorage', { width: videoimg_width, height: videoimg_height });
              } else {
                // Otherwise, store the current dimensions in localStorage
                localStorage.setItem("videoimgWidth", imageSize.width - 15);
                localStorage.setItem("videoimgHeight", imageSize.height - 15);                  
                // console.log('imageSize: Using current values', imageSize);
              }              
              
              return "width:" + videoimg_width + "px;\n                height:" + videoimg_height + "px";
              // return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";  
            }
            
        };
        LightGallery.prototype.getDummyImageContent = function ($currentSlide, index, alt) {
            var $currentItem;
            if (!this.settings.dynamic) {
                $currentItem = $LG(this.items).eq(index);
            }
            if ($currentItem) {
                var _dummyImgSrc = void 0;
                if (!this.settings.exThumbImage) {
                    _dummyImgSrc = $currentItem.find('img').first().attr('src');
                }
                else {
                    _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                }


                if (!_dummyImgSrc)
                    return '';
                var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                var dummyImgContent = "<img " + alt + " style=\"" + imgStyle + "\" class=\"lg-dummy-img\" src=\"" + _dummyImgSrc + "\" />";
                $currentSlide.addClass('lg-first-slide');
                this.outer.addClass('lg-first-slide-loading');
                return dummyImgContent;
            }
            return '';
        };
        LightGallery.prototype.setImgMarkup = function (src, $currentSlide, index) {
            var currentGalleryItem = this.galleryItems[index];
            var thumb = currentGalleryItem.photo_100;
            if(thumb == ''){
              thumb = currentGalleryItem.photo_500;
            }
            var alt = currentGalleryItem.title, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
            // Use the thumbnail as dummy image which will be resized to actual image size and
            // displayed on top of actual image
            // pixpa code added
            var type = currentGalleryItem.type;
            var imgContent = '';
            var altAttr = alt ? 'alt="' + alt + '"' : '';
            if (this.isFirstSlideWithZoomAnimation()) {
              // pixpa code added
              if(type == "3"){
                imgContent = currentGalleryItem.photodesc;
              } else{
                imgContent = this.getDummyImageContent($currentSlide, index, altAttr);
              }
            }  else {
              // pixpa code added
              // imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
              if(type == "3"){
                imgContent = currentGalleryItem.photodesc;
                var imgMarkup = "<div class=\"lg-text-html-wrapper\"><div class=\"lg-text-html\"> " + imgContent + "</div></div>";
              } else{
                // pixpa code added
                imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                
                var photo_title = currentGalleryItem.title;
                var photo_subtitle = currentGalleryItem.photodesc;


                if (photo_title) {
                  photo_title = "<p><b>" + photo_title + "</b></p>";
                } else {
                  photo_title = ""; // Set an empty string if photo_title is falsey
                }

                if (photo_subtitle) {
                  photo_subtitle = photo_subtitle;
                } else {
                  photo_subtitle = ""; // Set an empty string if photo_title is falsey
                }

                if (photo_title == '' || photo_subtitle == '' || photo_subtitle == '<p><p></p></p>') {
                  var captionClass = 'not-captioned';
                } else{
                  var captionClass = 'captioned';
                }

                if (this.settings.slideshowImageMode == 'image' || this.settings.slideshowImageMode == 'thumbnail' || this.settings.slideshowImageMode == 'caption-right') {
                  var img_caption = '';
                } else {
                  var img_caption = '<div data-lenis-prevent class=\"pixpa-lg-sub-html lg-sub-html '+ captionClass +'\">'+photo_title +' '+ photo_subtitle+'</div>'
                }

                var imgMarkup = "<div class=\"lg-img-container\"><div class=\"lg-img-wrap "+ captionClass +"\"> " + imgContent + img_caption + "</div></div>";  
                // var imgMarkup = "<div class=\"lg-img-wrap\"> " + imgContent + "</div>";  

              }
            }
            // var imgMarkup = "<picture class=\"lg-img-wrap\"> " + imgContent + "</picture>";
            $currentSlide.prepend(imgMarkup);
        };
        LightGallery.prototype.onSlideObjectLoad = function ($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
            var mediaObject = $slide.find('.lg-object').first();
            if (utils.isImageLoaded(mediaObject.get()) ||
                isHTML5VideoWithoutPoster) {
                onLoad();
            }
            else {
                mediaObject.on('load.lg error.lg', function () {
                    onLoad && onLoad();
                });
                mediaObject.on('error.lg', function () {
                    onError && onError();
                });
            }
        };
        /**
         *
         * @param $el Current slide item
         * @param index
         * @param delay Delay is 0 except first time
         * @param speed Speed is same as delay, except it is 0 if gallery is opened via hash plugin
         * @param isFirstSlide
         */
        LightGallery.prototype.onLgObjectLoad = function (currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
            var _this = this;
            this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, function () {
                _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
            }, function () {
                currentSlide.addClass('lg-complete lg-complete_');
                // currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
                currentSlide.html('<div class="lg-img-container"><div class="lg-img-wrap  not-captioned img-notfound" data-id="'+index+'"><img class="lg-object lg-image" data-index="'+index+'" src=""></div></div>') 

            });
        };
        LightGallery.prototype.triggerSlideItemLoad = function ($currentSlide, index, delay, speed, isFirstSlide) {            
            var _this = this;
            var currentGalleryItem = this.galleryItems[index];   

            // Adding delay for video slides without poster for better performance and user experience
            // Videos should start playing once once the gallery is completely loaded
            var _speed = isFirstSlide &&
                this.getSlideType(currentGalleryItem) === 'video' &&
                !currentGalleryItem.photopath
                ? speed
                : 0;

            setTimeout(function () {
                $currentSlide.addClass('lg-complete lg-complete_');
                _this.LGel.trigger(lGEvents.slideItemLoad, {
                    index: index,
                    delay: delay || 0,
                    isFirstSlide: isFirstSlide,
                });
            }, _speed);
        };
        LightGallery.prototype.isFirstSlideWithZoomAnimation = function () {
            return !!(!this.lGalleryOn &&
                this.zoomFromOrigin &&
                this.currentImageSize);
        };
        // Add video slideInfo
        LightGallery.prototype.addSlideVideoInfo = function (items) {
            var _this = this;
            items.forEach(function (element, index) {              
                // element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                element.__slideVideoInfo = utils.isVideo(element.description, !!element.video, index); // pixpa code added
                if (element.__slideVideoInfo &&
                    _this.settings.loadYouTubePoster &&
                    !element.poster &&
                    element.__slideVideoInfo.youtube) {
                    element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }
            });
        };
        /**
         *  Load slide content into slide.
         *  This is used to load content into slides that is not visible too
         *  @param {Number} index - index of the slide.
         *  @param {Boolean} rec - if true call loadcontent() function again.
         */
        LightGallery.prototype.loadContent = function (index, rec) {
            var _this = this;
            var settings_mode = this.settings.slideshowImageMode; // pixpa code added            
            var currentGalleryItem = this.galleryItems[index];
            var $currentSlide = $LG(this.getSlideItemId(index));          
            // var poster = currentGalleryItem.poster;
            var poster = currentGalleryItem.photopath;
            var sizes = currentGalleryItem.sizes;
            var sources = currentGalleryItem.sources;
            // var src = currentGalleryItem.src;
            // var src = currentGalleryItem.photo_1500;
            var video = currentGalleryItem.video;
            var _html5Video = video && typeof video === 'string' ? JSON.parse(video) : video;
            // var video_poster = '';
            if (this.settings.dynamic == false) {
              var src = currentGalleryItem.src;
              var srcset = currentGalleryItem.srcset;
            } else {
              if (currentGalleryItem.type == 2) {                
                // if($('[data-lg-item-id="' + index + '"]').src == 'undefined') {
                  // console.log('index ', index);
                  $('[data-lg-item-id="' + index + '"]').attr({
                    'src': currentGalleryItem.poster
                  })
                // }

              } else if(currentGalleryItem.type == 3) {
                
                $('[data-lg-item-id="' + index + '"]').attr({
                  'src': '/img/text-slide-placeholder.jpg'
                })


              } else{
                var src = currentGalleryItem.photo_1500;
                var srcset = currentGalleryItem.photo_1200 +" 1200, "+ currentGalleryItem.photo_1500 +" 1500, "+  currentGalleryItem.largepath + " 2048";
                if(window.innerWidth > 767){
                  if(userObject.lightboximg_size == '1200'){
                    src = currentGalleryItem.photo_1200;
                  } else if(userObject.lightboximg_size == '800'){
                    src = currentGalleryItem.photo_800;
                  } else if(userObject.lightboximg_size == '500'){
                    src = currentGalleryItem.photo_500;
                  } else if(userObject.lightboximg_size == '1440'){
                    src = currentGalleryItem.photo_1500;
                  } else if(userObject.lightboximg_size == '2048' || userObject.lightboximg_size == '2560'){
                    src = currentGalleryItem.largepath;
                  } else {
                    src = currentGalleryItem.largepath;
                  }

                } else{
                  src = currentGalleryItem.largepath
                  // video_poster = currentGalleryItem.largepath;
                }

                setTimeout(function() {
                  // console.log(index + ' img-notfound ', src);
                  if ($('[data-id="'+index+'"]').hasClass('img-notfound')) {
                    $('[data-id="' + index + '"]').find('.lg-image').attr({
                      'src': src
                    })
                  }
                }, 1500);
              }
            }

            if (currentGalleryItem.srcset) {
              var srcDyItms = currentGalleryItem.responsive.split(',');
              src = utils.getResponsiveSrc(srcDyItms) || src;
            }

            var videoInfo = currentGalleryItem.__slideVideoInfo;
            var lgVideoStyle = '';
            var iframe = !!currentGalleryItem.iframe;
            var isFirstSlide = !this.lGalleryOn;
            // delay for adding complete class. it is 0 except first time.
            var delay = 0;
            if (isFirstSlide) {
                if (this.zoomFromOrigin && this.currentImageSize) {
                    delay = this.settings.startAnimationDuration + 10;
                }
                else {
                    delay = this.settings.backdropDuration + 10;
                }
            }
            if (!$currentSlide.hasClass('lg-loaded')) {
                if (videoInfo) {
                    var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                    var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                    lgVideoStyle = this.getVideoContStyle(videoSize);
                }
                if (iframe) {
                    var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                    $currentSlide.prepend(markup);
                }
                else if (poster) {
                  var dummyImg = '';
                  var hasStartAnimation = isFirstSlide &&
                      this.zoomFromOrigin &&
                      this.currentImageSize;
                  if (hasStartAnimation) {
                      dummyImg = this.getDummyImageContent($currentSlide, index, '');
                  }

                  var markup = utils.getVideoPosterMarkup(poster, dummyImg || '', lgVideoStyle, this.settings.strings['playVideo'], videoInfo, settings_mode, currentGalleryItem);
                  $currentSlide.prepend(markup);

                }
                else if (videoInfo) {
                    var markup = "<div class=\"lg-video-cont \" style=\"" + lgVideoStyle + "\"></div>";
                    $currentSlide.prepend(markup);

                }
                else {
                    this.setImgMarkup(src, $currentSlide, index);
                    if (srcset || sources) {
                        var $img = $currentSlide.find('.lg-object');
                        this.initPictureFill($img);
                    }

                }
                if (poster || videoInfo) {
                    this.LGel.trigger(lGEvents.hasVideo, {
                        index: index,
                        src: src,
                        html5Video: _html5Video,
                        hasPoster: !!poster,
                    });
                }
                this.LGel.trigger(lGEvents.afterAppendSlide, { index: index });
                if (this.lGalleryOn &&
                    this.settings.appendSubHtmlTo === '.lg-item') {
                    this.addHtml(index);
                }
            }
            // For first time add some delay for displaying the start animation.
            var _speed = 0;
            // Do not change the delay value because it is required for zoom plugin.
            // If gallery opened from direct url (hash) speed value should be 0
            if (delay && !$LG(document.body).hasClass('lg-from-hash')) {
                _speed = delay;
            }
            // Only for first slide and zoomFromOrigin is enabled
            if (this.isFirstSlideWithZoomAnimation()) {
                setTimeout(function () {
                    $currentSlide
                        .removeClass('lg-start-end-progress lg-start-progress')
                        .removeAttr('style');
                }, this.settings.startAnimationDuration + 100);
                if (!$currentSlide.hasClass('lg-loaded')) {
                    setTimeout(function () {
                        if (_this.getSlideType(currentGalleryItem) === 'image') {
                            var alt = currentGalleryItem.title;
                            var altAttr = alt ? 'alt="' + alt + '"' : '';
                            $currentSlide
                                .find('.lg-img-wrap')
                                .append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find('.lg-object');
                                _this.initPictureFill($img);
                            }
                        }
                        if (_this.getSlideType(currentGalleryItem) === 'image' ||
                            (_this.getSlideType(currentGalleryItem) === 'video' &&
                                poster)) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            // load remaining slides once the slide is completely loaded
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), function () {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }, function () {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            });
                        }
                    }, this.settings.startAnimationDuration + 100);
                }
            }
            // SLide content has been added to dom
            $currentSlide.addClass('lg-loaded');
            if (!this.isFirstSlideWithZoomAnimation() ||
                (this.getSlideType(currentGalleryItem) === 'video' && !poster)) {
                this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
            }
            // When gallery is opened once content is loaded (second time) need to add lg-complete class for css styling
            if ((!this.zoomFromOrigin || !this.currentImageSize) &&
                $currentSlide.hasClass('lg-complete_') &&
                !this.lGalleryOn) {
                setTimeout(function () {
                    $currentSlide.addClass('lg-complete');
                }, this.settings.backdropDuration);
            }
            // Content loaded
            // Need to set lGalleryOn before calling preload function
            this.lGalleryOn = true;
            if (rec === true) {
                if (!$currentSlide.hasClass('lg-complete_')) {
                    $currentSlide
                        .find('.lg-object')
                        .first()
                        .on('load.lg error.lg', function () {
                        _this.preload(index);
                    });
                }
                else {
                    this.preload(index);
                }
            }

            // pixpa code added
            var lgopenDivLength = $('.lg-pixpa-'+this.settings.galleryId).length;
            if (lgopenDivLength > 0) {
              $('.lg-pixpa-'+this.settings.galleryId).eq(1).remove();
            }

        };
        /**
         * @desc Remove dummy image content and load next slides
         * Called only for the first time if zoomFromOrigin animation is enabled
         * @param index
         * @param $currentSlide
         * @param speed
         */
        LightGallery.prototype.loadContentOnFirstSlideLoad = function (index, $currentSlide, speed) {
            var _this = this;
            setTimeout(function () {
                $currentSlide.find('.lg-dummy-img').remove();
                $currentSlide.removeClass('lg-first-slide');
                _this.outer.removeClass('lg-first-slide-loading');
                _this.isDummyImageRemoved = true;
                _this.preload(index);
            }, speed + 300);
        };
        LightGallery.prototype.getItemsToBeInsertedToDom = function (index, prevIndex, numberOfItems) {
            var _this = this;
            if (numberOfItems === void 0) { numberOfItems = 0; }
            var itemsToBeInsertedToDom = [];
            // Minimum 2 items should be there
            var possibleNumberOfItems = Math.max(numberOfItems, 3);
            possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
            var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
            if (this.galleryItems.length <= 3) {
                this.galleryItems.forEach(function (_element, index) {
                    itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                });
                return itemsToBeInsertedToDom;
            }
            if (index < (this.galleryItems.length - 1) / 2) {
                for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                }
                var numberOfExistingItems = itemsToBeInsertedToDom.length;
                for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                }
            }
            else {
                for (var idx = index; idx <= this.galleryItems.length - 1 &&
                    idx < index + possibleNumberOfItems / 2; idx++) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                }
                var numberOfExistingItems = itemsToBeInsertedToDom.length;
                for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
            }
            if (this.settings.loop) {
                if (index === this.galleryItems.length - 1) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0);
                }
                else if (index === 0) {
                    itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                }
            }
            if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) {
                itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
            }
            return itemsToBeInsertedToDom;
        };
        LightGallery.prototype.organizeSlideItems = function (index, prevIndex) {
            var _this = this;
            var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
            itemsToBeInsertedToDom.forEach(function (item) {
                if (_this.currentItemsInDom.indexOf(item) === -1) {
                    _this.$inner.append("<div data-lenis-prevent id=\"" + item + "\" class=\"lg-item\"></div>");
                }
            });
            this.currentItemsInDom.forEach(function (item) {
                if (itemsToBeInsertedToDom.indexOf(item) === -1) {
                    $LG("#" + item).remove();
                }
            });
            return itemsToBeInsertedToDom;
        };
        /**
         * Get previous index of the slide
         */
        LightGallery.prototype.getPreviousSlideIndex = function () {
            var prevIndex = 0;
            try {
                var currentItemId = this.outer
                    .find('.lg-current')
                    .first()
                    .attr('id');
                prevIndex = parseInt(currentItemId.split('-')[3]) || 0;
            }
            catch (error) {
                prevIndex = 0;
            }
            return prevIndex;
        };
        LightGallery.prototype.setDownloadValue = function (index) {
            if (this.settings.download) {
                var currentGalleryItem = this.galleryItems[index];
                var hideDownloadBtn = currentGalleryItem.downloadUrl === false ||
                    currentGalleryItem.downloadUrl === 'false';
                if (hideDownloadBtn) {
                    this.outer.addClass('lg-hide-download');
                }
                else {
                    var $download = this.getElementById('lg-download');
                    this.outer.removeClass('lg-hide-download');
                    $download.attr('href', currentGalleryItem.downloadUrl ||
                        currentGalleryItem.src);
                    if (currentGalleryItem.download) {
                        $download.attr('download', currentGalleryItem.download);
                    }
                }
            }
        };
        LightGallery.prototype.makeSlideAnimation = function (direction, currentSlideItem, previousSlideItem) {
            var _this = this;
            if (this.lGalleryOn) {
                previousSlideItem.addClass('lg-slide-progress');
            }
            setTimeout(function () {
                // remove all transitions
                _this.outer.addClass('lg-no-trans');
                _this.outer
                    .find('.lg-item')
                    .removeClass('lg-prev-slide lg-next-slide');
                if (direction === 'prev') {
                    //prevslide
                    currentSlideItem.addClass('lg-prev-slide');
                    previousSlideItem.addClass('lg-next-slide');
                }
                else {
                    // next slide
                    currentSlideItem.addClass('lg-next-slide');
                    previousSlideItem.addClass('lg-prev-slide');
                }
                // give 50 ms for browser to add/remove class
                setTimeout(function () {
                    _this.outer.find('.lg-item').removeClass('lg-current');
                    currentSlideItem.addClass('lg-current');
                    // reset all transitions
                    _this.outer.removeClass('lg-no-trans');
                }, 50);
            }, this.lGalleryOn ? this.settings.slideDelay : 0);
        };
        /**
         * Goto a specific slide.
         * @param {Number} index - index of the slide
         * @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
         * @param {Boolean} fromThumb - true if slide function called via thumbnail click
         * @param {String} direction - Direction of the slide(next/prev)
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery();
         *  // to go to 3rd slide
         *  plugin.slide(2);
         *
         */
        LightGallery.prototype.slide = function (index, fromTouch, fromThumb, direction) {
            var _this = this;
            var prevIndex = this.getPreviousSlideIndex();
            this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
            var alt = this.galleryItems[index].title || this.galleryItems[index].photodesc; // img photo info title in alt tag 
            var filename = this.galleryItems[index].filename;
            var galleryId = this.settings.galleryId;
            var currentGalleryItemId = this.galleryItems[index].id;
						var currentGalleryItem = this.galleryItems[index];

            // pixpa code added video container add class
            if (_this.settings.dynamicEl && _this.settings.dynamicEl[index] && _this.settings.dynamicEl[index].type === 2) {
                $('body').find('.lg-actions').addClass('width-110');
            } else {
                $('body').find('.lg-actions').removeClass('width-110');
            }
            
            // pixpa code added
            window.lgCustomIndex = index; //current slide index
            if( typeof window.photoTitle == 'function' ){
              // var currentGalleryItem = this.galleryItems[index];

              var photo_title = currentGalleryItem.title;
              if(photo_title == '' || photo_title == null){
                photo_title = '';
              } else {
                photo_title = '<p><b>'+photo_title+'</b></p>'
              }
              
              var photo_subtitle = currentGalleryItem.photodesc;

              var photoCustomTitle = photo_title + photo_subtitle;
              window.photoTitle(index, photoCustomTitle);
            }

            if (this.settings.photofilename === true) {
              if (typeof filename != 'undefined') {
                $(this.settings.container).find('.pixpa-filename').html(filename);  
              }
            } else{
              $(this.settings.container).find('.pixpa-filename').html('');
            }

            $('.lg-photo-info').attr('id', 'js-photo-info-btn-'+index);

						

            if (this.settings.photoaccent == true) {
							// console.log('akshay', this.settings.photoaccent);
							function hexToRgb(hex) {
								// Remove # if present
								hex = hex.replace(/^#/, '');
								
								// Parse hex values
								var bigint = parseInt(hex, 16);
								var r = (bigint >> 16) & 255;
								var g = (bigint >> 8) & 255;
								var b = bigint & 255;
								
							return {r: r, g: g, b: b};
						}
						var opacity = (this.settings.photoaccentOpacity) / 100;
						var photoaccentValue = currentGalleryItem.color;
						if (currentGalleryItem.type === 3 || currentGalleryItem.__slideVideoInfo) {
									// Force white background for video/text slides
									$('body').find('.js-overlay-container .lg-container').css('background-color', `rgba(255, 255, 255, ${opacity})`);
							} else if (photoaccentValue) {
									// Use custom photoaccent for image slides
									var rgb = hexToRgb(photoaccentValue);
									if (rgb) {
											var rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
											$('body').find('.js-overlay-container .lg-container').css('background-color', rgba);
											// var mixedColor = `rgba(${Math.round((rgb.r + 255) / 2)}, ${Math.round((rgb.g + 255) / 2)}, ${Math.round((rgb.b + 255) / 2)}, ${opacity})`;
											// $('body').find('.js-overlay-container .lg-container').css('background-color', mixedColor);
									}
							}
						}

            

            // Prevent multiple call, Required for hsh plugin
            if (this.lGalleryOn && prevIndex === index) {
                return;
            }
            var numberOfGalleryItems = this.galleryItems.length;
            if (!this.lgBusy) {
                if (this.settings.counter) {
                  this.updateCurrentCounter(index);

                  // pixpa code added
                  if (typeof window.appendUrlPb === 'function') {
                    window.appendUrlPb(index, galleryId, currentGalleryItemId);
                  }

                }
                var currentSlideItem = this.getSlideItem(index);
                var previousSlideItem_1 = this.getSlideItem(prevIndex);
                var currentGalleryItem = this.galleryItems[index];
                var videoInfo = '';
                if (currentGalleryItem.__slideVideoInfo != undefined) {
                  videoInfo = currentGalleryItem.__slideVideoInfo;
                }
                
                this.outer.attr('data-lg-slide-type', this.getSlideType(currentGalleryItem));
                this.setDownloadValue(index);
                if (videoInfo) {
                    var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                    var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                    this.resizeVideoSlide(index, videoSize);
                }
                this.LGel.trigger(lGEvents.beforeSlide, {
                    prevIndex: prevIndex,
                    index: index,
                    fromTouch: !!fromTouch,
                    fromThumb: !!fromThumb,
                });
                this.lgBusy = true;
                clearTimeout(this.hideBarTimeout);
                this.arrowDisable(index);
                if (!direction) {
                    if (index < prevIndex) {
                        direction = 'prev';
                    }
                    else if (index > prevIndex) {
                        direction = 'next';
                    }
                }
                if (!fromTouch) {
                    this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1);
                }
                else {
                    this.outer
                        .find('.lg-item')
                        .removeClass('lg-prev-slide lg-current lg-next-slide');
                    var touchPrev = void 0;
                    var touchNext = void 0;
                    if (numberOfGalleryItems > 2) {
                        touchPrev = index - 1;
                        touchNext = index + 1;
                        if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
                            // next slide
                            touchNext = 0;
                            touchPrev = numberOfGalleryItems - 1;
                        }
                        else if (index === numberOfGalleryItems - 1 &&
                            prevIndex === 0) {
                            // prev slide
                            touchNext = 0;
                            touchPrev = numberOfGalleryItems - 1;
                        }
                    }
                    else {
                        touchPrev = 0;
                        touchNext = 1;
                    }
                    if (direction === 'prev') {
                        this.getSlideItem(touchNext).addClass('lg-next-slide');
                    }
                    else {
                        this.getSlideItem(touchPrev).addClass('lg-prev-slide');
                    }
                    currentSlideItem.addClass('lg-current');
                }
                // Do not put load content in set timeout as it needs to load immediately when the gallery is opened
                if (!this.lGalleryOn) {
                    this.loadContent(index, true);
                }
                else {
                    setTimeout(function () {
                        _this.loadContent(index, true);
                        // Add title if this.settings.appendSubHtmlTo === lg-sub-html
                        if (_this.settings.appendSubHtmlTo !== '.lg-item') {
                            _this.addHtml(index);
                        }
                    }, this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                }
                setTimeout(function () {
                    _this.lgBusy = false;
                    previousSlideItem_1.removeClass('lg-slide-progress');
                    _this.LGel.trigger(lGEvents.afterSlide, {
                        prevIndex: prevIndex,
                        index: index,
                        fromTouch: fromTouch,
                        fromThumb: fromThumb,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
            }
            this.index = index;

            //pixpa code added img proxyurl
            if (this.settings.dynamic == true) {
              if( typeof Global_Pagebuilder.lightGalleryImgProxyUrl == 'function' ){
                Global_Pagebuilder.lightGalleryImgProxyUrl(index, galleryId)
              }

              var currentGalleryItem = this.galleryItems[index];

              if (currentGalleryItem.type == 2) {
                if($('[data-lg-item-id="' + index + '"]').src == 'undefined') {
                  console.log('indexxxx ', index);
                  $('[data-lg-item-id="' + index + '"]').attr({
                    'src': currentGalleryItem.poster
                  })
                }

              } else if(currentGalleryItem.type == 3) {
                
                $('[data-lg-item-id="' + index + '"]').attr({
                  'src': '/img/text-slide-placeholder.jpg'
                })

              } else{
                if($('[data-lg-item-id="' + index + '"]').src == undefined) {
                  $('[data-lg-item-id="' + index + '"]').attr({
                    'src': currentGalleryItem.photo_500
                  })
                }

                setTimeout(function() {
                  // console.log(index + ' img-notfound 2 ', currentGalleryItem.photo_1500);
                  if ($('[data-id="'+index+'"]').hasClass('img-notfound')) {
                    $('[data-id="' + index + '"]').find('.lg-image').attr({
                      'src': currentGalleryItem.photo_1500
                    })
                  }
                }, 1500);
              }              
            }
        };
        LightGallery.prototype.updateCurrentCounter = function (index) {
            this.getElementById('lg-counter-current').html(index + 1 + '');
        };
        LightGallery.prototype.updateCounterTotal = function () {
            this.getElementById('lg-counter-all').html(this.galleryItems.length + '');
        };
        LightGallery.prototype.getSlideType = function (item) {
            if (item.__slideVideoInfo) {
                return 'video';
            }
            else if (item.iframe) {
                return 'iframe';
            }
            else {
                return 'image';
            }
        };
        LightGallery.prototype.touchMove = function (startCoords, endCoords, e) {
            var distanceX = endCoords.pageX - startCoords.pageX;
            var distanceY = endCoords.pageY - startCoords.pageY;
            var allowSwipe = false;
            if (this.swipeDirection) {
                allowSwipe = true;
            }
            else {
                if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = 'horizontal';
                    allowSwipe = true;
                }
                else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = 'vertical';
                    allowSwipe = true;
                }
            }
            if (!allowSwipe) {
                return;
            }
            var $currentSlide = this.getSlideItem(this.index);
            if (this.swipeDirection === 'horizontal') {
                e === null || e === void 0 ? void 0 : e.preventDefault();
                // reset opacity and transition duration
                this.outer.addClass('lg-dragging');
                // move current slide
                this.setTranslate($currentSlide, distanceX, 0);
                // move next and prev slide with current slide
                var width = $currentSlide.get().offsetWidth;
                var slideWidthAmount = (width * 15) / 100;
                var gutter = slideWidthAmount - Math.abs((distanceX * 10) / 100);
                this.setTranslate(this.outer.find('.lg-prev-slide').first(), -width + distanceX - gutter, 0);
                this.setTranslate(this.outer.find('.lg-next-slide').first(), width + distanceX + gutter, 0);
            }
            else if (this.swipeDirection === 'vertical') {
                if (this.settings.swipeToClose) {
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                    this.$container.addClass('lg-dragging-vertical');
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css('opacity', opacity);
                    var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) {
                        this.outer
                            .addClass('lg-hide-items')
                            .removeClass('lg-components-open');
                    }
                }
            }
        };
        LightGallery.prototype.touchEnd = function (endCoords, startCoords, event) {
            var _this = this;
            var distance;
            // keep slide animation for any mode while dragg/swipe
            if (this.settings.mode !== 'lg-slide') {
                this.outer.addClass('lg-slide');
            }
            // set transition duration
            setTimeout(function () {
                _this.$container.removeClass('lg-dragging-vertical');
                _this.outer
                    .removeClass('lg-dragging lg-hide-items')
                    .addClass('lg-components-open');
                var triggerClick = true;
                if (_this.swipeDirection === 'horizontal') {
                    distance = endCoords.pageX - startCoords.pageX;
                    var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                    if (distance < 0 &&
                        distanceAbs > _this.settings.swipeThreshold) {
                        _this.goToNextSlide(true);
                        triggerClick = false;
                    }
                    else if (distance > 0 &&
                        distanceAbs > _this.settings.swipeThreshold) {
                        _this.goToPrevSlide(true);
                        triggerClick = false;
                    }
                }
                else if (_this.swipeDirection === 'vertical') {
                    distance = Math.abs(endCoords.pageY - startCoords.pageY);
                    if (_this.settings.closable &&
                        _this.settings.swipeToClose &&
                        distance > 100) {
                        _this.closeGallery();
                        return;
                    }
                    else {
                        _this.$backdrop.css('opacity', 1);
                    }
                }
                _this.outer.find('.lg-item').removeAttr('style');
                if (triggerClick &&
                    Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                    // Trigger click if distance is less than 5 pix
                    var target = $LG(event.target);
                    if (_this.isPosterElement(target)) {
                        _this.LGel.trigger(lGEvents.posterClick);
                    }
                }
                _this.swipeDirection = undefined;
            });
            // remove slide class once drag/swipe is completed if mode is not slide
            setTimeout(function () {
                if (!_this.outer.hasClass('lg-dragging') &&
                    _this.settings.mode !== 'lg-slide') {
                    _this.outer.removeClass('lg-slide');
                }
            }, this.settings.speed + 100);
        };
        LightGallery.prototype.enableSwipe = function () {
            var _this = this;
            var startCoords = {};
            var endCoords = {};
            var isMoved = false;
            var isSwiping = false;
            if (this.settings.enableSwipe) {
                this.$inner.on('touchstart.lg', function (e) {
                    _this.dragOrSwipeEnabled = true;
                    var $item = _this.getSlideItem(_this.index);
                    if (($LG(e.target).hasClass('lg-item') ||
                        $item.get().contains(e.target)) &&
                        !_this.outer.hasClass('lg-zoomed') &&
                        !_this.lgBusy &&
                        e.targetTouches.length === 1) {
                        isSwiping = true;
                        _this.touchAction = 'swipe';
                        _this.manageSwipeClass();
                        startCoords = {
                            pageX: e.targetTouches[0].pageX,
                            pageY: e.targetTouches[0].pageY,
                        };
                    }
                });
                this.$inner.on('touchmove.lg', function (e) {
                    if (isSwiping &&
                        _this.touchAction === 'swipe' &&
                        e.targetTouches.length === 1) {
                        endCoords = {
                            pageX: e.targetTouches[0].pageX,
                            pageY: e.targetTouches[0].pageY,
                        };
                        _this.touchMove(startCoords, endCoords, e);
                        isMoved = true;
                    }
                });
                this.$inner.on('touchend.lg', function (event) {
                    if (_this.touchAction === 'swipe') {
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                        }
                        else if (isSwiping) {
                            var target = $LG(event.target);
                            if (_this.isPosterElement(target)) {
                                _this.LGel.trigger(lGEvents.posterClick);
                            }
                        }
                        _this.touchAction = undefined;
                        isSwiping = false;
                    }
                });
            }
        };
        LightGallery.prototype.enableDrag = function () {
            var _this = this;
            var startCoords = {};
            var endCoords = {};
            var isDraging = false;
            var isMoved = false;
            if (this.settings.enableDrag) {
                this.outer.on('mousedown.lg', function (e) {
                    _this.dragOrSwipeEnabled = true;
                    var $item = _this.getSlideItem(_this.index);
                    if ($LG(e.target).hasClass('lg-item') ||
                        $item.get().contains(e.target)) {
                        if (!_this.outer.hasClass('lg-zoomed') && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY,
                                };
                                isDraging = true;
                                // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                // *
                                _this.outer
                                    .removeClass('lg-grab')
                                    .addClass('lg-grabbing');
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }
                });
                $LG(window).on("mousemove.lg.global" + this.lgId, function (e) {
                    if (isDraging && _this.lgOpened) {
                        isMoved = true;
                        endCoords = {
                            pageX: e.pageX,
                            pageY: e.pageY,
                        };
                        _this.touchMove(startCoords, endCoords);
                        _this.LGel.trigger(lGEvents.dragMove);
                    }
                });
                $LG(window).on("mouseup.lg.global" + this.lgId, function (event) {
                    if (!_this.lgOpened) {
                        return;
                    }
                    var target = $LG(event.target);
                    if (isMoved) {
                        isMoved = false;
                        _this.touchEnd(endCoords, startCoords, event);
                        _this.LGel.trigger(lGEvents.dragEnd);
                    }
                    else if (_this.isPosterElement(target)) {
                        _this.LGel.trigger(lGEvents.posterClick);
                    }
                    // Prevent execution on click
                    if (isDraging) {
                        isDraging = false;
                        _this.outer.removeClass('lg-grabbing').addClass('lg-grab');
                    }
                });
            }
        };
        LightGallery.prototype.triggerPosterClick = function () {
            var _this = this;
            this.$inner.on('click.lg', function (event) {
                if (!_this.dragOrSwipeEnabled &&
                    _this.isPosterElement($LG(event.target))) {
                    _this.LGel.trigger(lGEvents.posterClick);
                }
            });
        };
        LightGallery.prototype.manageSwipeClass = function () {
            var _touchNext = this.index + 1;
            var _touchPrev = this.index - 1;
            if (this.settings.loop && this.galleryItems.length > 2) {
                if (this.index === 0) {
                    _touchPrev = this.galleryItems.length - 1;
                }
                else if (this.index === this.galleryItems.length - 1) {
                    _touchNext = 0;
                }
            }
            this.outer.find('.lg-item').removeClass('lg-next-slide lg-prev-slide');
            if (_touchPrev > -1) {
                this.getSlideItem(_touchPrev).addClass('lg-prev-slide');
            }
            this.getSlideItem(_touchNext).addClass('lg-next-slide');
        };
        /**
         * Go to next slide
         * @param {Boolean} fromTouch - true if slide function called via touch event
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery();
         *  plugin.goToNextSlide();
         * @see <a href="/demos/methods/">Demo</a>
         */
        LightGallery.prototype.goToNextSlide = function (fromTouch) {
            var _this = this;
            var _loop = this.settings.loop;
            if (fromTouch && this.galleryItems.length < 3) {
                _loop = false;
            }
            if (!this.lgBusy) {
                if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index,
                    });
                    this.slide(this.index, !!fromTouch, false, 'next');
                }
                else {
                    if (_loop) {
                        this.index = 0;
                        this.LGel.trigger(lGEvents.beforeNextSlide, {
                            index: this.index,
                        });
                        this.slide(this.index, !!fromTouch, false, 'next');
                    }
                    else if (this.settings.slideEndAnimation && !fromTouch) {
                        this.outer.addClass('lg-right-end');
                        setTimeout(function () {
                            _this.outer.removeClass('lg-right-end');
                        }, 400);
                    }
                }
            }
        };
        /**
         * Go to previous slides
         * @param {Boolean} fromTouch - true if slide function called via touch event
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery({});
         *  plugin.goToPrevSlide();
         * @see <a href="/demos/methods/">Demo</a>
         *
         */
        LightGallery.prototype.goToPrevSlide = function (fromTouch) {
            var _this = this;
            var _loop = this.settings.loop;
            if (fromTouch && this.galleryItems.length < 3) {
                _loop = false;
            }
            if (!this.lgBusy) {
                if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch: fromTouch,
                    });
                    this.slide(this.index, !!fromTouch, false, 'prev');
                }
                else {
                    if (_loop) {
                        this.index = this.galleryItems.length - 1;
                        this.LGel.trigger(lGEvents.beforePrevSlide, {
                            index: this.index,
                            fromTouch: fromTouch,
                        });
                        this.slide(this.index, !!fromTouch, false, 'prev');
                    }
                    else if (this.settings.slideEndAnimation && !fromTouch) {
                        this.outer.addClass('lg-left-end');
                        setTimeout(function () {
                            _this.outer.removeClass('lg-left-end');
                        }, 400);
                    }
                }
            }
        };
        LightGallery.prototype.keyPress = function () {
            var _this = this;
            $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
                if (_this.lgOpened &&
                    _this.settings.escKey === true &&
                    e.keyCode === 27) {
                    e.preventDefault();
                    if (_this.settings.allowMediaOverlap &&
                        _this.outer.hasClass('lg-can-toggle') &&
                        _this.outer.hasClass('lg-components-open')) {
                        _this.outer.removeClass('lg-components-open');
                    }
                    else {
                        _this.closeGallery();
                    }
                }
                if (_this.lgOpened && _this.galleryItems.length > 1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        _this.goToPrevSlide();
                    }
                    if (e.keyCode === 39) {
                        e.preventDefault();
                        _this.goToNextSlide();
                    }
                }
            });
        };
        LightGallery.prototype.arrow = function () {
            var _this = this;
            this.getElementById('lg-prev').on('click.lg', function () {
                _this.goToPrevSlide();
            });
            this.getElementById('lg-next').on('click.lg', function () {
                _this.goToNextSlide();
            });
        };
        LightGallery.prototype.arrowDisable = function (index) {
            // Disable arrows if settings.hideControlOnEnd is true
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var $prev = this.getElementById('lg-prev');
                var $next = this.getElementById('lg-next');
                if (index + 1 === this.galleryItems.length) {
                    $next.attr('disabled', 'disabled').addClass('disabled');
                }
                else {
                    $next.removeAttr('disabled').removeClass('disabled');
                }
                if (index === 0) {
                    $prev.attr('disabled', 'disabled').addClass('disabled');
                }
                else {
                    $prev.removeAttr('disabled').removeClass('disabled');
                }
            }
        };
        LightGallery.prototype.setTranslate = function ($el, xValue, yValue, scaleX, scaleY) {
            if (scaleX === void 0) { scaleX = 1; }
            if (scaleY === void 0) { scaleY = 1; }
            $el.css('transform', 'translate3d(' +
                xValue +
                'px, ' +
                yValue +
                'px, 0px) scale3d(' +
                scaleX +
                ', ' +
                scaleY +
                ', 1)');
        };
        LightGallery.prototype.mousewheel = function () {
            var _this = this;
            var lastCall = 0;
            this.outer.on('wheel.lg', function (e) {
                if (!e.deltaY || _this.galleryItems.length < 2) {
                    return;
                }
                e.preventDefault();
                var now = new Date().getTime();
                if (now - lastCall < 1000) {
                    return;
                }
                lastCall = now;
                if (e.deltaY > 0) {
                    _this.goToNextSlide();
                }
                else if (e.deltaY < 0) {
                    _this.goToPrevSlide();
                }
            });
        };
        LightGallery.prototype.isSlideElement = function (target) {
            return (target.hasClass('lg-outer') ||
                target.hasClass('lg-item') ||
                target.hasClass('lg-img-wrap'));
        };
        LightGallery.prototype.isPosterElement = function (target) {
            var playButton = this.getSlideItem(this.index)
                .find('.lg-video-play-button')
                .get();
            return (target.hasClass('lg-video-poster') ||
                target.hasClass('lg-video-play-button') ||
                (playButton && playButton.contains(target.get())));
        };
        /**
         * Maximize minimize inline gallery.
         * @category lGPublicMethods
         */
        LightGallery.prototype.toggleMaximize = function () {
            var _this = this;
            this.getElementById('lg-maximize').on('click.lg', function () {
                _this.$container.toggleClass('lg-inline');
                _this.refreshOnResize();
            });
        };
        LightGallery.prototype.invalidateItems = function () {
            for (var index = 0; index < this.items.length; index++) {
                var element = this.items[index];
                var $element = $LG(element);
                $element.off("click.lgcustom-item-" + $element.attr('data-lg-id'));
            }
        };
        LightGallery.prototype.trapFocus = function () {
            var _this = this;
            this.$container.get().focus({
                preventScroll: true,
            });
            $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
                if (!_this.lgOpened) {
                    return;
                }
                var isTabPressed = e.key === 'Tab' || e.keyCode === 9;
                if (!isTabPressed) {
                    return;
                }
                var focusableEls = utils.getFocusableElements(_this.$container.get());
                var firstFocusableEl = focusableEls[0];
                var lastFocusableEl = focusableEls[focusableEls.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                }
                else {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            });
        };
        LightGallery.prototype.manageCloseGallery = function () {
            var _this = this;
            if (!this.settings.closable)
                return;
            var mousedown = false;
            this.getElementById('lg-close').on('click.lg', function () {
                _this.closeGallery();
                // pixpa code added
                $('.js-overlay-container').removeClass('overlay-active');
                $('body').removeClass('lg-overflow-hidden');
                if( typeof window.removeUrlPb == 'function' ){
                  window.removeUrlPb();
                }

            });
            if (this.settings.closeOnTap) {
                // If you drag the slide and release outside gallery gets close on chrome
                // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
                this.outer.on('mousedown.lg', function (e) {
                    var target = $LG(e.target);
                    if (_this.isSlideElement(target)) {
                        mousedown = true;
                    }
                    else {
                        mousedown = false;
                    }
                });
                this.outer.on('mousemove.lg', function () {
                    mousedown = false;
                });
                this.outer.on('mouseup.lg', function (e) {
                  var target = $LG(e.target);
                  if (_this.isSlideElement(target) && mousedown) {
                    if (!_this.outer.hasClass('lg-dragging')) {
                      _this.closeGallery();
                      // pixpa code added
                      $('body').removeClass('lg-overflow-hidden');
                      if( typeof window.removeUrlPb == 'function' ){
                        window.removeUrlPb();
                      }
                    }
                  }
                });
            }
        };
        /**
         * Close lightGallery if it is opened.
         *
         * @description If closable is false in the settings, you need to pass true via closeGallery method to force close gallery
         * @return returns the estimated time to close gallery completely including the close animation duration
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery();
         *  plugin.closeGallery();
         *
         */
        LightGallery.prototype.closeGallery = function (force) {
            var _this = this;
            if (!this.lgOpened || (!this.settings.closable && !force)) {
                return 0;
            }
            this.LGel.trigger(lGEvents.beforeClose);
            if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) {
                $LG(window).scrollTop(this.prevScrollTop);
            }

            // Reset photoaccent background color
            if (this.settings.photoaccent === true) {
              $('body').find('.js-overlay-container .lg-container').css('background-color', '');
            }

            var currentItem = this.items[this.index];
            var transform;
            if (this.zoomFromOrigin && currentItem) {
                var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
            }
            if (this.zoomFromOrigin && transform) {
                this.outer.addClass('lg-closing lg-zoom-from-image');
                this.getSlideItem(this.index)
                    .addClass('lg-start-end-progress')
                    .css('transition-duration', this.settings.startAnimationDuration + 'ms')
                    .css('transform', transform);
            }
            else {
                this.outer.addClass('lg-hide-items');
                // lg-zoom-from-image is used for setting the opacity to 1 if zoomFromOrigin is true
                // If the closing item doesn't have the lg-size attribute, remove this class to avoid the closing css conflicts
                this.outer.removeClass('lg-zoom-from-image');
            }
            // Unbind all events added by lightGallery
            // @todo
            //this.$el.off('.lg.tm');
            this.destroyModules();
            this.lGalleryOn = false;
            this.isDummyImageRemoved = false;
            this.zoomFromOrigin = this.settings.zoomFromOrigin;
            clearTimeout(this.hideBarTimeout);
            this.hideBarTimeout = false;
            $LG('html').removeClass('lg-on');
            // pixpa code added
            $('body').removeClass('lg-overflow-hidden');

            this.outer.removeClass('lg-visible lg-components-open');
            // Resetting opacity to 0 isd required as  vertical swipe to close function adds inline opacity.
            this.$backdrop.removeClass('in').css('opacity', 0);
            var removeTimeout = this.zoomFromOrigin && transform
                ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration)
                : this.settings.backdropDuration;
            this.$container.removeClass('lg-show-in');
            this.$containerOverlay.removeClass('overlay-active');
            // $('.overlay-container').removeClass('overlay-active');
            // Once the closign animation is completed and gallery is invisible
            setTimeout(function () {
                if (_this.zoomFromOrigin && transform) {
                    _this.outer.removeClass('lg-zoom-from-image');
                }
                _this.$container.removeClass('lg-show');
                // Reset scrollbar
                _this.resetScrollBar();
                // Need to remove inline opacity as it is used in the stylesheet as well
                _this.$backdrop
                    .removeAttr('style')
                    .css('transition-duration', _this.settings.backdropDuration + 'ms');
                _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                _this.getSlideItem(_this.index).removeClass('lg-start-end-progress');
                _this.$inner.empty();
                if (_this.lgOpened) {
                    _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this,
                    });
                }
                if (_this.$container.get()) {
                    _this.$container.get().blur();
                }
                _this.lgOpened = false;
            }, removeTimeout + 100);
            return removeTimeout + 100;
        };
        LightGallery.prototype.initModules = function () {
            this.plugins.forEach(function (module) {
                try {
                    module.init();
                }
                catch (err) {
                    console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                }
            });
        };
        LightGallery.prototype.destroyModules = function (destroy) {
            this.plugins.forEach(function (module) {
                try {
                    if (destroy) {
                        module.destroy();
                    }
                    else {
                        module.closeGallery && module.closeGallery();
                    }
                }
                catch (err) {
                    console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                }
            });
        };
        /**
         * Refresh lightGallery with new set of children.
         *
         * @description This is useful to update the gallery when the child elements are changed without calling destroy method.
         *
         * If you are using dynamic mode, you can pass the modified array of dynamicEl as the first parameter to refresh the dynamic gallery
         * @see <a href="/demos/dynamic-mode/">Demo</a>
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery();
         *  // Delete or add children, then call
         *  plugin.refresh();
         *
         */
        LightGallery.prototype.refresh = function (galleryItems) {
            if (!this.settings.dynamic) {
                this.invalidateItems();
            }
            if (galleryItems) {
                this.galleryItems = galleryItems;
            }
            else {
                this.galleryItems = this.getItems();
            }
            this.updateControls();
            this.openGalleryOnItemClick();
            this.LGel.trigger(lGEvents.updateSlides);
        };
        LightGallery.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems);
            this.updateCounterTotal();
            this.manageSingleSlideClassName();
        };
        /**
         * Destroy lightGallery.
         * Destroy lightGallery and its plugin instances completely
         *
         * @description This method also calls CloseGallery function internally. Returns the time takes to completely close and destroy the instance.
         * In case if you want to re-initialize lightGallery right after destroying it, initialize it only once the destroy process is completed.
         * You can use refresh method most of the times.
         * @category lGPublicMethods
         * @example
         *  const plugin = lightGallery();
         *  plugin.destroy();
         *
         */
        LightGallery.prototype.destroy = function () {
            var _this = this;
            var closeTimeout = this.closeGallery(true);
            setTimeout(function () {
                _this.destroyModules(true);
                if (!_this.settings.dynamic) {
                    _this.invalidateItems();
                }
                $LG(window).off(".lg.global" + _this.lgId);
                _this.LGel.off('.lg');
                _this.$container.remove();
            }, closeTimeout);
            return closeTimeout;
        };
        return LightGallery;
    }());

    function lightGallery(el, options) {
        return new LightGallery(el, options);
    }

    return lightGallery;

})));
//# sourceMappingURL=lightgallery.umd.js.map
