(function(define) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([
      'components/ui/util/ui-component'
    ],
    function(
      UIComponent
    ) {

      var UIDraggableDirective = function($document) {
        // Returns Directive Creation Object
        return {
          restrict: 'A',
          requires: 'ngModel',
          scope: {
            uiOptions: '=ngModel'
          },
          link: {
            pre: function(scope, elem, attrs) {
              // Before child scopes have been linked
            },
            post: function(scope, elem, attrs) {

              var startX,
                startY,
                newX,
                newY,
                joystickPos,
                target,
                start,
                stop,
                drag,
                component,
                parentTransform,
                containerTransform,
                touchItem,
                handle = elem.find('div');

              // Obtain drag options

              if (scope.uiOptions) {

                start = scope.uiOptions.onStart;
                drag = scope.uiOptions.onDrag;
                stop = scope.uiOptions.onStop;
                component = new UIComponent(scope.uiOptions.node, handle[0]);

              }

              elem[0].parentNode.parentNode.parentNode.parentNode.addEventListener('touchstart', function(ev){
                ev.preventDefault();
              });
              // Bind mousedown event

              var mousedown = function(e) {
                e.preventDefault();

                startX = e.clientX - elem[0].offsetLeft;
                startY = e.clientY - elem[0].offsetTop;

                if('ontouchstart' in document.documentElement) {
                  elem[0].addEventListener('touchmove', mousemove);
                  elem[0].addEventListener('touchend', mouseup);
                } else {
                  elem.on('mousemove', mousemove);
                  elem.on('mouseup', mouseup);
                }

                if('ontouchstart' in document.documentElement) {
                  e.preventDefault();
                  if ( touchItem === undefined ) {
                    touchItem = e.touches.length - 1; // make this touch = the latest touch in the touches list instead of using event
                  }
                  containerTransform = elem[0].parentNode.parentNode.parentNode.parentNode.style.transform.split(',');
                  parentTransform = elem[0].parentNode.parentNode.parentNode.style.transform.split(',');
                  newX = e.touches[touchItem].pageX -
                          (parseInt(parentTransform[12].trim()) +
                          parseInt(containerTransform[12].trim())) -
                          (handle[0].clientWidth / 2);
                  newY = e.touches[touchItem].pageY -
                        (parseInt(parentTransform[13].trim()) +
                        parseInt(containerTransform[13].trim())) -
                        (handle[0].clientWidth / 2);
                } else {

                  newX = e.offsetX;
                  newY = e.offsetY;

                }

                setPosition(newX, newY);


                if (start) {
                  start(e);
                }

              };

              // Handle drag event
              var mousemove = function(e) {
                if( scope.uiOptions.orient === 'is--joystick' ) {
                  elem[0].parentNode.style.cursor = 'url("/assets/ui/slider-control-icon-transparent-cursor.png") 0 0, pointer';
                }
                elem[0].parentNode.style.border = '1px solid rgba(255,255,255,0.3)';

                if(e.target === elem[0]){
                  if('ontouchstart' in document.documentElement) {
                    e.preventDefault();
                    if ( touchItem === undefined ) {
                      touchItem = e.touches.length - 1; // make this touch = the latest touch in the touches list instead of using event
                    }
                    containerTransform = elem[0].parentNode.parentNode.parentNode.parentNode.style.transform.split(',');
                    parentTransform = elem[0].parentNode.parentNode.parentNode.style.transform.split(',');
                    newX = e.touches[touchItem].pageX -
                            (parseInt(parentTransform[12].trim()) +
                            parseInt(containerTransform[12].trim())) -
                            (handle[0].clientWidth / 2);
                    newY = e.touches[touchItem].pageY -
                          (parseInt(parentTransform[13].trim()) +
                          parseInt(containerTransform[13].trim())) -
                          (handle[0].clientWidth / 2);
                  } else {

                    newX = e.offsetX;
                    newY = e.offsetY;

                  }
                  setPosition(newX, newY);

                  if( scope.uiOptions.orient === 'is--hor' ) {
                    scope.uiOptions.currentValue = scale(newX, 0, elem[0].clientWidth - 44, scope.uiOptions.min, scope.uiOptions.max);
                  }
                  if( scope.uiOptions.orient === 'is--vert' ) {
                    scope.uiOptions.currentValue = scale(newY, 0, elem[0].clientHeight - 44, scope.uiOptions.min, scope.uiOptions.max);
                  }
                  if( scope.uiOptions.orient === 'is--joystick' ) {
                    scope.uiOptions.currentValue = [scale(newX, 0, elem[0].clientWidth - 44, scope.uiOptions.min[0], scope.uiOptions.max[0]),
                                              scale(newY, 0, elem[0].clientHeight - 44, scope.uiOptions.min[1], scope.uiOptions.max[1])];
                  }
                  if (drag) {
                    drag(e,scope.uiOptions.currentValue, e.timeStamp);
                  }
                }
              };


              // Unbind drag events
              var mouseup = function(e) {

                elem[0].parentNode.style.cursor = 'url("/assets/ui/slider-control-icon-transparent-cursor.png") 22 22, pointer';
                elem[0].parentNode.style.border = '1px solid rgba(255,255,255,0.2)';

                if('ontouchstart' in document.documentElement) {
                  touchItem = undefined;
                } else {
                  elem.unbind('mousemove', mousemove);
                  elem.unbind('mouseup', mouseup);
                }

                if (stop) {
                  stop(e);
                }
              };

              // Get Center of Circle
              var getCenter = function(xRange, yRange) {

                var cX = xRange[1] - ((xRange[1] - xRange[0]) / 2);
                var cY = yRange[1] - ((yRange[1] - yRange[0]) / 2);
                return [cX, cY];

              };

              // Distance Between Two Points
              var distance = function(dot1, dot2) {
                var x1 = dot1[0],
                  y1 = dot1[1],
                  x2 = dot2[0],
                  y2 = dot2[1];
                return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
              };

              // convert between two ranges, for outputting user value

              var scale = function(v, min, max, gmin, gmax) {

                return ((v - min) / (max - min)) * (gmax - gmin) + gmin;

              };

              // Find if cursor is within radius of elem
              var circularBounds = function(x, y, xRange, yRange) {

                var center = getCenter(xRange, yRange);
                var dist = distance([x, y], center);
                var radius = xRange[1] - center[0];

                if (dist <= radius) {

                  return [x, y];
                } else {
                  x = x - center[0];
                  y = y - center[1];
                  var radians = Math.atan2(y, x);
                  return [Math.cos(radians) * radius + center[0], Math.sin(radians) * radius + center[1]];

                }

              };

              var clamp = function(value, range) {
                return Math.max(Math.min(value, range[1]), range[0]);
              };

              // Move ui--slider-handle, within elem
              var setPosition = function(x, y) {

                  if (scope.uiOptions.orient === 'is--joystick') {

                    if (x <= 0) {
                      newX = 0;
                    } else if (x > 200) {
                      newX = 200;
                    } else {
                      newX = x;
                    }

                    if (y <= 0) {
                      newY = 0;
                    } else if (y > 200) {
                      newY = 200;
                    } else {
                      newY = y;
                    }

                    joystickPos = circularBounds(newX, newY, [0, 200 - handle[0].offsetWidth], [0, 200 - handle[0].offsetHeight]);
                    newX = clamp(joystickPos[0], [0, 200 - handle[0].offsetWidth]);
                    newY = clamp(joystickPos[1], [0, 200 - handle[0].offsetHeight]);

                    scope.uiOptions.node.translate = [newX, newY, 1];
                    //TODO: figure out why width and height need to be hardcoded.

                  } else {

                    if (x <= 0) {
                      newX = 0;
                    } else if (x > elem[0].clientWidth - handle[0].offsetWidth) {
                      newX = elem[0].clientWidth - handle[0].offsetWidth;
                    } else {
                      newX = x;
                    }

                    if (y <= 0) {
                      newY = 0;
                    } else if (y > elem[0].clientHeight - handle[0].offsetHeight) {
                      newY = elem[0].clientHeight - handle[0].offsetHeight;
                    } else {
                      newY = y;
                    }

                    scope.uiOptions.node.translate = [newX, newY, 1];
                  }


              };


              if('ontouchstart' in document.documentElement) {
                // handle.on('touchstart', mousedown);
                elem[0].addEventListener('touchmove', mousemove);
                elem[0].addEventListener('touchend', mouseup);
              } else {
                // handle.on('mousedown', mousedown);
                elem.on('mousedown', mousedown);
                elem[0].addEventListener('touchstart', mousedown);
              }

              //TODO: Handle Touch Events

              if (scope.uiOptions.orient === 'is--joystick') {
                setPosition(100 - ( handle[0].offsetWidth / 2 ), 100 - ( handle[0].offsetHeight / 2 ));
              }

            },
          }
        };
      }; // End Directive def


      // If Using Angular Dep Injection
      return ['$document', UIDraggableDirective];

    } // end require function
  ); // end define call

}(define));
