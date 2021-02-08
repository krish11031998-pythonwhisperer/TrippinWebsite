import {Colors as colors} from '../../style'
import traveller  from './lottieFiles/traveller-cycle.json'
import  story from './lottieFiles/story.json'
import explore from './lottieFiles/explore.json'
import explore_two from './lottieFiles/explore-2.json'
let data =  [{
    large:true,
    color: colors.green,
    heading:"AR",
    description:"We envision building a trend of exploring cities with custom Illustrative Assets + Video + Audio all package in an Augmented form for a non- intrusive educational form of exploration",
    // lottieCard:"/Users/krishnavenkatramani/Desktop/React/trippin/public/lotties/traveller-cycle.json",
    lottieCard:traveller,
},{
    large:false,
    color: colors.orange,
    heading:"Tours",
    description:"We want to give the content creators the freedom to design tours of their style without impeding their creativity"
},{
    large:false,
    color: colors.indigo,
    heading:"Community",
    description:"Create a friendly community so that travellers can engage with the locals to provide a more authentic experience"
},{
    large:true,
    color: colors.red,
    heading:"Playful Exploration",
    description:"Gamifications elements within the app to provide a more innovative and interactive style of exploration while rewarding the users",
    lottieCard:explore_two
},{
    large:true,
    color: colors.tomato,
    heading:"Stories",
    description:"Help Travel enthusiasts to voice out their stories and help people explore the world through their eyes",
    lottieCard:story
},
{
    large:false,
    color: colors.cyan,
    heading:"Local Market",
    description:"Support the local market"
}

]

export default data