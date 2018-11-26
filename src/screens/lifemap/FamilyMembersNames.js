import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addSurveyData, addSurveyFamilyMemberData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'
import Select from '../../components/Select'
import TextInput from '../../components/TextInput'

export class FamilyMembersNames extends Component {
  draftId = this.props.navigation.getParam('draftId')
  survey = this.props.navigation.getParam('survey')

  state = { errorsDetected: [] }

  handleClick(draft) {
    this.getFieldValue(draft, 'countFamilyMembers') > 1
      ? this.props.navigation.navigate('FamilyMembersGender', {
          draftId: this.draftId,
          survey: this.survey
        })
      : this.props.navigation.navigate('Location', {
          draftId: this.draftId,
          survey: this.survey
        })
  }
  getFieldValue = (draft, field) => {
    if (!draft) {
      return
    }

    return draft.familyData[field]
  }
  detectError = (error, field) => {
    if (error && !this.state.errorsDetected.includes(field)) {
      this.setState({ errorsDetected: [...this.state.errorsDetected, field] })
    } else if (!error) {
      this.setState({
        errorsDetected: this.state.errorsDetected.filter(item => item !== field)
      })
    }
  }

  addFamilyCount = (text, field) => {
    this.props.addSurveyData(this.draftId, 'familyData', {
      [field]: text
    })
  }

  addFamilyMemberName(name, index) {
    this.props.addSurveyFamilyMemberData({
      id: this.draftId,
      index,
      payload: {
        firstName: name
      }
    })
  }

  render() {
    const draft = this.props.drafts.filter(
      draft => draft.draftId === this.draftId
    )[0]

    const emptyRequiredFields =
      draft.familyData.familyMembersList.filter(item => item.firstName === '')
        .length !== 0 ||
      !draft.familyData.countFamilyMembers ||
      draft.familyData.countFamilyMembers >
        draft.familyData.familyMembersList.length

    const isButtonEnabled =
      !emptyRequiredFields && !this.state.errorsDetected.length

    const familyMembersCount = Array.from(
      Array(draft.familyData.countFamilyMembers - 1 || 0).keys()
    )

    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ ...globalStyles.container, padding: 0 }}>
          <Select
            required
            onChange={this.addFamilyCount}
            label="Number of people living in this household"
            placeholder="Number of people living in this household"
            field="countFamilyMembers"
            value={this.getFieldValue(draft, 'countFamilyMembers') || ''}
            detectError={this.detectError}
            data={[
              { text: '1', value: 1 },
              { text: '2', value: 2 },
              { text: '3', value: 3 },
              { text: '4', value: 4 },
              { text: '5', value: 5 },
              { text: '6', value: 6 },
              { text: '7', value: 7 },
              { text: '8', value: 8 },
              { text: '9', value: 9 },
              { text: '10', value: 10 }
            ]}
          />
          <TextInput
            validation="string"
            field=""
            onChangeText={() => {}}
            placeholder="Primary participant"
            value={draft.familyData.familyMembersList[0].firstName}
            required
            readonly
            detectError={this.detectError}
          />
          {familyMembersCount.map((item, i) => (
            <TextInput
              key={i}
              validation="string"
              field={i.toString()}
              onChangeText={text => this.addFamilyMemberName(text, i + 1)}
              placeholder="Name"
              value={
                (this.getFieldValue(draft, 'familyMembersList')[i + 1] || {})
                  .firstName || ''
              }
              required
              detectError={this.detectError}
            />
          ))}
        </View>

        <View style={{ height: 50, marginTop: 30 }}>
          <Button
            colored
            text="Continue"
            disabled={!isButtonEnabled}
            handleClick={() => this.handleClick(draft)}
          />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

FamilyMembersNames.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  addSurveyData: PropTypes.func.isRequired,
  addSurveyFamilyMemberData: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addSurveyData,
  addSurveyFamilyMemberData
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyMembersNames)
