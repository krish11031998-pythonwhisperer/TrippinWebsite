import React, {useState,useEffect,useRef,useMemo} from 'react'
import {ImageStackContainer,ImageContainer,Image} from './style'
import {motion} from 'framer-motion'
const Index = () => {
    let imgs = [...Array(10).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    let [pageX,setPageX] = useState(0);
    let [pageY,setPageY] = useState(0);
    let [changeCard,setChangeCard] = useState(false);
    let [idx,setIdx] = useState(-1);
    let containerRef = useRef()
    let image = useMemo(() => {
        return updateImages()
    },[idx])
    // let[image,setImage] = useState([])
    
    useEffect(() => {
        // setImage([...imgs.slice(0,3)])
        setIdx(0)
        console.log('imgs.length : ',imgs.length)
        setInterval(() => {
            console.log('10 seconds elapsed')
            setChangeCard(true)
        }, 10000);
    }, [])


    useEffect(() => {
        if (changeCard){
            setTimeout(() => {
                setIdx(idx => idx < imgs.length - 1 ? idx + 1 : 0)
            },150)
            setTimeout(() => {
                setChangeCard(state => !state)
            },300)
            // setIdx(idx => idx < imgs.length - 1 ? idx + 1 : 0)
        }
    },[changeCard])





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
        return _imgs
    }

    return (
        <ImageStackContainer ref ={containerRef}>
            {/* {imgs.reverse().map((el,id) => {
                let current = id == idx
                if(id >= idx &&  id < idx + 3){
                    let _idx = id - idx
                    // console.log(`id : ${id} idx: ${idx} _idx: ${_idx}`);
                    return <ImageCard 
                        card = {el} 
                        idx = {_idx} 
                        forRef={containerRef} 
                        removeCard={changeCard}
                        current={current}
                    />
                }
            })} */}
            {image.map((el,id) => {
                let current = id == 0
                    return <ImageCard 
                        card = {el} 
                        idx = {id} 
                        forRef={containerRef} 
                        removeCard={changeCard}
                        current={current}
                    />
            })}
        </ImageStackContainer>
    )
}

const ImageCard = (props) => {
    let {card,idx,forRef,current,removeCard} = props;
    let [cardHeight,setCardHeight] = useState(0)
    let cardRef = useRef()

    useEffect(() => {
        if(forRef.current){
            let {offsetHeight} = forRef.current
            let h = gethOff(offsetHeight - 100)
            // console.log('imageCard offset ',h)
            setCardHeight(h)
        }
    },[forRef.current,idx])

    const gethOff = (h) =>{
        // console.log(`idx : `,idx);
        return h - (idx > 3 ? 60 : 30 * idx)
    } 

    return <Image
                ref = {cardRef}
                src={card}
                idx={idx} 
                h_off={cardHeight}  
                // isDragged={idx == 0}
                removeCard={removeCard}
                current={current}
            />
}

export default Index
