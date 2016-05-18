.directive('mediaPreview', function($log, $document) {

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

    var fallbackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA00lEQVR4Ae2XwQqDQAxEveinFD9e2MUfq6Cep7GnrPAg1JVCu5OTvEwe9FLtWlpqR6OyVn2aXbNGdX6KB4OLrmbRyIKsGsksWKsINhbUShM0wVcEk43CnAVY722mMEfBhPWD9mGOAlvBepSDwK1gPc5LASp8fbCJ81KACl9PNkOYo8CfKOtHUpijwJ841y1xToJy5VxXnLPgvUL1OAeBW4F6kKPAnYB6jKPAnYA68PZ/8EOCJtjvfvmdqwjSvR8gTz1YcCiytgs/TvLnvaDi/J2gCV63ZgZdEb12DwAAAABJRU5ErkJggg==";

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

    // add element to the container
    function addToContainer(element) {
      element.addClass(previewClass);
      return container.append( element );
    }

    // the change function
    function onChange(e) {

      // get files
      var files = elem[0].files;

      // update model value
      attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);

      // reset container
      container.empty();

      // check if there are files to read
      if( files && files.length ) {

        // start the load process for each file
        angular.forEach(files, function(data, index) {

          // init variables
          var $reader = new FileReader(), result, $mediaElement;

          // set fallback image on error
          $reader.onloaderror = function (e) {
            result = fallbackImage;
          }

          // set resulting image
          $reader.onload = function (e) {
            result = e.target.result;
          }

          // when file reader has finished
          // add the source to element and append it
          $reader.onloadend = function(e) {

            // if audio
            if( result.indexOf('data:audio') > -1 ) {

              $mediaElement = angular.element( document.createElement('audio') );
              $mediaElement.attr('controls', 'true');

            } else if( result.indexOf('data:video') > -1 ) {

              $mediaElement = angular.element( document.createElement('video') );
              $mediaElement.attr('controls', 'true');

            } else {

              $mediaElement = angular.element( document.createElement('img') );

            }

            // add the source
            $mediaElement.attr('src', result);

            // finally add to the container
            return addToContainer( $mediaElement );
          }

          // read file
          $reader.readAsDataURL( data );
        })

      }

    }

    // bind change event
    elem.on('change', onChange)

    // unbind event listener to prevent memory leaks
    scope.$on('$destroy', function () {
      elem.off('change', onChange);
    })

  }

});
