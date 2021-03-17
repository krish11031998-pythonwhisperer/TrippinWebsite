import React,{useEffect,useState} from 'react'
import {
    BlogContainer,
    BlogRowContainer,
    BlogCard
} from './style'
import firebase from '../../firebase'
import {useSpring} from 'react-spring'
import TopBlogs from './topBlogs'
const Index = () => {
    let [blogs,setBlogs] = useState(null)
    let [loading,setLoading] = useState(false)
    let ref = firebase.firestore().collection("blogs")

    var getBlogs = () => {
        setLoading(true)
        ref.onSnapshot((querySnapshot) => {
            console.log('querySnapshot : ',querySnapshot);
            const items = []
            var count = 0
            querySnapshot.forEach(el => {
                var res = {id:count,blog:el.data()}
                count += 1
                console.log(`idx : ${count} blog : `,res)
                items.push(res)
            })
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
            {/* {blogs && <TopBlogs blogs={blogs}/>} */}
            <BlogRowContainer>
                {blogs && blogs.map(blog => {
                    console.log(blog)
                    return <BlogCardComponent
                        {...blog}
                    />
                })}
            </BlogRowContainer>
        </BlogContainer>
    )
}


const BlogCardComponent = props => {
    let {id,blog} = props
    let{headline,location,summaryText,image} = blog
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
