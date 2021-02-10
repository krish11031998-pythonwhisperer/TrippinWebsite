import styled from 'styled-components'
import {Colors as colors} from '../../style'
import { Player} from '@lottiefiles/react-lottie-player';

export const FeaturesPageContainer = styled.div`
    width:100%;
    height:100vh;
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
    flex: 0 1 ${({isSelected}) => isSelected ? 100 : 31}%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:space-around;
    align-items:center;
    transition: all 0.75s ease-in-out;
    /* perspective: 600px; */
`

export const Cards = styled.div`
    flex: 0 1 ${({large,selectedCard}) =>  selectedCard ? 100 : large ? 65 : 30}%;
    max-height: ${({large,selectedCard}) =>  selectedCard ? 100 : large ? 65 : 30}%;
    width:100%;
    max-width:100%;
    display:flex;
    flex-flow: row nowrap;
    justify-content:flex-start;
    align-items: flex-start;
    background-color:${({color}) => color ? color : 'transparent'};
    border-radius: 30px;
    color: white;
    box-shadow: 0 0 20px rgba(255,255,255,0.2);
    transition: all 0.1s ease-in-out;
    padding:20px;
    transform : scale(${({hover,otherCard}) => hover ? 1.1 : otherCard ? 0.95 : 1}) rotateX(${({yOff,hover,selectedCard}) => hover && !selectedCard ? yOff : 0}deg) rotateY(${({xOff,hover,selectedCard}) => hover && !selectedCard ? xOff : 0}deg);
    transform-style: preserve-3d;
    perspective: 1000px;
    *:not(Lottie){
        padding: 10px;
    }

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

export const CardContent = styled.div`
    flex: 0 1 ${({isText,selected}) => selected ? isText ? 75 : 25 : isText ? 100 : 0}%;
    height:100%;
    padding: 10px ${({isText,selected}) => selected && isText ? 10 : 0}px 0 ${(({isText,selected}) => selected && !isText ? 10 : 0)}px;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items: flex-start;
`

export const FeatureRow = styled.div`
    flex: 0 1 30%;
`

export const LottiePlayer = styled(Player)`
    /* width:calc(auto - 20px);
    height:calc(auto - 20px); */
    width:auto;
    height:auto;
    max-width: 25%;
    max-height: 10%;
    padding: 10px;
    background-color:'transparent';
    border-radius:30px;

`

