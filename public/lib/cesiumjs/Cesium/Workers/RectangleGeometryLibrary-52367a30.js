define(["exports","./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-72f33550","./Transforms-12e4beec","./GeometryAttribute-454922e8"],function(t,p,n,b,O,a,x){"use strict";var f=Math.cos,G=Math.sin,R=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i,g=n.radiiSquared,h=t.nwCorner,u=t.boundingRectangle,c=h.latitude-t.granYCos*r+e*t.granXSin,C=f(c),l=G(c),S=g.z*l,d=h.longitude+r*t.granYSin+e*t.granXCos,w=C*f(d),M=C*G(d),X=g.x*w,Y=g.y*M,m=R(X*w+Y*M+S*l);o.x=X/m,o.y=Y/m,o.z=S/m,a&&(i=t.stNwCorner,p.defined(i)?(c=i.latitude-t.stGranYCos*r+e*t.stGranXSin,d=i.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(c-t.stSouth)*t.latScalar):(s.x=(d-u.west)*t.lonScalar,s.y=(c-u.south)*t.latScalar))}},y=new x.Matrix2,v=new O.Cartesian3,P=new O.Cartographic,W=new O.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,u=Math.sin(n),c=r*u,C=a*u;v=_.project(t,v),v=O.Cartesian3.subtract(v,W,v);var l=x.Matrix2.fromRotation(n,y);v=x.Matrix2.multiplyByVector(l,v,v),v=O.Cartesian3.add(v,W,v),--o,--s;var S=(t=_.unproject(v,t)).latitude,d=S+o*C,w=S-g*s,M=S-g*s+o*C,X=Math.max(S,d,w,M),Y=Math.min(S,d,w,M),m=t.longitude,p=m+o*h,f=m+s*c,G=m+s*c+o*h;return{north:X,south:Y,east:Math.max(m,p,f,G),west:Math.min(m,p,f,G),granYCos:g,granYSin:c,granXCos:h,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i=t.east,g=t.west,h=t.north,u=t.south,c=!1,C=!1;h===b.CesiumMath.PI_OVER_TWO&&(c=!0),u===-b.CesiumMath.PI_OVER_TWO&&(C=!0);var l,S,d,w=h-u,M=(l=i<g?b.CesiumMath.TWO_PI-g+i:i-g)/((S=Math.ceil(l/n)+1)-1),X=w/((d=Math.ceil(w/n)+1)-1),Y=O.Rectangle.northwest(t,o),m=O.Rectangle.center(t,P);0===a&&0===r||(m.longitude<Y.longitude&&(m.longitude+=b.CesiumMath.TWO_PI),W=_.project(m,W));var p,f,G,x=X,R=M,y=O.Rectangle.clone(t,e),v={granYCos:x,granYSin:0,granXCos:R,granXSin:0,nwCorner:Y,boundingRectangle:y,width:S,height:d,northCap:c,southCap:C};return 0!==a&&(h=(p=T(Y,a,M,X,0,S,d)).north,u=p.south,i=p.east,g=p.west,v.granYCos=p.granYCos,v.granYSin=p.granYSin,v.granXCos=p.granXCos,v.granXSin=p.granXSin,y.north=h,y.south=u,y.east=i,y.west=g),0!==r&&(a-=r,G=T(f=O.Rectangle.northwest(y,s),a,M,X,0,S,d),v.stGranYCos=G.granYCos,v.stGranXCos=G.granXCos,v.stGranYSin=G.granYSin,v.stGranXSin=G.granXSin,v.stNwCorner=f,v.stWest=G.west,v.stSouth=G.south),v},t.RectangleGeometryLibrary=r});
