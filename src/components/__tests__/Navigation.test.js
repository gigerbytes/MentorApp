import React from 'react'
import { shallow } from 'enzyme'
import { Image } from 'react-native'
import { AppStack } from '../navigation'
import { DrawerContent } from '../navigation/DrawerContent'
import { generateNavOptions } from '../navigation/helpers'

describe('Navigation', () => {
  describe('Drawer', () => {
    const wrapper = shallow(<AppStack />)
    it('contains all links', () => {
      expect(wrapper.instance().state.nav.routes[0].routes).toHaveLength(4)
    })
    it('renders burger menu icon', () => {
      expect(
        generateNavOptions({
          navigation: {
            toggleDrawer: jest.fn()
          }
        })
      ).toEqual(
        expect.objectContaining({
          headerLeft: expect.any(Object)
        })
      )
    })
    it('can navigate to all views', () => {
      expect(wrapper.instance()._navigation.navigate('Families')).toBe(true)
      expect(wrapper.instance()._navigation.navigate('Surveys')).toBe(true)
      expect(wrapper.instance()._navigation.navigate('Dashboard')).toBe(true)
      expect(wrapper.instance()._navigation.navigate('Sync')).toBe(true)
      expect(wrapper.instance()._navigation.navigate('Family')).toBe(true)
      expect(wrapper.instance()._navigation.navigate('Question')).toBe(true)
    })
  })
  describe('DrawerContent', () => {
    const wrapper = shallow(
      <DrawerContent
        navigation={{ toggleDrawer: jest.fn() }}
        switchLanguage={jest.fn()}
        user={{ username: 'test' }}
      />
    )
    it('renders nav image', () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })
    it('shows proper username', () => {
      expect(wrapper.find('#username')).toHaveHTML(
        '<react-native-mock>test</react-native-mock>'
      )
    })
    it('allows user to change language', () => {
      const spy = jest.spyOn(wrapper.instance(), 'changeLanguage')
      wrapper
        .find('#en')
        .props()
        .onPress()
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('en')
    })
  })
})
