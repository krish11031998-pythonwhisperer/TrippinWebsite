import React,{useState,useEffect, useRef} from 'react'
import Lottie from 'react-lottie'

const LottiePlayer = (props) =>{
    let [animatableData,setAnimatableData] = useState()
    let {lottieCard,hover,factor,cardDim} = props
    let [cardWidth,setCardWidth] = useState(0)
    
    let checkHeight = () => {
        let {innerWidth:width} = window
        let w_factor = (factor ? factor : 0.1)
        let w = width * w_factor
        console.log(`w : ${w} and w_factor : ${w_factor}`);
        setCardWidth(w)
    }

    useEffect(() => {
        if (lottieCard){
            setAnimatableData(lottieCard)
        }
        checkHeight()
    },[])

    window.addEventListener('resize',checkHeight)
    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: animatableData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
        
    };

    return animatableData ? <Lottie 
            options={defaultOptions} 
            height={cardWidth}
            width={cardWidth}
            isPaused={hover ? !hover : false}
        />
        :
        <div>
            Loading...
        </div>
}

export default LottiePlayer