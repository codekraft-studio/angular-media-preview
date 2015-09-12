# angular-media-preview
### display your images before upload it
you will never upload the wrong image again!

Simply copy and paste the directive to use it in your application.

```javascript
angular.module('myApp', []).
  directive(...)
```
and add to your html template the directive in every input file where you want to use it:

```html
<input type="file" ng-model="myUpload" media-preview>
```

it works with multiple files too:
```html
<input type="file" ng-model="mySecondUpload" accept="image/*" multiple media-preview>
```
The directive will add the default accept attribute to the default accepted parameters.

If you want you can add also the preview-container div like so, anywhere in the page where you want to show it!
```html
<input type="file" ng-model="againUpload" media-preview>

<div id="againUpload-preview"></div>

```
__IMPORTANT: be sure to use the ngModel name you want to bind the preview container!__

The application will add it anyway but you can customize it to fit your needs!

The directive takes care to update your model value, too!

Developed by Filippo Conti - [codekraft-studio](http://codekraft.it)
