// var global_cache_publish_date = $('#global_cache_publish_date').attr('data-value');
// var custompage_publish_date = $('#custompage_publish_date').attr('data-value');
// var studio_preview_url = $('#studio_preview_url').attr('data-value');
// var global_domain = $('#global_domain').attr('data-value');

// if (studio_preview_url == '') {
//   var querystring = '?id='+custompage_publish_date+'&host='+location.hostname;
// } else {
//   var querystring = studio_preview_url+'&id='+custompage_publish_date+'&host='+location.hostname;
// }

// // console.log('custompage_publish_date '+ custompage_publish_date);

// $(document).ready(function(){
//   $(".dynamic-component").each(function(){
//     // $(this).html("");
//     var link_id = $(this).attr('data-comp_id');
//     if (link_id !== false && typeof link_id !== typeof "undefined") {
//       var link_id = $(this).attr('data-link_id');
//     }
//     if (link_id != 0) {
//       if($(this).attr('data-component') == 'photoGallery'){
//         loadPhotoGallery($(this));
//       }else if($(this).attr('data-component') == 'contactForm' || $(this).attr('data-component') == 'paymentForm'){
//         loadContactForm($(this));
//       }else if($(this).attr('data-component') == 'guestbookForm'){
//           loadGuestbookForm($(this));
//       }else if($(this).attr('data-component') == 'blogPost'){
//         loadBlogPost($(this));
//       }else if($(this).attr('data-component') == 'productDetail'){
//         loadProductDetail($(this));
//       }else if($(this).attr('data-component') == 'featuredProducts'){
//         loadFeaturedProducts($(this));
//       }else if($(this).attr('data-component') == 'listComponent'){
//         loadListComponent($(this));
//       }else if($(this).attr('data-component') == 'infoItemComponent'){
//         loadInfoItemComponent($(this));
//       }else if($(this).attr('data-component') == 'instagramComponent'){
//         loadInstagramComponent($(this));
//       }else if($(this).attr('data-component') == 'banner'){
//         loadBanner($(this));
//       } else if($(this).attr('data-component') == 'newsletter'){
//         loadNewsletter($(this));
//       }
      
//       $(this).attr('data-component', '');
//       return false;
//     }

//   });
// });

// function loadDynamicComponent(argument) {
//   $(".dynamic-component").each(function(){
//     // $(this).html("");
//     var link_id = $(this).attr('data-comp_id');
//     if (link_id !== false && typeof link_id !== typeof "undefined") {
//       var link_id = $(this).attr('data-link_id');
//     }
//     if (link_id != 0) {
//       if($(this).attr('data-component') == 'photoGallery'){
//         $(this).html("");
//         loadPhotoGallery($(this));
//         $(this).attr('data-component', '');
//         return false;
//       }else if($(this).attr('data-component') == 'contactForm' || $(this).attr('data-component') == 'paymentForm'){
//         $(this).html("");
//         loadContactForm($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'guestbookForm'){
//         $(this).html("");
//         loadGuestbookForm($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'blogPost'){
//         $(this).html("");
//         loadBlogPost($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'productDetail'){
//         $(this).html("");
//         loadProductDetail($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'featuredProducts'){
//         $(this).html("");
//         loadFeaturedProducts($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'listComponent'){
//         $(this).html("");
//         loadListComponent($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'infoItemComponent'){
//         $(this).html("");
//         loadInfoItemComponent($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'instagramComponent'){
//         $(this).html("");
//         loadInstagramComponent($(this));
//         $(this).attr('data-component', '');    
//         return false;
//       }else if($(this).attr('data-component') == 'banner'){
//         // $(this).html("");
//         loadBanner($(this));
//         $(this).attr('data-component', '');
//         return false;
//       } else if($(this).attr('data-component') == 'newsletter'){
//         $(this).html("");
//         loadNewsletter($(this));
//         $(this).attr('data-component', '');
//         return false;
//       }
//     }
//   });
// }


// function loadPhotoGallery(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
  
//   var tabuserAgent = '';
//   if(window.location.href.match('useragent=mobile&')){
//     tabuserAgent = querystring+'&useragent=mobile';
//   } else if(window.location.href.match('useragent=desktop') || window.location.href.match('useragent=tab&')) {
//     tabuserAgent = querystring+'&useragent=desktop';
//   } else{
//     tabuserAgent = querystring;
//   }

//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/photo-gallery-view/'+linkId+tabuserAgent
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById("photo-gallery-"+linkId);
//     $("#"+divId).html("");

//     document.getElementById(divId).style.opacity = '0';

//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/photo-gallery-js/"+linkId+tabuserAgent);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000);

//     setTimeout(function() {
//       document.getElementById(divId).style.opacity = '1';
//     }, 1000);
    
//     loadDynamicComponent();
//   });
// }

// function loadContactForm(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   if($(elem).attr('data-is_new_contact_form') != undefined) {
//     var formId = "form-page-container-"+linkId;
//   } else {
//     var formId = "form-page";
//   }

//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/contact-view/'+linkId+querystring+'&ajax=true'
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById(formId);
//     $("#"+divId).html("");
//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/contact-js/"+linkId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadContactForm success');
//     loadDynamicComponent();
//   });
// }


// function loadGuestbookForm(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   var formId = "form-page-container-"+linkId;
  
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/contact-view/'+linkId+'?ajax=true&id='+custompage_publish_date+'&host='+location.hostname
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById(formId);
//     $("#"+divId).html("");
//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/contact-js/"+linkId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadContactForm success');
//     loadDynamicComponent();
//   });
// }

// function loadBlogPost(elem){
//   var compId = elem.attr('data-comp_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/blog-post-view/'+compId+querystring
//   }).done((response)=> {
//       var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById("blog");
//     // $("#"+divId).html("");
//     document.getElementById(divId).style.opacity = '0';
//     document.getElementById(divId).style.visibility = "hidden";

//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/blog-post-js/"+compId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadBlogPost success');

//     // setTimeout(function() {
//     //   document.getElementById(divId).style.opacity = '1';
//     // }, 1000);

//     loadDynamicComponent();
//   });
// }


// function loadFeaturedProducts(elem){
//   var compId = elem.attr('data-comp_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/featured-product-view/'+compId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     // console.log(doc);
//     var gallery =  doc.getElementById("store");
//     // $("#"+divId).html("");
//     document.getElementById(divId).style.opacity = '0';
//     document.getElementById(divId).style.visibility = "hidden";
//     // console.log(gallery);
//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/featured-product-js/"+compId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadFeaturedProducts success');
//     // setTimeout(function() {
//     //   document.getElementById(divId).style.opacity = '1';
//     // }, 1000);

//     loadDynamicComponent();
//   });
// }

// function loadProductDetail(elem){
//   var compId = elem.attr('data-comp_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/product-detail-view/'+compId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     // console.log(doc);
//     var gallery =  doc.getElementById("store");
//     $("#"+divId).html("");
//     // console.log(gallery);
//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/product-detail-js/"+compId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadProductDetail success');

    

//     loadDynamicComponent();
//   });
// }

// function loadListComponent(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/list-view/'+linkId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById("builder-list-container-"+linkId);
//     // $("#"+divId).html("");
//     if ($("#"+divId).attr('data-component_type') != 'social' && $("#"+divId).attr('data-component_type') != 'faqs'){
//       console.log($("#"+divId).attr('data-component_type'));
//       document.getElementById(divId).style.visibility = "hidden";
//       document.getElementById(divId).style.opacity = '0';
//     } else {
//       $("#"+divId).html("");
//     }

//     document.getElementById(divId).appendChild(gallery);
    
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/list-js/"+linkId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
    
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // setTimeout( ()=>{
//     //   document.getElementById(divId).style.visibility = "visible";
//     // },800)
//     // console.log('loadListComponent success');

//     // setTimeout(function() {
//     //   document.getElementById(divId).style.opacity = '1';
//     // }, 2000);
//     // console.log('load divId ', divId);
//     loadDynamicComponent();
//   });
// }

// function  loadInfoItemComponent(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/list-view/'+linkId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById("builder-list-container-"+linkId);
//     $("#"+divId).html("");
//     // document.getElementById(divId).style.visibility = "hidden";
//     document.getElementById(divId).style.opacity = '0';
//     document.getElementById(divId).appendChild(gallery);    
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/list-js/"+linkId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
    
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // setTimeout( ()=>{
//     //   document.getElementById(divId).style.visibility = "visible";
//     // },800)
//     // console.log('loadListComponent success');

//     setTimeout(function() {
//       document.getElementById(divId).style.opacity = '1';
//     }, 1000);

//     loadDynamicComponent();
//   });
// }

// function collectionHas(a, b) { //helper function (see below)
//     for(var i = 0, len = a.length; i < len; i ++) {
//         if(a[i] == b) return true;
//     }
//     return false;
// }
// function findParentBySelector(elm, selector) {
//     var all = document.querySelectorAll(selector);
//     var cur = elm.parentNode;
//     while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
//         cur = cur.parentNode; //go up
//     }
//     return cur; //will return null if not found
// }

// function loadInstagramComponent(elem){
//   var compId = elem.attr('data-comp_id');
//   var divId= elem.attr('id');
//   // console.log("divId " + divId + " compId " + compId);
//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/instagram-view/'+compId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     // console.log(doc);
//     var gallery =  doc.getElementById("instagram_comp-"+compId);
//     $("#"+divId).html("");
//     if (!gallery.innerText.trim()) {
//       findParentBySelector(document.getElementById(divId), '.is-section').remove()
//     } else {
//       // console.log(gallery);
//       document.getElementById(divId).style.opacity = '0';
//       document.getElementById(divId).appendChild(gallery);
//       var fileref=document.createElement('script');
//       fileref.setAttribute("type","text/javascript");
//       fileref.setAttribute("src",global_domain + "/assets/instagram-js/"+compId+querystring);
//       document.getElementsByTagName("body")[0].appendChild(fileref);
//       // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//       // console.log('loadInstagramComponent success');

//       setTimeout(function() {
//         document.getElementById(divId).style.opacity = '1';
//       }, 1000);

//     }
//     loadDynamicComponent();
//   });

// }

// function loadBanner(elem){
//   var compId = elem.attr('data-comp_id');
//   var divId= elem.attr('id');
//   // console.log("compId " + compId + " divId " + divId);
//   // $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/banner-view/'+compId+querystring
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById("cover-section-"+compId);
//     // $("#"+divId).html("");
//     // document.getElementById(divId).appendChild(gallery);
//     document.getElementById(divId).append(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/banner-js/"+compId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadBanner success');
//     if (typeof onCallYouTubeAutoPlay != 'undefined') {
//       // console.log('loadBanner onCallYouTubeAutoPlay');
//       onCallYouTubeAutoPlay();
//     }
//     loadDynamicComponent();
//   });
// }

// function loadNewsletter(elem){
//   var linkId = elem.attr('data-link_id');
//   var divId= elem.attr('id');
//   if($(elem).attr('data-is_new_contact_form') != undefined) {
//     var formId = "newsletter-page-container-"+linkId;
//   } else {
//     var formId = "newsletter-form";
//   }

//   $("#"+divId).html(`<div class="loading-fetching-content2" style="opacity:1; z-index: -1; height: 250px;position: relative; background: transparent"><div class="banner-container-center"><img src="/img/oval.svg" alt="Page Loader"></div></div>`);
//   $.ajax({
//     type: 'GET',
//     url: global_domain + '/assets/newsletter-view/'+linkId+'?ajax=true&id='+custompage_publish_date+'&host='+location.hostname
//   }).done((response)=> {
//     var doc = new DOMParser().parseFromString(response,"text/html");
//     var gallery =  doc.getElementById(formId);
//     $("#"+divId).html("");
//     document.getElementById(divId).appendChild(gallery);
//     var fileref=document.createElement('script');
//     fileref.setAttribute("type","text/javascript");
//     fileref.setAttribute("src",global_domain + "/assets/newsletter-js/"+linkId+querystring);
//     document.getElementsByTagName("body")[0].appendChild(fileref);
//     // setTimeout(()=>{document.getElementsByTagName("body")[0].appendChild(fileref);},1000); 
//     // console.log('loadNewsletter success');
//     loadDynamicComponent();
//   });
// }


function dynamicClassJs () {
  var dynamicClassJsDelete =  setInterval(function(){
    if($('.js-dynamic-component-append').length <= 0 ) {
      // console.log('clear out')
      clearInterval(dynamicClassJsDelete);
    } else {
      $('.js-dynamic-component-append').each(function() {
        // console.log('clear in')
        var jsSrc = $(this).attr('data-src');
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", jsSrc);
        document.getElementsByTagName("body")[0].appendChild(fileref);
        $(this).remove();
      });
    }
  }, 5000);
}

dynamicClassJs();