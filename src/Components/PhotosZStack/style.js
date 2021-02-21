import styled from 'styled-components'
import {motion} from 'framer-motion'
export const ImageStackContainer = styled.div`
    flex: 0 1 20%;
    width: 100%;
    height: 100%;
    /* margin:25px; */
    transition: all 0.3s ease-in-out;
    padding: 10px 0px;
    position:relative;
`

export const ImageContainer = styled.img`

    object-fit: cover;
    border-radius: 30px;
    position:absolute;
    /* top:${({idx,isDragged,y_off}) => isDragged ? y_off : idx > 3 ? 40 : 20 * idx}px; */
    top:${({idx}) => idx > 3 ? 40 : 20 * idx}px;
    /* left:${({idx,isDragged,x_off,removeCard}) => removeCard ? -50 : isDragged ? x_off : idx > 3 ? 40 : 20 * idx}px; */
    left:${({idx,removeCard}) => removeCard ? -50 : idx > 3 ? 40 : 20 * idx}px;
    height: ${({h_off}) => h_off}px;
    width:calc(100% - 40px);
    opacity:${({removeCard,current}) => removeCard && current ? 0 : 1};
    z-index:${({idx}) => idx == 0 ? -1 : (idx * -1) - 1};
    transition: all 0.3s ease;
`

export const Image = styled(motion.img)`
    object-fit: cover;
    border-radius: 30px;
    position:absolute;
    /* top:${({idx,isDragged,y_off}) => isDragged ? y_off : idx > 3 ? 40 : 20 * idx}px; */
    top:${({idx}) => idx > 3 ? 40 : 20 * idx}px;
    left:${({idx,removeCard}) => 50 + (removeCard ? -50 : idx > 3 ? 40 : 20 * idx)}px;
    height: ${({h_off}) => h_off}px;
    width:calc(75%);
    opacity:${({removeCard,current}) => removeCard && current ? 0 : 1};
    z-index:${({idx}) => idx == 0 ? -1 : (idx * -1) - 1};
    transition: all 0.3s ease;
`