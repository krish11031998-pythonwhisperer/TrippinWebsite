import styled from 'styled-components'
import {animated} from 'react-spring'
import {Colors as colors} from '../../style'
export const DemoContainer = styled(animated.div)`
    width:100vw;
    min-height: 100vh;
    padding: 10px;
    position:relative;
    overflow-x: hidden;
    overflow-y:hidden;
    /* ::selection {
        color: none;
        background: none;
    }
    ::-moz-selection {
        color: none;
        background: none;
    } */
`

export const DemoCard = styled(animated.div)`
    position:absolute;
    height: 75%;
    width: 75%;
    left: 12.5% ;
    top: 7.5%;
    display: flex;
    flex-flow: row nowrap;
    background: ${colors.tomato};
    border-radius: 20px;
`


export const DemoCardWrapper = styled(animated.div)`
    width:100%;
    height:90%;
    position:absolute;
    cursor:pointer;
    overflow-x:hidden;
`

export const DemoCol = styled(animated.div)`
    flex: 0 1 ${({large}) => large ? 60 : 40}%;
    width:60%;
    height: 100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    position: relative;    
    /* border-radius: 30px; */

    .content{
        margin: 40px;
        padding:10px;
        max-height: 90%;
        color:${colors.white};
        text{
            font-size: 17.5px;
            pointer-events:none;
            ::selection {
                color: none;
                background: none;
            }
            ::-moz-selection {
                color: none;
                background: none;
            }
        }

        ul{
            list-style: none;
        }
        li{
            padding: 5px 0;
        }
    }

    .footer{
        position: absolute;
        top: 80%;
        right: 10%;
        margin: 10px 0;
        padding: 10px;
        color:${colors.tomato};
        border-radius: 20px;
        background:${colors.white};
        width: fit-content;
        height: fit-content;
    }

    .sketchfab-embed-wrapper{
        position: absolute;
        iframe{
            width: 100%;
            height: 100%;
            /* border-radius: 20px;         */
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
        }

        p{
            font-size : 13px;
            font-weight : normal;
            margin : 5px;
            color : #4A4A4A 
        }

        a{
            font-weight:bold;
            color:#1CAAD9
        }
        width: 100%;
        height: 100%;
    }       
    

`
