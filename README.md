# angular-image-preview
### display your images before upload it
you will never upload the wrong image again!

Simply copy and paste the directive to use it in your application.

```javascript
angular.module('myApp', []).
  directive(...)
```
and add to your html template the directive in every input file where you want to use it:

```html
<input type="file" ng-model="myUpload" image-preview>
```

it works with multiple files too:
```html
<input type="file" ng-model="mySecondUpload" accept="image/*" multiple image-preview>
```

The directive takes care to update your model value, too!

Developed by Filippo Conti - [codekraft-studio](http://codekraft.it)
