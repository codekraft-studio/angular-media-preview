# angular-media-preview
create a preview for each media file given in input

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
and you are ready to go.

---

### Basic usage:

Add the directive to the input where you want to preview media files.

```html
<input type="file" ng-model="myUpload" media-preview>
```

Now when some files are selected, the directive will create a preview and display (by default) in a container above the input tag.

You can specify a custom container using the attribute __preview-container__ in the directive. You can use in the attribute both a HTML element or a ID that refers to it.

#### Passing element ID

```html
<input type="file" ng-model="myUpload" preview-container="myContainer" media-preview>

<div id="myContainer"></div>
```

#### Passing a $scope HTML element

If you want to pass a element from the $scope:

```javascript
app.controller('MainCtrl', function($scope) {
  $scope.theContainer = angular.element(document.createElement('div'));
  $scope.theContainer.addClass('myClass');
})
```
and in the HTML template:
```html
<input type="file" ng-model="myUpload" preview-container="theContainer" media-preview>
```

The directive will add or override if not found the input __accept__ attribute to match only the following accepted media types: audio files, images, videos.

And __that's it__, you can try it in the demo page.

---

#### Customizations:
* __preview-container__: the container that holds the preview elements
* __container-class__: the class to be added to the preview container
* __preview-class__: the class to be added to the preview element

```html
<input type="file" ng-model="myFile" preview-class="my-preview" media-preview>
```

---

__IMPORTANT: be sure to have a model bind to your input (attribute ng-model), otherwise the directive will not work!__

__The directive takes care to update your model value on change, so you don't have to write your own one.__
See the issue: [#1375](https://github.com/angular/angular.js/issues/1375)
