import React,{useState,useEffect, useRef} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer,CardContent } from './style'
import {Colors as colors} from '../../style'
import data from './data'
// import Lottie from 'react-lottie'
import LottiePlayer from '../Helper/LottiePlayer'

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
        // console.log(cards)
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

    // useEffect(() => {
    //     console.log(`xOff : ${xOff} and yOff : ${yOff}`);
    // }, [xOff,yOff])

    useEffect(() => {
        if(cardRef.current){
            // console.log(cardRef.current)
            setCardDimension(cardRef.current.getBoundingClientRect())
        }
    },[cardRef.current,isSelected])

    var lottieCard = <>
        {card.large && card.lottieCard ? 
            <LottiePlayer lottieCard={card.lottieCard} hover={isSelected} cardDim={cardDimension} factor={card.factor} cardDim={cardDimension}/>
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
        let {clientX : x, clientY :y} = e
        let {width,height,top,left} = cardDimension
        let {pageYOffset:pyoff,innerHeight} = window
        // console.log(`top : ${top} and innerHeight : ${innerHeight}`);
        let window_w = width/2
        let window_h = height/2
        let _top = top > innerHeight ? top - pyoff : top
        x = (x - left)
        y = (y - _top)
        xOff = (x - window_w)/50
        yOff = -(y - window_h)/50
        setXOff(xOff)
        setYOff(yOff)
    }
    return <Cards 
                ref = {cardRef}
                large={card.large} 
                color={card.color} 
                hover={isHover} 
                selectedCard={isSelected}
                otherCard={otherHover}
                xOff={xOff}
                yOff={yOff}
                onMouseMove={(e) => {changeOffsets(e)}}
                onMouseLeave={(e) => {
                    changeHoverCard(e,0);
                    setYOff(0);
                    setXOff(0)
                }}
                onClick={() => {onClick(card.id)}}
                isLottie={card.lottieCard != null}
            >
                <CardContent 
                    isText={true} 
                    selected={isSelected}
                    // onMouseMove={(e) => {changeOffsets(e)}}
                    // onMouseLeave={(e) => {
                    //     changeHoverCard(e,0);
                    //     setYOff(0);
                    //     setXOff(0)
                    // }}
                    // onClick={() => {onClick(card.id)}}
                >
                    <h1>{card.heading}</h1>
                    <text>{card.description}</text>
                    {!isSelected ? lottieCard : <></>}
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


export default Index
