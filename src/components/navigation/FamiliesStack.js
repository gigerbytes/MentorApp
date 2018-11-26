import { createStackNavigator } from 'react-navigation'
import FamiliesView from '../../screens/Families'
import FamilyView from '../../screens/Family'
import { generateNavOptions } from './helpers'

export default createStackNavigator({
  Families: {
    screen: FamiliesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Families',
      ...generateNavOptions({ navigation })
    })
  },
  Family: {
    screen: FamilyView,
    navigationOptions: ({ navigation }) => ({
      title: `Family ${navigation.state.params.family}`,
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  }
})
