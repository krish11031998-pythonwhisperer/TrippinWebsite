import styled from 'styled-components'
import {Colors as colors} from '../../style'
export const HomePageTab = styled.div`
    width:100%;
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    /* background: url('images/img-home.jpg') center center/cover no-repeat; */
    box-shadow: inset 0 0 0 1000px rgba(0,0,0,0.2);
    object-fit:contain;
    overflow-x:hidden;
    overflow-y:hidden;
    /* padding: 50px; */
`

export const HomeContainer = styled.div`
    width:calc(100% - 100px);
    height: calc(100% - 100px);
    /* width:100%;
    height:100%; */
    padding:50px;
    margin: 50px;
    color:${colors.primary};
    display:flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
`


export const HomeHeaderArea = styled.div`
    flex-grow: 1;
    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
`

export const HomeHeading = styled.div`
    flex-grow: 2;
    width:75%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    padding:50px;

    *{
        padding: 15px 0;
    }
    text{
        font-size: 25px;
    }

    h1{
        font-size:55px;
        font-family: 'Bungee Shade', cursive;
        font-weight: bolder;
        color: ${colors.primary};
    }

`

export const HomeHeaderImage = styled.div`
    flex-grow: 1;
    width:50%;
    height:100%;
    /* img{
        width: calc(100% - 100px);
        height: calc(100% - 100px);
        margin: 50px;
        border-radius: 30px;
        object-fit: cover;
    } */

`

export const VideoContainer = styled.video`
    object-fit:cover;
    width:100%;
    height:100vh;
    position:fixed;
    z-index: -999;
    
    /* min-height:100%;
    min-width: 100%; */
`