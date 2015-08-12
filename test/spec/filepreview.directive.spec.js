describe("Directive:", function () {

  var element;
  var compiler;
  var rootScope;

  beforeEach(function () {
    module('app');
  });

  beforeEach(function () {

    inject(function(_$compile_, _$rootScope_) {
        compiler = _$compile_;
        rootScope = _$rootScope_;
    })

    element = compiler('<input type="file" ng-model="myInput" image-preview>')(rootScope);
    rootScope.$digest();

  });

  it("should contain a ng-model attribute", function () {
    expect(element.attr('ng-model')).toEqual('myInput');
  });

  it("should create a preview div if not exist ", function () {

    var container = angular.element( element[0].previousSibling );

    expect(element[0].previousSibling).toBeDefined();
    expect(container.attr('id')).toEqual('myInput-preview')

  });


});
