import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { FamilyMembersBirthdates } from '../lifemap/FamilyMembersBirthdates'

import Button from '../../components/Button'
import DateInput from '../../components/DateInput'

const createTestProps = props => ({
  navigation: {
    getParam: jest.fn(param => (param === 'draft_id' ? 4 : null)),
    navigate: jest.fn()
  },
  drafts: [
    {
      draft_id: 4,
      survey_id: 1,
      personal_survey_data: {
        firstName: 'Jane',
        lastName: 'Doe',
        documentNumber: '5468568',
        email: 'jane@doe.com',
        phone: '40965035',
        gender: 'F'
      },
      economic_survey_data: {
        familyCar: 'Yes'
      },
      indicator_survey_data: {
        income: 'GREEN'
      },
      family_data: {
        count_family_members: 2,
        familyMembersList: [{ firstName: 'Demo', birthDate: 1515708000 }]
      }
    }
  ],
  addSurveyData: jest.fn(),
  ...props
})

describe('FamilyMembersBirthDates View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<FamilyMembersBirthdates {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
    it('renders DateInput', () => {
      expect(wrapper.find(DateInput)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calls navigate function when button is pressed', () => {
      wrapper
        .find(Button)
        .props()
        .handleClick()

      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)
    })
  })
  it('gives DateInput the proper value', () => {
    expect(wrapper.find(DateInput).props().value).toBe(1515708000)
  })

  it('calls addFamilyMemberBirthdate on valid date', () => {
    const spy = jest.spyOn(wrapper.instance(), 'addFamilyMemberBirthdate')

    wrapper
      .find(DateInput)
      .last()
      .props()
      .onValidDate()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('enables Button by default', () => {
    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(false)
  })
  it('disables Button when an error occurs', () => {
    wrapper.setState({ errorsDetected: ['error'] })

    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(true)
  })
})