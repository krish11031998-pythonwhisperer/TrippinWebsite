import React, {useState,useEffect} from 'react'
import {
    MottoContainer,
    MottoContent,
    MottoImageSlideshow
} from './style'
import firebase from 'firebase'
import {useTransition,animated} from 'react-spring'
const Index = () => {
    let imgs = [...Array(10).keys()].filter(el => el != 0).map(el => `images/img-${el}.jpg`);
    let [index,setIndex] = useState(0)
    let [loading,setLoading] = useState(false)
    let [images,setImages] = useState(imgs.map((el,idx) => ({id:idx,img:{image:[el]}})))
    let ref = firebase.firestore().collection("posts")
    let transition = useTransition(images[index],item => item.id,{
        from:{opacity:0,scale:1.1},
        enter:{opacity:1,scale:1},
        leave:{opacity:0,scale:0.9}
    })

    const getImages = () => {
        ref.onSnapshot((queryDocument) => {
            let item = []
            queryDocument.forEach(img => {
                item.push(img.data())
            })
            setImages(item.slice(4,14).map((el,idx) => ({id:idx,img:el})))
            !loading && setLoading(true)
        })
    }

    useEffect(() => {
        if(loading){
            setInterval(() => {
                setIndex(idx => {
                    console.log(`images.length : ${images.length} and idx : ${index}`)
                    return idx < images.length - 1 ? idx + 1 : 0
                })
            },5000)
        }
    },[loading])


    useEffect(() => {
        // getImages()
        setLoading(true)
    },[])

    // let transition = useTransition(slide[index],)
    return (
        images.length > 0 && transition &&  <MottoContainer>
            <MottoImageSlideshow>
                {transition.map(({item,key,props:style}) => {
                    return <animated.div
                        className="img"
                        key={key}
                        style={{
                            opacity:style.opacity,
                            transform: style.scale.interpolate(s => `scale(${s})`),
                            backgroundImage:`url(${item.img.image[0]})`,
                        }}
                    />
                })}
            </MottoImageSlideshow>
            
            <MottoContent>
                <text className="mottoHeading">We want you to explore the world through qualitative Experiences</text>
                <text>A Social Media Platform for travellers and travel content creators to create and share custom interactive, educational experiences/tour guides powered by state-of-the-art technology like Augmented Reality and Artificial Intelligence.</text>

            </MottoContent>
        </MottoContainer>
    )
}

export default Index
