angular.module('app').

  directive('imagePreview', imagePreview);

  function imagePreview() {

    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    }

    return directive;

    function link(scope, element, attrs, ngModel) {

      var id = attrs.ngModel + '-preview';

      // create file reader
      var reader = new FileReader();

      // create preview image element
      function createPreview(src) {
        var img = angular.element( document.createElement('img') );
        img[0].src = src;
        img[0].style.margin = '2%';
        img[0].style.height = 'auto';
        img[0].style.width = '25%';
        img[0].style.boxShadow = '0 0 0 4px white, 0px 1px 7px 4px rgba(0, 0, 0, 0.15), 0px 0px';
        return img[0];
      }

      // check for child nodes
      function hasNodes(element) {
        return (element.childNodes.length);
      }

      // during change event
      element.on('change', function(e) {

        // set model view value
        attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);

        // get element if present
        var container = angular.element( document.getElementById(id) );
        // reset item count
        var count = 0;
        // get files
        var files = element[0].files;

        reader.onload = function(e) {

          scope.$apply(function(){

            if( attrs.accept && attrs.accept.indexOf('image/*') > -1 ) {

              container[0].appendChild( createPreview(e.target.result) );

            } else {

              if( e.target.result.indexOf('data:image') > -1 ) {
                container[0].appendChild( createPreview(e.target.result) );
              }

            }

          })

        }

        reader.onloadend = function() {
          scope.$apply(function() {
            if( count < (files.length-1) ) {
              // increase count
              count++;
              // read next file
              return reader.readAsDataURL( files[count] );
            }
          })
        }

        // check if there are files to read
        if( files && files.length ) {

          // add preview container if is not present
          if( !container.length ) {
            container = angular.element( document.createElement('div') );
            container[0].id = id;
            element[0].parentNode.insertBefore(container[0], element[0]);
          }

          // reset container
          container[0].innerHTML = '';

          // read element data url
          reader.readAsDataURL( files[count] );

        } else {

          if( hasNodes( container[0] ) ) {
            container[0].innerHTML = '';
          }

        }
      })

    }

  }
