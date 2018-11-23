import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'
import DateInput from '../../components/DateInput'

export class FamilyMembersBirthdates extends Component {
  draftId = this.props.navigation.getParam('draftId')
  survey = this.props.navigation.getParam('survey')

  state = { errorsDetected: [] }

  handleClick() {
    this.props.navigation.navigate('Location', {
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

  addFamilyMemberBirthdate(birthDate, list, i) {
    list[i].birthDate = birthDate
    this.props.addSurveyData(this.draftId, 'familyData', {
      familyMembersList: list
    })
  }

  render() {
    const draft = this.props.drafts.filter(
      draft => draft.draftId === this.draftId
    )[0]

    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ ...globalStyles.container, padding: 0 }}>
          {draft.familyData.familyMembersList.map((item, i) => (
            <View key={i}>
              <Text
                style={{
                  ...globalStyles.h3,
                  paddingHorizontal: 20,
                  marginTop: 15,
                  marginBottom: -30
                }}
              >
                {item.firstName}
              </Text>
              <DateInput
                field={i.toString()}
                detectError={this.detectError}
                onValidDate={date =>
                  this.addFamilyMemberBirthdate(
                    date,
                    draft.familyData.familyMembersList,
                    i
                  )
                }
                value={
                  (this.getFieldValue(draft, 'familyMembersList')[i] || {})
                    .birthDate
                }
              />
            </View>
          ))}
        </View>

        <View style={{ height: 50, marginTop: 30 }}>
          <Button
            colored
            text="Continue"
            disabled={!!this.state.errorsDetected.length}
            handleClick={() => this.handleClick()}
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

FamilyMembersBirthdates.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  addSurveyData: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addSurveyData
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyMembersBirthdates)
