/* global Cesium */
/* global viewer */
import React, { Component } from 'react';
import {Slider} from 'antd'
import styles from './style.less'
import colorPost from './post'
import { connect } from 'dva'

@connect(({BaseMap,Map }) => ({
    BaseMap,Map
  }))
class PostProcess extends Component {
    constructor(props){
        super(props);
        const {checkedKey} =this.props.BaseMap;
        let storage = window.localStorage;
        let info=storage.getItem(checkedKey) || '{}';
        info=JSON.parse(info);
        this.state={
            brightness:info.brightness || 1.0,
            saturation: info.saturation || 1.0,
            contrast: info.contrast || 1.0,
        }
    }
    componentWillReceiveProps(newPorps){
        const {checkedKey} =this.props.BaseMap;
        let newMapKey=newPorps.BaseMap.checkedKey;
       
        //切换底图（实景和电子）
        if(newMapKey && checkedKey!==newMapKey){
            let storage = window.localStorage;
            let info=storage.getItem(newMapKey) || '{}';
            info=JSON.parse(info);
            this.setState({
                brightness:info.brightness || 1.0,
                saturation: info.saturation || 1.0,
                contrast: info.contrast || 1.0,
            });
            this.stage.uniforms.brightness= info.brightness || 1.0;
            this.stage.uniforms.saturation= info.saturation || 1.0;
            this.stage.uniforms.contrast= info.contrast || 1.0;
        }
      }

    componentDidMount(){
        const {brightness,saturation,contrast} =this.state;
        let stage=undefined;
        if(!viewer.scene.postProcessStages.contains(colorPost)){
            stage=viewer.scene.postProcessStages.add(colorPost);
        }else{
            stage=colorPost;
        }
        this.stage=stage;
        this.stage.enabled=true;
        this.stage.uniforms.brightness= brightness;
        this.stage.uniforms.saturation= saturation;
        this.stage.uniforms.contrast= contrast;
    }
    init=()=>{

    }
    
    onChange=(value,type)=>{
        console.log(value,type);
        this.stage.uniforms[type]= value;

        let parem={};
        parem[type]=value;

        this.setState(parem);
    }

    //保存参数到缓存localStorage
    saveUniforms=()=>{
        const {checkedKey} =this.props.BaseMap;
        // key==='DIGITAL'
        var storage = window.localStorage;
        storage.removeItem(checkedKey);
        let info={
            "brightness":this.stage.uniforms.brightness,
            "saturation":this.stage.uniforms.saturation,
            "contrast":this.stage.uniforms.contrast
        };
        storage.setItem(checkedKey, JSON.stringify(info));
        this.props.dispatch({
            type: 'Map/setToolsActiveKey',
            payload: ''
          })
    }
    close=()=>{
        this.props.dispatch({
            type: 'Map/setToolsActiveKey',
            payload: ''
        })
    }
    reset=()=>{
        this.stage.uniforms.brightness= 1.0;
        this.stage.uniforms.saturation= 1.0;
        this.stage.uniforms.contrast= 1.0;
        var storage = window.localStorage;
        storage.clear();
        this.setState({
            brightness:1.0,
            saturation:1.0,
            contrast:1.0,
        });
    }
    render() {
        const {brightness,saturation,contrast} =this.state;
        return (
            <div className={styles.box}>
                <div className={styles.close} onClick={()=>{this.close()}}><span className="iconfont icon_add1"></span></div>
                <div className={styles.item}>
                    <span>亮度</span>
                    <Slider tooltipVisible={false} min={0} max={3} step={0.01}  value={brightness} onChange={(value)=>{this.onChange(value,"brightness")}}/>
                </div>
                <div className={styles.item}>
                    <span>饱和度</span>
                    <Slider tooltipVisible={false} min={0} max={3} step={0.01}  value={saturation}  onChange={(value)=>{this.onChange(value,"saturation")}}/>
                </div>
                <div className={styles.item}>
                    <span>对比度</span>
                    <Slider tooltipVisible={false} min={0} max={3} step={0.01}  value={contrast} onChange={(value)=>{this.onChange(value,"contrast")}}/>
                </div>
                <div className={styles.btn}>
                    <span onClick={()=>{this.saveUniforms()}}>保存</span>
                </div>
            </div>
        );
    }
}

export default PostProcess;