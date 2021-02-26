import React, {useState,useEffect} from 'react'
import { HomeContainer, HomeHeaderArea, HomeHeading, HomePageTab, VideoContainer,HomeHeaderImage } from './style';
import FeaturePage from '../FeaturesPage'
import Introduction from '../Introduction'
import ImageCarousel from '../PhotosZStack'
import AboutUs from '../AboutPage'
import Blogs from '../Blogs'
import MottoPage from '../MottoPage'
const Index = () => {
    let url = 'videos/video-1.mp4'
    let img = 'images/img-1.jpg'
    return (
        <>
            <HomePageTab>
                <VideoContainer src={url} autoPlay loop  muted>
                    {/* <source src={url} type="video/mp4"/>
                    Your browser does not support HTML5 video. */}
                </VideoContainer>
                <HomeContainer>
                    <HomeHeaderArea>
                        <HomeHeading>
                            <h1>Explore the world through AR!</h1>
                            <text>We envision building a trend of exploring cities with custom AR tech + Video + Audio all package in an Augmented form for a non- intrusive educational form of exploration</text>
                        </HomeHeading>
                        <HomeHeaderImage>
                            {/* <img src={img}/> */}
                            <ImageCarousel/>
                        </HomeHeaderImage>
                        

                    </HomeHeaderArea>
                    
                </HomeContainer>
                
            </HomePageTab>
            <MottoPage/>
            <AboutUs/>
            <Introduction/>
            <FeaturePage/>
            <Blogs/>
            {/* <AboutUs/> */}
        </>
        
    )
}


export default Index
