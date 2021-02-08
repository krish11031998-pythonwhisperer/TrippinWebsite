import React, {useState,useEffect} from 'react'
import {ImageStackContainer,ImageContainer} from './style'
const Index = () => {
    let imgs = [...Array(10).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    let [pageX,setPageX] = useState(0);
    let [pageY,setPageY] = useState(0);

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
        <ImageStackContainer>
            {imgs.reverse().map((el,idx) => {
                
                if (idx < 3){
                    let h_offset = idx > 3 ? 40 : 20 * idx
                    return <ImageContainer 
                    src={el}
                    idx={idx} 
                    h_off={h_offset}  
                    isDragged={idx == 0}
                    x_off={pageX}
                    y_off={pageY}
                    // onDragStart={(e) => {onMouseDragStart(e,idx)}} 
                    // onDrag={(e) => {onDrag(e,idx)}}
                    // onDragEnd={(e) => {onMouseDragEnd(e,idx)}}
                    />
                }
            })}
        </ImageStackContainer>
    )
}

export default Index
