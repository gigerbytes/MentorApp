import React from 'react'
import { shallow } from 'enzyme'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../theme.json'
import LifemapVisual from '../LifemapVisual'

const createTestProps = props => ({
  ...props,
  data: { phone: 'RED', income: 'GREEN', electricity: 'YELLOW', water: 'NONE' }
})

describe('LifemapVisual Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<LifemapVisual {...props} />)
  })
  describe('rendering', () => {
    it('renders the appropriate number of icons', () => {
      expect(wrapper.find(Icon)).toHaveLength(4)
    })
    it('renders red color', () => {
      expect(
        wrapper
          .find(Icon)
          .at(0)
          .props().color
      ).toEqual(colors.red)
    })
    it('renders green color', () => {
      expect(
        wrapper
          .find(Icon)
          .at(1)
          .props().color
      ).toEqual(colors.green)
    })

    it('renders yellow color', () => {
      expect(
        wrapper
          .find(Icon)
          .at(2)
          .props().color
      ).toEqual(colors.gold)
    })

    it('renders grey color', () => {
      expect(
        wrapper
          .find(Icon)
          .at(3)
          .props().color
      ).toEqual(colors.palegrey)
    })
  })
})
