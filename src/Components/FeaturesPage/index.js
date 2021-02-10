import React,{useState,useEffect, useRef} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer,CardContent } from './style'
import {Colors as colors} from '../../style'
import data from './data'
import Lottie from 'react-lottie'

const Index = () => {
    let cards = []
    let [colCards,setColCards] = useState([])
    let [hoverCard,setHoverCard] = useState(0);
    let [selectedCard,setSelectedCard] = useState(-1);
    let [showMainText,setShowMainText] = useState(false)
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)

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
        console.log(cards)
        setColCards(cards)
    },[])

    var changeHoverCard = (e,id) => {
        setHoverCard(id);
        setXOff(0)
        setYOff(0)
    }

    var onClick = (id) => {
        if (selectedCard == id){
            setSelectedCard(-1);
        }else{
            setSelectedCard(id)
        }
        
    }


    let col = (pairs,isSelected) => {
        return (<ColumnCards isSelected={isSelected}>
            {pairs.map(el => {
                var isSelected = selectedCard == el.id
                var isHover = hoverCard == el.id
                var card = <FeatureCard
                    card={el}
                    isSelected={isSelected}
                    isHover={isHover}
                    otherHover={hoverCard != 0}
                    changeHoverCard={changeHoverCard}
                    onClick={onClick}
                    hoverCard={hoverCard}
                />
                if (selectedCard == -1 || isSelected){
                    return card
                }
                 
            })}
        </ColumnCards>)
        
    }
    
    var colData = <>
        {colCards.map((pairs,idx) =>{
            var isSelected = (idx * 2 < selectedCard && selectedCard <= (idx + 1) * 2) && selectedCard != -1
                if (selectedCard == -1 || isSelected){
                    // console.log(`sending col : ${idx} ${selectedCard}`)
                    return col(pairs,isSelected)
                }
            })}
    
    </>
    
    
    // let presentWindow = 

    return (
        <FeaturesPageContainer>
            <FeaturesContainer>
                {colData}
            </FeaturesContainer>
        </FeaturesPageContainer>
    )
}


const FeatureCard = (props) => {

    let {card,isSelected,isHover,changeHoverCard,onClick,otherHover,hoverCard} = props
    let [showMainText,setShowMainText] = useState(false)
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)
    let [cardDimension,setCardDimension] = useState({})
    let cardRef = useRef()
    
    useEffect(() =>{
        if(!isSelected){
            if(!otherHover){
                setShowMainText(true)
            }else{
                setShowMainText(false)
            }
        }else{
            if (!showMainText){
                setShowMainText(true)
            }
        }
        
    },[isHover])

    useEffect(() => {
        if(cardRef.current){
            setCardDimension(cardRef.current.getBoundingClientRect())
        }
    },[cardRef.current])

    var lottieCard = <>
        {card.large && card.lottieCard ? 
            <LottiePlayer lottieCard={card.lottieCard} hover={isSelected} cardDim={cardDimension} factor={card.factor}/>
            :   
            <></>
        }
    </>
    var rightCard = <>{isSelected ?
        <CardContent isText={false} selected={isSelected}>
            {lottieCard} 
        </CardContent> : 
        <></>
    }</>
    
    var changeOffsets = (e) => {
        if(hoverCard != card.id){
            changeHoverCard(e,card.id)
        }
        let window_w = cardDimension.width/2
        let window_h = cardDimension.height/2
        let {clientX : x, clientY :y} = e
        x = (x - cardDimension.left);
        y = (y - cardDimension.top);
        setXOff((x - window_w)/15)
        setYOff(-(y - window_h)/15)
    }
    return <Cards 
                ref = {cardRef}
                large={card.large} 
                color={card.color} 
                hover={isHover} 
                // hover={false} 
                selectedCard={isSelected}
                otherCard={otherHover}
                xOff={xOff}
                yOff={yOff}
                onMouseMove={(e) => {changeOffsets(e)}}
                onMouseLeave={(e) => {changeHoverCard(e,0);setYOff(0);setXOff(0)}}
                onClick={() => {onClick(card.id)}}
                isLottie={card.lottieCard != null}
            >
                <CardContent 
                    isText={true} 
                    selected={isSelected}
                >
                    <h1>{card.heading}</h1>
                    <text>{card.description}</text>
                    {!isSelected ? lottieCard : <></>}
                    {/* <br/>
                    <text>{`clientX : ${xOff} clientY  : ${yOff}`}</text> */}
                    {showMainText && isSelected ? card.mainText ? <ul>{card.mainText.map(point => <li><text>{point}</text></li>)}</ul> : <text></text> : <></>}
                </CardContent>
                {isSelected ? 
                    <CardContent isText={false} selected={isSelected}>
                    {lottieCard} 
                    </CardContent> : 
                    <></>
                }
    
            </Cards>
}

const LottiePlayer = (props) =>{
    let [animatableData,setAnimatableData] = useState()
    let {lottieCard,hover,factor,cardDim} = props
    let [cardWidth,setCardWidth] = useState(0)
    let checkHeight = () => {
        let {innerWidth:width} = window
        setCardWidth(width * 0.15)
    }

    useEffect(() => {
        if (lottieCard){
            setAnimatableData(lottieCard)
        }
        checkHeight()
    },[])

    window.addEventListener('resize',checkHeight)

    

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: animatableData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
        
    };

    return animatableData ? <Lottie 
            options={defaultOptions} 
            height={cardWidth}
            width={cardWidth}
            isPaused={!hover}
        />
        :
        <div>
            Loading...
        </div>
}


export default Index
