# angular-media-preview
### display your images before upload it

**Getting starteed:**

Change to the directive file with your module appname.

```javascript
angular.module('myApp')

  .directive(...)
```
and load the script it in your HTML.
```html
<script type="text/javascript" src="mediapreview.directive.js"></script>
```
Add the directive to every input you want to create a preview.

```html
<input type="file" ng-model="myUpload" media-preview>
```

it works with multiple files too, by adding multiple attribute:
```html
<input type="file" ng-model="mySecondUpload" multiple media-preview>
```
The directive will add the accept attribute to match only the default accepted media types, for now: image, videos.

And that's it, with this basic configuration the directive will create a preview container right above the input.

If you want you can specify the preview-container like so, anywhere in the page where you want to show it, and override the default style created by the directive adding to it a custom class name!
```html
<input type="file" ng-model="againUpload" media-preview>

<div id="againUpload-preview" class="my-preview"></div>

```
And in the css:
```css
.my-preview {}

.my-preview img,video {}
```
__IMPORTANT: be sure to have a ng-model bind to your input, otherwise the directive will not work!__

The directive takes care to update your model value, so you don't have to write your own one.

Check the [example](https://github.com/codekraft-studio/angular-media-preview/tree/master/example) too see how it works!

Developed by Filippo Conti - [codekraft-studio](http://codekraft.it)
