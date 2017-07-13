/**
* Package: angular-media-preview - v0.1.1 
* Description: Don't let your users upload the wrong media! 
* Last build: 2017-07-13 
* @author codekraft-studio 
* @license ISC 
*/
angular.module('angular-media-preview', [])

angular.module('angular-media-preview')

.directive('mediaPreview', function($log, $document, $compile) {
  
  var directive = {
    restrict: 'EA',

    require: '?ngModel',
    scope: { model: '=?' },
    link: {
      pre: _preLink,
      post: _postLink
    }
  }
  
  return directive;
  
  function _preLink(scope, elem) {
    
    var template = '<input type="file" accept="image/*,video/*,audio/*" ng-model="model" /><input type="button" ng-click="clearPreview()" value="X" />';
    
    if( elem[0].nodeName.toLowerCase() !== 'input' || elem.attr('type') !== 'file' ) {
    
      elem.empty().append( $compile(template)(scope) );
      
    }
    
  }
  
  function _postLink(scope, elem, attrs, ctrl) {

    var isInputFile = (elem[0].nodeName.toLowerCase() === 'input' && elem.attr('type') === 'file');
    
    var $input = isInputFile ? elem : angular.element( elem.children().eq(0) );;
    
    // get the model controller
    var ngModel = $input.controller('ngModel');
    
    // the preview container
    var container;
    
    var fallbackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA00lEQVR4Ae2XwQqDQAxEveinFD9e2MUfq6Cep7GnrPAg1JVCu5OTvEwe9FLtWlpqR6OyVn2aXbNGdX6KB4OLrmbRyIKsGsksWKsINhbUShM0wVcEk43CnAVY722mMEfBhPWD9mGOAlvBepSDwK1gPc5LASp8fbCJ81KACl9PNkOYo8CfKOtHUpijwJ841y1xToJy5VxXnLPgvUL1OAeBW4F6kKPAnYB6jKPAnYA68PZ/8EOCJtjvfvmdqwjSvR8gTz1YcCiytgs/TvLnvaDi/J2gCV63ZgZdEb12DwAAAABJRU5ErkJggg==";
    
    // get custom class or set default
    var previewClass = attrs.previewClass || 'media-preview';
    
    // get custom class or set default
    var containerClass = attrs.containerClass || 'media-container';
    
    if( !isInputFile && typeof attrs.multiple !== 'undefined' && attrs.multiple != 'false' ) {
      $input.attr('multiple', true);
    }
    
    // as default if nothing is specified or
    // the element specified is not a valid html
    // element: create the default media container
    // and append before input element
    if( !attrs.previewContainer || ( !document.getElementById(attrs.previewContainer) && !angular.isElement(attrs.previewContainer) ) ) {
      
      // create container
      container = angular.element( document.createElement('div') );
      
      if( isInputFile ) {
        
        // append before elem
        elem.parent()[0].insertBefore(container[0], elem[0]);
        
      } else {
        
        // append before elem
        elem.prepend(container[0]);
        
      }
      
    } else {
      
      // get the container
      container = angular.isElement(attrs.previewContainer) ? attrs.previewContainer : angular.element(document.getElementById(attrs.previewContainer));
    
    }
    
    // add default class
    container.addClass(containerClass);
    
    // the change function
    function onChange(e) {
      
      // get files from target
      var files = $input[0].files;
      
      if( ngModel ) {
        
        // update model value
        attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);
        
      }
      
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
            // add the element class
            $mediaElement.addClass(previewClass);
            // append to the preview container
            container.append( $mediaElement );
            
          }
          
          // read file
          $reader.readAsDataURL( data );
          
        });
        
      }
      
    }
    
    // clear the preview and the input on click
    scope.clearPreview = function () {
            // clear the input value
      $input.val('');
      // reset container
      container.empty();
    }
    
    // bind change event
    elem.on('change', onChange);
    
    // unbind event listener to prevent memory leaks
    scope.$on('$destroy', function () {
      elem.off('change', onChange);
    });
    
  }
  
});
