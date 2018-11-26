import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../theme.json'
class LifemapVisual extends Component {
  getColors = () =>
    this.props.data.map(item => {
      switch (item.value) {
        case 1:
          return colors.red
        case 2:
          return colors.gold
        case 3:
          return colors.green
        case 0:
          return colors.palegrey

        default:
          return colors.palegrey
      }
    })

  render() {
    return (
      <View style={styles.container}>
        {this.getColors().map((item, i) => (
          <Icon
            name="brightness-1"
            color={item}
            key={i}
            size={17}
            style={styles.icon}
          />
        ))}
      </View>
    )
  }
}

LifemapVisual.propTypes = {
  data: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  icon: { margin: 7 }
})

export default LifemapVisual
