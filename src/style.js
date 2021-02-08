import styled,{createGlobalStyle}from 'styled-components'
import {Link} from 'react-router-dom'
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto');
    *{
        box-sizing: border-box;
        margin:0;
        padding: 0;
        font-family: 'Zilla Slab', serif;
        
        @media screen and (max-width:960px){
            overflow-x: hidden;
            overflow-y: hidden;
        }
    }

    .heading{
        font-family: 'Bungee Shade', cursive;
    }
`

export const Colors = {
    primary:'#abaab8',
    secondary:'#212334',
    green:'#69ae6f',
    orange:'#e69d37',
    red:'#f44336',
    white:'#FEFAEC',
    cyan:'#A9EEE6',
    tomato:'#F38181',
    indigo:'#625772'
}

export const Button = styled(Link)`
    height: auto;
    width:auto;
    text-decoration:none;
    padding: 10px;
    border: ${({buttonstyle}) => buttonstyle == "transparent" ? `2px solid ${Colors.primary}` : `none`};
    color: ${({buttonstyle}) =>  buttonstyle == "transparent" ? Colors.primary : Colors.secondary};
    background-color: ${({buttonstyle}) =>  buttonstyle == "transparent" ? `transparent` : Colors.primary};
    border-radius: 10px;
    text-align:center;
    &:hover{
        border: ${({buttonstyle}) => buttonstyle == "transparent" ? `2px solid ${Colors.secondary}` : `none`};
        color: ${({buttonstyle}) =>  buttonstyle == "transparent" ? Colors.secondary : Colors.primary};
        background-color: ${({buttonstyle}) =>  buttonstyle == "transparent" ? Colors.primary: `transparent`}; 
    }
`