# angular-media-preview
Don't let your users upload the wrong media! 

## [DEMO](http://www.codekraft.it/demos/angular-media-preview/)

### Getting started:
Download it using npm with the following command:
```bash
npm i angular-media-preview
```
or clone it from GitHub.

Add the script to your HTML page:
```html
<script type="text/javascript" src="angular-media-preview.module.js"></script>
```
and add the module to your app dependencies:

```javascript
angular.module('app', ['angular-media-preview')
```
and you are ready to use the new directive.

---

### Basic usage:

Add the directive to the input where you want to preview media files.

```html
<!-- without ng-model -->
<media-preview></media-preview>

<!-- with ng-model -->
<media-preview model="myModel"></media-preview>
```

Now when some files are selected, the directive will create a preview and display (by default) in a container above the input tag.

You can specify a custom container using the attribute __preview-container__ in the directive. You can use in the attribute both a HTML element or a ID that refers to it.

If the **image load fails** the module will use a default icon, called "broken image" taken from Google Icons under the [CC-BY License](https://creativecommons.org/licenses/by/4.0/).

#### Passing element ID:

```html
<media-preview preview-class="img-thumbnail" preview-container="mediaHere" multiple></media-preview>
<div id="myContainer"></div>
```

#### Passing a $scope HTML element:

If you want you can  pass a HTML Element created in the $scope:

```javascript
app.controller('MainCtrl', function($scope) {
  $scope.theContainer = angular.element(document.createElement('div'));
  $scope.theContainer.addClass('myClass');
})
```
and in the HTML template:
```html
<media-preview ng-model="myUpload" preview-container="theContainer"></media-preview>
```

The directive will add or override if not found the input __accept__ attribute to match only the following accepted media types: audio files, images, videos.

And __that's it__, you can try it in the demo page.

---

#### Customizations:
* __preview-container__: the container that holds the preview elements
* __container-class__: the class to be added to the preview container
* __preview-class__: the class to be added to the preview element
* __multiple__: specify when the input should accept multiple files

---

__The directive takes care to update your model value on change, so you don't have to write your own one.__
See the issue: [#1375](https://github.com/angular/angular.js/issues/1375)
