import {animated, animted} from 'react-spring'
import styled from 'styled-components'
import {Colors as colors} from '../../style'

export const BlogContainer = styled(animated.div)`
    width:100vw;
    min-height: 100vh;
    height:auto;
    background-color:${colors.secondary};
    padding: 2%;
    display: flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    align-items:flex-start;
`
export const TopBlogContainer = styled(animated.div)`
    flex: 0 1 50%;
    width: 100%;
    display:flex;
    flex-flow: row nowrap;
`

export const TopBlogImage = styled(animated.div)`
    width:100%;
    height: 100%;
    background-repeat:no-repeat;
    background-size: cover;
    background-position-x:center;
    background-position-y:center;
`
export const BlogRowContainer = styled(animated.div)`
    flex: 0 1 50%;
    width:100%;
    height:100%;
    display:flex;
    flex-flow: row wrap;
    justify-content:flex-start;
    align-items:center;
`

export const BlogCard = styled(animated.div)`
    flex: 0 1 30%;
    border-radius:30px;
    /* box-shadow: 0 20px 10px rgba(0,0,0,0.2); */
    margin: 25px;
    /* height: calc(100% - 50px); */
    height: 35vh;
    /* height:100%; */
    padding: 25px;
    display:flex;
    flex-flow: column nowrap;
    align-items:flex-start;
    justify-content:flex-end;
    background-image: url(${({src}) => src || 'public/images/img-1.jpg'});
    background-repeat: no-repeat;
    background-size:cover;
    background-position-y:center;
    /* object-fit:cover; */
    color:${colors.white};

    *{
        flex: 0 1 auto;
        padding: 10px;   
    }
`

