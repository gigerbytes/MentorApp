import { AppRegistry, YellowBox } from 'react-native'
import './src/i18n'
import App from './App'
import { name as appName } from './app.json'

// remove useless 'debugger in background tab' warning
YellowBox.ignoreWarnings(['Remote debugger'])

AppRegistry.registerComponent(appName, () => App)
