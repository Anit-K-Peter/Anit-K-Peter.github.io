window.Global_Pagebuilder = {  
}

Global_Pagebuilder.rectangleLargeGridSizesList = function(w) {
  w = window.innerWidth;
  if( w > 2500 ) return '50%';
  else if( w > 1925 && w <= 2500 ) return '50%';
  else if( w > 1200 && w <= 1925 ) return '50%';
  else if( w > 768 && w <= 1200 ) return '50%';
  else if (window.orientationchange == 1) return '50%';
  else return '100%';
}

Global_Pagebuilder.mediumGridSizesList = function(w) {
  w = window.innerWidth;
  if( w > 2500 ) return '25%';
  else if( w > 1925 && w <= 2500 ) return '25%';
  else if( w > 1200 && w <= 1925 ) return '33.33%';
  else if( w > 768 && w <= 1200 ) return '33.33%';
  else return '100%';
}

Global_Pagebuilder.sectionHeight = function ($this) {
  sec_height_blank = '';
  if ($this.parents('.is-section-10').length == 1) {
    sec_height = 10;
  } else if ($this.parents('.is-section-25').length == 1) {
    sec_height = 25
  } else if ($this.parents('.is-section-33').length == 1) {
    sec_height = 33
  } else if ($this.parents('.is-section-50').length == 1) {
    sec_height = 50        
  } else if ($this.parents('.is-section-60').length == 1) {
    sec_height = 60
  } else if ($this.parents('.is-section-75').length == 1) {
    sec_height = 75
  } else if ($this.parents('.is-section-90').length == 1) {
    sec_height = 90
  } else if ($this.parents('.is-section-100').length == 1) {       
    sec_height = 100
  } else {
    sec_height = 100
    sec_height_blank = 100;
  }
}

Global_Pagebuilder.Init = function() {
}

Global_Pagebuilder.getCommonResizedPhotos = function(classname, onLoadType, slideshowLayout, gridlayout, linkId) {
  var resizedImages = $(classname);
  for (let i = 0; i < resizedImages.length; i++) {     
    const validSlideshowLayouts = ['vertical_slider','vertical_slider_detailed','single_image','single_image_detailed', 'horizontal_slider', 'horizontal_scroll', 'vertical_slider_offset'];
    if (onLoadType === 'slideshow' && validSlideshowLayouts.includes(slideshowLayout)) {
      if (i === 24) {
        return false;
      }
    }
    var photoElement = $(resizedImages[i]);
    var photoid = photoElement.data('photoid');
    var userId = userObject.userId;
    var photoVersionId = photoElement.data('photo_versionid');
    var watermark = photoElement.data('watermark');
    var watermarkVersionId = photoElement.data('watermark_versionid');
    var watermarkId = photoElement.data('watermark_id');
    var index = photoElement.data('index');
    // var index = i;
    Global_Pagebuilder.getCommonResizedCheckPhotos(photoid, userId, photoVersionId, watermark, watermarkVersionId, watermarkId, index,onLoadType, slideshowLayout, gridlayout, linkId);
  }
}

Global_Pagebuilder.getCommonResizedCheckPhotos = async function (photoid, userId, photoVersionId, watermark, watermarkVersionId, watermarkId, index,onLoadType, slideshowLayout, gridlayout, linkId) {
  $.ajax({
    type: 'GET',
    url: userObject.resizedSignedImageUrl + 'resized-signed-image-url/' + userId + '/' + photoid + '?quality=' + userObject.imgQuality + '&watermark=' + watermark + '&watermark-id=' + watermarkId + '&watermark-version=' + watermarkVersionId +'&image-version='+photoVersionId
  }).done(function(data) {
    if(data.status == "success"){
      var photoid = data.photo_key;
      var photo100 = data.photo_100 ?? '';
      var photo300 = data.photo_300 ?? '';
      var photo500 = data.photo_500 ?? '/img/text-slide-placeholder.jpg';
      var photo800 = data.photo_800 ?? '/img/text-slide-placeholder.jpg';
      var photo1000 = data.photo_1000 ?? '/img/text-slide-placeholder.jpg';
      var photo1500 = data.photo_1500 ?? '/img/text-slide-placeholder.jpg';
      var photo2048 = data.photo_2048 ?? '';
      var photo2560 = data.photo_2560 ?? '';

      $('[data-key="' + photoid + '"]').attr({
        'data-thumb': photo100,
        'data-src': photo800,
        'data-fotourl': photo800,
        'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
      });

      $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
        'src': photo800,
        'data-src': photo800,
        'data-fotourl': photo800,
        'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
      });

      $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').addClass('lazyload');
      $('[data-key="' + photoid + '"]').find('.lazy-infinte-loader').remove();
      $('.is-wrapper img').ensureLoad(function() {
        $(this).fadeIn();
      });

      // console.log('gridlayout 1 - ', gridlayout);
      // if(gridlayout == 'dynamic_horizontal_small' || gridlayout == 'dynamic_horizontal_medium' || gridlayout == 'dynamic_horizontal_large'){
      //   console.log('gridlayout  2 -', gridlayout);
      //   $('.grid_'+linkId).justifiedGallery()

      //   setTimeout(function() {
      //     console.log('gridlayout  3 -', gridlayout);
      //     $('.grid_'+linkId).justifiedGallery()
      //   }, 1000);
      // }

      var total_pagedata = window['total_data_' + linkId];
      if (total_pagedata && typeof total_pagedata[index] !== 'undefined') {
        total_pagedata[index].photo_100 = photo100;
        total_pagedata[index].photo_500 = photo500;
        total_pagedata[index].photo_800 = photo800;
        total_pagedata[index].photo_1200 = photo1000;
        total_pagedata[index].photo_1500 = photo1500;
        total_pagedata[index].originalpath = photo2560;
        total_pagedata[index].largepath = photo2048;
        total_pagedata[index].thumb = photo100;
      }

      $('[data-lg-photoitem-id="' + photoid + '"]').attr({
        'src': photo100
      });

      if (total_pagedata && typeof total_pagedata[index] !== 'undefined' && total_pagedata[index].type == 2) {
        total_pagedata[index].photopath = photo1500;
      }

    }
  });
}


Global_Pagebuilder.VerticalScrollGallery = function(classname, onLoadType, slideshowLayout, gridlayout, linkId) {
  Global_Pagebuilder.getCommonResizedPhotos(classname, onLoadType, slideshowLayout, gridlayout, linkId);
  // Get the total length of elements with class 'js-get-resized-image'
  var totalLength = $(classname).length;
  var chunkSize = 24;
  var numChunks = Math.ceil(totalLength / chunkSize);
  var currentChunk = 2; // Updated starting value
  function appendNextChunk() {
    var startIndex = (currentChunk - 1) * chunkSize; // Adjusted calculation            
    var endIndex = startIndex + chunkSize;
    var elements = $(classname).slice(startIndex, endIndex);
    elements.each(function(index) {        
      var photoid = $(this).attr('data-photoid');
      var photoVersionId = $(this).attr('data-photo_versionid');
      var watermark = $(this).attr('data-watermark');
      var watermarkVersionId = $(this).attr('data-watermark_versionid');
      var watermarkId = $(this).attr('data-watermark_id');
      var index = $(this).attr('data-index');
      userId = userObject.userId;
      Global_Pagebuilder.getCommonResizedCheckPhotos(photoid, userId, photoVersionId, watermark, watermarkVersionId,watermarkId, index, onLoadType, slideshowLayout, gridlayout, linkId);
    });

    // Increment the current chunk index
    currentChunk++;
    if (currentChunk > numChunks) {
      $(window).off('scroll', scrollHandler); // Disable the scroll event listener
    }
  }

  var scrollHandler = function(event) {
    var scrollHeight = $(document).height();
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scrollTop + windowHeight <= scrollHeight) {
      appendNextChunk();
    }
  };

  // Attach the scroll event listener
  $(window).on('scroll', scrollHandler);
}

Global_Pagebuilder.sliderGalleryImgProxyUrl = function(currentDiv, currentIndex, singleImagelinkId){
  var photo_length = $('.js-get-resized-image_'+singleImagelinkId+'').length;
  var photoElement_horizontal = $('.js-get-resized-image_'+singleImagelinkId+'[data-index="' + currentIndex + '"]');
  var photoid = $('.js-get-resized-image_'+singleImagelinkId+'[data-index="' + currentIndex + '"]').attr('data-photoid');
  var photoVersionId = photoElement_horizontal.data('photo_versionid');
  var watermark = photoElement_horizontal.data('watermark');
  var watermarkVersionId = photoElement_horizontal.data('watermark_versionid');
  var watermarkId = photoElement_horizontal.data('watermark_id');
  var index = photoElement_horizontal.data('index');
  userId = userObject.userId;
  var proxysingleImagelinkId = singleImagelinkId;
  var startIndex = currentIndex, endIndex = currentIndex + 10;

  ajaxImgProxyUrl = function (photoid, userId, watermark, watermarkVersionId, watermarkId, photoVersionId, index, proxysingleImagelinkId){
    $.ajax({
      type: 'GET',
      url: userObject.resizedSignedImageUrl + 'resized-signed-image-url/' + userId + '/' + photoid + '?quality=' + userObject.imgQuality + '&watermark=' + watermark + '&watermark-version=' + watermarkVersionId + '&watermark-id=' + watermarkId +'&image-version='+photoVersionId
    }).done(function(data) {
      if(data.status == "success"){
        var photo100 = data.photo_100 ?? '';
        var photo300 = data.photo_300 ?? '';
        var photo500 = data.photo_500 ?? '/img/text-slide-placeholder.jpg';
        var photo800 = data.photo_800 ?? '/img/text-slide-placeholder.jpg';
        var photo1000 = data.photo_1000 ?? '/img/text-slide-placeholder.jpg';
        var photo1500 = data.photo_1500 ?? '/img/text-slide-placeholder.jpg';
        var photo2048 = data.photo_2048 ?? '';
        var photo2560 = data.photo_2560 ?? '';
        var photoid = data.photo_key;

        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
          'data-src': photo2048,
          'src': photo2048,
        })

        $('[data-key="' + photoid + '"]').attr({
          'data-thumb': photo100,
          'data-src': photo2048,
          'data-fotourl': data.photo1500,
          'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });

        $('[data-key="' + photoid + '"].ls_textslider, [data-key="' + photoid + '"].ls_imageslider').attr({          
          'data-src': photo2048
        }); 

        $('[data-key="' + photoid + '"].ls_textslider').attr({
          'data-htmlonly': photo1500,
        });

        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
          'data-thumb': photo100,
          'data-src': photo2048,
          'src': photo2048,
        });

        $('[data-thumbindex="' + index + '"]').find('img').attr({
          'src': photo100,
        });    

        // var proxysingleImagelinkId = 770771;
        var total_pagedata = window['total_data_' + proxysingleImagelinkId];
        if(typeof total_pagedata != 'undefined' && total_pagedata[index].type == "1"){
          // image slide
          total_pagedata[index].photo_100 = photo100;
          total_pagedata[index].photo_500 = photo500;
          total_pagedata[index].photo_800 = photo800;
          total_pagedata[index].photo_1200 = photo1000;
          total_pagedata[index].photo_1500 = photo1500;
          total_pagedata[index].originalpath = photo2560;
          total_pagedata[index].largepath = photo2048;
          total_pagedata[index].thumb = photo100;
        }
        // if(typeof total_pagedata != 'undefined' && total_pagedata[index].type == 2){
        //   total_pagedata[index].photopath = photo1500;
        // }
      }
    })
  }

  for (let i = startIndex; i <= endIndex; i++) {
    if (i >= 0 && i < photo_length) {
      const $image = $('.js-get-resized-image_'+singleImagelinkId+'[data-index="' + i + '"]');
      if ($image.find('.js-get-resized-image-src').attr('data-src') === '') {
        const photoid = $image.attr('data-photoid');
        const userId = userObject.userId;
        const watermarkVersionId = userObject.watermarkVersionId;
        const watermarkId = $image.attr('data-watermark_id');
        const watermark = $image.attr('data-watermark');
        const photoVersionId = $image.attr('data-photo_versionid');
        ajaxImgProxyUrl(photoid, userId, watermark, watermarkVersionId, watermarkId, photoVersionId, i, proxysingleImagelinkId);
      }
    }
  }
  
  let currentItemIndex = currentIndex;
  if(currentItemIndex < 10){
    startIndexValue = photo_length;
    endIndexValue = photo_length - 10;
  } else{
    startIndexValue = currentItemIndex;
    endIndexValue = currentItemIndex - 10;
  }

  let numPreviousItems = 10;
  let startValue = startIndexValue; 

  for (let i = currentItemIndex - 1; i >= currentItemIndex - numPreviousItems; i--) {
    const $image = $('.js-get-resized-image_'+singleImagelinkId+'[data-index="' + [startValue - (currentItemIndex - i)] + '"]');
    if ($image.find('.js-get-resized-image-src').attr('data-src') === '') {
      const photoid = $image.attr('data-photoid');
      const userId = userObject.userId;
      const watermarkVersionId = userObject.watermarkVersionId;
      const watermark = $image.attr('data-watermark');
      const watermarkId = $image.attr('data-watermark_id');
      const photoVersionId = $image.attr('data-photo_versionid');
      ajaxImgProxyUrl(photoid, userId, watermark, watermarkVersionId, watermarkId, photoVersionId, [startValue - (currentItemIndex - i)], proxysingleImagelinkId);
    }
  }
}

Global_Pagebuilder.lightGalleryImgProxyUrl = function(currentIndex, galleryId){
  var total_pagedata = window['total_data_' + galleryId];
  var photoid = total_pagedata[currentIndex].id, userId = userObject.userId, watermarkVersionId = userObject.watermarkVersionId;
  var watermark = total_pagedata[currentIndex].watermark, photoVersionId = Date.parse(total_pagedata[currentIndex].updated_at);
  var slidertype = total_pagedata[currentIndex].type;
  var watermarkId = userObject.watermarkId;
  if(total_pagedata[currentIndex].version == 1){
    watermark = 0;
  }

  var startIndex = currentIndex, endIndex = currentIndex + 10;
  ajaxLightImgProxyUrl = async function (currentIndex, photoid, userId, watermark, watermarkVersionId, watermarkId, photoVersionId, slidertype){
    $.ajax({
      type: 'GET',
      url: userObject.resizedSignedImageUrl + 'resized-signed-image-url/' + userId + '/' + photoid + '?quality=' + userObject.imgQuality + '&watermark=' + watermark + '&watermark-version=' + watermarkVersionId + '&watermark-id=' + watermarkId +'&image-version='+photoVersionId
    }).done(function(data) {
      if(data.status == "success"){
        if(total_pagedata[currentIndex].largepath == ''){

        } else{
          var photo100 = data.photo_100 ?? '/img/text-slide-placeholder.jpg';
          var photo300 = data.photo_300 ?? '/img/text-slide-placeholder.jpg';
          var photo500 = data.photo_500 ?? '/img/text-slide-placeholder.jpg';
          var photo800 = data.photo_800 ?? '/img/text-slide-placeholder.jpg';
          var photo1000 = data.photo_1000 ?? '/img/text-slide-placeholder.jpg';
          var photo1500 = data.photo_1500 ?? '/img/text-slide-placeholder.jpg';
          var photo2048 = data.photo_2048 ?? '';
          var photo2560 = data.photo_2560 ?? '';
          var photoid = data.photo_key;          
          total_pagedata[currentIndex].photo_100 = photo100;
          total_pagedata[currentIndex].photo_500 = photo500;
          total_pagedata[currentIndex].photo_800 = photo800;
          total_pagedata[currentIndex].photo_1200 = photo1000;
          total_pagedata[currentIndex].photo_1500 = photo1500;
          total_pagedata[currentIndex].originalpath = photo2560;
          total_pagedata[currentIndex].largepath = photo2048;
          total_pagedata[currentIndex].thumb = photo100;

          if (total_pagedata[currentIndex].type == 2) {
            if (total_pagedata[currentIndex].largepath != '') {
              total_pagedata[currentIndex].photopath = photo1500;  
            }
          }

          total_pagedata[currentIndex].downloadurl= {
            '500': photo500,
            '1200': photo1000,
            '2000': photo1500,
            'original': photo2560
          }

          // if(userObject.slideshowImageMode == "thumbnail"){
            $('[data-lg-photoitem-id="' + photoid + '"]').attr({
              'src': photo100
            })
          // }

          if ($('[data-id="'+currentIndex+'"]').hasClass('img-notfound')) {
            $('[data-id="' + currentIndex + '"]').find('.lg-image').attr({
              'src': total_pagedata[currentIndex].photo_1500
            })
          }
        }
      }
    })
  }

  for (var i = startIndex; i <= endIndex; i++) {
    if (i >= 0 && i < total_pagedata.length) {
      // if(total_pagedata[i].slidertype == 'imgslide' && (total_pagedata[i].src == '' || total_pagedata[i].src.match != 'web-images' )){
      // if(total_pagedata[i].type == '1' && total_pagedata[i].photo_1200.match(/web-images/) !== null){
      if(total_pagedata[i].photo_1200.match(/web-images/) !== null){
      // } else if(total_pagedata[i].type == '1' ){
      } else {
        let photoid = total_pagedata[i].id, userId = userObject.userId, watermarkVersionId = userObject.watermarkVersionId;
        let watermark = total_pagedata[i].watermark, photoVersionId = Date.parse(total_pagedata[i].updated_at);
        let slidertype = total_pagedata[i].type;
        if(total_pagedata[i].version == 1){
          watermark = 0;
        }
        ajaxLightImgProxyUrl(i, photoid, userId, watermark, watermarkVersionId,watermarkId, photoVersionId, slidertype);
      }
    }
  }

  
  let currentItemIndex = currentIndex;
  if(currentItemIndex < 10){
    startIndexValue = total_pagedata.length;
    endIndexValue = total_pagedata.length - 10;
  } else{
    startIndexValue = currentItemIndex;
    endIndexValue = currentItemIndex - 10;
  }
  let numPreviousItems = 10;
  let startValue = startIndexValue;
  for (let i = currentItemIndex - 1; i >= currentItemIndex - numPreviousItems; i--) {
    // if(total_pagedata[startValue - (currentItemIndex - i)].type == '1' && total_pagedata[startValue - (currentItemIndex - i)].photo_1200.match(/web-images/) !== null){
    let imageIndex = startValue - (currentItemIndex - i);
    if(total_pagedata[i] != undefined){
      if(total_pagedata[imageIndex].photo_1200 && total_pagedata[imageIndex].photo_1200.match(/web-images/) !== null){
        var thumbid = total_pagedata[imageIndex].id;
        $('[data-lg-photoitem-id="' + thumbid + '"]').attr({
          'src': total_pagedata[imageIndex].photo_100
        })
      // } else if(total_pagedata[imageIndex].type == '1' ){
      } else {
        let photoid = total_pagedata[imageIndex].id, userId = userObject.userId, watermarkVersionId = userObject.watermarkVersionId, watermarkId = userObject.watermarkId;
        let watermark = total_pagedata[imageIndex].watermark, photoVersionId = Date.parse(total_pagedata[imageIndex].updated_at);
        let slidertype = total_pagedata[imageIndex].type;
        if(total_pagedata[imageIndex].version == 1){
          watermark = 0;
        }
        ajaxLightImgProxyUrl([imageIndex], photoid, userId, watermark, watermarkVersionId, watermarkId, photoVersionId, slidertype);
      }
    }
  } 
}

Global_Pagebuilder.getListItemCommonResizedPhotos = function(classname) {
  $(classname).each(function(index, photoElement) {
    var $photoElement = $(photoElement);
    var photoid = $photoElement.data('photoid');
    var userId = userObject.userId;
    var photoVersionId = $photoElement.data('photo_versionid');
    var watermark = $photoElement.data('watermark');
    var watermarkVersionId = $photoElement.data('watermark_versionid');
    var watermarkId = $photoElement.data('watermark_id');
    var listItemType = $photoElement.data('listitemtype');
    var ajaxUrldataType = getAjaxUrlDataType(listItemType);
    Global_Pagebuilder.getListItemResizedPhotos(userId, photoid, watermark, watermarkVersionId, watermarkId, photoVersionId, listItemType, ajaxUrldataType);

    if(ajaxUrldataType == 'primary-list-item-image'){
      ajaxUrldataType = listItemType = 'secondary-list-item-image';
      Global_Pagebuilder.getListItemResizedPhotos(userId, photoid, watermark, watermarkVersionId, watermarkId, photoVersionId, listItemType, ajaxUrldataType);
    }
  });

  function getAjaxUrlDataType(listItemType) {
    var validTypes = ['primary-info-item-image', 'secondary-info-item-image', 'cover-image-mobile', 'cover-image', 'featured-image', 'store-product-image', 'primary-list-item-image'];
    return validTypes.includes(listItemType) ? listItemType : 'list-item-image';
  }
}

Global_Pagebuilder.getListItemResizedPhotos = function (userId, photoid, watermark, watermarkVersionId, watermarkId, photoVersionId, dataType, ajaxUrldataType) {
  $.ajax({
    type: 'GET',
    url: userObject.resizedSignedImageUrl + 'resized-signed-image-url/' + userId + '/' + photoid + '?quality=' + userObject.imgQuality + '&watermark=' + watermark + '&watermark-version=' + watermarkVersionId + '&watermark-id=' + watermarkId +'&image-version='+photoVersionId+'&type='+ajaxUrldataType
  }).done(function(data) {
    if(data.status == "success"){
      var photo100 = data.photo_100 ?? '';
      var photo500 = data.photo_500 ?? '';
      var photo300 = data.photo_300 ?? '';
      var photo800 = data.photo_800 ?? '';
      var photo1000 = data.photo_1000 ?? '';
      var photo1500 = data.photo_1500 ?? '';
      var photo2048 = data.photo_2048 ?? '';
      var photo2560 = data.photo_2560 ?? '';
      if(photo2560 == ''){
        photo2560 = photo2048
      }
      var photoid = data.photo_key;
      // dataType = dataType.trim();
      
      if (dataType == 'primary-info-item-image' || dataType == 'secondary-info-item-image' || dataType == 'featured-image') {
        $('[data-key="' + photoid + '"][data-listitemtype="'+dataType+'"]').find('.js-get-resized-image-src').attr({
          'src': photo500,
          'data-src': photo800,
          'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });

        if (dataType == 'featured-image' || dataType == 'primary-info-item-image') {
          $('[data-key="' + photoid + '"][data-listitemtype="'+dataType+'"]').find('.post_photo.js-get-resized-image-src').css({
            'background-image': 'url('+photo2560 +')'
          });
        }

        $('[data-key="' + photoid + '"][data-listitemtype="'+dataType+'"]').find('.js-get-resized-image-src.js-beforeafter-imgsrc').attr({
          'data-src': photo2048,
          'src': photo2048
        });

        $('.js-beforeafter-griditem').addClass('js-before_after_slider'); 


      } else if(dataType == 'store-product-image'){
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
          'src': photo500,
          'data-src': photo800,
          'data-fotourl': photo800,
          'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src.js-thumbnail-items-img').attr({
          'data-src': photo100,
          'src': photo100,
          'data-mainimage': photo800,
          'data-largeimage': photo2048,
          'data-srcset': ''
        });  
      } else if(dataType == 'cover-image' || dataType == 'cover-image-mobile'){
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
          'src': photo2560,
          'data-src': photo800,
          'data-fotourl': photo1000,
          'data-srcset': photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });

      } else if(dataType == 'primary-list-item-image' || dataType == 'secondary-list-item-image'){
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src[data-listitemtype="'+dataType+'"]').attr({
          'src': photo500,
          'data-src': photo800,
          'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });
      } else {
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').attr({
          'src': photo500,
          'data-src': photo800,
          'data-srcset': photo300+' 300w, ' +photo500+' 500w, '+ photo800 +' 800w,'+ photo1000 +' 1000w,'+ photo1500 +' 1500w,' + photo2048 +' 2048w,' + photo2560 +' 2560w',
        });  
      }
      
      if (dataType == 'image_with_text_fullwidth') { // only for background image only
        $('[data-key="' + photoid + '"].js-grid_bg-img').css({
          'background-image': 'url('+photo2560 +')'
        });
      }

      if($('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').hasClass('img_below_640')){
        $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').addClass('imgload');
      } else {
        if(dataType == 'cover-image' || dataType == 'cover-image-mobile'){
          var focusPointClassX = $('[data-key="' + photoid + '"]').attr('data-focus-x')
          var focusPointClassY = $('[data-key="' + photoid + '"]').attr('data-focus-y')
          var lazyloadClass = $('[data-key="' + photoid + '"]').attr('data-lazyload');
          if((focusPointClassX == '0.000000' && focusPointClassY  == '0.000000') || (focusPointClassX == '0' && focusPointClassY  == '0') ){
            // $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').addClass('lazyload');
            if(lazyloadClass == 'fitwidth'){
              $('[data-key="' + photoid + '"][data-lazyload="fitwidth"]').removeClass('donotapplyfcspnt');
            } else {
              $('[data-key="' + photoid + '"]').addClass('donotapplyfcspnt');
            }
            $('[data-key="' + photoid + '"][data-lazyload="fitwidth"]').find('.js-get-resized-image-src').addClass('lazyload');
            $('[data-key="' + photoid + '"]').removeClass('focuspoint');
          } else{
            $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').removeClass('lazyload');  
            $('.focuspoint').focusPoint()
          }      
        } else{
          $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').addClass('lazyload');  
        }        
        // $('[data-key="' + photoid + '"]').find('.js-get-resized-image-src').addClass('lazyload');        
      }
      
      $('[data-key="' + photoid + '"]').find('.lazy-infinte-loader').remove();
    }
  })
}