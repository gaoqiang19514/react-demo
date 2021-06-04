define(["exports","./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-44433f55","./Transforms-23521d7e"],function(n,i,a,e,o,t){"use strict";function s(n,a){this.normal=o.Cartesian3.clone(n),this.distance=a}s.fromPointNormal=function(n,a,e){var t=-o.Cartesian3.dot(a,n);return i.defined(e)?(o.Cartesian3.clone(a,e.normal),e.distance=t,e):new s(a,t)};var r=new o.Cartesian3;s.fromCartesian4=function(n,a){var e=o.Cartesian3.fromCartesian4(n,r),t=n.w;return i.defined(a)?(o.Cartesian3.clone(e,a.normal),a.distance=t,a):new s(e,t)},s.getPointDistance=function(n,a){return o.Cartesian3.dot(n.normal,a)+n.distance};var c=new o.Cartesian3;s.projectPointOntoPlane=function(n,a,e){i.defined(e)||(e=new o.Cartesian3);var t=s.getPointDistance(n,a),r=o.Cartesian3.multiplyByScalar(n.normal,t,c);return o.Cartesian3.subtract(a,r,e)};var l=new o.Cartesian3;s.transform=function(n,a,e){return t.Matrix4.multiplyByPointAsVector(a,n.normal,r),o.Cartesian3.normalize(r,r),o.Cartesian3.multiplyByScalar(n.normal,-n.distance,l),t.Matrix4.multiplyByPoint(a,l,l),s.fromPointNormal(l,r,e)},s.clone=function(n,a){return i.defined(a)?(o.Cartesian3.clone(n.normal,a.normal),a.distance=n.distance,a):new s(n.normal,n.distance)},s.equals=function(n,a){return n.distance===a.distance&&o.Cartesian3.equals(n.normal,a.normal)},s.ORIGIN_XY_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_Z,0)),s.ORIGIN_YZ_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_X,0)),s.ORIGIN_ZX_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_Y,0)),n.Plane=s});
