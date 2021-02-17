import {Colors as colors} from '../../style'
import Problem from '../Helper/LottiePlayer/lottieFiles/map-services.json'
import Adventure from '../Helper/LottiePlayer/lottieFiles/traveller-cycle.json'
export const ProblemStatement = [
    {
        id: 0,
        title:"Problem",
        overview:'The Travelling Scene has been same since the inception of technology, with the power of technology that is available today , we believe that we ' + 
        'arent seeing any changes in the travelling scene!',
        color: colors.red,
        textColor:colors.white,
        mainImg:'images/tourGuide.png',
        animation:Problem

    },
    {
        id: 1,
        title: " No AR in travel?",
        overview:"There aren't many apps out there that build a dedicated platform for AR-powered exploration, and we would like to change that!",
        description:"",
        color: colors.red,
        textColor:colors.white
    },
    {
        id: 2,
        title: "Boring Virtual Experience",
        overview:"Explore attractions by reading and watching videos on a phone, no thank you!; why not use an interactive non-intrusive way - something AR can handle!",
        description:"",
        color: colors.red,
        textColor:colors.white
    },
    {
        id: 3,
        title: "Same exploration formula",
        overview:"Image + Paragraphs of Text + Videos 🙅🏽‍♂️ = Great Experience; We would like to change up the scene and we have ideas!",
        description:"",
        color: colors.red,
        textColor:colors.white
    }
]

export const SolutionStatement = [
    {
        id: 0,
        title:"Solution",
        overview:'The Travelling Scene has been same since the inception of technology, with the power of technology that is available today , we believe that we ' + 
        'arent seeing any changes in the travelling scene!',
        color: colors.green,
        textColor:'black',
        mainImg:'images/tourGuide.png',
        animation:Adventure
    },
    {
        id: 1,
        title: "AR Tour Experience",
        overview:"We envision building a trend of exploring cities with custom AR tech + Video + Audio all package in an Augmented form for a non- intrusive educational form of exploration",
        description:"",
        color: colors.green,
        textColor:'black'
    },
    {
        id: 2,
        title: "AR Experience Builder",
        overview:"And we would like to provide you a platform to create and share AR experiences.",
        description:"",
        color: colors.green,
        textColor:'black'
    },
    {
        id: 3,
        title: "Dream Big",
        overview:"Build AR Experience without limitations, we will help you exercise your artistic license without any compromises.",
        description:"",
        color: colors.green,
        textColor:'black'
    }
]