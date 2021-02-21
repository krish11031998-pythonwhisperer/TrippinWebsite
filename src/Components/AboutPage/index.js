import React,{useState,useEffect, useRef} from 'react'
import {Colors as colors,PageHeader} from '../../style'
import {
    AboutUsContainer,
    AboutUsRow,
    AboutUsCurveBox,
    AboutBox,
    BGBox,
    AboutContentBox,
    AboutDescriptBox
} from './style'
// import {ProblemStatement as data} from '../Introduction/data'
import {AboutUsData as data} from './data'


const Index = () => {
    let [hoverIdx,setHoverIdx] = useState(-1)
    // let [[viewCard,time],setViewTime] = useState([0,1])
    let [viewCard,setViewCard] = useState(0)
    let [time,setTime] = useState(1);
    const timeSpan = 60;
    
    useEffect(() => {
        setInterval(() => {
            setTime(time => time + 1)
        },1000);
    },[])

    useEffect(() => {
        // console.log(`time : ${time} viewCard: ${viewCard}`);
        if (time > timeSpan){
            // setTimeout(() => 
                setViewCard(viewCard => viewCard < data.length - 1 ? viewCard + 1 : 0)
            // },500)
            // setTime(0)
        }
    },[time])


    useEffect(() => {
        setTime(0)
    }, [viewCard])

    var onMouseHover = (idx) => {
        setHoverIdx(idx);
    }

    var onClick = (idx) => {
        setViewCard(idx)
    }

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
            <AboutUsRow content={true}>
                {data[viewCard] && 
                    <AboutContentBox>
                        <AboutDescriptBox>
                            {data[viewCard].overview && <text>{data[viewCard].overview}</text>}
                            {data[viewCard].description && data[viewCard].description.split('\n').map(el => <text className="text">{el}</text>)}
                        </AboutDescriptBox>
                    </AboutContentBox>
                }
            </AboutUsRow>
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
        <AboutBox>
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
        </AboutBox>)
    
}

export default Index
