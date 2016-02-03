# angular-media-preview
### create a preview for each selected file

**Getting started:**

Change to the directive file with your module appname.

```javascript
angular.module('myApp')

  .directive(...)
```
and load the script it in your HTML.
```html
<script type="text/javascript" src="mediapreview.directive.js"></script>
```

**Basic setup:**

Add the directive to input where you want to listen.

```html
<input type="file" ng-model="myUpload" media-preview>
```
Now when some files are selected, the directive will create a preview and display in a container.
You can specify a custom container adding the attribute: __preview-container__, like so:
```html
<input type="file" ng-model="myUpload" preview-container="myContainer" media-preview>
```

The directive will add or override the __accept__ attribute to match only the following accepted media types: audio, image, videos.

And that's it, with this basic configuration you can start trying it by selecting some media file on your computer.

**Customizations:**
* __preview-container__: the container that holds the preview elements
* __container-class__: the class to be added to the preview container
* __preview-class__: the class to be added to the preview element

If one of the attributes above is specified will override the default behaviours.

__IMPORTANT: be sure to have a model bind to your input (attribute ng-model), otherwise the directive will not work!__

__The directive takes care to update your model value, so you don't have to write your own one.__

Check the [example](https://github.com/codekraft-studio/angular-media-preview/tree/master/example) too see how it works!

Developed by [codekraft-studio](http://codekraft.it)
