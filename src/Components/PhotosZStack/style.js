import styled from 'styled-components'

export const ImageStackContainer = styled.div`
    flex: 0 1 20%;
    width: 100%;
    height: 100%;
    /* margin:25px; */

    padding: 10px 0px;
    position:relative;
`

export const ImageContainer = styled.img`

    object-fit: cover;
    border-radius: 30px;
    position:absolute;
    top:${({idx,isDragged,y_off}) => isDragged ? y_off : idx > 3 ? 40 : 20 * idx}px;
    left:${({idx,isDragged,x_off}) => isDragged ? x_off : idx > 3 ? 40 : 20 * idx}px;
    height: ${({h_off}) => h_off}px;
    width:calc(100% - 40px);
    z-index:${({idx}) => idx == 0 ? -1 : (idx * -1) - 1};
`