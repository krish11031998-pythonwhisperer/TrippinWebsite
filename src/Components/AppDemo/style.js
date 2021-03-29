import styled from 'styled-components'
import {animated} from 'react-spring'
import {Colors as colors} from '../../style'

export const AppDemoContainer = styled(animated.div)`
    width:100vw;
    height: 100vh;
    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    overflow-x:hidden;
    background: ${colors.secondary};
`

export const AppDemoCol = styled(animated.div)`
    /* flex: 0 1 ${({large}) => large ? '60' : '40'}%; */
    flex: 0 1 50%;
    height: 100%;
    /* padding: 1%; */
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    
    img{
        /* padding: 5%; */
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        background:transparent;
    }

    
`


export const AppDemoContent = styled(animated.div)`
    width:100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    padding:20px 40px;
    position: relative;
    
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

    .disclaimer{
        position:absolute;
        right: 1%;
        bottom: 1%;
        font-size: 12px;
        font-weight:normal;
    }


`