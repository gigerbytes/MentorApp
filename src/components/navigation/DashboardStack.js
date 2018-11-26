import { createStackNavigator } from 'react-navigation'
import DashboardView from '../../screens/Dashboard'
import LifemapScreens from './LifemapScreens'
import { generateNavOptions } from './helpers'

export default createStackNavigator({
  Dashboard: {
    screen: DashboardView,
    navigationOptions: ({ navigation }) => generateNavOptions({ navigation })
  },
  ...LifemapScreens
})
