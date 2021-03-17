import React, { useState, useRef, useEffect,useContext, useMemo} from 'react'
import {
    ExplorationContainer,
    ExplorationCol,
    ExplorationContent,
    Polaroid
} from './style'
import {useSprings, useSpring, animated, interpolate} from 'react-spring'
import {useGesture,useDrag} from 'react-use-gesture'
import { set } from 'lodash-es'
import {PostContext} from '../../App'

const Index = () => {
    const postContext = useContext(PostContext)
    let cardRef = useRef()
    let [cardDim,setCardDim] = useState({})
    let imgs = useMemo(() => {
        if (!postContext) return [...Array(5).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
        
        console.log('postContext : ',postContext);
        let {images} = postContext.mainStates
        let last = images.length - 1
        return images.slice(last - 5,last)
    },[postContext])
    // let imgs = [...Array(5).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    useEffect(() =>{
        console.log('frame use effect firing! : ',cardRef.current);
        if(cardRef.current){
            var frame = cardRef.current.getBoundingClientRect()
            console.log('frame : ',frame);
            setCardDim(cardRef.current.getBoundingClientRect())
        }
    },[cardRef.current])

    return (
        <ExplorationContainer>
            <ExplorationCol>
                <ExplorationContent>
                    <h1>Make Memories that you can share! </h1>
                    <text>
                        This is sample text here!
                    </text>
                </ExplorationContent>
            </ExplorationCol>
            <ExplorationCol
                ref={cardRef}
            >
                <ImageCarousel
                    images={imgs}
                    containerDim={cardDim}
                />
            </ExplorationCol>
            
        </ExplorationContainer>
    )
}

const ImageCarousel = (props) => {
    let {images,containerDim} = props
    console.log('containerDim : ',containerDim);
    let {width} = containerDim
    let [gone] = useState(() => new Set())
    const from = i => ({x : 0, y : -100,scale: 1.5, rot:0,opacity:0.9})
    const to = i => ({x: 0, y: i * -5 ,scale:1,opacity:1,rot: -10 + Math.random() * 20, delay: i * 100})
    let [springs,setSprings] = useSprings(images.length, i => ({...to(i),from:from(i)}));

    var bind = useDrag(({args:[index],down,movement:[mX],delta:[xDel],direction:[xDir],velocity,distance}) => {
        const trigger = Math.abs(distance) > width * 0.1
        if(!down && trigger)  gone.add(index)
        var dir = xDir < 0 ? -1 : 1
        console.log('dir : ',dir)
        setSprings(i => {
            if(index !== i) return
            const isGone = gone.has(i)
            const x = isGone ? dir * (200 + width) : down ? mX : 0
            const rot = mX/100
            const scale = down ? 1.1 : 1
            const opacity = isGone ? 0 : 1
            return ({x,rot,delay:undefined,opacity, scale, config:{friction: 50, tension: 500}})
        })
        if (!down && gone.size === images.length) setTimeout(() => {
            gone.clear()
            console.log('resetting the polaroids!')
            setSprings(i => to(i))
        }, 600)
    })

    const trans = (x,y,rot,scale) => `translate3d(${x}px,${y}px,0px) rotateX(30deg) rotateY(${rot/10}deg) rotateZ(${rot}deg) scale(${scale})`
    
    return springs.map(({x,y,rot,scale,opacity},i) => {
        let {post:{image:[img],caption}} = images[i]
        console.log(`x : ${x} and y: ${y}`);
        return (
             <Polaroid
                key={i}
                {...bind(i)}
                style={{
                    zIndex: i,
                    opacity,
                    transform: interpolate([x, y,rot,scale],trans)
                }}
            >
                <img src={img}/>
                <text>{caption}</text>
            </Polaroid>
        )
    })
}


export default React.memo(Index)
