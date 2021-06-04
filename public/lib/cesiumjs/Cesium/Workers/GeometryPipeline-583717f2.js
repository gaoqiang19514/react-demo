define(["exports","./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-72f33550","./Transforms-12e4beec","./ComponentDatatype-7ee14e67","./GeometryAttribute-454922e8","./AttributeCompression-64a3d9e4","./EncodedCartesian3-43a68c70","./IndexDatatype-66caba23","./IntersectionTests-27cc5733","./Plane-bbcdf4b1"],function(e,_,t,q,U,Y,M,G,P,l,w,Z,a){"use strict";var x=new U.Cartesian3,S=new U.Cartesian3,I=new U.Cartesian3;var s={calculateACMR:function(e){var t=(e=_.defaultValue(e,_.defaultValue.EMPTY_OBJECT)).indices,r=e.maximumIndex,a=_.defaultValue(e.cacheSize,24),n=t.length;if(!_.defined(r))for(var i=r=0,s=t[i];i<n;)r<s&&(r=s),s=t[++i];for(var o=[],u=0;u<r+1;u++)o[u]=0;for(var p=a+1,d=0;d<n;++d)p-o[t[d]]>a&&(o[t[d]]=p,++p);return(p-a+1)/(n/3)}};s.tipsify=function(e){var t=(e=_.defaultValue(e,_.defaultValue.EMPTY_OBJECT)).indices,r=e.maximumIndex,a=_.defaultValue(e.cacheSize,24);function n(e,t,r,a,n,i,s){for(var o,u=-1,p=-1,d=0;d<r.length;){var l=r[d];a[l].numLiveTriangles&&(o=0,n-a[l].timeStamp+2*a[l].numLiveTriangles<=t&&(o=n-a[l].timeStamp),(p<o||-1===p)&&(p=o,u=l)),++d}return-1===u?function(e,t,r){for(;1<=t.length;){var a=t[t.length-1];if(t.splice(t.length-1,1),0<e[a].numLiveTriangles)return a}for(;b<r;){if(0<e[b].numLiveTriangles)return++b-1;++b}return-1}(a,i,s):u}var i=t.length,s=0,o=0,u=t[o],p=i;if(_.defined(r))s=r+1;else{for(;o<p;)s<u&&(s=u),u=t[++o];if(-1===s)return 0;++s}for(var d=[],l=0;l<s;l++)d[l]={numLiveTriangles:0,timeStamp:0,vertexTriangles:[]};for(var y=o=0;o<p;)d[t[o]].vertexTriangles.push(y),++d[t[o]].numLiveTriangles,d[t[o+1]].vertexTriangles.push(y),++d[t[o+1]].numLiveTriangles,d[t[o+2]].vertexTriangles.push(y),++d[t[o+2]].numLiveTriangles,++y,o+=3;var v,f,c,m,C=0,h=a+1,b=1,g=[],A=[],T=0,x=[],P=i/3,w=[];for(l=0;l<P;l++)w[l]=!1;for(;-1!==C;){g=[],m=(f=d[C]).vertexTriangles.length;for(var S=0;S<m;++S)if(!w[y=f.vertexTriangles[S]]){w[y]=!0,o=y+y+y;for(var I=0;I<3;++I)c=t[o],g.push(c),A.push(c),x[T]=c,++T,--(v=d[c]).numLiveTriangles,h-v.timeStamp>a&&(v.timeStamp=h,++h),++o}C=n(0,a,g,d,h,A,s)}return x};var r={};function o(e,t,r,a,n){e[t++]=r,e[t++]=a,e[t++]=a,e[t++]=n,e[t++]=n,e[t]=r}function f(e){var t,r={};for(var a in e){e.hasOwnProperty(a)&&_.defined(e[a])&&_.defined(e[a].values)&&(t=e[a],r[a]=new G.GeometryAttribute({componentDatatype:t.componentDatatype,componentsPerAttribute:t.componentsPerAttribute,normalize:t.normalize,values:[]}))}return r}r.toWireframe=function(e){var t=e.indices;if(_.defined(t)){switch(e.primitiveType){case G.PrimitiveType.TRIANGLES:e.indices=function(e){for(var t=e.length,r=t/3*6,a=w.IndexDatatype.createTypedArray(t,r),n=0,i=0;i<t;i+=3,n+=6)o(a,n,e[i],e[i+1],e[i+2]);return a}(t);break;case G.PrimitiveType.TRIANGLE_STRIP:e.indices=function(e){var t=e.length;if(3<=t){var r=6*(t-2),a=w.IndexDatatype.createTypedArray(t,r);o(a,0,e[0],e[1],e[2]);for(var n=6,i=3;i<t;++i,n+=6)o(a,n,e[i-1],e[i],e[i-2]);return a}return new Uint16Array}(t);break;case G.PrimitiveType.TRIANGLE_FAN:e.indices=function(e){if(0<e.length){for(var t=e.length-1,r=6*(t-1),a=w.IndexDatatype.createTypedArray(t,r),n=e[0],i=0,s=1;s<t;++s,i+=6)o(a,i,n,e[s],e[s+1]);return a}return new Uint16Array}(t)}e.primitiveType=G.PrimitiveType.LINES}return e},r.createLineSegmentsForVectors=function(e,t,r){t=_.defaultValue(t,"normal"),r=_.defaultValue(r,1e4);for(var a,n=e.attributes.position.values,i=e.attributes[t].values,s=n.length,o=new Float64Array(2*s),u=0,p=0;p<s;p+=3)o[u++]=n[p],o[u++]=n[p+1],o[u++]=n[p+2],o[u++]=n[p]+i[p]*r,o[u++]=n[p+1]+i[p+1]*r,o[u++]=n[p+2]+i[p+2]*r;var d=e.boundingSphere;return _.defined(d)&&(a=new Y.BoundingSphere(d.center,d.radius+r)),new G.Geometry({attributes:{position:new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:o})},primitiveType:G.PrimitiveType.LINES,boundingSphere:a})},r.createAttributeLocations=function(e){for(var t=["position","positionHigh","positionLow","position3DHigh","position3DLow","position2DHigh","position2DLow","pickColor","normal","st","tangent","bitangent","extrudeDirection","compressedAttributes"],r=e.attributes,a={},n=0,i=t.length,s=0;s<i;++s){var o=t[s];_.defined(r[o])&&(a[o]=n++)}for(var u in r)r.hasOwnProperty(u)&&!_.defined(a[u])&&(a[u]=n++);return a},r.reorderForPreVertexCache=function(e){var t=G.Geometry.computeNumberOfVertices(e),r=e.indices;if(_.defined(r)){for(var a=new Int32Array(t),n=0;n<t;n++)a[n]=-1;for(var i,s=r,o=s.length,u=w.IndexDatatype.createTypedArray(t,o),p=0,d=0,l=0;p<o;)-1!==(i=a[s[p]])?u[d]=i:(a[i=s[p]]=l,u[d]=l,++l),++p,++d;e.indices=u;var y=e.attributes;for(var v in y)if(y.hasOwnProperty(v)&&_.defined(y[v])&&_.defined(y[v].values)){for(var f=y[v],c=f.values,m=0,C=f.componentsPerAttribute,h=M.ComponentDatatype.createTypedArray(f.componentDatatype,l*C);m<t;){var b=a[m];if(-1!==b)for(var g=0;g<C;g++)h[C*b+g]=c[C*m+g];++m}f.values=h}}return e},r.reorderForPostVertexCache=function(e,t){var r=e.indices;if(e.primitiveType===G.PrimitiveType.TRIANGLES&&_.defined(r)){for(var a=r.length,n=0,i=0;i<a;i++)r[i]>n&&(n=r[i]);e.indices=s.tipsify({indices:r,maximumIndex:n,cacheSize:t})}return e},r.fitToUnsignedShortIndices=function(e){var t=[],r=G.Geometry.computeNumberOfVertices(e);if(_.defined(e.indices)&&r>=q.CesiumMath.SIXTY_FOUR_KILOBYTES){var a,n=[],i=[],s=0,o=f(e.attributes),u=e.indices,p=u.length;e.primitiveType===G.PrimitiveType.TRIANGLES?a=3:e.primitiveType===G.PrimitiveType.LINES?a=2:e.primitiveType===G.PrimitiveType.POINTS&&(a=1);for(var d=0;d<p;d+=a){for(var l=0;l<a;++l){var y=u[d+l],v=n[y];_.defined(v)||(v=s++,n[y]=v,function(e,t,r){for(var a in t)if(t.hasOwnProperty(a)&&_.defined(t[a])&&_.defined(t[a].values))for(var n=t[a],i=0;i<n.componentsPerAttribute;++i)e[a].values.push(n.values[r*n.componentsPerAttribute+i])}(o,e.attributes,y)),i.push(v)}s+a>=q.CesiumMath.SIXTY_FOUR_KILOBYTES&&(t.push(new G.Geometry({attributes:o,indices:i,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV})),n=[],i=[],s=0,o=f(e.attributes))}0!==i.length&&t.push(new G.Geometry({attributes:o,indices:i,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV}))}else t.push(e);return t};var c=new U.Cartesian3,m=new U.Cartographic;r.projectTo2D=function(e,t,r,a,n){for(var i=e.attributes[t],s=(n=_.defined(n)?n:new Y.GeographicProjection).ellipsoid,o=i.values,u=new Float64Array(o.length),p=0,d=0;d<o.length;d+=3){var l=U.Cartesian3.fromArray(o,d,c),y=s.cartesianToCartographic(l,m),v=n.project(y,c);u[p++]=v.x,u[p++]=v.y,u[p++]=v.z}return e.attributes[r]=i,e.attributes[a]=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),delete e.attributes[t],e};var y={high:0,low:0};r.encodeAttribute=function(e,t,r,a){for(var n=e.attributes[t],i=n.values,s=i.length,o=new Float32Array(s),u=new Float32Array(s),p=0;p<s;++p)l.EncodedCartesian3.encode(i[p],y),o[p]=y.high,u[p]=y.low;var d=n.componentsPerAttribute;return e.attributes[r]=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:d,values:o}),e.attributes[a]=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:d,values:u}),delete e.attributes[t],e};var i=new U.Cartesian3;function n(e,t){if(_.defined(t))for(var r=t.values,a=r.length,n=0;n<a;n+=3)U.Cartesian3.unpack(r,n,i),Y.Matrix4.multiplyByPoint(e,i,i),U.Cartesian3.pack(i,r,n)}function u(e,t){if(_.defined(t))for(var r=t.values,a=r.length,n=0;n<a;n+=3)U.Cartesian3.unpack(r,n,i),Y.Matrix3.multiplyByVector(e,i,i),i=U.Cartesian3.normalize(i,i),U.Cartesian3.pack(i,r,n)}var p=new Y.Matrix4,d=new Y.Matrix3;r.transformToWorldCoordinates=function(e){var t=e.modelMatrix;if(Y.Matrix4.equals(t,Y.Matrix4.IDENTITY))return e;var r=e.geometry.attributes;n(t,r.position),n(t,r.prevPosition),n(t,r.nextPosition),(_.defined(r.normal)||_.defined(r.tangent)||_.defined(r.bitangent))&&(Y.Matrix4.inverse(t,p),Y.Matrix4.transpose(p,p),Y.Matrix4.getMatrix3(p,d),u(d,r.normal),u(d,r.tangent),u(d,r.bitangent));var a=e.geometry.boundingSphere;return _.defined(a)&&(e.geometry.boundingSphere=Y.BoundingSphere.transform(a,t,a)),e.modelMatrix=Y.Matrix4.clone(Y.Matrix4.IDENTITY),e};var O=new U.Cartesian3;function v(e,t){var r,a,n,i,s,o,u=e.length,p=(e[0].modelMatrix,_.defined(e[0][t].indices)),d=e[0][t].primitiveType,l=function(e,t){var r,a=e.length,n={},i=e[0][t].attributes;for(r in i)if(i.hasOwnProperty(r)&&_.defined(i[r])&&_.defined(i[r].values)){for(var s=i[r],o=s.values.length,u=!0,p=1;p<a;++p){var d=e[p][t].attributes[r];if(!_.defined(d)||s.componentDatatype!==d.componentDatatype||s.componentsPerAttribute!==d.componentsPerAttribute||s.normalize!==d.normalize){u=!1;break}o+=d.values.length}u&&(n[r]=new G.GeometryAttribute({componentDatatype:s.componentDatatype,componentsPerAttribute:s.componentsPerAttribute,normalize:s.normalize,values:M.ComponentDatatype.createTypedArray(s.componentDatatype,o)}))}return n}(e,t);for(r in l)if(l.hasOwnProperty(r))for(n=l[r].values,v=g=0;v<u;++v)for(s=(i=e[v][t].attributes[r].values).length,a=0;a<s;++a)n[g++]=i[a];if(p){for(var y=0,v=0;v<u;++v)y+=e[v][t].indices.length;var f=G.Geometry.computeNumberOfVertices(new G.Geometry({attributes:l,primitiveType:G.PrimitiveType.POINTS})),c=w.IndexDatatype.createTypedArray(f,y),m=0,C=0;for(v=0;v<u;++v){for(var h=e[v][t].indices,b=h.length,g=0;g<b;++g)c[m++]=C+h[g];C+=G.Geometry.computeNumberOfVertices(e[v][t])}o=c}var A,T=new U.Cartesian3,x=0;for(v=0;v<u;++v){if(A=e[v][t].boundingSphere,!_.defined(A)){T=void 0;break}U.Cartesian3.add(A.center,T,T)}if(_.defined(T))for(U.Cartesian3.divideByScalar(T,u,T),v=0;v<u;++v){A=e[v][t].boundingSphere;var P=U.Cartesian3.magnitude(U.Cartesian3.subtract(A.center,T,O))+A.radius;x<P&&(x=P)}return new G.Geometry({attributes:l,indices:o,primitiveType:d,boundingSphere:_.defined(T)?new Y.BoundingSphere(T,x):void 0})}r.combineInstances=function(e){for(var t=[],r=[],a=e.length,n=0;n<a;++n){var i=e[n];_.defined(i.geometry)?t.push(i):_.defined(i.westHemisphereGeometry)&&_.defined(i.eastHemisphereGeometry)&&r.push(i)}var s=[];return 0<t.length&&s.push(v(t,"geometry")),0<r.length&&(s.push(v(r,"westHemisphereGeometry")),s.push(v(r,"eastHemisphereGeometry"))),s};var T=new U.Cartesian3,E=new U.Cartesian3,N=new U.Cartesian3,L=new U.Cartesian3;r.computeNormal=function(e){for(var t=e.indices,r=e.attributes,a=r.position.values,n=r.position.values.length/3,i=t.length,s=new Array(n),o=new Array(i/3),u=new Array(i),p=0;p<n;p++)s[p]={indexOffset:0,count:0,currentCount:0};var d=0;for(p=0;p<i;p+=3){var l=t[p],y=t[p+1],v=t[p+2],f=3*l,c=3*y,m=3*v;E.x=a[f],E.y=a[1+f],E.z=a[2+f],N.x=a[c],N.y=a[1+c],N.z=a[2+c],L.x=a[m],L.y=a[1+m],L.z=a[2+m],s[l].count++,s[y].count++,s[v].count++,U.Cartesian3.subtract(N,E,N),U.Cartesian3.subtract(L,E,L),o[d]=U.Cartesian3.cross(N,L,new U.Cartesian3),d++}var C=0;for(p=0;p<n;p++)s[p].indexOffset+=C,C+=s[p].count;for(p=d=0;p<i;p+=3){var h=(A=s[t[p]]).indexOffset+A.currentCount;u[h]=d,A.currentCount++,u[h=(A=s[t[p+1]]).indexOffset+A.currentCount]=d,A.currentCount++,u[h=(A=s[t[p+2]]).indexOffset+A.currentCount]=d,A.currentCount++,d++}var b=new Float32Array(3*n);for(p=0;p<n;p++){var g=3*p,A=s[p];if(U.Cartesian3.clone(U.Cartesian3.ZERO,T),0<A.count){for(d=0;d<A.count;d++)U.Cartesian3.add(T,o[u[A.indexOffset+d]],T);U.Cartesian3.equalsEpsilon(U.Cartesian3.ZERO,T,q.CesiumMath.EPSILON10)&&U.Cartesian3.clone(o[u[A.indexOffset]],T)}U.Cartesian3.equalsEpsilon(U.Cartesian3.ZERO,T,q.CesiumMath.EPSILON10)&&(T.z=1),U.Cartesian3.normalize(T,T),b[g]=T.x,b[1+g]=T.y,b[2+g]=T.z}return e.attributes.normal=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b}),e};var R=new U.Cartesian3,V=new U.Cartesian3,F=new U.Cartesian3;r.computeTangentAndBitangent=function(e){e.attributes;for(var t=e.indices,r=e.attributes.position.values,a=e.attributes.normal.values,n=e.attributes.st.values,i=e.attributes.position.values.length/3,s=t.length,o=new Array(3*i),u=0;u<o.length;u++)o[u]=0;for(u=0;u<s;u+=3){var p,d=t[u],l=t[u+1],y=t[u+2],v=3*l,f=3*y,c=2*d,m=2*l,C=2*y,h=r[p=3*d],b=r[p+1],g=r[p+2],A=n[c],T=n[1+c],x=n[1+m]-T,P=n[1+C]-T,w=1/((n[m]-A)*P-(n[C]-A)*x),S=(P*(r[v]-h)-x*(r[f]-h))*w,I=(P*(r[v+1]-b)-x*(r[f+1]-b))*w,O=(P*(r[v+2]-g)-x*(r[f+2]-g))*w;o[p]+=S,o[p+1]+=I,o[p+2]+=O,o[v]+=S,o[v+1]+=I,o[v+2]+=O,o[f]+=S,o[f+1]+=I,o[f+2]+=O}var E=new Float32Array(3*i),N=new Float32Array(3*i);for(u=0;u<i;u++){v=(p=3*u)+1,f=p+2;var L=U.Cartesian3.fromArray(a,p,R),z=U.Cartesian3.fromArray(o,p,F),D=U.Cartesian3.dot(L,z);U.Cartesian3.multiplyByScalar(L,D,V),U.Cartesian3.normalize(U.Cartesian3.subtract(z,V,z),z),E[p]=z.x,E[v]=z.y,E[f]=z.z,U.Cartesian3.normalize(U.Cartesian3.cross(L,z,z),z),N[p]=z.x,N[v]=z.y,N[f]=z.z}return e.attributes.tangent=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:E}),e.attributes.bitangent=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:N}),e};var z=new U.Cartesian2,D=new U.Cartesian3,B=new U.Cartesian3,k=new U.Cartesian3,H=new U.Cartesian2;function C(e){switch(e.primitiveType){case G.PrimitiveType.TRIANGLE_FAN:return function(e){var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,3*(t-2));r[0]=1,r[1]=0,r[2]=2;for(var a=3,n=3;n<t;++n)r[a++]=n-1,r[a++]=0,r[a++]=n;return e.indices=r,e.primitiveType=G.PrimitiveType.TRIANGLES,e}(e);case G.PrimitiveType.TRIANGLE_STRIP:return function(e){var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,3*(t-2));r[0]=0,r[1]=1,r[2]=2,3<t&&(r[3]=0,r[4]=2,r[5]=3);for(var a=6,n=3;n<t-1;n+=2)r[a++]=n,r[a++]=n-1,r[a++]=n+1,n+2<t&&(r[a++]=n,r[a++]=n+1,r[a++]=n+2);return e.indices=r,e.primitiveType=G.PrimitiveType.TRIANGLES,e}(e);case G.PrimitiveType.TRIANGLES:return function(e){if(_.defined(e.indices))return e;for(var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,t),a=0;a<t;++a)r[a]=a;return e.indices=r,e}(e);case G.PrimitiveType.LINE_STRIP:return function(e){var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,2*(t-1));r[0]=0,r[1]=1;for(var a=2,n=2;n<t;++n)r[a++]=n-1,r[a++]=n;return e.indices=r,e.primitiveType=G.PrimitiveType.LINES,e}(e);case G.PrimitiveType.LINE_LOOP:return function(e){var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,2*t);r[0]=0,r[1]=1;for(var a=2,n=2;n<t;++n)r[a++]=n-1,r[a++]=n;return r[a++]=t-1,r[a]=0,e.indices=r,e.primitiveType=G.PrimitiveType.LINES,e}(e);case G.PrimitiveType.LINES:return function(e){if(_.defined(e.indices))return e;for(var t=G.Geometry.computeNumberOfVertices(e),r=w.IndexDatatype.createTypedArray(t,t),a=0;a<t;++a)r[a]=a;return e.indices=r,e}(e)}return e}function h(e,t){Math.abs(e.y)<q.CesiumMath.EPSILON6&&(e.y=t?-q.CesiumMath.EPSILON6:q.CesiumMath.EPSILON6)}r.compressVertices=function(e){var t=e.attributes.extrudeDirection;if(_.defined(t)){for(var r=t.values,a=r.length/3,n=new Float32Array(2*a),i=0,s=0;s<a;++s)U.Cartesian3.fromArray(r,3*s,D),U.Cartesian3.equals(D,U.Cartesian3.ZERO)?i+=2:(H=P.AttributeCompression.octEncodeInRange(D,65535,H),n[i++]=H.x,n[i++]=H.y);return e.attributes.compressedAttributes=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:n}),delete e.attributes.extrudeDirection,e}var o=e.attributes.normal,u=e.attributes.st,p=_.defined(o),d=_.defined(u);if(!p&&!d)return e;var l,y,v,f,c=e.attributes.tangent,m=e.attributes.bitangent,C=_.defined(c),h=_.defined(m);p&&(l=o.values),d&&(y=u.values),C&&(v=c.values),h&&(f=m.values);var b=a=(p?l.length:y.length)/(p?3:2),g=d&&p?2:1;b*=g+=C||h?1:0;var A=new Float32Array(b),T=0;for(s=0;s<a;++s){d&&(U.Cartesian2.fromArray(y,2*s,z),A[T++]=P.AttributeCompression.compressTextureCoordinates(z));var x=3*s;p&&_.defined(v)&&_.defined(f)?(U.Cartesian3.fromArray(l,x,D),U.Cartesian3.fromArray(v,x,B),U.Cartesian3.fromArray(f,x,k),P.AttributeCompression.octPack(D,B,k,z),A[T++]=z.x,A[T++]=z.y):(p&&(U.Cartesian3.fromArray(l,x,D),A[T++]=P.AttributeCompression.octEncodeFloat(D)),C&&(U.Cartesian3.fromArray(v,x,D),A[T++]=P.AttributeCompression.octEncodeFloat(D)),h&&(U.Cartesian3.fromArray(f,x,D),A[T++]=P.AttributeCompression.octEncodeFloat(D)))}return e.attributes.compressedAttributes=new G.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:g,values:A}),p&&delete e.attributes.normal,d&&delete e.attributes.st,h&&delete e.attributes.bitangent,C&&delete e.attributes.tangent,e};var b=new U.Cartesian3;function g(e,t,r,a){U.Cartesian3.add(e,U.Cartesian3.multiplyByScalar(U.Cartesian3.subtract(t,e,b),e.y/(e.y-t.y),b),r),U.Cartesian3.clone(r,a),h(r,!0),h(a,!1)}var A=new U.Cartesian3,W=new U.Cartesian3,X=new U.Cartesian3,j=new U.Cartesian3,J={positions:new Array(7),indices:new Array(9)};function K(e,t,r){if(!(0<=e.x||0<=t.x||0<=r.x)){!function(e,t,r){if(0!==e.y&&0!==t.y&&0!==r.y)return h(e,e.y<0),h(t,t.y<0),h(r,r.y<0);var a=Math.abs(e.y),n=Math.abs(t.y),i=Math.abs(r.y),s=n<a?i<a?q.CesiumMath.sign(e.y):q.CesiumMath.sign(r.y):i<n?q.CesiumMath.sign(t.y):q.CesiumMath.sign(r.y),o=s<0;h(e,o),h(t,o),h(r,o)}(e,t,r);var a=e.y<0,n=t.y<0,i=r.y<0,s=0;s+=a?1:0,s+=n?1:0,s+=i?1:0;var o=J.indices;1==s?(o[1]=3,o[2]=4,o[5]=6,o[7]=6,o[8]=5,a?(g(e,t,A,X),g(e,r,W,j),o[0]=0,o[3]=1,o[4]=2,o[6]=1):n?(g(t,r,A,X),g(t,e,W,j),o[0]=1,o[3]=2,o[4]=0,o[6]=2):i&&(g(r,e,A,X),g(r,t,W,j),o[0]=2,o[3]=0,o[4]=1,o[6]=0)):2==s&&(o[2]=4,o[4]=4,o[5]=3,o[7]=5,o[8]=6,a?n?i||(g(r,e,A,X),g(r,t,W,j),o[0]=0,o[1]=1,o[3]=0,o[6]=2):(g(t,r,A,X),g(t,e,W,j),o[0]=2,o[1]=0,o[3]=2,o[6]=1):(g(e,t,A,X),g(e,r,W,j),o[0]=1,o[1]=2,o[3]=1,o[6]=0));var u=J.positions;return u[0]=e,u[1]=t,u[2]=r,u.length=3,1!=s&&2!=s||(u[3]=A,u[4]=W,u[5]=X,u[6]=j,u.length=7),J}}function Q(e,t){var r,a=e.attributes;if(0!==a.position.values.length){for(var n in a){a.hasOwnProperty(n)&&_.defined(a[n])&&_.defined(a[n].values)&&((r=a[n]).values=M.ComponentDatatype.createTypedArray(r.componentDatatype,r.values))}var i=G.Geometry.computeNumberOfVertices(e);return e.indices=w.IndexDatatype.createTypedArray(i,e.indices),t&&(e.boundingSphere=Y.BoundingSphere.fromVertices(a.position.values)),e}}function $(e){var t,r=e.attributes,a={};for(var n in r){r.hasOwnProperty(n)&&_.defined(r[n])&&_.defined(r[n].values)&&(t=r[n],a[n]=new G.GeometryAttribute({componentDatatype:t.componentDatatype,componentsPerAttribute:t.componentsPerAttribute,normalize:t.normalize,values:[]}))}return new G.Geometry({attributes:a,indices:[],primitiveType:e.primitiveType})}function ee(e,t,r){var a=_.defined(e.geometry.boundingSphere);t=Q(t,a),r=Q(r,a),_.defined(r)&&!_.defined(t)?e.geometry=r:!_.defined(r)&&_.defined(t)?e.geometry=t:(e.westHemisphereGeometry=t,e.eastHemisphereGeometry=r,e.geometry=void 0)}function te(y,v){var f=new y,c=new y,m=new y;return function(e,t,r,a,n,i,s,o){var u=y.fromArray(n,e*v,f),p=y.fromArray(n,t*v,c),d=y.fromArray(n,r*v,m);y.multiplyByScalar(u,a.x,u),y.multiplyByScalar(p,a.y,p),y.multiplyByScalar(d,a.z,d);var l=y.add(u,p,u);y.add(l,d,l),o&&y.normalize(l,l),y.pack(l,i,s*v)}}var re=te(Y.Cartesian4,4),ae=te(U.Cartesian3,3),ne=te(U.Cartesian2,2),ie=function(e,t,r,a,n,i,s){var o=n[e]*a.x,u=n[t]*a.y,p=n[r]*a.z;i[s]=o+u+p>q.CesiumMath.EPSILON6?1:0},se=new U.Cartesian3,oe=new U.Cartesian3,ue=new U.Cartesian3,pe=new U.Cartesian3;function de(e,t,r,a,n,i,s,o,u,p,d,l,y,v,f,c){if(_.defined(i)||_.defined(s)||_.defined(o)||_.defined(u)||_.defined(p)||0!==v){var m,C,h,b,g=function(e,t,r,a,n){var i,s,o,u,p,d,l,y;if(_.defined(n)||(n=new U.Cartesian3),_.defined(t.z)){if(U.Cartesian3.equalsEpsilon(e,t,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_X,n);if(U.Cartesian3.equalsEpsilon(e,r,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_Y,n);if(U.Cartesian3.equalsEpsilon(e,a,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_Z,n);i=U.Cartesian3.subtract(r,t,x),s=U.Cartesian3.subtract(a,t,S),o=U.Cartesian3.subtract(e,t,I),u=U.Cartesian3.dot(i,i),p=U.Cartesian3.dot(i,s),d=U.Cartesian3.dot(i,o),l=U.Cartesian3.dot(s,s),y=U.Cartesian3.dot(s,o)}else{if(U.Cartesian2.equalsEpsilon(e,t,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_X,n);if(U.Cartesian2.equalsEpsilon(e,r,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_Y,n);if(U.Cartesian2.equalsEpsilon(e,a,q.CesiumMath.EPSILON14))return U.Cartesian3.clone(U.Cartesian3.UNIT_Z,n);i=U.Cartesian2.subtract(r,t,x),s=U.Cartesian2.subtract(a,t,S),o=U.Cartesian2.subtract(e,t,I),u=U.Cartesian2.dot(i,i),p=U.Cartesian2.dot(i,s),d=U.Cartesian2.dot(i,o),l=U.Cartesian2.dot(s,s),y=U.Cartesian2.dot(s,o)}n.y=l*d-p*y,n.z=u*y-p*d;var v=u*l-p*p;return 0!==n.y&&(n.y/=v),0!==n.z&&(n.z/=v),n.x=1-n.y-n.z,n}(a,U.Cartesian3.fromArray(n,3*e,se),U.Cartesian3.fromArray(n,3*t,oe),U.Cartesian3.fromArray(n,3*r,ue),pe);if(_.defined(i)&&ae(e,t,r,g,i,l.normal.values,c,!0),_.defined(p)&&(m=U.Cartesian3.fromArray(p,3*e,se),C=U.Cartesian3.fromArray(p,3*t,oe),h=U.Cartesian3.fromArray(p,3*r,ue),U.Cartesian3.multiplyByScalar(m,g.x,m),U.Cartesian3.multiplyByScalar(C,g.y,C),U.Cartesian3.multiplyByScalar(h,g.z,h),U.Cartesian3.equals(m,U.Cartesian3.ZERO)&&U.Cartesian3.equals(C,U.Cartesian3.ZERO)&&U.Cartesian3.equals(h,U.Cartesian3.ZERO)?((b=se).x=0,b.y=0,b.z=0):(b=U.Cartesian3.add(m,C,m),U.Cartesian3.add(b,h,b),U.Cartesian3.normalize(b,b)),U.Cartesian3.pack(b,l.extrudeDirection.values,3*c)),_.defined(d)&&ie(e,t,r,g,d,l.applyOffset.values,c),_.defined(s)&&ae(e,t,r,g,s,l.tangent.values,c,!0),_.defined(o)&&ae(e,t,r,g,o,l.bitangent.values,c,!0),_.defined(u)&&ne(e,t,r,g,u,l.st.values,c),0<v)for(var A=0;A<v;A++){var T=y[A];!function(e,t,r,a,n,i,s){var o=i.componentsPerAttribute,u=i.values,p=s.values;switch(o){case 4:re(e,t,r,a,u,p,n,!1);break;case 3:ae(e,t,r,a,u,p,n,!1);break;case 2:ne(e,t,r,a,u,p,n,!1);break;default:p[n]=u[e]*a.x+u[t]*a.y+u[r]*a.z}}(e,t,r,g,c,f[T],l[T])}}}function le(e,t,r,a,n,i){var s=e.position.values.length/3;if(-1===n)return e.position.values.push(i.x,i.y,i.z),t.push(s),s;var o=a[n],u=r[o];return-1===u?(r[o]=s,e.position.values.push(i.x,i.y,i.z),t.push(s),s):(t.push(u),u)}var ye={position:!0,normal:!0,bitangent:!0,tangent:!0,st:!0,extrudeDirection:!0,applyOffset:!0};function ve(e){var t=e.geometry,r=t.attributes,a=r.position.values,n=_.defined(r.normal)?r.normal.values:void 0,i=_.defined(r.bitangent)?r.bitangent.values:void 0,s=_.defined(r.tangent)?r.tangent.values:void 0,o=_.defined(r.st)?r.st.values:void 0,u=_.defined(r.extrudeDirection)?r.extrudeDirection.values:void 0,p=_.defined(r.applyOffset)?r.applyOffset.values:void 0,d=t.indices,l=[];for(var y in r)r.hasOwnProperty(y)&&!ye[y]&&_.defined(r[y])&&l.push(y);var v,f,c=l.length,m=$(t),C=$(t),h=[];h.length=a.length/3;var b=[];for(b.length=a.length/3,A=0;A<h.length;++A)h[A]=-1,b[A]=-1;for(var g=d.length,A=0;A<g;A+=3){var T=d[A],x=d[A+1],P=d[A+2],w=U.Cartesian3.fromArray(a,3*T),S=U.Cartesian3.fromArray(a,3*x),I=U.Cartesian3.fromArray(a,3*P),O=K(w,S,I);if(_.defined(O)&&3<O.positions.length)for(var E=O.positions,N=O.indices,L=N.length,z=0;z<L;++z){var D=N[z],M=E[D],G=M.y<0?(v=C.attributes,f=C.indices,h):(v=m.attributes,f=m.indices,b);de(T,x,P,M,a,n,s,i,o,u,p,v,l,c,r,le(v,f,G,d,D<3?A+D:-1,M))}else _.defined(O)&&(w=O.positions[0],S=O.positions[1],I=O.positions[2]),G=w.y<0?(v=C.attributes,f=C.indices,h):(v=m.attributes,f=m.indices,b),de(T,x,P,w,a,n,s,i,o,u,p,v,l,c,r,le(v,f,G,d,A,w)),de(T,x,P,S,a,n,s,i,o,u,p,v,l,c,r,le(v,f,G,d,A+1,S)),de(T,x,P,I,a,n,s,i,o,u,p,v,l,c,r,le(v,f,G,d,A+2,I))}ee(e,C,m)}var fe=a.Plane.fromPointNormal(U.Cartesian3.ZERO,U.Cartesian3.UNIT_Y),ce=new U.Cartesian3,me=new U.Cartesian3;function Ce(e,t,r,a,n,i,s){var o;_.defined(s)&&(o=U.Cartesian3.fromArray(a,3*e,se),U.Cartesian3.equalsEpsilon(o,r,q.CesiumMath.EPSILON10)?i.applyOffset.values[n]=s[e]:i.applyOffset.values[n]=s[t])}function he(e){var t,r=e.geometry,a=r.attributes,n=a.position.values,i=_.defined(a.applyOffset)?a.applyOffset.values:void 0,s=r.indices,o=$(r),u=$(r),p=s.length,d=[];d.length=n.length/3;var l=[];for(l.length=n.length/3,t=0;t<d.length;++t)d[t]=-1,l[t]=-1;for(t=0;t<p;t+=2){var y=s[t],v=s[t+1],f=U.Cartesian3.fromArray(n,3*y,se),c=U.Cartesian3.fromArray(n,3*v,oe);Math.abs(f.y)<q.CesiumMath.EPSILON6&&(f.y<0?f.y=-q.CesiumMath.EPSILON6:f.y=q.CesiumMath.EPSILON6),Math.abs(c.y)<q.CesiumMath.EPSILON6&&(c.y<0?c.y=-q.CesiumMath.EPSILON6:c.y=q.CesiumMath.EPSILON6);var m,C,h,b,g,A=o.attributes,T=o.indices,x=l,P=u.attributes,w=u.indices,S=d,I=Z.IntersectionTests.lineSegmentPlane(f,c,fe,ue);_.defined(I)?(m=U.Cartesian3.multiplyByScalar(U.Cartesian3.UNIT_Y,5*q.CesiumMath.EPSILON9,ce),f.y<0&&(U.Cartesian3.negate(m,m),A=u.attributes,T=u.indices,x=d,P=o.attributes,w=o.indices,S=l),C=U.Cartesian3.add(I,m,me),Ce(y,v,f,n,le(A,T,x,s,t,f),A,i),Ce(y,v,C,n,le(A,T,x,s,-1,C),A,i),U.Cartesian3.negate(m,m),U.Cartesian3.add(I,m,C),Ce(y,v,C,n,le(P,w,S,s,-1,C),P,i),Ce(y,v,c,n,le(P,w,S,s,t+1,c),P,i)):(g=f.y<0?(h=u.attributes,b=u.indices,d):(h=o.attributes,b=o.indices,l),Ce(y,v,f,n,le(h,b,g,s,t,f),h,i),Ce(y,v,c,n,le(h,b,g,s,t+1,c),h,i))}ee(e,u,o)}var be=new U.Cartesian2,ge=new U.Cartesian2,Ae=new U.Cartesian3,Te=new U.Cartesian3,xe=new U.Cartesian3,Pe=new U.Cartesian3,we=new U.Cartesian3,Se=new U.Cartesian3,Ie=new Y.Cartesian4;function Oe(e){for(var t=e.attributes,r=t.position.values,a=t.prevPosition.values,n=t.nextPosition.values,i=r.length,s=0;s<i;s+=3){var o,u,p=U.Cartesian3.unpack(r,s,Ae);0<p.x||(o=U.Cartesian3.unpack(a,s,Te),(p.y<0&&0<o.y||0<p.y&&o.y<0)&&(0<s-3?(a[s]=r[s-3],a[s+1]=r[s-2],a[s+2]=r[s-1]):U.Cartesian3.pack(p,a,s)),u=U.Cartesian3.unpack(n,s,xe),(p.y<0&&0<u.y||0<p.y&&u.y<0)&&(s+3<i?(n[s]=r[s+3],n[s+1]=r[s+4],n[s+2]=r[s+5]):U.Cartesian3.pack(p,n,s)))}}var Ee=5*q.CesiumMath.EPSILON9,Ne=q.CesiumMath.EPSILON6;r.splitLongitude=function(e){var t=e.geometry,r=t.boundingSphere;if(_.defined(r)&&(0<r.center.x-r.radius||Y.BoundingSphere.intersectPlane(r,a.Plane.ORIGIN_ZX_PLANE)!==Y.Intersect.INTERSECTING))return e;if(t.geometryType!==G.GeometryType.NONE)switch(t.geometryType){case G.GeometryType.POLYLINES:!function(e){for(var t,r=e.geometry,a=r.attributes,n=a.position.values,i=a.prevPosition.values,s=a.nextPosition.values,o=a.expandAndWidth.values,u=_.defined(a.st)?a.st.values:void 0,p=_.defined(a.color)?a.color.values:void 0,d=$(r),l=$(r),y=!1,v=n.length/3,f=0;f<v;f+=4){var c=f,m=f+2,C=U.Cartesian3.fromArray(n,3*c,Ae),h=U.Cartesian3.fromArray(n,3*m,Te);if(Math.abs(C.y)<Ne)for(C.y=Ne*(h.y<0?-1:1),n[3*f+1]=C.y,n[3*(f+1)+1]=C.y,G=3*c;G<3*c+12;G+=3)i[G]=n[3*f],i[G+1]=n[3*f+1],i[G+2]=n[3*f+2];if(Math.abs(h.y)<Ne)for(h.y=Ne*(C.y<0?-1:1),n[3*(f+2)+1]=h.y,n[3*(f+3)+1]=h.y,G=3*c;G<3*c+12;G+=3)s[G]=n[3*(f+2)],s[G+1]=n[3*(f+2)+1],s[G+2]=n[3*(f+2)+2];var b=d.attributes,g=d.indices,A=l.attributes,T=l.indices,x=Z.IntersectionTests.lineSegmentPlane(C,h,fe,Pe);if(_.defined(x)){y=!0;var P=U.Cartesian3.multiplyByScalar(U.Cartesian3.UNIT_Y,Ee,we);C.y<0&&(U.Cartesian3.negate(P,P),b=l.attributes,g=l.indices,A=d.attributes,T=d.indices);var w=U.Cartesian3.add(x,P,Se);b.position.values.push(C.x,C.y,C.z,C.x,C.y,C.z),b.position.values.push(w.x,w.y,w.z),b.position.values.push(w.x,w.y,w.z),b.prevPosition.values.push(i[3*c],i[3*c+1],i[3*c+2]),b.prevPosition.values.push(i[3*c+3],i[3*c+4],i[3*c+5]),b.prevPosition.values.push(C.x,C.y,C.z,C.x,C.y,C.z),b.nextPosition.values.push(w.x,w.y,w.z),b.nextPosition.values.push(w.x,w.y,w.z),b.nextPosition.values.push(w.x,w.y,w.z),b.nextPosition.values.push(w.x,w.y,w.z),U.Cartesian3.negate(P,P),U.Cartesian3.add(x,P,w),A.position.values.push(w.x,w.y,w.z),A.position.values.push(w.x,w.y,w.z),A.position.values.push(h.x,h.y,h.z,h.x,h.y,h.z),A.prevPosition.values.push(w.x,w.y,w.z),A.prevPosition.values.push(w.x,w.y,w.z),A.prevPosition.values.push(w.x,w.y,w.z),A.prevPosition.values.push(w.x,w.y,w.z),A.nextPosition.values.push(h.x,h.y,h.z,h.x,h.y,h.z),A.nextPosition.values.push(s[3*m],s[3*m+1],s[3*m+2]),A.nextPosition.values.push(s[3*m+3],s[3*m+4],s[3*m+5]);var S=U.Cartesian2.fromArray(o,2*c,be),I=Math.abs(S.y);b.expandAndWidth.values.push(-1,I,1,I),b.expandAndWidth.values.push(-1,-I,1,-I),A.expandAndWidth.values.push(-1,I,1,I),A.expandAndWidth.values.push(-1,-I,1,-I);var O=U.Cartesian3.magnitudeSquared(U.Cartesian3.subtract(x,C,xe));if(O/=U.Cartesian3.magnitudeSquared(U.Cartesian3.subtract(h,C,xe)),_.defined(p)){for(var E=Y.Cartesian4.fromArray(p,4*c,Ie),N=Y.Cartesian4.fromArray(p,4*m,Ie),L=q.CesiumMath.lerp(E.x,N.x,O),z=q.CesiumMath.lerp(E.y,N.y,O),D=q.CesiumMath.lerp(E.z,N.z,O),M=q.CesiumMath.lerp(E.w,N.w,O),G=4*c;G<4*c+8;++G)b.color.values.push(p[G]);for(b.color.values.push(L,z,D,M),b.color.values.push(L,z,D,M),A.color.values.push(L,z,D,M),A.color.values.push(L,z,D,M),G=4*m;G<4*m+8;++G)A.color.values.push(p[G])}if(_.defined(u)){var R=U.Cartesian2.fromArray(u,2*c,be),V=U.Cartesian2.fromArray(u,2*(f+3),ge),F=q.CesiumMath.lerp(R.x,V.x,O);for(G=2*c;G<2*c+4;++G)b.st.values.push(u[G]);for(b.st.values.push(F,R.y),b.st.values.push(F,V.y),A.st.values.push(F,R.y),A.st.values.push(F,V.y),G=2*m;G<2*m+4;++G)A.st.values.push(u[G])}t=b.position.values.length/3-4,g.push(t,t+2,t+1),g.push(t+1,t+2,t+3),t=A.position.values.length/3-4,T.push(t,t+2,t+1),T.push(t+1,t+2,t+3)}else{var B,k=C.y<0?(B=l.attributes,l.indices):(B=d.attributes,d.indices);for(B.position.values.push(C.x,C.y,C.z),B.position.values.push(C.x,C.y,C.z),B.position.values.push(h.x,h.y,h.z),B.position.values.push(h.x,h.y,h.z),G=3*f;G<3*f+12;++G)B.prevPosition.values.push(i[G]),B.nextPosition.values.push(s[G]);for(G=2*f;G<2*f+8;++G)B.expandAndWidth.values.push(o[G]),_.defined(u)&&B.st.values.push(u[G]);if(_.defined(p))for(G=4*f;G<4*f+16;++G)B.color.values.push(p[G]);t=B.position.values.length/3-4,k.push(t,t+2,t+1),k.push(t+1,t+2,t+3)}}y&&(Oe(l),Oe(d)),ee(e,l,d)}(e);break;case G.GeometryType.TRIANGLES:ve(e);break;case G.GeometryType.LINES:he(e)}else C(t),t.primitiveType===G.PrimitiveType.TRIANGLES?ve(e):t.primitiveType===G.PrimitiveType.LINES&&he(e);return e},e.GeometryPipeline=r});
