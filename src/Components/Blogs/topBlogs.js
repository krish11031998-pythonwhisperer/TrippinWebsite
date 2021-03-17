import React,{useState,useRef} from 'react'
import {animated, useSprings} from 'react-spring'
import {useGesture,useDrag} from 'react-use-gesture'
import useMeasure from '../../Helpers/useMeasure'
import clamp from 'lodash-es/clamp'
import {TopBlogContainer, TopBlogImage} from './style'
const Index = (props) => {
    let index = useRef(0)
    let {blogs} = props;
    // let [mBind,measure] = useMeasure()
    const pages = [
        'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        // 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
    console.log('blogs : ',blogs);
    let [blogSprings,setSprings] = useSprings(pages.length, i => ({x : i *  window.innerWidth,sc:1,display: 'block'}))
    let dragbind = useDrag((values) => {
        let {down,dragging,movement:[m_x],delta:[d_x,d_y],cancel,direction:[xDir],distance} = values
        var {innerWidth:width} = window;
        console.log(`distance : ${distance} m_x : ${m_x}`)
        if(down && distance > width/10){
            var idx = clamp(index.current + xDir > 0 ? -1 : 1,0,blogs.length - 1)
            console.log('idx : ',idx);
            cancel((index.current = idx))
            console.log(index.current)
        }
        
        setSprings(i => {
            // console.log('updating the ')
            if (i < index.current - 1 || i > index.current + 1) return {display:'none'}
            if(!down) console.log('resetting the springs')
            // var dist = distance * -(xDir > 0 ? 1 : -1)
            var init_w = (i-index.current)* width
            var add_w  = (down ? m_x : 0)
            var x = init_w + add_w
            var sc = down ? (1 - (distance/width/2)) : 1
            var display = 'block'
            var res = {x,sc,display}
            return res
        })
    })

    var blogCarousel = blogSprings.map(({x,sc,display},i) => {
        let img = pages[i]
        return (
            
                <animated.div {...dragbind()} key={i} style={{transform:x.interpolate(x => `translate3d(${x}px,0px,0px)`), display, width:window.innerWidth,height: '500px'}}>
                    <TopBlogImage
                        {...dragbind()} 
                        key={i}
                        style={{
                            width:window.innerWidth,
                            scale: sc.interpolate(s => `scale(${s})`),
                            backgroundImage: `url(${img})`,
                            // touchAction:'none'
                        }}
                    />
                </animated.div>
            
            )
    })

    console.log('blogSprings : ',blogSprings);
    return <TopBlogContainer >
    {blogCarousel}
    </TopBlogContainer>
    
}

export default Index
