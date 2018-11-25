import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { FamilyMembersNames } from '../lifemap/FamilyMembersNames'

import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import Select from '../../components/Select'

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
        familyMembersList: [{ firstName: 'Demo' }]
      }
    }
  ],
  addSurveyData: jest.fn(),
  ...props
})

describe('FamilyMembersNames View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<FamilyMembersNames {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
    it('renders Select', () => {
      expect(wrapper.find(Select)).toHaveLength(1)
    })
    it('renders TextInput', () => {
      expect(wrapper.find(TextInput)).toHaveLength(2)
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
  it('gives Select the proper value', () => {
    expect(wrapper.find(Select).props().value).toBe('2')
  })
  it('makes first TextInput is readonly', () => {
    expect(
      wrapper
        .find(TextInput)
        .first()
        .props().readonly
    ).toBe(true)
  })
  it('gets first Input value from draft', () => {
    expect(
      wrapper
        .find(TextInput)
        .first()
        .props().value
    ).toBe('Jane')
  })
  it('gets second Input value from draft', () => {
    expect(
      wrapper
        .find(TextInput)
        .last()
        .props().value
    ).toBe('Demo')
  })

  it('calls addFamilyMemberName on input change', () => {
    const spy = jest.spyOn(wrapper.instance(), 'addFamilyMemberName')

    wrapper
      .find(TextInput)
      .last()
      .props()
      .onChangeText('hi')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  // it('retains Family Member Name on count Update', () => {
  //   const spy = jest.spyOn(wrapper.instance(), 'addFamilyMemberArray')
  //
  //   wrapper
  //     .find(Select)
  //     .simulate('change',{target: {value:'3'}})
  //   console.log(wrapper.find(TextInput))
  //   expect(spy).toHaveBeenCalledTimes(1)
  //
  //   expect(wrapper.find(TextInput).at(0).props().value).toBe('Jane')
  //   expect(wrapper.find(TextInput).at(1).props().value).toBe('Demo')
  //   expect(wrapper.find(TextInput).last().props().value).toBe('')
  //
  //
  // })

  it('enables Button when all fields are filled', () => {
    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(false)
  })
  it('disables Button when to count is selected', () => {
    const props = createTestProps({
      drafts: [
        {
          draft_id: 4,
          personal_survey_data: {
            firstName: 'Jane'
          },

          family_data: {
            count_family_members: '',
            familyMembersList: [{ firstName: 'Demo' }]
          }
        }
      ]
    })
    wrapper = shallow(<FamilyMembersNames {...props} />)
    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(true)
  })
  it('disables Button when no name is inputed', () => {
    const props = createTestProps({
      drafts: [
        {
          draft_id: 4,
          personal_survey_data: {
            firstName: 'Jane'
          },
          family_data: {
            count_family_members: 2,
            familyMembersList: [{ firstName: '' }]
          }
        }
      ]
    })
    wrapper = shallow(<FamilyMembersNames {...props} />)
    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(true)
  })
})
