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

      function setDefaultStyle(elem) {
        elem.style.margin = '2%';
        elem.style.width = '25%';
        elem.style.height = 'auto';
        elem.style.boxShadow = '0 0 0 4px white, 0px 1px 7px 4px rgba(0, 0, 0, 0.15), 0px 0px';
        return elem;
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

              var img = document.createElement('img');
              // set item default style
              setDefaultStyle(img);
              // set item src url
              img.src = e.target.result;

              container[0].appendChild( img );

            } else {

              if( e.target.result.indexOf('data:image') > -1 ) {
                var img = document.createElement('img');
                // set item default style
                setDefaultStyle(img);
                // set item src url
                img.src = e.target.result;

                container[0].appendChild( img );
              }

              if( e.target.result.indexOf('data:video') > -1 ) {
                var video = document.createElement('video');
                // set default item style
                setDefaultStyle(video);
                // set source url
                video.src = e.target.result;
                // create video controls
                video.setAttribute('controls', true);
                container[0].appendChild(video);
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
            // create preview container element
            container = angular.element( document.createElement('div') );
            // set container id
            container[0].id = id;
            // append before his related input
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
