import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text, ProgressBarAndroid } from 'react-native'
import { Question } from '../lifemap/Question'
import Slider from '../../components/Slider'
import Checkbox from '../../components/Checkbox'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(param => {
      if (param === 'survey') {
        return survey
      } else if (param === 'step') {
        return 0
      } else if (param === 'draftId') {
        return 1
      }
    })
  },
  addSurveyData: jest.fn(),
  ...props
})

describe('Question View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<Question {...props} />)
    survey.surveyStoplightQuestions[0].required = false
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(2)
    })
    it('renders ProgressBarAndroid', () => {
      expect(wrapper.find(ProgressBarAndroid)).toHaveLength(1)
    })
    it('renders Slider', () => {
      expect(wrapper.find(Slider)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calls selectAnswer when slide is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'selectAnswer')
      wrapper
        .find(Slider)
        .props()
        .selectAnswer()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('calls selectAnswer with argument NONE when checkbox is checked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'selectAnswer')
      wrapper
        .find(Checkbox)
        .props()
        .onIconPress()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(0)
    })
    it('renders CheckBox when indicator is not required', () => {
      expect(wrapper.find(Checkbox)).toHaveLength(1)
    })
    it('renders Text when indicator is required', () => {
      survey.surveyStoplightQuestions[0].required = true
      const props = createTestProps()
      wrapper = shallow(<Question {...props} />)
      expect(wrapper.find(Checkbox)).toHaveLength(0)
      expect(wrapper.find(Text)).toHaveLength(3)
    })
  })
})
const survey = {
  id: 1,
  title: 'Test survey 1',
  surveyStoplightQuestions: [{ stoplightColors: [], required: false }]
}
