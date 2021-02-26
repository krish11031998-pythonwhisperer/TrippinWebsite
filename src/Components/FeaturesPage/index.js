import React,{useState,useEffect, useRef} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer,CardContent,CardOutline, ExpandedCard } from './style'
import {Colors as colors,PageHeader} from '../../style'
import data from './data'
// import Lottie from 'react-lottie'
import LottiePlayer from '../Helper/LottiePlayer'
import {useSpring,animated, config} from 'react-spring'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

const Index = () => {
    let cards = []
    let [colCards,setColCards] = useState([])
    let [hoverCard,setHoverCard] = useState(-1);
    let [selectedCard,setSelectedCard] = useState(-1);
    let [showMainText,setShowMainText] = useState(false)
    let [cardDim,setCardDim] = useState()
    let [reset,setReset] = useState(false)
    let cardRef = useRef(null)

    let temp = []
    
    useEffect(() => {
        data.forEach((el,idx) => {
            if(idx != 0 && idx % 2 == 0){
                cards.push(temp)
                temp = []
            }
            var el_obj = {id:idx+1,...el}
            temp.push(el_obj)
        })
        if (temp.length > 0){
            cards.push(temp)
            temp = []
        }
        setColCards(cards)
    },[])

    useEffect(() => {   
        let {current:frame} = cardRef
        if(frame){
            var dim = frame.getBoundingClientRect()
            console.log('parentDim :',dim);
            setCardDim(dim);
        }
    }, [cardRef])

    var changeHoverCard = (id) => {
        setHoverCard(id);
    }

    var onClick = (id) => {
        if (selectedCard == id){
            setSelectedCard(-1);
        }else{
            setSelectedCard(id)
        }
        
    }


    let col = (pairs,isSelected,otherSelected,_idx) => {
        return (<ColumnCards isSelected={isSelected} otherSelected={otherSelected}>
            {pairs.map((el,idx) => {
                var isSelected = selectedCard == el.id
                var isHover = hoverCard == el.id
                var card = <FeatureCard
                    idx={idx + 2 * _idx}
                    parentDim={cardDim}
                    card={el}
                    isSelected={isSelected}
                    otherSelected={selectedCard != -1}
                    isHover={isHover}
                    otherHover={hoverCard != -1}
                    changeHoverCard={changeHoverCard}
                    onClick={onClick}
                    hoverCard={hoverCard}
                />
                // if (selectedCard == -1 || isSelected){
                    return card
                // }
                 
            })}
        </ColumnCards>)
        
    }
    
    var colData = <>
        {colCards.map((pairs,idx) =>{
            var isSelected = (idx * 2 < selectedCard && selectedCard <= (idx + 1) * 2)
            var otherSelected = selectedCard != -1
                // if (selectedCard == -1 || isSelected){
                    return col(pairs,isSelected,otherSelected,idx)
                // }
            })}
    
    </>

    return (
        <FeaturesPageContainer id="featurePage" ref={cardRef}>
            <PageHeader>Features</PageHeader>
                <FeaturesContainer onMouseEnter={() => reset && setReset(reset => !reset)} onMouseLeave={() => !reset && setReset(reset => !reset)}>
                    {colData}
                </FeaturesContainer>
            {/* <AnimateSharedLayout>
                <FeaturesContainer>
                    {colData}
                </FeaturesContainer>
                <AnimatePresence>
                    {selectedCard && <ExpandedCardComponent card={data.filter(el=> el.id == selectedCard)} onClick={onClick} isSelected={selectedCard != -1} />}
                </AnimatePresence>
            </AnimateSharedLayout> */}
            
        </FeaturesPageContainer>
    )
}

const ExpandedCardComponent = (props) => {
    let {card,isSelected,onClick} = props;

    useEffect(() => {
        console.log('CardData is :',card)
    }, [card])
    return <>
        {isSelected && <ExpandedCard
            onClick={() => {onClick(-1)}}
        >
            <CardContent>
                <motion.h5>{card.heading}</motion.h5>
                <motion.h2>{card.description}</motion.h2>
            </CardContent>
            {card.large && <LottiePlayer lottieCard={card.lottieCard} factor={card.factor}/>}

        </ExpandedCard>}
    
    </>


}


const FeatureCard = (props) => {

    let {card,isSelected,isHover,changeHoverCard,onClick,otherHover,otherSelected,parentDim,idx} = props
    let [showMainText,setShowMainText] = useState(false)
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)
    let [cardDimension,setCardDimension] = useState(null)
    let cardRef = useRef();
    const [spring, setSpring] = useSpring(() => ({ xys: [0, 0, 1], 
        // config: { mass: 5, tension: 200, friction: 40 },
        config: config.gentle  
    }))

    var resetAll = () => {
        setSpring({xys: [0,0,1]})
    }

    let {pageYOffset:pyoff,innerHeight,innerWidth} = window

    useEffect(() => {
        let el = document.getElementById(`feature-${idx}`)
        el.style.transform =  !isHover && !otherHover && `perspective(${(cardDimension ? cardDimension.height : 0) + 100}px) rotateX(0deg) rotateY(0deg) scale(1)`
    },[isHover,otherHover])

    useEffect(() => {
        if(cardRef.current){
            // console.log('className : ',cardRef.current)
            var cardDim = cardRef.current.getBoundingClientRect()
            setCardDimension(cardDim)
        }
    },[cardRef.current,isSelected])

    var lottieCard = card.large && card.lottieCard && <LottiePlayer margin={true} lottieCard={card.lottieCard} factor={card.factor} cardDim={cardDimension}/>

    var normalize = (val,min=-10,max=10) => {
        var res =  (val - min)/(max - min)
        console.log('res from normalize : ',res);
        return Math.abs(res) >= 1 || Math.abs(res) <= 0 ? res : res < 0 ? -1 : 1 
    }

    var changeOffsets_spring = (e) => {
        let limit = 5
        let {clientX : x, clientY :y} = e
        let {width,height,top,left} = cardDimension
        let window_w = width/2
        let window_h = height/2
        top -= top > pyoff && pyoff
        x = (x - left)
        y = (y - top)
        changeHoverCard(card.id)
        xOff = (x - window_w)/20
        yOff = -(y - window_h)/20
        // xOff = Math.abs(xOff) <= 10 ? xOff : 10 * xOff < 0 ? -1 : 1
        // yOff = Math.abs(yOff) <= 10 ? yOff : 10 * yOff < 0 ? -1 : 1
        xOff = Math.abs(xOff) > 10 ? normalize(xOff) * 10 : xOff
        yOff = Math.abs(yOff) > 10 ? normalize(yOff) * 10 : yOff
        setSpring({xys: [yOff,xOff,1]})
    }


    var onLeave = (e) => {
        console.log('OnLeave is being called!')
        setSpring({xys: [0,0,1]})
        changeHoverCard(-1)
    }

    const trans = (x, y, s) => `perspective(${(cardDimension ? cardDimension.height : 0) + 100}px) rotateX(${isHover && !isSelected ? x : 0}deg) rotateY(${isHover && !isSelected ? y : 0}deg) scale(${isHover || isSelected ? s : otherHover  && 0.9})`

    var mainCard =  <Cards 
                id={`feature-${idx}`}
                ref = {cardRef}
                large={card.large} 
                color={card.color} 
                hover={isHover} 
                selectedCard={isSelected}
                otherSelected={otherSelected}
                // xOff={spring.xys[0]}
                // yOff={spring.xys[1]}
                onMouseMove={changeOffsets_spring}
                onMouseLeave={onLeave}
                onClick={() => {onClick(card.id)}}
                isLottie={card.lottieCard != null}
                style={{transform: spring.xys.interpolate(trans)}}

            >
                <CardContent 
                    // style={{ transform: spring_props.xys.interpolate(trans)}}
                    isText={true} 
                    selected={isSelected}
                >
                    <h1>{card.heading}</h1>
                    <text>{card.description}</text>
                    {!isSelected  && lottieCard}
                    {showMainText && isSelected && card.mainText && <ul>{card.mainText.map(point => <li><text>{point}</text></li>)}</ul>}
                </CardContent>
                {isSelected && <CardContent isText={false} selected={isSelected}>{lottieCard}</CardContent>}
    
            </Cards>

    // return <CardOutline
    //         large={card.large} 
    //         color={card.color}
    //         onMouseMove={changeOffsets_spring}
    //             // onMouseEnter={(e) => {changeHoverCard(true)}}
    //             onMouseLeave={onLeave}
    //         >
    //     {mainCard}
    // </CardOutline>
    return mainCard
}


export default Index
