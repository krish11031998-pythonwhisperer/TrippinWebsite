import styled from 'styled-components'
import {Colors as colors,Container} from '../../style'
import {motion} from 'framer-motion'

export const AboutUsContainer = styled(motion.div)`
    background: ${({colorone,colortwo,dir}) => {
        if (colorone && colortwo && dir){
            var rgb_one = colorone.hexTorgb()
            var rgb_two = colortwo.hexTorgb()
            rgb_one = rgb_one != null ? rgb_one.reduce((res,el) => `${res},${el}`) : '0,0,0'
            rgb_two = rgb_two != null ? rgb_two.reduce((res,el) => `${res},${el}`) : '0,0,0'
            // console.log(`rgb_one: `,rgb_one.reduce((res,el) => `${res},${el}`))
            // console.log(`rgb_two: `,rgb_two.reduce((res,el) => `${res},${el}`))
            var colorone_full = rgb_one != null ? `rgba(${rgb_one},1)` : 'clear'
            var colorone_half = rgb_two != null ? `rgba(${rgb_one},0.5)` : 'clear'

            var colortwo_full = rgb_one != null ? `rgba(${rgb_two},1)` : 'clear'
            var colortwo_half = rgb_two != null ? `rgba(${rgb_two},0.5)` : 'clear'

            console.log(colorone_full,colorone_half,colortwo_full,colortwo_half)

            // return `linear-gradient(to ${dir},${colorone_full},${colorone_half},${colortwo_half},${colortwo_full})`
            return `linear-gradient(to ${dir},${colorone_full} 70%,${colorone_half},${colortwo_half},${colortwo_full})`
        }
        return colors.white;
    }};
    /* ${Container} */
    width:100%;
    min-height:100vh;
    height: auto;
    padding: 1px 0;
/* 
    *{
        z-index: 0;
    }
     */
    /* background:${({colorone}) => colorone ? colorone : 'white'}; */
    display:flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    align-items:center;
    /* z-index:1; */
`

export const AboutUsRow = styled.div`
    flex: 0 1 ${({content}) => content ? 70 : 20}%;
    margin: 1% 2.5%;
    padding: 10px;
    width: calc(100% - 5%);
    height: calc(100% - 2%);

    /* justify-self:flex-start; */

    display:flex;
    flex-flow: row nowrap;
    justify-content:space-between;
    align-items: flex-start;
    
`


export const AboutBox = styled.div`
    flex: 0 1 30%;
    margin: 1%;
    width:calc(100% - 2%);
    height: calc(100% - 2% - 10px);
    /* height:auto; */
    padding: 10px;
    position:relative;
    transition: all 0.3s ease-in-out;
    /* background-color:${colors.secondary}; */
    /* z-index: 0; */
`

export const BGBox = styled.div`
    /* position:absolute;
    top:0;
    left:0; */
    margin: 15px 0 5px;
    max-width: calc(100% - 10px);
    width:${({view,time,idx,timeSpan}) => view == idx ? time * 100/timeSpan : 100}%;
    /* height:${({h}) => h}px; */
    height: 10px;
    background-color:${({view,idx}) => view == idx ? colors.white : 'transparent'};
    z-index: 1;
    border-radius:30px;
    object-fit:fill;
    transition: all 0.3s ease-in-out;
    opacity:0.5;
    ${AboutBox}
    /* height:100%; */

`
export const AboutUsCurveBox = styled.div`
    /* position:absolute; */
    /* top:15px;
    left:0; */
    z-index: 0;
    width:100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    align-items:flex-start;

    border-radius: 30px;
    box-shadow: 0 0 2.5px rgba(255,255,255,${({isHover}) => isHover ? 0.1 : 0});
    transform: scale(${({isHover,otherCard,view}) => isHover ? 1 : otherCard ? 0.95 : 1});
    padding: 20px 20px;
    /* background:${({view,time}) => view ? `linear-gradient(to right, ${colors.secondary} ${time * 10}%,transparent ${time*10}%,transparent 100%)` : 'transparent'}; */
    /* background-color:${({view}) => view ? `rgba(${colors.secondary.hexTorgb().reduce((res,curr) => `${res},${curr}`)},1)` : 'transparent'}; */
    background-color:${({view}) => view ? colors.secondary : 'transparent'};

    opacity:${({isHover,otherCard}) => isHover ? 1 : otherCard ? 0.5 : 1};
    /* animation: ${({view,time}) => view ? time * 10 : 0} $loadingTime linear infinite; */
    transition: all .7s ease-out;

    *{
        /* padding: 20px 20px; */
        padding: 10px;
    }

    .heading{
        font-weight: bold;
        font-size: 20px;
        /* color:gray; */
        color:${({view}) => view ? 'white' : 'gray'};
    }

    .text{
        font-weight: normal;
        font-size: 15px;
        color:${({view}) => view ? 'white' : 'black'};

        &:after{
            color: white;
            mix-blend-mode: difference;
            transition: all 0.3s ease-in-out;
        }
    }

    &:hover{
        cursor: pointer;
    }
    ${AboutBox}
`

export const AboutContentBox = styled(motion.div)`
    flex: 0 1 100%;
    width:100%;
    min-height:100%;
    /* height:auto; */
    padding:20px;
    border-radius: 30px;
    display:flex;
    flex-flow: row nowrap;
    justify-content:flex-start;
    align-items:flex-start;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);

`

export const AboutDescriptBox = styled.div`
    flex: 0 1 60%;
    width:100%;
    height:100%;
    /* height:auto; */
    padding:20px;
    /* border-radius: 30px; */
    display:flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    align-items:flex-start;
    /* box-shadow: 0 10px 20px rgba(0,0,0,0.5); */
    z-index: 0;
    text{
        padding: 10px 0;
        font-weight: normal;
        font-size: 17.5px;
        color:black
    }

    ul{
        flex: 0 1 auto;
        width:100%;
        height:100%;
        list-style:none;
        display:flex;
        flex-flow: row wrap;
        justify-content:space-between;
        align-items: flex-start;
        cursor:pointer;
        transition: all 0.3s ease;

        li{
            flex: 0 1 30%;
            justify-content:center;
            align-items:center;
            width:100%;
            height:100%;
            /* padding:10px 20px; */
            margin: 10px;
        }
    }
`


export const ExpandInfoCard = styled(motion.div)`
    flex: 0 1 40%;
    width: 100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    align-items:flex-start;
    justify-content:flex-start;
    /* background-color:${colors.secondary}; */
    border-radius: 30px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    padding: 20px;
    backdrop-filter: blur;
    /* background-color: ${colors.secondary}; */
    color: ${colors.secondary};
    /* color:${colors.white}; */
    *{
        padding: 10px;
    }
    text{
        /* flex: 1 0 100%; */
        flex-grow: 1;
    }
    
`

// export const InfoCardZStack = styled.div`
//                 position:relative;
//                 width:100%;
//                 height:100%;
//                 z-index: 0;
//                 transition: all 0.3s ease;
//                 &:hover{
//                     transform: scale(1.1);
//                 }

//                 .top{
//                     position:absolute;
//                     z-index: 2;
//                     font-size: 15px;
//                     width:100%;
//                     height: 100%;
//                     /* left: width * 0.0625%; */
//                     left: 10%;
//                     top:50%;
//                     padding: 10px;
//                     border-radius: 15px;
//                     box-shadow: 0 10px 20px rgba(0,0,0,0.5);
//                     overflow:hidden;
//                     background-color:${colors.secondary};
//                     color:${colors.white};
//                 }

//                 .bottom{
//                     /* position:absolute;
//                     z-index: 2;
//                     left:0;
//                     top:0; */
//                     z-index: 1;
//                     height: 50%;
//                     font-size: 400%;
//                     margin: 10px;
//                     color:${colors.tomato};
//                     font-weight:bold;
//                 }
// `

export const InfoCardVStack = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items:flex-start;
    transition: all 0.3s ease;

    .Detail{
        flex: 0 1 auto;
        height:100%;
        font-size: 15px;
        padding: 10px;
        
        overflow:hidden;
        /* background-color:${colors.secondary}; */
        color:${colors.secondary};
        
    }

    .Num{
        /* z-index: 1; */
        height: 50%;
        font-size: 400%;
        margin: 10px;
        color:${colors.tomato};
        font-weight:bold;
    }

    &:hover{
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        transform: scale(1.1);
    }

`