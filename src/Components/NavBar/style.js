import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Colors as colors} from '../../style'

export const NavEl = styled.div`
    width: 35%;
    height: 10vh;
    display:flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    
`

export const Nav = styled.nav`
    position:sticky;
    left:0;
    top:0;
    height: 10vh;
    width:100%;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 0;
    justify-content: space-between;
    align-items:center;
    z-index:1000000;
    background-color: ${colors.secondary};

`
export const MobileMenu = styled.div`
    position:absolute;
    top:10vh;
    left:${({openMenu}) => openMenu ? '0': '-100%'};
    width: 100%;
    height: 90vh;
    background-color: ${colors.secondary};
    transition: all 0.5s ease;
    
`

export const MobileMenuList = styled.ul`
    
    width: 100%;
    height: auto;
    display:flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items:center;


    li{
        width: 100%;
        height: auto;
        color: ${colors.primary};
        text-decoration: none;
        text-align:center;
        font-size: 20px;
        padding: 50px;
        justify-self:center;
    }

`


export const NavLink = styled(Link)`

    text-decoration:none;
    color:${colors.primary};
    padding: 10px; 
    transition: all 0.3s ease;
    background-color: ${({isHeadline}) => isHeadline ? colors.primary : 'clear'};
    color: ${({isHeadline}) => isHeadline ? colors.secondary : 'clear'};
    border-radius: ${({isHeadline}) => isHeadline ? '20' : '0'}px;
    font-size: ${({isHeadline}) => isHeadline ? '25' : '15'}px;

    &:hover{
        border-bottom : ${({isHeadline}) => {
            console.log(`isHeadline : ${isHeadline}`)
            return isHeadline ? '0' : '5'}}px solid ${colors.orange};
        background-color: ${({isHeadline}) => isHeadline ? colors.secondary : 'clear'};
        color: ${({isHeadline}) => isHeadline ? colors.primary : 'clear'};
    }

`

export const NavHeader = styled.div`
    padding:  0 50px 0 50px;

`