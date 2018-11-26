import React from 'react'

import { shallow } from 'enzyme'
import { TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DraftListItem from '../DraftListItem'

const createTestProps = props => ({
  handleClick: jest.fn(),
  item: {
    draftId: 1,
    familyData: {
      countFamilyMembers: 1,
      longitude: -25.8976,
      latitude: -22.2521,
      familyIdentifier: 'ASD323', //uuid
      address: 'SOME ADDRESS',
      postalCode: '1000',
      accuracy: 100, //number
      familyMembersList: [
        {
          firstName: 'Juan', //mandatory
          lastName: 'Perez', //mandatory
          documentNumber: '123456',
          email: 'juan@gmail.com',
          birthCountry: 'Paraguay',
          gender: 'F',
          birthDate: 12345,
          primary: true,
          socioEconomicAnswers: [
            { key: 'educationPersonMostStudied', value: 'SCHOOL-COMPLETE' },
            { key: 'receiveStateIncome', value: 'NO' }
          ]
        },
        {
          firstName: 'Ana', //mandatory
          lastName: 'Perez',
          documentNumber: '123456',
          email: 'juan@gmail.com',
          birthCountry: 'Paraguay',
          gender: 'F',
          birthDate: 12345,
          primary: false,
          socioEconomicAnswers: [
            {
              key: 'familyUbication',
              value: '54.98584496333538,-1.5724916942463096'
            },
            { key: 'educationPersonMostStudied', value: 'SCHOOL-COMPLETE' },
            { key: 'receiveStateIncome', value: 'NO' }
          ]
        }
      ]
    },
    created: 1539971763946
  },
  ...props
})

describe('DraftListItem Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<DraftListItem {...props} />)
  })

  describe('rendering', () => {
    it('renders <TouchableOpacity />', () => {
      expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
    })
    it('renders <View />', () => {
      expect(wrapper.find(View)).toHaveLength(1)
    })
    it('renders <Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(2)
    })
    it('renders <Icon />', () => {
      expect(wrapper.find(Icon)).toHaveLength(1)
    })
    it('renders the correct date in first Text component', () => {
      expect(
        wrapper
          .find(Text)
          .first()
          .props().children
      ).toEqual('Oct, 19 2018')
    })
    it('renders the correct name in last Text component', () => {
      expect(
        wrapper
          .find(Text)
          .last()
          .props().children
      ).toEqual(['Juan', ' ', 'Perez'])
    })
  })
  describe('functionality', () => {
    it('should call handleClick onPress', () => {
      wrapper
        .find(TouchableOpacity)
        .props()
        .onPress()
      expect(wrapper.instance().props.handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
