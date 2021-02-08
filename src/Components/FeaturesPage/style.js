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
    transition: all 0.65s ease-in-out;
`

export const Cards = styled.div`
    flex: 0 1 ${({large,selectedCard}) => {
        console.log('selected : ',selectedCard)
        return selectedCard ? 100 : large ? 62.5 : 32.5
        }}%;
    width:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    align-items: flex-start;
    background-color:${({color}) => color ? color : 'transparent'};
    border-radius: 30px;
    padding: 10px;
    color: white;
    box-shadow: 0.35px 0px ${({hover}) => hover ? 4.5 : 2.5}px white;
    transition: all 0.3s ease-in-out;
    padding:20px;
    transform : scale(${({hover,otherCard}) => hover ? 1.01 : otherCard ? 0.95 : 1});

    *:not(Lottie){
        /* padding: ${({isLottie}) => isLottie ? 0 : 10}px 0; */
        padding: 10px;
    }
    h1{
        font-family: 'Bungee Shade',cursive;
    }
`

export const FeatureRow = styled.div`
    flex: 0 1 30%;
`

export const LottiePlayer = styled(Player)`
    width:calc(10% - 20px);
    height:calc(10% - 20px);
    padding: 10px;
    background-color:'transparent'

`

