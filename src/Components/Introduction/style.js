import styled from 'styled-components'
import {Container,Colors as colors} from '../../style'
export const IntroTab = styled.div`
    padding:0px 0;
    width:100%;    
    height:200vh;
    min-height: 100vh;
    display: flex;
    flex-flow: column  nowrap;
    justify-content: flex-start;
    align-content: center;
    background-color: ${colors.white};
    *{
        z-index:0;
    }
`

export const IntroSectionTab = styled.div`
    flex: 0 1 50%;
    position:relative;
    background: ${({colorone,colortwo,dir}) => `linear-gradient(to ${dir},${colorone},${colortwo})`};
    display:flex;
    flex-flow: column nowrap;
    .header{
        margin-top: 10px;
        width:fit-content;
        height:auto;
        max-height: 10%;
        font-size: fit-content;
        font-family: 'Bungee Shade',cursive;
        align-self: center;
        padding: 25px;
        padding: auto;
        background-color:black;
        border-radius: 30px;
        color:white;
        
    }
`

export const IntroContainer = styled.div`
    flex: 0 1 auto;
    margin:2.5%;   
    width:calc(100% - 5%);
    /* height:auto; */
    height:calc(40% - 5%);
    display:flex;
    flex-flow: row nowrap;
    justify-content:center;
    align-content: center;
    background-color: ${({color}) => color ? color : 'transparent'};
    border-radius: 15px;
    color: ${({textColor}) => textColor ? textColor : colors.white};
`

export const IntroRow = styled.div`
    flex: 0 1 33%;
    margin: 10px;
    width:calc(100% - 20px);
    height:auto;
    height:calc(100% - 20px);
    padding:10px;
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    background-color:${({isHover,changeColor}) => isHover ? changeColor : colors.white};
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    transform: scale(${({isHover,otherCard}) => isHover ? 1: otherCard ? 0.95 : 1}) rotateX(${({yOff,isHover,isSelected}) => isHover && !isSelected ? yOff : 0}deg) rotateY(${({xOff,isHover,isSelected}) => isHover && !isSelected ? xOff : 0}deg);
    opacity:${({isHover,otherCard}) => isHover ? 1 : otherCard ? 0.5 : 1};
    transition: all 0.3s ease-in-out; 
    /* z-index:1; */
    *{
        padding:10px;
        
    }

    h1{
        font-size: 30px;
        color:${({changeColor,isHover}) => isHover ? colors.white : changeColor};
        font-weight: bold;
    }

    text{
        font-size: 25px;
        color:${({isHover}) => isHover ? colors.white : colors.primary};
    }
`

export const FallDownCard = styled.div`
    flex: 0 1 100%;
    position:absolute;
    top: ${({showCard}) => showCard ? 50 : 25}%;
    margin: 2.5%;
    width: calc(100% - 5%);
    height: calc(50% - 5%);
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    opacity:${({showCard}) => showCard ? 1 : 0};
    
    *{
        padding: 10px 25px;
    }
    
    transition: all 0.3s ease-in-out;
    
    h1{
        font-size: 30px;
        color: ${({changeColor}) => changeColor ? changeColor : "black"};
        font-weight: bold;
    }

    text{
        font-size: 25px;
        color:black;
    }

    .button{
        font-size: 15px;
        width:fit-content;
        color:white;
        margin:10px 25px;
        padding:10px;
        background-color:black;
        border-radius: 15px;
        justify-self: flex-end;
    }


`