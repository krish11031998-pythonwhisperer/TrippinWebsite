import React,{useState,useEffect, useRef} from 'react'
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


const Index = () => {
    let [hoverIdx,setHoverIdx] = useState(-1)
    // let [[viewCard,time],setViewTime] = useState([0,1])
    let [viewCard,setViewCard] = useState(null)
    let [time,setTime] = useState(1);
    let [info,setInfo] = useState(-2)
    const timeSpan = 600;
    
    useEffect(() => {
        setViewCard(0)
        setInterval(() => {
            setTime(time => time + 1)
        },1000);
    },[])

    var changeViewCard = (el) => {
        var current = viewCard
        setViewCard(null)
        setTimeout(() => {
            if(el){
                console.log('Setting to el')
                setViewCard(el)
            }else{
                console.log('Setting to the next Card')
                setViewCard(current < data.length - 1 ? current + 1 : 0)
            }
            
        },500)
    }

    useEffect(() => {
        // console.log(`time : ${time} viewCard: ${viewCard}`);
        if (time > timeSpan){
            // setViewCard(0)
            
            // setViewCard(viewCard => viewCard < data.length - 1 ? viewCard + 1 : 0)
            changeViewCard()
        }
    },[time])

    // useEffect(() => {
    //     if(info != -1) {
    //         console.log('info : ',info)
    //     }else{
    //         console.log('info == -1');
    //     }
    // },[info])

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
        if (info == -1){
            setInfo(el)
        }else if (info != -1 && info != el){
            setInfo(-1)
            setTimeout(() => {
                setInfo(el)
            },500)
        }else{
            setInfo(-1)
        }
        
    }

    var currentViewCard = data[viewCard]
    var InfoContentBox = <AboutUsRow content={true}>
        {currentViewCard && 
            <AboutContentBox
                initial={{
                    x : -50
                }}
                animate={{
                    x : viewCard != null ? 0 : -50,
                    opacity: viewCard != null ? 1 : 0
                }}
                transition={{
                    duration: 0.5
                }}
            >
                <AboutDescriptBox>
                    {currentViewCard.overview && <text>{currentViewCard.overview}</text>}
                    {currentViewCard.description && currentViewCard.description.split('\n').map(el => {
                        return <text className="text">{el}</text>
                    })}
                    {currentViewCard.points &&  <ul>
                            {
                                currentViewCard.points.map((el,idx) => {
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
                </AboutDescriptBox>
                {info > -2 && currentViewCard && currentViewCard.points && currentViewCard.desc_info && 
                        <ExpandInfoCard
                            initial={{
                                x : -50
                            }}
                            animate={{
                                x: info != -1 ? 0 : '-50px',
                                opacity: info != -1 ? 1 : 0
                            }}
                            transition={{
                                duration: 0.5
                            }}
                        >
                            <text>{currentViewCard.points[info]}</text>
                            {currentViewCard.desc_info[info] && currentViewCard.desc_info[info].map((el,idx) => <text>{el || 'test'}</text>)}
                            {/* <text></text> */}
                        </ExpandInfoCard>
                }
                
            </AboutContentBox>
        }
    </AboutUsRow>

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
                        onClick={(idx) => {setViewCard(idx)}}
                    />
                    
                })}
            </AboutUsRow>
            {InfoContentBox}
        </AboutUsContainer>
    )
}

const AboutUsRowBox = props => {
    let {cardData,idx,hover,otherCard,viewCard,onMouseHover,time,timeSpan,onClick} = props
    let cardRef = useRef()
    let [clientHeight,setClientHeight] = useState(0)
    let [cardDim,setCardDim] = useState({})

    useEffect(() => {
        console.log(cardRef)
        let {current:frame} = cardRef
        if (frame){
            setClientHeight(frame.clientHeight)
        }
    },[cardRef.current])


    // useEffect(() => {
    //     console.log(`idx : ${idx} viewCard : ${viewCard}`);
    // },[viewCard])

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
                time={time} 
                view={viewCard == idx} 
                onClick={_onClick}
            >
                <text className="heading">{cardData.title}</text>
                <BGBox 
                    timeSpan={timeSpan}
                    time={time} 
                    view={viewCard} 
                    idx={idx}
                />
            </AboutUsCurveBox>
        // </AboutBox>
        )
    
}

export default Index
