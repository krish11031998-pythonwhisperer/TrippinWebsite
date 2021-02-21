import React,{useState,useRef,useEffect} from 'react'
import {TransitionGroup} from 'react-transition-group'; // ES6s
import {Colors as colors} from '../../style'
import LottiePlayer from '../Helper/LottiePlayer'
import {
    IntroTab,
    IntroContainer,
    IntroSectionTab,
    IntroRow,
    FallDownCard,
    SummaryStatement
} from './style'
import {ProblemStatement as Problem,SolutionStatement as Solution} from './data'
const Index = () => {

    return (
        <IntroTab>
            <IntroSectionTab dir={"top"} colorone={colors.secondary} colortwo={colors.secondary}>
                <IntroSection 
                    heading={"Problem"} 
                    statement={Problem}
                    reverse={false}
                    mode={"dark"}
                />
            </IntroSectionTab>
            
            <IntroSectionTab dir={"top"} colorone={colors.white} colortwo={colors.white}>
                <IntroSection
                    heading = {"Solution"}
                    statement = {Solution}
                    reverse={false}
                    mode={"light"}
                />
            </IntroSectionTab>
        </IntroTab>
    )
}


const IntroSection = (props) =>{
    let {heading,statement,reverse,mode} = props
    let [hoverCard,setHoverCard] = useState(0);
    let [selectedCard,setSelectedCard] = useState(0);
    let [showCard,setShowCard] = useState(false)

    let {title:mainTitle,overview:mainOverview,textColor,mainImg,animation} = statement[0]

    let changeHoverCard = (id) =>{
        if(hoverCard != id){
            setHoverCard(id)
        }
    }

    let changeSelectedCard = (id) =>{
        if(selectedCard != id){
            setSelectedCard(id)
        }
    }
    useEffect(() =>{
        
        if (selectedCard != 0){
            console.log(selectedCard)
            setShowCard(true)
        }else{
            setShowCard(false)
        }
    },[selectedCard])

    var FallCard = () => {
        console.log('selectedCard : ',selectedCard);
        if (selectedCard == 0) return <></>
        let {title,overview,description,color,textColor} = statement.filter(({id}) => id == selectedCard)[0]
        return <> 
            <FallDownCard showCard={showCard} changeColor={color}  textColor={textColor}>
                <h1>{title}</h1>
                <text>{overview}</text>
                <text>{description}</text>
                <text className="button"  textColor={textColor} onClick={() => {changeSelectedCard(0)}}>Done</text>
            </FallDownCard>
        </>
    } 

    var TopHeader = <>
        <h1 className="header">{mainTitle}</h1>
        {/* {selectedCard == 0 ?  */}
            <SummaryStatement textColor={textColor} hideCard={selectedCard != 0} reverse={reverse}>
                <text>{mainOverview}</text> 
                <LottiePlayer lottieCard={animation} factor={0.25}></LottiePlayer>
            </SummaryStatement>
            {/* :
            <></>
        }  */}
    </>

    return <> 
        {TopHeader}
        <IntroContainer>
            {statement.map((el,idx) =>{
                if (idx == 0) return
                let {id,title,overview,color} = el
                return <StatementRowCard
                    id={id}
                    title={title}
                    overview={overview}
                    hoverCard={hoverCard}
                    selectedCard={selectedCard}
                    changeSelected={changeSelectedCard}
                    changeHover={changeHoverCard}
                    color={color}
                    mode={mode}
                />
            })}
        </IntroContainer>
        {FallCard()}        
    </>
    
    
}

const StatementRowCard = (props) => {
    let {id,title,overview,color,hoverCard,selectedCard,changeHover,changeSelected,mode} = props
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)
    let [cardDimension,setCardDimension] = useState({})
    let cardRef = useRef()

    // useEffect(() => {
    //     console.log(`xOff : ${xOff} and yOff : ${yOff}`);
    // }, [xOff,yOff])

    useEffect(() =>{
        if(cardRef.current){
            // console.log(cardRef.current)
            setCardDimension(cardRef.current.getBoundingClientRect())
        }
    },[cardRef.current])

    let onHover = (e,id) =>{
        if(hoverCard != id){
            changeHover(id)
        }
        let {clientX : x, clientY :y} = e
        let {width,height,top,left} = cardDimension
        let {pageYOffset:pyoff,innerHeight} = window
        console.log(`top : ${top} and innerHeight : ${innerHeight}`);
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

    var onLeave = () => {
        changeHover(0);
        setXOff(0)
        setYOff(0)
    }

    let isSelected = selectedCard == id
    let isHover = hoverCard == id
    return <IntroRow 
                ref={cardRef}
                isSelected={isSelected}
                isHover={isHover}
                otherCard={hoverCard != 0}
                onMouseOver={(e) => {onHover(e,id)}}
                onMouseLeave={() =>{onLeave()}}
                onClick={() => {changeSelected(id)}}
                changeColor={color}
                xOff={xOff}
                yOff={yOff}
                baseColor={mode == 'light' ? colors.secondary : colors.white}
                textColor={mode != 'light' ? colors.secondary : colors.white}
            >
                <h1>{title}</h1>
                <text>{overview}</text>
            </IntroRow>
}

export default Index
