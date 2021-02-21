import styled from 'styled-components'
import {Colors, Colors as colors} from '../../style'
import { Player} from '@lottiefiles/react-lottie-player';
import {animated} from 'react-spring'
import {motion} from 'framer-motion'
export const FeaturesPageContainer = styled.div`
    width:100%;
    height: auto;
    min-height:100vh;
    background-color: ${colors.secondary};
    padding: 1px 0;
`

export const FeaturesContainer = styled.div`
    margin:100px;
    width:calc(100% - 200px);
    height: calc(100vh - 200px);
    /* background-color: ${colors.primary}; */
    display:flex;
    flex-flow: row nowrap;
    justify-content:space-around;
    align-content:center;
    transition: all 0.3s ease-in-out;
`

export const ColumnCards = styled.div`
    flex: 0 1 ${({isSelected,otherSelected}) => isSelected ? 100 : !otherSelected ? 31 : 0}%;
    /* display:${({selected,otherSelected}) => selected || !otherSelected ? 'flex' : 'none'}; */
    display:flex;
    flex-flow: column nowrap;
    justify-content:space-between;
    align-items:center;
    transition: all 0.75s ease-in-out;
    /* perspective: 600px; */
`

export const CardOutline = styled.div`
    flex: 0 1 ${({large,selectedCard}) =>  selectedCard ? 100 : large ? 65 : 30}%;
    height: ${({large,selectedCard}) =>  selectedCard ? 100 : large ? 65 : 30}%;
    /* margin:10px; */
    /* padding:10px; */
    /* width:calc(100% - margin*2); */
    width:100%;
    /* height: 100%; */
    padding:5px;

`

export const Cards = styled(motion.div)`
    flex: 0 1 ${({large,selectedCard,otherSelected}) =>  selectedCard ? 100 : !otherSelected ? large ? 65 : 30 : 0}%;
    max-height: ${({large,selectedCard,otherSelected}) =>  selectedCard ? 100 : !otherSelected ? large ? 65 : 30 : 0}%;
    /* flex: 0 1 ${({large}) =>  large ? 65 : 30}%;
    max-height: ${({large}) => large ? 65 : 30}%; */
    /* height: 100%; */
    margin:10px;
    padding:10px;
    /* width:calc(100% - margin*2); */
    width:${({selectedCard,otherSelected}) => selectedCard ? 100 : !otherSelected ? 100 : 0}%;
    /* width:100%; */
    display:flex;
    flex-flow: row nowrap;
    
    justify-content:flex-start;
    align-items: flex-start;
    /* background-color:${({color,hover}) => !hover && color ? color : hover && color ? colors.secondary : 'transparent'}; */
    background-color:${({color,hover,selectedCard}) => hover || selectedCard ? color : colors.primary};
    border-radius: 30px;
    color: white;
    box-shadow: 0 0 20px rgba(255,255,255,${({hover}) => hover ? 0.2 : 0});
    transition: all 0.3s ease-in;
    padding:20px;
    opacity: ${({hover,otherCard}) => !hover && otherCard ? 0.5 : 1};
    will-change:transform;
    /* transform : scale(${({hover,otherCard,selectedCard}) => hover && !selectedCard ? 1.05 : otherCard ? 0.9 : 1}) rotateX(${({yOff,hover,selectedCard}) => hover && !selectedCard ? yOff : 0}deg) rotateY(${({xOff,hover,selectedCard}) => hover && !selectedCard ? xOff : 0}deg); */
    transform : rotateX(${({yOff,hover,selectedCard}) => hover && !selectedCard ? yOff : 0}deg) rotateY(${({xOff,hover,selectedCard}) => hover && !selectedCard ? xOff : 0}deg);
    /* transform : scale(${({hover,otherCard,selectedCard}) => hover && !selectedCard ? 1.05 : otherCard ? 0.9 : 1}); */
    transform-style: preserve-3d;
    perspective: 1000px;
    *:not(Lottie){
        padding: 10px;
    }
    display:${({selectedCard,otherSelected}) => !selectedCard && otherSelected && 'none'};
    text{
        /* padding-left:25px; */
        font-size: ${({selectedCard}) => selectedCard ? 150 : 100}%;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        
    }
    ul{
        list-style:none;
        padding:10px 0;
        li{
            padding: 10px 0;
        }
    }
    
    h1{
        font-family: 'Bungee Shade',cursive;
    }
`


export const ExpandedCard = styled(motion.div)`

    /* flex: 0 1 50%; */
    width: 50%;
    height: 50%;
    border-radius: 30px;
    background-color:${({color}) => color ? color : colors.secondary};

    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    motion.h5{
        color:gray;
        font-weight:bolder;   
    }    

    motion.h2{
        color:white;
        font-weight:normal;
    }




`

export const CardContent = styled.div`
    flex: 0 1 ${({isText,selected}) => selected ? isText ? 75 : 25 : isText ? 100 : 0}%;
    height:fit-content;
    max-height:60%;
    padding: 10px ${({isText,selected}) => selected && isText ? 10 : 0}px 0 ${(({isText,selected}) => selected && !isText ? 10 : 0)}px;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items: flex-start;
    /* background-color:${({color,hover,selectedCard}) => hover || selectedCard ? color : colors.primary};
    border-radius: 30px;
    box-shadow: 0 0 20px rgba(255,255,255,0.2); */
    /* transform: rotateX(${({yOff,hover,selectedCard}) => hover && !selectedCard ? yOff : 0}deg) rotateY(${({xOff,hover,selectedCard}) => hover && !selectedCard ? xOff : 0}deg); */
    transition: all 0.3s ease-in-out;
    text{
        flex:0 1 auto;
        max-height:40%;
    }
`

export const FeatureRow = styled.div`
    flex: 0 1 30%;
`

export const LottiePlayer = styled(Player)`
    width:auto;
    height:auto;
    max-width: 25%;
    max-height: 10%;
    padding: 10px;
    background-color:'transparent';
    border-radius:30px;

`

