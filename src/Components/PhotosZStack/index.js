import React, {useState,useEffect,useRef,useMemo} from 'react'
import {ImageStackContainer,ImageContainer,Image} from './style'
import {motion} from 'framer-motion'
import {animated,useTransition} from 'react-spring'


Number.prototype.dynamicDimension = function(h){
    let idx = this
    console.log('height: ',h)
    var height = h - (idx > 3 ? 60 : 30 * idx)
    var left = idx > 3 ? 40 : 20 * idx
    var top = idx > 3 ? 40 : 20 * idx
    var zIndex = idx == 0 ? -1 : (idx * -1) - 1
    return {height,top,left,zIndex}
  }
  

const Index = () => {
    let imgs = [...Array(10).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    let [changeCard,setChangeCard] = useState(false);
    let [idx,setIdx] = useState(-1);
    let containerRef = useRef()
    let [max_height,setMaxHeight] = useState(0)
    let images = useMemo(() => {
        setChangeCard(false)
        return updateImages()
    },[idx])

    var updateStyle = (height,left,top,zIndex,key) => {
        var left_off = 20
        var top_off = 20
        var height_off = 30
        var zIndex_off = 1
        return ({height:height+height_off,left:left+left_off,top:top+top_off,zIndex:zIndex+zIndex_off})

    }

    let transition = useTransition(images,image => image.key,{
        from: ({height,left,top,zIndex,key}) => ({opacity:0,height,left,top,zIndex}),
        enter: ({height,left,top,zIndex,key}) => ({opacity:1,height,left,top,zIndex}),
        update:({height,left,top,zIndex,key}) => (updateStyle(height,left,top,zIndex,key)),
        leave:({height,left,top,zIndex,key}) => ({opacity:0,left: key == idx ? -50 : 0})
    })
    
    useEffect(() => {
        // setImage(imgs)
        setIdx(0)
        setInterval(() => {
            console.log('10 seconds elapsed')
            setChangeCard(true)
        }, 10000);
    }, [])

    useEffect(() => {
        let {current:frame} = containerRef
        if(frame && max_height == 0){
            setMaxHeight(frame.offsetHeight - 100)
        }
    },[containerRef])

    useEffect(() => {
        if(changeCard){
            setIdx(idx => idx < imgs.length - 1 ? idx + 1 : 0)
        }
    },[changeCard])

    var imgUpdate

    function updateImages(){
        var _imgs = []
        console.log('idx (in updateImages function) : ',idx)
        if (imgs == null){
            return _imgs
        }
        let max = imgs.length
        if (idx <= max - 3){
            _imgs = [...imgs.slice(idx,idx+3)]
        }else{
            let diff = max - idx
            _imgs = [...imgs.slice(idx),...imgs.slice(0,(3-diff))]
        }
        console.log('imgs.length :',imgs.length);
        return _imgs.map((el,_idx) => {
            var cardDim = _idx.dynamicDimension(containerRef && max_height || 400)
            var result = {img:el,key:idx + _idx,...cardDim}
            console.log('result : ',result);
            return result
        });
    }

    return (
        <ImageStackContainer ref ={containerRef}>
            <div>
                {transition.reverse().map(({item,key,props:style}) => {
                    // {images.map((el,id) => {
                        let current = key == 0
                        return <ImageCard card={item.img} style={style} key={key} />
                })}
            </div>
            
        </ImageStackContainer>
    )
}

const ImageCard = (props) => {
    let {card,style,key} = props;
    // let [cardHeight,setCardHeight] = useState(0)
    let {left,top,zIndex,...rest} = style;
    let cardRef = useRef()
    console.log('style : ',style)

    return <Image
                key={key}
                style={{
                    left:left.interpolate(left => `${left}px`),
                    top:top.interpolate(top => `${top}px`),
                    zIndex:zIndex.interpolate(zIndex => `${zIndex}px`),
                    // transform:left.interpolate(left => `translate3d(${left},0,0)`),
                    ...rest
                }}
                ref = {cardRef}
                src={card}
            />
}


export default Index
