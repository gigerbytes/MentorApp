import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import colors from '../theme.json'
import validator from 'validator'

class TextInput extends Component {
  state = {
    status: this.props.value ? 'filled' : 'blur',
    text: this.props.value || '',
    errorMsg: null
  }

  onChangeText(text) {
    this.setState({ text })
  }

  onEndEditing = () => {
    this.props.onChangeText(this.state.text, this.props.field)
  }

  onFocus() {
    this.setState({
      status: 'active'
    })
  }

  onBlur() {
    this.setState({
      status: this.state.text ? 'filled' : 'blur'
    })
    this.props.validation ? this.validateInput() : ''
  }

  handleError(errorMsg) {
    this.props.onChangeText('', this.props.field)
    this.props.detectError(true, this.props.field)
    this.setState({
      status: 'error',
      errorMsg
    })
  }

  validateInput() {
    this.props.detectError(false, this.props.field)
    if (this.props.required && !this.state.text) {
      return this.handleError('This field is required')
    }
    if (
      this.props.validation === 'long-string' &&
      this.state.text.length > 250
    ) {
      return this.handleError('Value must be less than 250 characters')
    }
    if (
      this.props.validation !== 'long-string' &&
      this.state.text.length > 50
    ) {
      return this.handleError('Value must be less than 50 characters')
    }
    if (
      this.props.validation === 'email' &&
      !validator.isEmail(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid email address')
    }

    if (
      this.props.validation === 'string' &&
      !/^[a-zA-Z]([\w -]*[a-zA-Z])?$/.test(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter alphabetic characters')
    }
    if (
      this.props.validation === 'phone' &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid phone number')
    }
    if (
      this.props.validation === 'number' &&
      !validator.isNumeric(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid number')
    }
  }

  defineTextColor = status => {
    switch (status) {
      case 'active':
        return colors.green
      case 'blur':
        return colors.palegrey
      case 'error':
        return colors.red
      default:
        return colors.palegrey
    }
  }

  render() {
    const { text, errorMsg } = this.state
    const status = this.props.status || this.state.status
    let showPlaceholder = status === 'blur' && !text
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        {!showPlaceholder && (
          <Text
            style={{
              ...styles.text,
              color: this.defineTextColor(status)
            }}
          >
            {`${this.props.placeholder} ${this.props.required ? '*' : ''}`}
            {'\n'}
          </Text>
        )}
        <FormInput
          autoCapitalize="none"
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur(text)}
          placeholder={
            showPlaceholder
              ? `${this.props.placeholder} ${this.props.required ? '*' : ''}`
              : ''
          }
          onChangeText={text => this.onChangeText(text)}
          onEndEditing={this.onEndEditing}
          inputStyle={{
            ...styles.inputStyle,
            ...styles[status],
            fontSize: 14,
            paddingTop: !showPlaceholder ? 30 : 10
          }}
          editable={!this.props.readonly}
        >
          <Text style={{ fontSize: 14, margin: 10 }}>{text}</Text>
        </FormInput>
        {status === 'error' && errorMsg && (
          <FormValidationMessage style={{ color: colors.red }}>
            {errorMsg}
          </FormValidationMessage>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: colors.grey,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
    width: '100%'
  },
  blur: {
    backgroundColor: colors.beige,
    borderBottomColor: colors.grey
  },
  filled: {
    backgroundColor: colors.palebeige,
    borderBottomColor: colors.grey
  },
  active: {
    backgroundColor: colors.white,
    borderBottomColor: colors.green
  },
  error: {
    backgroundColor: colors.white,
    borderBottomColor: colors.red
  },
  text: {
    marginBottom: -30,
    marginLeft: 25,
    zIndex: 100
  }
})

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  validation: PropTypes.oneOf([
    'email',
    'string',
    'phone',
    'number',
    'long-string'
  ]),
  status: PropTypes.oneOf(['blur', 'error', 'active', 'filled']),
  detectError: PropTypes.func
}

export default TextInput
