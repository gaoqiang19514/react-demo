class Weather {
    currentType
    lastStage
    viewer
    fogEffect
    constructor(viewer) {
        this.viewer = viewer
    }
    addRain(val = 2) {
        let value = this._formateVal(val)
        this.currentType = 'rain'
        this.remove();
        const rain = new Cesium.PostProcessStage({
            fragmentShader: this._getRainShader(value)
        });
        this.viewer.scene.postProcessStages.add(rain);
        this.lastStage = rain;
    }

    addSnow(val = 2) {
        let value = this._formateVal(val)
        this.currentType = 'snow'
        this.remove();
        const snow = new Cesium.PostProcessStage({
            fragmentShader: this._getSnowShader(value)
        });
        this.viewer.scene.postProcessStages.add(snow);

        this.lastStage = snow;
    }

    addFog(val = 2) {
        let value = this._formateVal(val)
        this.currentType = 'fog'
        this.remove();
        if (!this.fogEffect) {
            this.fogEffect = new FogEffect(this.viewer, {
                maxHeight: 200000, //大于此高度后不显示
                fogByDistance: new Cesium.Cartesian4(100, 0.0, 9000, value/10),
                color: Cesium.Color.WHITE
            });
        }

        this.fogEffect.show = true
    }

    remove() {
        if (this.lastStage) {
            this.viewer.scene.postProcessStages.remove(this.lastStage);
            this.lastStage = null;
        }

        if (this.fogEffect) {
            this.fogEffect.FogStage.enabled = false
            this.fogEffect.FogStage.destroy()
            this.fogEffect = null
        }
    }
    _formateVal(val) {
        let num = val
        if (num > 9) {
            num = 9
        } else if (num < 1) {
            num = 1
        }
        return num
    }
    _getSnowShader(val) {
        return "uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
            \n\
                float snow(vec2 uv,float scale)\n\
                {\n\
                    float time = czm_frameNumber / 60.0;\n\
                    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
                    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
                    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
                    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
                    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
                    return k*w;\n\
                }\n\
            \n\
                void main(void){\n\
                    vec2 resolution = czm_viewport.zw;\n\
                    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                    vec3 finalColor=vec3(0);\n\
                    float c = 0.0;\n\
                    c+=snow(uv,30.)*.0;\n\
                    c+=snow(uv,20.)*.0;\n\
                    c+=snow(uv,15.)*.0;\n\
                    c+=snow(uv,10.);\n\
                    c+=snow(uv,8.);\n\
                c+=snow(uv,6.);\n\
                    c+=snow(uv,5.);\n\
                    finalColor=(vec3(c)); \n\
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), " + val / 10 + "); \n\
            \n\
                }\n\
            ";
    }
    _getRainShader(val) {
        return "uniform sampler2D colorTexture;\n\
            varying vec2 v_textureCoordinates;\n\
        \n\
            float hash(float x){\n\
                return fract(sin(x*133.3)*13.13);\n\
        }\n\
        \n\
        void main(void){\n\
        \n\
            float time = czm_frameNumber / 120.0;\n\
        vec2 resolution = czm_viewport.zw;\n\
        \n\
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
        vec3 c=vec3(.6,.7,.8);\n\
        \n\
        float a=-.4;\n\
        float si=sin(a),co=cos(a);\n\
        uv*=mat2(co,-si,si,co);\n\
        uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
        \n\
        float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
        float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
        c*=v*b; \n\
        \n\
        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), " + val / 10 + ");  \n\
        }\n\
        ";
    }
}

class FogEffect {
    FogStage
    viewer
    constructor(viewer, options) {
        
        this.viewer = viewer;

        options = options || {};
        this.fogByDistance = Cesium.defaultValue(options.fogByDistance, new Cesium.Cartesian4(10, 0.0, 1000, 0.9)); //雾强度 
        this.color = Cesium.defaultValue(options.color, Cesium.Color.WHITE); //雾颜色

        this._show = Cesium.defaultValue(options.show, true);
        this._maxHeight = Cesium.defaultValue(options.maxHeight, 9000);

        this.init();
    }
    init() {
        var that = this;

        this.FogStage = new Cesium.PostProcessStage({
            fragmentShader: `float getDistance(sampler2D depthTexture, vec2 texCoords) 
            { 
                float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); 
                if (depth == 0.0) { 
                    return czm_infinity; 
                } 
                vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); 
                return -eyeCoordinate.z / eyeCoordinate.w; 
            } 
            float interpolateByDistance(vec4 nearFarScalar, float distance) 
            { 
                float startDistance = nearFarScalar.x; 
                float startValue = nearFarScalar.y; 
                float endDistance = nearFarScalar.z; 
                float endValue = nearFarScalar.w; 
                float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); 
                return mix(startValue, endValue, t); 
            } 
            vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) 
            { 
                return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); 
            } 
            uniform sampler2D colorTexture; 
            uniform sampler2D depthTexture; 
            uniform vec4 fogByDistance; 
            uniform vec4 fogColor; 
            varying vec2 v_textureCoordinates; 
            void main(void) 
            { 
                float distance = getDistance(depthTexture, v_textureCoordinates); 
                vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates); 
                float blendAmount = interpolateByDistance(fogByDistance, distance); 
                vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); 
                gl_FragColor = alphaBlend(finalFogColor, sceneColor); 
            } `,
            uniforms: {
                fogByDistance: function fogByDistance() {
                    return that.fogByDistance;
                },
                fogColor: function fogColor() {
                    return that.color;
                }
            },
            enabled: this._show
        });
        
        this.viewer.scene.postProcessStages.add(this.FogStage);

        //加控制，只在相机高度低于一定高度时才开启本效果
        this.viewer.scene.camera.changed.addEventListener(this.camera_changedHandler, this);
    }
    camera_changedHandler(event) {
        if (this.viewer.camera.positionCartographic.height < this._maxHeight) {
            this.FogStage.enabled = this._show;
        } else {
            this.FogStage.enabled = false;
        }
    }
    destroy() {
        this.viewer.scene.camera.changed.removeEventListener(this.camera_changedHandler, this);
        this.viewer.scene.postProcessStages.remove(this.FogStage);
        delete this.FogStage;
        delete this.trength;
        delete this.color;
        delete this.viewer;
    }
}