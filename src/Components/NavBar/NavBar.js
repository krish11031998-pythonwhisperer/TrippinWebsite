import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import HomePage from '../HomePage'
import Hamburger from 'hamburger-react'
import {
    Nav, NavLink, NavEl, NavHeader, MobileMenu, MobileMenuList
} from './style'
import { Button, Colors } from '../../style'
const NavBar = () => {
    const tabs = ["Home","Blogs","Tours","About Us"]
    let [showMenu,setShowMenu] = useState(true);
    let [mobileMenu,setMobileMenu] = useState(false)
    useEffect(() =>{
        changeMenuStyle()
    },[])

    var changeMenuStyle = () =>{
        let {innerWidth} = window
        if (innerWidth <= 960){
            setShowMenu(false)
        }else{
            setShowMenu(true)
        }
        
    }

    const linkClickHandler = () =>{
        setMobileMenu(!mobileMenu)
    }

    window.addEventListener('resize',changeMenuStyle)

    let navElements = (
        showMenu ? 
        <NavEl>
            {tabs.map(el => {
                return <NavLink to='/' isHeadline={false}>
                    {el}
                </NavLink>
            })}
        </NavEl> : 
        <Hamburger color={Colors.primary} toggled={mobileMenu} toggle={setMobileMenu} rounded/>
    )
    
    let smallmobileMenu = (
        <MobileMenu openMenu={mobileMenu}>
            <MobileMenuList>
                {tabs.map(el => <li>
                    <NavLink to='/' isHeadline={false} onClick={linkClickHandler}>
                        {el}
                    </NavLink>
                </li>)}
                <li><Button className=".heading" buttonstyle={"transparent"} onClick={linkClickHandler}>Sign Up</Button></li>
            </MobileMenuList>
        </MobileMenu>
    )
    return (
        <>
            <Nav>
                <NavHeader>
                    <NavLink to='/' isHeadline={true} className="heading">
                        Trippin
                    </NavLink>
                </NavHeader>
                {navElements}
            </Nav>
            {!showMenu && smallmobileMenu}
        </>
    )
}

export default NavBar
