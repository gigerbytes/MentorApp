import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import QuestionView from '../screens/lifemap/Question'
import BeginLifemapView from '../screens/lifemap/BeginLifemap'
import LocationView from '../screens/lifemap/Location'
import LoginView from '../screens/Login'
import SurveysView from '../screens/Surveys'
import FamiliesView from '../screens/Families'
import FamilyView from '../screens/Family'
import DashboardView from '../screens/Dashboard'
import TermsView from '../screens/lifemap/Terms'
import FinalView from '../screens/lifemap/Final'
import FamilyParticipantView from '../screens/lifemap/FamilyParticipant'
import FamilyMembersNamesView from '../screens/lifemap/FamilyMembersNames'
import FamilyMembersGenderView from '../screens/lifemap/FamilyMembersGender'
import FamilyMembersBirthdatesView from '../screens/lifemap/FamilyMembersBirthdates'
import SyncView from '../screens/Sync'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import i18n from '../i18n'
import { switchLanguage } from '../redux/actions'

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = {
  switchLanguage
}

// Component that renders the drawer menu content. DrawerItems are the links to
// the given views.
export class DrawerContent extends Component {
  changeLanguage = lng => {
    i18n.changeLanguage(lng)
    this.props.switchLanguage(lng)
    this.props.navigation.toggleDrawer()
  }
  render() {
    const { lng, user } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image
            style={{ height: 172, width: 304 }}
            source={require('../../assets/images/navigation_image.png')}
          />
          <View style={styles.languageSwitch}>
            <TouchableOpacity id="en" onPress={() => this.changeLanguage('en')}>
              <Text
                style={[
                  globalStyles.h3,
                  lng === 'en' ? styles.whiteText : styles.greyText
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
            <Text style={[globalStyles.h3, styles.whiteText]}>
              {'  '}|{'  '}
            </Text>
            <TouchableOpacity id="es" onPress={() => this.changeLanguage('es')}>
              <Text
                style={[
                  globalStyles.h3,
                  lng === 'es' ? styles.whiteText : styles.greyText
                ]}
              >
                ESP
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            id="username"
            style={[styles.username, globalStyles.h3, styles.whiteText]}
          >
            {user.username}
          </Text>
          <DrawerItems {...this.props} />
        </View>
        <TouchableOpacity id="logout" style={styles.logout} onPress={() => {}}>
          <CommunityIcon name="logout" size={20} color={colors.palegreen} />
          <Text style={styles.logoutLabel}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

DrawerContent.propTypes = {
  lng: PropTypes.string,
  switchLanguage: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const ConnectedDrawerContent = withNamespaces()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DrawerContent)
)

// Separate component for the icon next to each nav link as color and size are
// the same for each.
const DrawerIcon = ({ name, rotate }) => (
  <Icon
    name={name}
    color={colors.palegreen}
    size={24}
    style={rotate ? styles.rotate : {}}
  />
)

DrawerIcon.propTypes = {
  name: PropTypes.string.isRequired,
  rotate: PropTypes.bool
}

// Each of the major views has a stack that needs the same nav options.
// These options handle the header styles and menu icon.
export const generateNavOptions = ({ navigation, headerLeft = true }) => {
  const options = {
    headerTitleStyle: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
      marginLeft: 35
    },
    headerStyle: {
      height: 66,
      backgroundColor: colors.beige
    }
  }

  if (headerLeft) {
    options.headerLeftContainerStyle = {
      marginLeft: 19
    }
    options.headerLeft = (
      <Icon
        name="menu"
        size={30}
        color={colors.lightdark}
        onTouchEnd={() => navigation.toggleDrawer()}
      />
    )
  }

  return options
}

// Reusable object for all screens related to a draft
const DraftScreens = {
  Terms: {
    screen: TermsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Terms & Conditions',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  Privacy: {
    screen: TermsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Privacy Policy',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  Location: {
    screen: LocationView,
    navigationOptions: ({ navigation }) => ({
      title: 'Location',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  BeginLifemap: {
    screen: BeginLifemapView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  Question: {
    screen: QuestionView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  Final: {
    screen: FinalView,
    navigationOptions: ({ navigation }) => ({
      title: 'Thank you!',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  FamilyParticipant: {
    screen: FamilyParticipantView,
    navigationOptions: ({ navigation }) => ({
      title: 'Primary participant',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  FamilyMembersNames: {
    screen: FamilyMembersNamesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Family members',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  FamilyMembersGender: {
    screen: FamilyMembersGenderView,
    navigationOptions: ({ navigation }) => ({
      title: 'Gender',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  },
  FamilyMembersBirthdates: {
    screen: FamilyMembersBirthdatesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Birth dates',
      ...generateNavOptions({ navigation, headerLeft: false })
    })
  }
}

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardView,
    navigationOptions: ({ navigation }) => generateNavOptions({ navigation })
  },
  ...DraftScreens
})

const LifemapStack = createStackNavigator({
  Surveys: {
    screen: SurveysView,
    navigationOptions: ({ navigation }) => ({
      title: 'Create a Life Map',
      ...generateNavOptions({ navigation })
    })
  },
  ...DraftScreens
})

export const FamiliesStack = createStackNavigator({
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

const SyncStack = createStackNavigator(
  {
    Sync: {
      screen: SyncView,
      navigationOptions: {
        title: 'Sync'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => generateNavOptions({ navigation })
  }
)

// the drawer navigation menu
const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        drawerLabel: i18n.t('views.dashboard'),
        drawerIcon: (
          <Image source={require('../../assets/images/icon_dashboard.png')} />
        )
      }
    },
    Surveys: {
      screen: LifemapStack,
      navigationOptions: {
        drawerLabel: 'Create a Life Map',
        drawerIcon: <DrawerIcon name="swap-calls" rotate={true} />
      }
    },
    Families: {
      screen: FamiliesStack,
      navigationOptions: {
        drawerIcon: (
          <Image source={require('../../assets/images/icon_family_nav.png')} />
        )
      }
    },
    Sync: {
      screen: SyncStack,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="sync" />
      }
    }
  },
  {
    contentComponent: ConnectedDrawerContent,
    contentOptions: {
      labelStyle: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
        color: colors.palegreen
      },
      iconContainerStyle: {
        opacity: 1,
        marginRight: 0
      },
      activeBackgroundColor: colors.palebeige,
      activeTintColor: colors.palegreen,
      itemsContainerStyle: {
        marginVertical: 0
      }
    },
    initialRouteName: 'Dashboard',
    drawerWidth: 304
  }
)

export const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginView }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

// The drawer nav doesn't have it's own way of showing a menu toggle icon,
// so we put it as a part of the App stack. This is also where we control which
// stack has a header bar, which stack to show if the user us not authenticated.
export const AppStack = createStackNavigator(
  {
    Drawer: {
      screen: DrawerNavigator
    }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  greyText: {
    color: colors.palegrey
  },
  whiteText: {
    color: colors.white
  },
  languageSwitch: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 16
  },
  username: {
    position: 'absolute',
    top: 139,
    left: 16
  },
  logout: {
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 25
  },
  logoutLabel: {
    marginLeft: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    color: colors.palegreen
  },
  rotate: {
    transform: [{ rotate: '90deg' }]
  }
})
