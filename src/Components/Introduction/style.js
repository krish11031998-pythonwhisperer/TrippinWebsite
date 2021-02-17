import styled from 'styled-components'
import {Container,Colors as colors} from '../../style'
export const IntroTab = styled.div`
    padding:0px 0;
    width:100%; 
    height:auto;   
    min-height:200vh;
    /* min-height: 100vh; */
    display: flex;
    flex-flow: column  nowrap;
    justify-content: flex-start;
    align-content: center;
    background-color: ${colors.white};
    z-index: 0;
    /* *{
        z-index:0;
    } */
`

export const SummaryStatement = styled.div`
        flex: 1 1 50%;
        display:flex;
        flex-flow: ${({reverse}) => reverse ? 'row-reverse' : 'row'} nowrap;
        justify-content:space-around;
        align-items:center;
        font-size:25px;
        color:${({textColor}) => textColor ? textColor : 'white'};
        /* color:'white'; */
        opacity:${({hideCard}) => hideCard ? 0 : 1};
        padding:20px;
        margin:2.5%;
        text{
            flex: 0 1 60%;
        }
        transition: all 0.3s ease-in-out;
`

export const IntroSectionTab = styled.div`
    /* flex: 0 1 50%; */
    /* height: 100vh; */
    position:relative;
    height:100%;
    background: ${({colorone,colortwo,dir}) => `linear-gradient(to ${dir},${colorone},${colortwo})`};
    display:flex;
    flex-flow: column nowrap;
    .header{
        margin:0 2.5%;
        margin-top: 25px;
        width:fit-content;
        height:auto;
        /* max-height: 10%; */
        font-size: 40px;
        font-family: 'Bungee Shade',cursive;
        align-self: flex-start;
        padding: 25px;
        background-color:black;
        border-radius: 30px;
        color:white;
    }
    transition: all 0.3s ease-in-out;
`

export const IntroContainer = styled.div`
    flex: 0 1 auto;
    margin:2.5%;   
    width:calc(100% - 5%);
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
    /* height:calc(100% - 20px); */
    padding:10px;
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    background-color:${({isHover,changeColor,baseColor}) => isHover ? changeColor : baseColor};
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    transform: scale(${({isHover,otherCard}) => isHover ? 1: otherCard ? 0.95 : 1}) rotateX(${({yOff,isHover,isSelected}) => isHover && !isSelected ? yOff : 0}deg) rotateY(${({xOff,isHover,isSelected}) => isHover && !isSelected ? xOff : 0}deg);
    opacity:${({isHover,otherCard}) => isHover ? 1 : otherCard ? 0.5 : 1};
    transition: all 0.3s ease-in-out; 
    cursor: pointer;
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
        color:${({isHover,textColor}) => isHover ? colors.white : textColor};
    }
`

export const FallDownCard = styled.div`
    flex: 0 1 50%;
    position:absolute;
    top: ${({showCard}) => showCard ? 10 : 0}%;
    left: calc(50% - width/2);
    margin: 2.5%;
    width: calc(100% - 5%);
    /* height:auto; */
    /* max-height: calc(100% - 5%); */
    height: calc(55% - 5%);
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    opacity:${({showCard}) => showCard ? 1 : 0};
    /* background-color:${colors.white}; */
    
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
        color:${({textColor}) => textColor ? textColor : 'white'};
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
        cursor:pointer;
    }


`