import React, {useState,useEffect,useRef} from 'react'
import {ImageStackContainer,ImageContainer} from './style'
const Index = () => {
    let imgs = [...Array(10).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    let [pageX,setPageX] = useState(0);
    let [pageY,setPageY] = useState(0);
    let containerRef = useRef()
    useEffect(() => {
        let innerWidth = window.innerWidth
        let innerHeight = window.innerHeight
        console.log(`innerWidth : ${innerWidth}`)
        console.log(`innerHeight : ${innerHeight}`)
    }, [])


    let onMouseDragStart = (e,idx) =>{
        if(idx == 0){
            // console.log(e)
            let {pageX,pageY} = e;
            console.log(`DragStart : pageX : ${pageX} pageY : ${pageY}`)
            
        }
    }
    

    let onDrag = (e,idx) => {
        if (idx == 0){
            let {pageX,pageY} = e
            console.log(e)
            
            // setPageX(innerWidth - pageX)
            // setPageY(innerHeight - pageY)
            setPageX(pageX)
            setPageY(pageY)
        }
    }

    let onMouseDragEnd = (e,idx) =>{
        if(idx == 0){
            let {pageX,pageY} = e;
            console.log(`DragEnd : pageX : ${pageX} pageY : ${pageY}`)
            setPageY(0)
            setPageX(0)
        }
    }

    return (
        <ImageStackContainer ref ={containerRef}>
            {imgs.reverse().map((el,idx) => {
                
                if (idx < 3){
                    let h_offset = idx > 3 ? 40 : 20 * idx;
                    return <ImageCard card = {el} idx = {idx} forRef={containerRef}/>
                }
            })}
        </ImageStackContainer>
    )
}

const ImageCard = (props) => {
    let {card,idx,forRef} = props;
    let [cardHeight,setCardHeight] = useState(0)
    let cardRef = useRef()

    useEffect(() => {
        if(forRef.current){
            let {offsetHeight} = forRef.current
            let h = gethOff(offsetHeight - 20)
            console.log('imageCard offset ',h)
            setCardHeight(h)
        }
    },[forRef.current])

    const gethOff = (h) =>{
        return h - (idx > 3 ? 60 : 30 * idx)
    } 
    return <ImageContainer
                ref = {cardRef}
                src={card}
                idx={idx} 
                h_off={cardHeight}  
                isDragged={idx == 0}
            />
}

export default Index
