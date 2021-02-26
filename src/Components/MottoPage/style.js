import styled from 'styled-components'
import {animated} from 'react-spring'
import {Colors as colors} from '../../style'

export const MottoContainer = styled(animated.div)`
    width:100vw;
    height:100vh;
    /* padding: 20px; */
    display:flex;
    flex-flow: row nowrap;
    justify-content:flex-start;
    align-items:center;
`

export const MottoImageSlideshow = styled(animated.div)`
    flex: 0 1 45%;
    height:100%;
    position:relative;
    .img{
        position:absolute;
        left:0;
        top:0;
        background-repeat:no-repeat;
        background-size:cover;
        background-position-y:center;
        background-position-x:center;
        width:100%;
        height:100%;
    }
`

export const MottoContent = styled(animated.div)`
    flex: 0 1 55%;
    height: 100%;
    display:flex;
    padding:20px 40px;
    background-color:${colors.secondary};
    flex-flow: column nowrap;
    justify-content:center;
    align-items:flex-start;
    *{
        padding: 15px 0;
    }
    .mottoHeading{
        color:${colors.tomato};
        font-size: 55px;
        font-weight:bold;
    }

    text{
        color:${colors.white};
        font-size: 25px;
        font-weight:normal;
    }
`