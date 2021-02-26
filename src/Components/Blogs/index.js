import React,{useEffect,useState} from 'react'
import {
    BlogContainer,
    BlogRowContainer,
    BlogCard
} from './style'
import firebase from '../../firebase'
import {useSpring} from 'react-spring'
const Index = () => {
    let [blogs,setBlogs] = useState(null)
    let [loading,setLoading] = useState(false)
    let ref = firebase.firestore().collection("blogs")

    var getBlogs = () => {
        setLoading(true)
        ref.onSnapshot((querySnapshot) => {
            console.log('querySnapshot : ',querySnapshot);
            const items = []
            querySnapshot.forEach((el,idx) => {items.push(el.data())})
            console.log(items)
            items.length > 0 && setBlogs(items.slice(0,3))
            setLoading(false)
        })
    }

    useEffect(() => {
        if(blogs  == null) getBlogs()
        if(blogs) console.log('blogs : ',blogs)
    },[blogs])


    return (
        <BlogContainer>
            <BlogRowContainer>
                {blogs && blogs.map(blog => {
                    return <BlogCardComponent
                        {...blog}
                    />
                })}
            </BlogRowContainer>
        </BlogContainer>
    )
}


const BlogCardComponent = props => {
    let{headline,location,summaryText,image} = props
    let [hover,setHover] = useState(false)
    let fade = useSpring({
        scale: hover ? 1.1 : 1,
        shadow: hover ? [20,10] : [0,0]
    })

    return <BlogCard
        style={{
            transform:fade.scale.interpolate(s => `scale(${s})`),
            boxShadow: fade.shadow.interpolate((v,h) => `${v}px ${h}px 15px rgba(0,0,0,0.2)`)
        }}
        src={image[0]}
        onMouseEnter = {() => {setHover(true)}}
        onMouseLeave = {() => {setHover(false)}}
    >
        <h1>{headline}</h1>
        <text>{summaryText}</text>
    </BlogCard>

}

export default Index
