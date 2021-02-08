import React,{useState,useEffect, useRef} from 'react'
import { Cards, ColumnCards, FeaturesContainer, FeaturesPageContainer } from './style'
import {Colors as colors} from '../../style'
import data from './data'
import Lottie from 'react-lottie'

const Index = () => {
    // let cards = [{heading:"AR",description:"We envision building a trend of exploring cities with custom AR tech + Video + Audio all package in an Augmented form for a non- intrusive educational form of exploration"}]
    let cards = []
    let [colCards,setColCards] = useState([])
    let [hoverCard,setHoverCard] = useState(0);
    let [selectedCard,setSelectedCard] = useState(-1);
    let lottie = useRef(null)
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

    // useEffect(() => {
    //     if(hoverCard)
    // },[hoverCard])

    var changeHoverCard = (id) => {
        setHoverCard(id);
        // if(data[id - 1].lottieRef){
        //     let ref = data[id - 1].lottieRef
        //     if (id != 0){
        //         ref.current.play()
        //     }else{
        //         ref.pause()
        //     }
        // }
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
                var card = (
                    <Cards 
                        large={el.large} 
                        color={el.color} 
                        hover={hoverCard == el.id} 
                        otherCard={hoverCard != 0} 
                        onMouseEnter={() => {changeHoverCard(el.id)}} 
                        selectedCard={selectedCard == el.id}
                        onMouseLeave={() => {changeHoverCard(0)}}
                        onClick={() => {onClick(el.id)}}
                        isLottie={el.lottieCard != null}
                    >
                        <h1>{el.heading}</h1>
                        <text>{el.description}</text>
                        {/* {el.large && el.lottieCard ? <Player
                            loop
                            // autoplay
                            hover
                            src={el.lottieCard}
                            style={{ height: '200px', width: '200px', padding: '10px'}}
                            ref={el.lottieRef}
                        /> : <></>} */}
                        {el.large && el.lottieCard ? 
                            <LottiePlayer lottieCard={el.lottieCard} hover={hoverCard == el.id}/>
                            : 
                            <></>
                        }
                    </Cards>
                )
                if (selectedCard == -1 || selectedCard == el.id){
                    return card
                }
                 
            })}
        </ColumnCards>)
        
    }
    
    var colData = <>
        {colCards.map((pairs,idx) =>{
            var isSelected = (idx * 2 < selectedCard && selectedCard <= (idx + 1) * 2) && selectedCard != -1
                if (selectedCard == -1 || isSelected){
                    console.log(`sending col : ${idx} ${selectedCard}`)
                    return col(pairs,isSelected)
                }
            })}
    
    </>
    
    


    return (
        <FeaturesPageContainer>
            <FeaturesContainer>
                {colData}
            </FeaturesContainer>
        </FeaturesPageContainer>
    )
}

const LottiePlayer = (props) =>{
    let [animatableData,setAnimatableData] = useState()
    let {lottieCard,hover} = props
    let [cardWidth,setCardWidth] = useState(0)
    let checkHeight = () => {
        let {innerWidth,innerHeight} = window
        setCardWidth(innerWidth * 0.15)
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
        }
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
