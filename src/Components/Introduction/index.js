import React,{useState,useRef,useEffect} from 'react'
import {TransitionGroup} from 'react-transition-group'; // ES6s
import {Colors as colors} from '../../style'
import {
    IntroTab,
    IntroContainer,
    IntroSectionTab,
    IntroRow,
    FallDownCard
} from './style'
import {ProblemStatement as Problem} from './data'
const Index = () => {

    return (
        <IntroTab>
            <IntroSectionTab dir={"top"} colorone={colors.white} colortwo={colors.white}>
                <IntroSection 
                    heading={"Problem"} 
                    statement={Problem}
                />
            </IntroSectionTab>
            
            {/* <IntroContainer color={colors.green}>
                <h1>Hello</h1>
            </IntroContainer> */}
        </IntroTab>
    )
}


const IntroSection = (props) =>{
    let {heading,statement} = props
    let [hoverCard,setHoverCard] = useState(0);
    let [selectedCard,setSelectedCard] = useState(0);
    let [showCard,setShowCard] = useState(false)
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
        if (selectedCard == 0) return <></>
        let {title,overview,description,color} = statement.filter(({id}) => id == selectedCard)[0]
        return <> 
            <FallDownCard showCard={showCard} changeColor={color}>
                <h1>{title}</h1>
                <text>{overview}</text>
                <text>{description}</text>
                <text className="button" onClick={() => {changeSelectedCard(0)}}>Done</text>
            </FallDownCard>
        </>
    } 

    return <> 
        <h1 className="header">{heading}</h1>
        <IntroContainer>
            {statement.map(el =>{
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
                />
            })}
        </IntroContainer>
        {FallCard()}        
    </>
    
    
}

const StatementRowCard = (props) => {
    let {id,title,overview,color,hoverCard,selectedCard,changeHover,changeSelected} = props
    let [xOff,setXOff] = useState(0)
    let [yOff,setYOff] = useState(0)
    let [cardDimension,setCardDimension] = useState({})
    let cardRef = useRef()

    useEffect(() =>{
        if(cardRef.current){
            setCardDimension(cardRef.current.getBoundingClientRect())
        }
    },[cardRef.current])

    let onHover = (e,id) =>{
        if(hoverCard != id){
            changeHover(id)
        }
        let window_w = cardDimension.width/2
        let window_h = cardDimension.height/2
        let {clientX : x, clientY :y} = e
        x = (x - cardDimension.left);
        y = (y - cardDimension.top);
        setXOff((x - window_w)/50)
        setYOff(-(y - window_h)/50)
    }

    let isSelected = selectedCard == id
    let isHover = hoverCard == id
    return <IntroRow 
                ref={cardRef}
                isSelected={isSelected}
                isHover={isHover}
                otherCard={hoverCard != 0}
                onMouseOver={(e) => {onHover(e,id)}}
                onMouseLeave={() =>{changeHover(0)}}
                onClick={() => {changeSelected(id)}}
                changeColor={color}
                xOff={xOff}
                yOff={yOff}
            >
                <h1>{title}</h1>
                <text>{overview}</text>
            </IntroRow>
}

export default Index
