"use strict";!function(){var t=document.querySelector("body"),c=!0;function n(e){(document.querySelector("body").classList.contains("_lock")?s:d)(e)}function s(e){var t,n=document.querySelector("body");c&&(t=document.querySelectorAll("._lp"),setTimeout(function(){for(var e=0;e<t.length;e++)t[e].style.paddingRight="0px";n.style.paddingRight="0px",n.classList.remove("_lock")},e),c=!1,setTimeout(function(){c=!0},e))}function d(e){var t=document.querySelector("body");if(c){for(var n=document.querySelectorAll("._lp"),r=0;r<n.length;r++)n[r].style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";t.style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px",t.classList.add("_lock"),c=!1,setTimeout(function(){c=!0},e)}}function e(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}function r(){var e=document.querySelectorAll(".js-clouds"),t=document.documentElement.clientWidth,n=t/5.45;e.forEach(function(e){n=400<n?400:t/5.45,e.style.height="".concat(n),e.style.top="".concat(4-n)})}var i,o,a,l,u,p,m,f,v,y,h,_,b;function g(e){this.type=e}validate.init(),g.prototype.init=function(){var i=this,o=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e],n=t.dataset.da.trim().split(","),r={};r.element=t,r.parent=t.parentNode,r.destination=document.querySelector(n[0].trim()),r.breakpoint=n[1]?n[1].trim():"767",r.place=n[2]?n[2].trim():"last",r.index=this.indexInParent(r.parent,r.element),this.оbjects.push(r)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(e,t,n){return Array.prototype.indexOf.call(n,e)===t});for(var a=0;a<this.mediaQueries.length;a++)!function(e){var e=i.mediaQueries[e],e=String.prototype.split.call(e,","),t=window.matchMedia(e[0]),n=e[1],r=Array.prototype.filter.call(i.оbjects,function(e){return e.breakpoint===n});t.addListener(function(){o.mediaHandler(t,r)}),i.mediaHandler(t,r)}(a)},g.prototype.mediaHandler=function(e,t){if(e.matches)for(var n=0;n<t.length;n++){var r=t[n];r.index=this.indexInParent(r.parent,r.element),this.moveTo(r.place,r.element,r.destination)}else for(var i=0;i<t.length;i++){var o=t[i];o.element.classList.contains(this.daClassname)&&this.moveBack(o.parent,o.element,o.index)}},g.prototype.moveTo=function(e,t,n){t.classList.add(this.daClassname),"last"===e||e>=n.children.length?n.insertAdjacentElement("beforeend",t):"first"!==e?n.children[e].insertAdjacentElement("beforebegin",t):n.insertAdjacentElement("afterbegin",t)},g.prototype.moveBack=function(e,t,n){t.classList.remove(this.daClassname),void 0!==e.children[n]?e.children[n].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},g.prototype.indexInParent=function(e,t){e=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(e,t)},g.prototype.arraySort=function(e){"min"===this.type?Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint}):Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint})},new g("min").init(),function(){for(var n=document.querySelectorAll("._popup-link"),a=document.querySelectorAll(".popup"),e=function(e){var t=n[e];t.addEventListener("click",function(e){c&&function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";0<document.querySelectorAll(".popup._active").length&&i("",!1);var n=document.querySelector(".popup_".concat(e));n&&c&&(""!=t&&null!=t&&(document.querySelector(".popup_video").querySelector(".popup__video").innerHTML='<iframe src="https://www.youtube.com/embed/'.concat(t,'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>')),document.querySelector(".menu__body._active")||d(500),n.classList.add("_active"),history.pushState("","","#".concat(e)))}(t.getAttribute("href").replace("#",""),t.getAttribute("data-video")),e.preventDefault()})},t=0;t<n.length;t+=1)e(t);for(var r=0;r<a.length;r+=1)a[r].addEventListener("click",function(e){e.target.closest(".popup__body")||i(e.target.closest(".popup"))});function i(e,t){var n=!(1<arguments.length&&void 0!==t)||t;if(c){if(e){t=e.querySelector(".popup__video");t&&(t.innerHTML=""),e.classList.remove("_active")}else for(var r=0;r<a.length;r+=1){var i=a[r],o=i.querySelector(".popup__video");o&&(o.innerHTML=""),i.classList.remove("_active")}!document.querySelector(".menu__body._active")&&n&&s(500),history.pushState("","",window.location.href.split("#")[0])}}var o=document.querySelectorAll(".popup__close,._popup-close");if(o)for(var l=0;l<o.length;l+=1)!function(e){var t=o[e];t.addEventListener("click",function(){i(t.closest(".popup"))})}(l);document.addEventListener("keydown",function(e){"Escape"===e.code&&i()})}(),e(),o=window.matchMedia("(min-width: 1280px)"),a=window.matchMedia("(min-width: 768px)"),l=document.querySelector(".nav"),u=document.querySelector(".sandwich"),o.matches,a.matches,window.addEventListener("resize",function(){i=i||setTimeout(function(){i=null,function(){e(),r(),l.classList.contains("_active")&&(l.classList.remove("_active"),u.classList.remove("_active"),t.classList.remove("_overlay"),t.classList.remove("_lock"));o.matches}()},88)},!1),p=document.querySelector(".header__wrapper"),m=document.querySelector(".header__placeholder"),p&&document.addEventListener("scroll",function(e){0<window.pageYOffset?(p.style.position="fixed",m.style.display="block"):(p.style.position="relative",m.style.display="none")}),f=document.querySelector(".sandwich"),v=document.querySelector(".nav"),null!=f&&(f.addEventListener("click",function(e){c&&(n(500),f.classList.toggle("_active"),v.classList.toggle("_active"),t.classList.toggle("_overlay"))}),document.addEventListener("click",function(e){v.classList.contains("_active")&&(e.target.closest("._active")||(n(500),v.classList.remove("_active"),f.classList.remove("_active"),t.classList.remove("_overlay")))})),(y=document.querySelector(".hero__slider"))&&new Swiper(y,{direction:"horizontal",loop:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".hero__bullets",bulletClass:"hero__bullet",bulletActiveClass:"hero__bullet--active",type:"bullets",clickable:!0},autoplay:{delay:5e3}}),document.querySelectorAll(".quality-control__input").forEach(function(e){var t=e.parentElement.querySelector("label");e.addEventListener("focus",function(){t.classList.add("_active")}),e.addEventListener("blur",function(){e.value||t.classList.remove("_active")})}),r(),h=document.querySelector(".gallery-slider-modal__general"),_=document.querySelector(".gallery-slider-modal__thumbs"),_=new Swiper(_,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:3,spaceBetween:3,slidesOffsetBefore:0,slidesOffsetAfter:0}),new Swiper(h,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,thumbs:{swiper:_,slideThumbActiveClass:"gallery-slider-modal__thumbs-item--active"}}),b=document.querySelector(".more-slider-modal"),new Swiper(b,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0})}();