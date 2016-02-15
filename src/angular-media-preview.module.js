angular.module('angular-media-preview', [])

.directive('mediaPreview', mediaPreview);

mediaPreview.$inject = ['$log', '$document'];

function mediaPreview($log,$document) {

  var directive = {
    restrict: 'A',
    require: 'ngModel',
    link: _link
  }

  return directive;

  function _link(scope, elem, attrs, ngModel) {

    // check if valid input element
    if( elem[0].nodeName.toLowerCase() !== 'input' ) {
      $log.warn('mediaPreview:', 'The directive will work only for input element, actual element is a', elem[0].nodeName.toLowerCase());
      return;
    }

    // check if valid input type file
    if( attrs.type != 'file' ) {
      $log.warn('mediaPreview:', 'Expected input type file, received instead:', attrs.type, 'on element:', elem);
      return;
    }

    // set all media type if nothing is specified
    if( !elem.attr('accept') ) {
      elem.attr('accept', 'image/*,video/*,audio/*');
    }

    // the preview container
    var container;

    // get custom class or set default
    var previewClass = attrs.previewClass || 'media-preview';

    // get custom class or set default
    var containerClass = attrs.containerClass || 'media-container';

    // as default if nothing is specified or
    // the element specified is not a valid html
    // element: create the default media container
    // and append before input element
    if( !attrs.previewContainer || ( !document.getElementById(attrs.previewContainer) && !angular.isElement(attrs.previewContainer) ) ) {

      // create container
      container = angular.element( document.createElement('div') );

      // append before elem
      elem.parent()[0].insertBefore(container[0], elem[0]);

    } else {

      // get the container
      container = angular.isElement(attrs.previewContainer) ? attrs.previewContainer : angular.element(document.getElementById(attrs.previewContainer));
    }

    // add default class
    container.addClass(containerClass);

    // listen for input change
    elem.on('change', function(e) {

      // get files
      var files = elem[0].files;

      // update model value
      attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);

      // reset container
      container.empty();

      // check if there are files to read
      if( files && files.length ) {

        // start the load process for each file
        angular.forEach(files, function(key, index) {

          // init filereader
          var reader = new FileReader();

          // the element to append
          var media_element;

          // when item data is ready
          // check if valid type
          reader.onload = function(e) {

            // get src
            var result = e.target.result;

            // if audio
            if( result.indexOf('data:audio') > -1 ) {
              media_element = angular.element( document.createElement('audio') );
              media_element.addClass(previewClass);
              media_element.attr('controls', 'true');
              return container.append( media_element );
            }

            // if image
            if( result.indexOf('data:image') > -1 ) {
              media_element = angular.element( document.createElement('img') );
              media_element.addClass(previewClass);
              return container.append( media_element );
            }

            // if video
            if( result.indexOf('data:video') > -1 ) {
              media_element = angular.element( document.createElement('video') );
              media_element.addClass(previewClass);
              media_element.attr('controls', 'true');
              return container.append( media_element );
            }

          }

          // when media is loaded finally add
          // source to element
          reader.onloadend = function(e) {
            return media_element.attr('src', e.target.result)
          }

          // read file
          reader.readAsDataURL( key );
        })

      }

    })

  }

}
