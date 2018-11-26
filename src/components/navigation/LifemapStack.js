import { createStackNavigator } from 'react-navigation'
import SurveysView from '../../screens/Surveys'
import LifemapScreens from './LifemapScreens'
import { generateNavOptions } from './helpers'

export default createStackNavigator({
  Surveys: {
    screen: SurveysView,
    navigationOptions: ({ navigation }) => ({
      title: 'Create a Life Map',
      ...generateNavOptions({ navigation })
    })
  },
  ...LifemapScreens
})
