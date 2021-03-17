import styled from 'styled-components'
import {Colors as colors,Container} from '../../style'
import {animated} from 'react-spring'
export const ExplorationContainer = styled(animated.div)`
    width:100vw;
    height: 100vh;
    padding: 1px 0;
    background-color: ${colors.secondary};
    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x:hidden;
    
    /* ${Container} */
`

export const ExplorationCol = styled(animated.div)`
    flex: 0 1 50%;
    height:100%;
    padding: 20px;
    position:relative;

    .sketchfab-embed-wrapper{
        position: absolute;
        left: 12.5%;
        top: 12.5%;
        iframe{
            width: 75%;
            height: 75%;
            border-radius: 30px;
            
        }
        width: 100%;
        height: 100%;
        
    }
`

export const ExplorationContent = styled(animated.div)`
    width:100%;
    height: 100%;
    padding:5%;
    display:flex;
    flex-flow:  column nowrap;
    justify-content: center;
    align-items: flex-center;
    *{
        padding: 20px 0;
    }


    h1{
        color:${colors.tomato};
        font-size: 55px;
        font-weight:bold;
    }



`

export const Polaroid = styled(animated.div)`
    position:absolute;
    left:calc(50% - 22.5%);
    top:calc(50% - 35%);
    width: 45%;
    height: 70%;
    background-color:${colors.white};
    border-radius: 30px;
    cursor:pointer;
    img{
        /* margin: 15%;
        width:calc(100% - margin*2);
        height:calc(100% - margin*2); */
        margin: 5% 5%;
        width: 90%;
        height: 80%;
        object-fit: cover;
        pointer-events:none;
        border-radius: 20px;
    }
    text{
        font-family: 'Nothing You Could Do', cursive;
        margin:5% 7.5%;
    }
`


