import React,{useState,useEffect, useRef} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer,CardContent,CardOutline, ExpandedCard } from './style'
import {Colors as colors,PageHeader} from '../../style'
import data from './data'
// import Lottie from 'react-lottie'
import LottiePlayer from '../Helper/LottiePlayer'
import {useSpring,animated} from 'react-spring'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

const Index = () => {
    let cards = []
    let [colCards,setColCards] = useState([])
    let [hoverCard,setHoverCard] = useState(-1);
    let [selectedCard,setSelectedCard] = useState(-1);
    let [showMainText,setShowMainText] = useState(false)
    // let [xOff,setXOff] = useState(0)
    // let [yOff,setYOff] = useState(0)

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
        console.log('hoverCard :',hoverCard)
    },[hoverCard])

    var changeHoverCard = (id) => {
        setHoverCard(id);
        // setXOff(0)
        // setYOff(0)
    }

    var onClick = (id) => {
        if (selectedCard == id){
            setSelectedCard(-1);
        }else{
            setSelectedCard(id)
        }
        
    }


    let col = (pairs,isSelected,otherSelected) => {
        return (<ColumnCards isSelected={isSelected} otherSelected={otherSelected}>
            {pairs.map(el => {
                var isSelected = selectedCard == el.id
                var isHover = hoverCard == el.id
                var card = <FeatureCard
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
                    return col(pairs,isSelected,otherSelected)
                // }
            })}
    
    </>

    return (
        <FeaturesPageContainer id="featurePage">
            <PageHeader>Features</PageHeader>
                <FeaturesContainer>
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

    let {card,isSelected,isHover,changeHoverCard,onClick,otherHover,otherSelected} = props
    let [showMainText,setShowMainText] = useState(false)
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)
    let [cardDimension,setCardDimension] = useState(null)
    let cardRef = useRef();


    let {pageYOffset:pyoff,innerHeight} = window

    // useEffect(() => {
    //     console.log(`otherSelected : `,otherSelected)
    // },[otherSelected])

    useEffect(() => {
        if(cardRef.current){
            var cardDim = cardRef.current.getBoundingClientRect()
            setCardDimension(cardDim)
        }
    },[cardRef.current,isSelected])

    var lottieCard = card.large && card.lottieCard && <LottiePlayer lottieCard={card.lottieCard} factor={card.factor} cardDim={cardDimension}/>

    var changeOffsets_spring = (e) => {
        let limit = 5
        let {clientX : x, clientY :y} = e
        let {width,height,top,left} = cardDimension
        // changeHoverCard(card.id)
        let window_w = width/2
        let window_h = height/2
        let _top = top > innerHeight ? top - pyoff : top
        x = (x - left)
        y = (y - _top)
        changeHoverCard(card.id)
        // xOff = ((x - window_w)/100) * limit
        // yOff = (-(y - window_h)/100) * limit
        // setXOff(Math.abs(xOff) > limit ? xOff > 0 ? limit : -limit : xOff)
        // setYOff(Math.abs(yOff) > limit ? yOff > 0 ? limit : -limit : yOff)
        xOff = (x - window_w)/100
        yOff = -(y - window_h)/100
        setXOff(xOff)
        setYOff(yOff)
        // set({xys: [yOff,xOff,1]})
    }


    var onLeave = (e) => {
        changeHoverCard(-1);
        setYOff(0);
        setXOff(0);
        // set({ xys: [0, 0, 1] })

    }

    // const trans = (x, y, s) => `perspective(100px) rotateX(${isHover && !isSelected ? x : 0}deg) rotateY(${isHover && !isSelected ? x : 0}deg) scale(${isHover && !isSelected ? s : otherHover ? 0.9 : s})`
    var cardProps = {
        scale: !isSelected ? isHover ? 1.05 : otherHover && 0.9 : 1,
        rotateX: !isSelected ? yOff : 0,
        rotateY: !isSelected ? xOff : 0,
    }
    var mainCard =  <Cards 
                ref = {cardRef}
                large={card.large} 
                color={card.color} 
                hover={isHover} 
                selectedCard={isSelected}
                otherSelected={otherSelected}
                onMouseMove={changeOffsets_spring}
                onMouseLeave={onLeave}
                onClick={() => {onClick(card.id)}}
                isLottie={card.lottieCard != null}
                whileHover={cardProps}
                whileTap={{scale : 0.9}}
                exit={{scale: 1}}
                transition={{
                    
                    rotateX:{ type: "ease", stiffness: 300, damping: 30 },
                    duration: 0.3
                }}
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
