import React from 'react'
import {useSpring} from 'react-spring'
import {
    AppDemoContainer,
    AppDemoCol,
    AppDemoContent
} from './style'
const Index = () => {

    var phoneSpring = useSpring({
        from:{
            x: -100,
            opacity: 0
        },
        to:{
            x: 0,
            opacity: 1
        }
    })

    return (
        <AppDemoContainer>
            <AppDemoCol large={true}>
                <img src={"images/3d-iphone-12-mockup_2.png"}></img>
            </AppDemoCol>
            <AppDemoCol>
                <AppDemoContent>
                    <text className="mottoHeading">We are creating this mobile platform to enhance your travelling experience </text>
                    <text>We are working on developing a platform where graphic designers, travel enthusiasts and historians can collaborate to bring art to life. We want to bring all types of traditional media with our innovative AR Experience to provide a one-place stop for your travelling needs!</text>
                    <text className="disclaimer">{"(These are screenshoots of the our app which is currently under development!)"}</text>
                </AppDemoContent>
            </AppDemoCol>
        </AppDemoContainer>
    )
}

export default Index

