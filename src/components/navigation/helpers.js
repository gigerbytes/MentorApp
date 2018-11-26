import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../theme.json'

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
