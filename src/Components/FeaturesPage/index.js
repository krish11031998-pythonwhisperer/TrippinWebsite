import React,{useState,useEffect, useRef, useReducer, useCallback,useMemo} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer,CardContent,CardOutline, ExpandedCard } from './style'
import {Colors as colors,PageHeader} from '../../style'
import data from './data'
// import Lottie from 'react-lottie'
import LottiePlayer from '../Helper/LottiePlayer'
import {useSpring,animated, config, interpolate} from 'react-spring'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import useMeasure from '../../Helpers/useMeasure'

const Index = () => {

    let initialState = {
        hoverCard : -1,
        selectedCard : -1,
        showMainText : false,
        reset: false
    }

    const reduce = (state,action) => {
        var {type,val} = action
        var {hoverCard,selectedCard,showMainText,reset} = state
        switch(type){
            case 'hover':
                state = {...state,hoverCard : val}
                break;
            case 'select':
                state = {...state,selectedCard: val}
                break;
            case 'reset':
                state = {...state, reset: !reset}
                break;
            default:
                console.log('Default : No appropriate log!')
        }
        return state
    }

    var [state,dispatch] = useReducer(reduce,initialState)

    let colCards = useMemo(() => {
        var cards = []
        var temp = []
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
        return cards
    },[data])

    let [showMainText,setShowMainText] = useState(false)
    let [bind,measure] = useMeasure()
    let{hoverCard,selectedCard,reset} = state

    var changeHoverCard = useCallback((id) => {
        dispatch({type:'hover',val:id})
    },[hoverCard]) 

    var onClick = useCallback((id) => {
        dispatch({type: 'select',val: selectedCard == id ? -1 : id})
    },[selectedCard])


    let col = (pairs,isSelected,otherSelected,_idx) => {
        return (<ColumnCards isSelected={isSelected} otherSelected={otherSelected}>
            {pairs.map((el,idx) => {
                var isSelected = selectedCard == el.id
                var isHover = hoverCard == el.id
                var card = <FeatureCard
                    idx={idx + 2 * _idx}
                    parentDim={measure}
                    card={el}
                    isSelected={isSelected}
                    otherSelected={selectedCard != -1}
                    isHover={isHover}
                    otherHover={hoverCard != -1}
                    changeHoverCard={changeHoverCard}
                    onClick={onClick}
                    hoverCard={hoverCard}
                />
                    return card
            })}
        </ColumnCards>)
        
    }
    
    var colData = <>
        {colCards.map((pairs,idx) =>{
            var isSelected = (idx * 2 < selectedCard && selectedCard <= (idx + 1) * 2)
            var otherSelected = selectedCard != -1
            return col(pairs,isSelected,otherSelected,idx)
            })}
    
    </>

    return (
        <FeaturesPageContainer id="featurePage" 
            {...bind}
        >
            <PageHeader>Features</PageHeader>
            <FeaturesContainer onMouseEnter={() => reset && dispatch({type : 'reset'})} onMouseLeave={() => !reset && dispatch({type : 'reset'})}>
                    {colData}
                </FeaturesContainer>
        </FeaturesPageContainer>
    )
}

const ExpandedCardComponent = (props) => {
    let {card,isSelected,onClick} = props;
    return <>
         <ExpandedCard
            onClick={() => {onClick(-1)}}
        >
            <CardContent>
                <motion.h5>{card.heading}</motion.h5>
                <motion.h2>{card.description}</motion.h2>
            </CardContent>
            {card.large && <LottiePlayer lottieCard={card.lottieCard} factor={card.factor}/>}

        </ExpandedCard>
    
    </>


}


const FeatureCard = (props) => {

    var initialState = {
        showMainText : false,
        xOff:0,
        yOff:0,
        cardDimension:null
    }

    const reducer = (state,action) => {
        var {type,val} = action 
        var {showMainText} = state
        switch(type){
            case 'mainText':
                state = {...state,showMainText : !showMainText}
                break;
            case 'xy':
                var [x,y] = val
                state = {...state,xOff:x,yOff:y}
                break;
            case 'cardDim':
                state = {...state,cardDimension : val}
                break;
            default:
                console.log('Default Val!')
        }
        return state
    }

    var [state,dispatch] = useReducer(reducer,initialState)
    let {showMainText,xOff,yOff,cardDimension} = state
    let {card,isSelected,isHover,changeHoverCard,onClick,otherHover,otherSelected,parentDim,idx} = props
    let cardRef = useRef();
    const [spring, setSpring] = useSpring(() => ({ x:0, y:0, s:1,
        config: config.gentle,  
    }))

    var resetAll = () => {
        setSpring({xys: [0,0,1]})
    }

    let {pageYOffset:pyoff,innerHeight,innerWidth} = window

    useEffect(() => {
        if(otherSelected){
            var s = isSelected ? 1 : 0
            setSpring({x:0,y:0,s})
        }
    },[isSelected,otherSelected])

    useEffect(() => {
        let el = document.getElementById(`feature-${idx}`)
        el.style.transform =  !isHover && !otherHover && `perspective(${(cardDimension ? cardDimension.height : 0) + 100}px) rotateX(0deg) rotateY(0deg) scale(1)`
    },[isHover,otherHover])

    useEffect(() => {
        if(cardRef.current){
            var cardDim = cardRef.current.getBoundingClientRect()
            dispatch({type : 'cardDim', val:cardDim})
        }
    },[cardRef.current])

    var lottieCard = card.large && card.lottieCard && <LottiePlayer margin={true} lottieCard={card.lottieCard} factor={card.factor} cardDim={cardDimension}/>

    var normalize = (val,min=-10,max=10) => {
        var res =  (max - val)/(max - min)
        return res
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
        xOff = Math.abs(xOff) > 10 ? normalize(xOff) : xOff
        yOff = Math.abs(yOff) > 10 ? normalize(yOff) : yOff
        // setSpring({xys: [yOff,xOff,1]})
        setSpring({x:yOff,y:xOff,s:1})
        
    }


    var onLeave = (e) => {
        setSpring({x:0,y:0,s:1})
        changeHoverCard(-1)
    }

    const trans = (x, y, s) => `perspective(${(cardDimension ? cardDimension.height : 0) + 100}px) rotateX(${isHover && !isSelected ? x : 0}deg) rotateY(${isHover && !isSelected ? y : 0}deg) scale(${isHover || isSelected ? s : otherHover  && 0.9})`

    var mainCard =  <Cards 
                id={`feature-${idx}`}
                ref = {cardRef}
                large={card.large} 
                color={colors.tomato} 
                hover={isHover} 
                selectedCard={isSelected}
                otherSelected={otherSelected}
                onMouseMove={changeOffsets_spring}
                onMouseLeave={onLeave}
                onClick={() => {onClick(card.id)}}
                isLottie={card.lottieCard != null}
                style={{
                    transform: interpolate([spring.x,spring.y,spring.s],trans)
                }}

            >
                <CardContent 
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
    return mainCard
}


export default Index
