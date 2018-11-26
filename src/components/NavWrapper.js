import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getHydrationState } from '../redux/store'
import { LoginStack, AppStack } from './navigation'
import Loading from './Loading'

export class NavWrapper extends Component {
  state = {
    loadingTime: 'ok',
    rehydrated: false
  }
  slowLoadingTimer
  clearTimers = () => {
    clearTimeout(this.slowLoadingTimer)
    this.slowLoadingTimer = null
  }
  checkHydration = () => {
    if (getHydrationState() === false) {
      setTimeout(() => {
        this.checkHydration()
      }, 1000)
    } else {
      this.clearTimers()
      this.setState({
        rehydrated: true
      })
    }
  }
  detectSlowLoading = () => {
    this.slowLoadingTimer = setTimeout(
      () => this.setState({ loadingTime: 'slow' }),
      15000
    )
  }
  componentDidMount() {
    this.checkHydration()
    this.detectSlowLoading()
  }
  componentWillUnmount = () => {
    this.clearTimers()
  }
  render() {
    return this.state.rehydrated ? (
      <View style={styles.container}>
        {this.props.user.token ? <AppStack /> : <LoginStack />}
      </View>
    ) : (
      <Loading time={this.state.loadingTime} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

NavWrapper.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(mapStateToProps)(NavWrapper)
