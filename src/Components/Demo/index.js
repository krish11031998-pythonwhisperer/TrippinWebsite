import React, { useEffect, useRef, useState } from 'react'
import {
    DemoContainer,
    DemoCol,
    DemoCardWrapper,
    DemoCard
} from './style'
import {Colors as colors} from '../../style'
import {useSprings,animated, useSpring, interpolate} from 'react-spring'
import {useDrag} from 'react-use-gesture'
import clamp from 'lodash-es/clamp'
const Index = () => {
    var cardRef = useRef(null)
    var [cardDim,setCardDim] = useState({})

    useEffect(() => {
        if(cardRef.current){
            var frame = cardRef.current.getBoundingClientRect()
            console.log('Demo frame : ',frame)
            setCardDim(frame)
        }
    },[cardRef.current])
    var index = useRef(0)
    var polyCaptions = {
        'https://sketchfab.com/models/3d7e71e6ee7d4590bf83914f5be7a6c8/embed?camera=0':
        "Hi everyone! Welcome to my (hopefully) weekly series, where every week I will be uploading a model of most cities I’ve been along my life. It will be done in this kind of Low Poly/Voxel style (which I want lo learn), with some of the iconic landmarks. Any feedback will be apreciated!.\nOur first place to visit is Gijón, where I was born. It’s an small city in Asturias, in the north of Spain.\nThe model represents Cimadevilla’s neighborhood, the oldest part of the city. The rather caotic distribution of houses and streets (almost none of them goes following an straigth line) helps to protect the pedestrians from the cold wind. A few landmarks can be found here.",
        'https://sketchfab.com/models/c244afe3c0044ae59f72af68f57cf7b7/embed':
        "Hi everyone! And welcome to my second entry on my little trip. Today, we travel to Oviedo, just around 25 km away from our previous stop, Gijón. Oviedo is the capital of the province, Asturias, in the north of Spain. It’s the second biggest city of the region.\nThis time I decided to focus on a single building, instead of a full neighborhood. I think I will be switching from one approach to the other along the series.\nThis is the “Cathedral of San Salvador” of Oviedo. The building of the present edifice began in 1388, and it took almost three centuries to finish. A few other annexed buildings were built around it, but I decided to focus on the cathedral itself.",
        'https://sketchfab.com/models/81b394147be9439e861f8cd53726c065/embed':
        'Hi everyone! I’m back with the third part of my Low Poly Travel. This time we move a little bit to the south from our last location, to find this beautiful castle in the city of Coca, Segovia.\nIt was built in the XV century, between 1473 and 1493, and serves an excellent example of the Gothic and Mudéjar styles. In 1812 it was partially destroyed and abandoned, but in 1956 it was renovated, and began to serve as a training center for foresters.\nSomething that I always found curious is its reddish/pinkish tones (although it varies with the ilumination of the day), due to being built and decorated with bricks instead of stones or other usual materials.',
        'https://sketchfab.com/models/ed3c6f994f11477d9f79a20849c4a02d/embed':
        'Our first time outside Spain! Today we visit Miranda do Douro, a little town near the Douro river, which actually acts as a natural frontier between Portugal and Spain!\nThis place was my first time abroad (although it wasn’t really that far), so it had to be our first time abroad as well.'
    
    }
    var polyTravels = Object.keys(polyCaptions)
    var [springs,setSprings] = useSprings(polyTravels.length, i => ({
        scale:1,
        x: i * window.innerWidth,
        display: 'block',
        // opacity: i == index.current ? 1 : 0
    }))

    const updateSprings = (mX=null,distance=null,down=null) => {
        let {width} = cardDim
        setSprings(i => {
            if(i < index.current - 1 || i > index.current + 1) return {display: 'none'}
            var x = (i - index.current) * width
            var scale = 1
            // var opacity = i == index.current ? 1 : 0
            if(down){
                if(mX) x += mX
                if(distance) scale = 1 - distance/ width * 0.5
            }
            return{x,scale,display:'block'}

        })
    }

    var bind = useDrag(({args:[current], movement:[mX],down,direction:[xDir],distance,cancel}) => {
        let {innerWidth: width} = window
        if(down && distance > width * 0.25){
            cancel((index.current = clamp(current + (xDir > 0 ? -1 : 1),0,polyTravels.length - 1)))
            down = false
        }
        updateSprings(mX,distance,down)
    })

    var sketchFrameBuilder = url => (
        <div class="sketchfab-embed-wrapper">
            <iframe src={url}>
            </iframe>
        </div>
    )

    window.addEventListener('resize',(e) => {
        if(cardRef.current){
            var frame = cardRef.current.getBoundingClientRect()
            console.log('Demo frame (at resize) : ',frame)
            setCardDim(frame)            
        }
        updateSprings()
    })

    const trans = (x,scale) => `translate3d(${x}px,0px,0px) scale(${scale})`
    return cardDim && (
        <DemoContainer
            ref={cardRef}
        >
            {springs.map(({display,x,scale},i) => {
                var link = polyTravels[i]
                return(
                    <DemoCardWrapper
                        key={i}
                        {...bind(i)}
                        style={{
                            display,
                            transform: x.interpolate(x => `translate3d(${x}px,0px,0px)`),
                        }}
                    >
                        <DemoCard
                            style={{
                                transform: interpolate([scale], (scale) => `scale(${scale})`)
                            }}
                        >
                            <DemoCol large={true}>
                                {sketchFrameBuilder(link)}
                            </DemoCol>
                            <DemoCol>
                                <animated.div
                                    className="content"
                                >
                                    <ul>
                                        {polyCaptions[link].split("\n").map((text,idx) => {
                                            return <li><text>{text}</text></li>
                                        })}
                                    </ul>
                                    {/* <text>{polyCaptions[link]}</text> */}
                                </animated.div>
                                
                            </DemoCol>
                        </DemoCard>
                    </DemoCardWrapper>
                )
            })}
        </DemoContainer>
    )
}


export default Index
