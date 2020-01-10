Background
The GreenSock Animation Platform (GSAP) is a suite of tools for scripted, high-performance HTML5 animations. GSAP can be used to animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects, etc. 


Getting Started

Loading GSAP

https://greensock.com/get-started/


Downloading GSAP
Click here to download a copy of GSAP to use locally. If you're a Club GreenSock member, this download includes a tarball file that you can "npm install" and test with your build system locally. See the the installation docs for more information.


Tweening Basics
Let's start working with basic tweens. We'll use CodePen demos so that you can easily fork and edit each example right in your browser.


gsap.to()
To create an animation, gsap.to() needs 2 things:

targets

The object(s) you are animating. This can be a raw object, an array of objects, or selector text like 

".myClass".

vars

An object with property/value pairs that you're animating to (like 

opacity:0.5, rotation:45, etc.) and other optional special properties like duration and onComplete.

For example, to move an element with an id of "logo" to an x position of 100 (same as transform: translateX(100px)) over the course of 1 second:

gsap.to("#logo", {duration: 1, x: 100});
Note: Remember that GSAP isn't just for DOM elements, so you could even animate custom properties of a raw object like this:

var obj = {prop: 10};
gsap.to(obj, {
  duration: 1,
  prop: 200, 
  //onUpdate fires each time the tween updates; we'll explain callbacks later.
  onUpdate: function() {
    console.log(obj.prop); //logs the value on each update.
  }
});

Plugins
Think of plugins like adding special properties that get dynamically added to GSAP in order to inject extra abilities. This keeps the core engine small and efficient, yet allows for unlimited expansion. Each plugin is associated with a specific property name.

Among the most popular plugins are:

SplitText: Splits text blocks into lines, words, and characters and enables you to easily animate each part.

Draggable: Adds the ability to drag and drop any element.

MorphSVGPlugin: Smooth morphing of complex SVG paths.

DrawSVGPlugin: Animates the length and position of SVG strokes.

MotionPathPlugin: Animates any element along a path.


CSSPlugin
In the previous example, GSAP used a core plugin (one that's included in GSAP's core) called CSSPlugin. It automatically noticed that the target is a DOM element, so it intercepted the values and did some extra work behind the scenes, applying them as inline styles (element.style.transform and element.style.opacity in that case). Be sure to watch the "Getting Started" video at the top of this article to see it in action.

CSSPlugin Features:

Normalizes behavior across browsers and works around various browser bugs and inconsistencies

Optimizes performance by auto-layerizing, caching transform components, preventing layout thrashing, etc.

Controls 2D and 3D transform components (x, y, rotation, scaleX, scaleY, skewX, etc.) independently (eliminating order-of-operation woes)

Reads computed values so you don't have to manually define starting values

Animates complex values like borderRadius:"50% 50%" and boxShadow:"0px 0px 20px 20px red"

Applies vendor-specific prefixes (

moz-

, 

ms-

, 

webkit-

, etc.) when necessary

Animates CSS Variables

Normalizes behavior between SVG and DOM elements (particularly useful with transforms)

...and lots more

Basically, CSSPlugin saves you a ton of headaches.

Because animating CSS properties is so common, GSAP automatically senses when the target is a DOM element and feeds the CSS values to CSSPlugin internally. There's no need to wrap things in a css:{} object. Less typing for you. You're welcome. 

To understand the advanced capabilities of the CSSPlugin read the full CSSPlugin documentation.


2D and 3D transforms
CSSPlugin recognizes a number of short codes for transform-related properties:

GSAP

CSS

x: 100

transform: translateX(100px)

y: 100

transform: translateY(100px)

rotation: 360

transform: rotate(360deg)

rotationX: 360

transform: rotateX(360deg)

rotationY: 360

transform: rotateY(360deg)

skewX: 45

transform: skewX(45deg)

skewY: 45

transform: skewY(45deg)

scale: 2

transform: scale(2, 2)

scaleX: 2

transform: scaleX(2)

scaleY: 2

transform: scaleY(2)

xPercent: 50

transform: translateX(50%)

yPercent: 50

transform: translateY(50%)

GSAP can animate any transform value but we strongly recommend using the shortcuts above because they're faster and more accurate (GSAP can skip parsing computed matrix values which are inherently ambiguous for rotational values beyond 180 degrees). The other major convenience GSAP affords is independent control of each component while delivering a consistent order-of-operation.

Performance note: it's much easier for browsers to update x and y (transforms) rather than top and leftwhich affect document flow. So to move something, we recommend animating x and y.
