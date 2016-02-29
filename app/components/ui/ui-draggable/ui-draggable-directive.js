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
          scope: {
            uiOptions: '=uiDraggable'
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
                start,
                stop,
                drag,
                handle = elem.find('div'),
                node = {
                  origin: [0.0, 0.0, 0.0],
                  translate: [0.0, 0.0, 0.0],
                  size: [44, 44, 1.0],
                  scale: [1.0, 1.0, 1.0],
                  rotate: [0, 0, 0],
                  opacity: 0.3
                },
                component = new UIComponent(node, handle[0]);

              // Obtain drag options
              if (scope.uiOptions) {

                start = scope.uiOptions.start;
                drag = scope.uiOptions.drag;
                stop = scope.uiOptions.stop;

              }

              // Bind mousedown event

              var mousedown = function(e) {
                e.preventDefault();
                startX = e.clientX - elem[0].offsetLeft;
                startY = e.clientY - elem[0].offsetTop;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                if (start) {
                  start(e);
                }
              };

              // Handle drag event
              var mousemove = function(e) {
                setPosition(e.clientX - startX, e.clientY - startY);
                if (drag) {
                  drag(e);
                }
              };

              // Unbind drag events
              var mouseup = function(e) {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
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

              // Move ui--slider-handle, within elem
              var setPosition = function(x, y) {

                if (scope.uiOptions.orient === 'is--joystick') {

                  joystickPos = circularBounds(x, y, [0, elem[0].clientWidth - handle[0].offsetWidth], [0, elem[0].clientHeight - handle[0].offsetHeight]);
                  node.translate = [joystickPos[0], joystickPos[1], 1];

                } else {

                  if (x < 0) {
                    newX = 0;
                  } else if (x > elem[0].clientWidth - handle[0].offsetWidth) {
                    newX = elem[0].clientWidth - handle[0].offsetWidth;
                  } else {
                    newX = x;
                  }

                  if (y < 0) {
                    newY = 0;
                  } else if (y > elem[0].clientHeight - handle[0].offsetHeight) {
                    newY = elem[0].clientHeight - handle[0].offsetHeight;
                  } else {
                    newY = y;
                  }

                  node.translate = [newX, newY, 1];

                }

              };

              handle.on('mousedown', mousedown);
              //TODO: Handle Touch Events

              if (scope.uiOptions.orient === 'is--joystick') {
                setPosition((elem[0].clientWidth / 2), elem[0].clientHeight / 2);
                //TODO: Fix so that the handle resolves to the center
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
