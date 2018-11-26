import TermsView from '../../screens/lifemap/Terms'
import SocioEconomicQuestionView from '../../screens/lifemap/SocioEconomicQuestion'
import FinalView from '../../screens/lifemap/Final'
import FamilyParticipantView from '../../screens/lifemap/FamilyParticipant'
import FamilyMembersNamesView from '../../screens/lifemap/FamilyMembersNames'
import FamilyMembersGenderView from '../../screens/lifemap/FamilyMembersGender'
import FamilyMembersBirthdatesView from '../../screens/lifemap/FamilyMembersBirthdates'
import QuestionView from '../../screens/lifemap/Question'
import BeginLifemapView from '../../screens/lifemap/BeginLifemap'
import LocationView from '../../screens/lifemap/Location'
import { generateNavOptions } from './helpers'

// Reusable object for all screens related to a draft
export default {
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
  SocioEconomicQuestion: {
    screen: SocioEconomicQuestionView,
    navigationOptions: ({ navigation }) => ({
      title: 'Socio Economic',
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
