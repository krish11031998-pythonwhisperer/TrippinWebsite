import React,{useState,useEffect, useRef,forwardRef,useImperativeHandle} from 'react'
import {Colors as colors,PageHeader} from '../../style'
import {
    AboutUsContainer,
    AboutUsRow,
    AboutUsCurveBox,
    AboutBox,
    BGBox,
    AboutContentBox,
    AboutDescriptBox,
    InfoCardZStack,
    ExpandInfoCard,
    InfoCardVStack
} from './style'
// import {ProblemStatement as data} from '../Introduction/data'
import {AboutUsData as data} from './data'
import {useTransition,useSpring} from 'react-spring'


const Index = () => {
    let [hoverIdx,setHoverIdx] = useState(-1)
    let [selectedIdx,setSelectedIdx] = useState(-1)
    let [onCard,toggleCard] = useState(false)
    let [viewCard,setViewCard] = useState(null)
    let [time,setTime] = useState(1);
    let [info,setInfo] = useState(-1);
    let transition = useTransition(viewCard != null,null,{
        from:{x:100,opacity:0},
        enter:{x: 0,opacity:1},
        leave:{x: -100,opacity:0},
        config:{
            duration: 300
        }
    })
    const timeSpan = 600;
    
    useEffect(() => {
        setViewCard(0)
        setInterval(() => {
            setTime(time => time + 1)
        },1000);
    },[])

    useEffect(() => {
        if(info == -1 && onCard){
            toggleCard(false)
        }else if(!onCard){
            toggleCard(true)
        }
    },[info])

    var changeViewCard = (el) => {
        console.log('selected EL : ',el)
        var current = viewCard
        setViewCard(null)
        setTimeout(() => {
            if(el || el == 0){
                console.log('Setting to el')
                setViewCard(el)
            }else{
                console.log('Setting to the next Card')
                setViewCard(current < data.length - 1 ? current + 1 : 0)
            }
        },300)
        
    }

    useEffect(() => {
        if (time > timeSpan){
            changeViewCard()
        }
    },[time])

    useEffect(() => {
        if(viewCard != -1){
            setTime(0)
            if (info != -1){
                setInfo(-1)
            }
        }
    }, [viewCard])

    var onMouseHover = (idx) => {
        setHoverIdx(idx);
    }

    var onClick = (idx) => {
        // setViewCard(idx)
        changeViewCard(idx)
    }

    var changeInfo = (el) => {
        console.log('Changing Log!')
        if (info == -1){
            setInfo(el)
        }else if (info != -1 && info != el){
            setInfo(-1)
            setTimeout(() => {
                setInfo(el)
            },300)
        }else if(info == el){
            setInfo(-1)
        }
        
    }

    var currentViewCard = data[viewCard]

    return (
        <AboutUsContainer>
            <PageHeader>About Us</PageHeader>
            <AboutUsRow>
                {data.map((el,idx) =>{
                    return <AboutUsRowBox
                        timeSpan={timeSpan}
                        cardData={el}
                        idx={idx}
                        hover={hoverIdx == idx}
                        otherCard={hoverIdx != -1}
                        viewCard={viewCard}
                        onMouseHover={onMouseHover}
                        time={time}
                        onClick={(idx) => {changeViewCard(idx)}}
                    />
                    
                })}
            </AboutUsRow>
            {transition.map(({item,key,props:style}) => {
                return item && currentViewCard && <InfoCardContent
                    card={currentViewCard}
                    changeInfo={(el) => {changeInfo(el)}}
                    info={info}
                    style={style}
                />
            })}
            {/* {currentViewCard && <InfoCardContent
                        card={currentViewCard}
                        changeInfo={(el) => {changeInfo(el)}}
                        info={info}
                    />} */}
            
        </AboutUsContainer>
    )
}

const InfoCardContent = props => {
    let{card,changeInfo,info,style} = props
    let{title,overview,description,points,desc_info} = card
    let transition = useTransition(info != -1,null,{
        from:{lxys:[-25,0,0,0.6],opacity:0},
        enter:{lxys:[0,0,0,1],opacity:1},
        leave:{lxys:[-25,0,0,0.6],opacity:0},
        config:{
            duration: 300
        }
    })
    var AboutContentDescription = (
    <AboutDescriptBox>
        {overview && <text>{overview}</text>}
        {description && description.split('\n').map(el => {
            return <text className="text">{el}</text>
        })}
        {points &&  <ul>
                {
                    points.map((el,idx) => {
                        return (<li>
                                <InfoCardVStack onClick={() => {changeInfo(idx)}}>
                                    <div className="Num">{`0${idx + 1}`}</div>
                                    <div className="Detail">{el}</div>
                                </InfoCardVStack>
                            </li>)
                        }
                    )
                }

            </ul>
        }
    </AboutDescriptBox>)

    return <AboutUsRow
            style={{
                transform: style.x.interpolate(x => `translate3d(${x}px,0,0)`),
                opacity:style.opacity        
            }} 
            content={true}
        >
        <AboutContentBox>
            {AboutContentDescription}
            {points && transition.map(({item,props:style,key}) => {
                return item && <ExpandInfoCard
                    style={{
                        // transform: style.lxys.interpolate((l,x,y,s) => `translate3d(${l}px,0,0) rotateX(${y}deg) rotateY(${x}deg) scale(${s})`),
                        transform: style.lxys.interpolate((l,x,y,s) => `translate3d(${l}px,0,0) rotateX(${y}deg) rotateY(${x}deg)`),
                        ...style
                    }}
                >
                    <text>{points[info]}</text>
                    {desc_info[info] && desc_info[info].map((el,idx) => <text>{el || 'test'}</text>)}
                </ExpandInfoCard>
            })}            
        </AboutContentBox>
    </AboutUsRow>
}

const AboutUsRowBox = props => {
    let {cardData,idx,hover,otherCard,viewCard,onMouseHover,time,timeSpan,onClick} = props
    let cardRef = useRef()
    let [clientHeight,setClientHeight] = useState(0)
    let [cardDim,setCardDim] = useState({})
    let fade = useSpring({
        width: viewCard == idx ? time * 100/timeSpan : 0,
        x: hover ? 1 : otherCard ? 0.95 : 1,
        config:{
            duration: 300
        }
    })
    useEffect(() => {
        console.log(cardRef)
        let {current:frame} = cardRef
        if (frame){
            setClientHeight(frame.clientHeight)
        }
    },[cardRef.current])

    var _onClick = () => {
        onClick(idx)
    }

    return (
        // <AboutBox>
            <AboutUsCurveBox
                ref = {cardRef}
                onMouseEnter={() => {onMouseHover(idx)}}
                onMouseLeave={() => {onMouseHover(-1)}}
                isHover={hover}
                otherCard={otherCard}
                // time={time} 
                view={viewCard == idx} 
                style={{
                    transform: fade.x
                    // .interpolate({
                    //     range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    //     output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                    // })
                    .interpolate(x => `scale(${x})`),
                    // opacity:fade.opacity,
                    // backgroundColor:fade.backgroundColor
                    

                }}
                onClick={_onClick}
            >
                <text className="heading">{cardData.title}</text>
                <BGBox 
                    style={{
                        width: fade.width.interpolate(x => `${x}%`)
                    }}
                />
            </AboutUsCurveBox>
        // </AboutBox>
        )
    
}

export default Index
