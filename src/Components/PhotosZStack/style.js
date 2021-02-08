import styled from 'styled-components'

export const ImageStackContainer = styled.div`
    width: calc(100% - 0px);
    height: calc(100% - 0px);
    /* margin:25px; */
/* 
    padding: 25px; */
    position:relative;
`

export const ImageContainer = styled.img`

    object-fit: cover;
    border-radius: 30px;
    position:absolute;
    top:${({isDragged,y_off}) => isDragged ? y_off : 0}px;
    left:${({idx,isDragged,x_off}) => isDragged ? x_off : idx > 3 ? 40 : 20 * idx}px;
    max-height:100%;
    height: ${({ h_off }) => `calc(100% - ${h_off}px)`};
    width:calc(100% - 40px);
    /* height: calc(100% - ${({h_off}) => h_off}px); */
    z-index:${({idx}) => idx == 0 ? -1 : (idx * -1) - 1};

`