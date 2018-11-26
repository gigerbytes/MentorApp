import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  ProgressBarAndroid,
  View
} from 'react-native'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addSurveyData } from '../../redux/actions'
import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import Slider from '../../components/Slider'
import Checkbox from '../../components/Checkbox'

export class Question extends Component {
  step = this.props.navigation.getParam('step')
  survey = this.props.navigation.getParam('survey')
  draftId = this.props.navigation.getParam('draftId')

  indicators = this.survey.surveyStoplightQuestions
  indicator = this.indicators[this.step]
  slides = this.indicator.stoplightColors

  selectAnswer(answer) {
    this.props.addSurveyData(this.draftId, 'indicatorSurveyDataList', {
      [this.indicator.questionText]: answer
    })

    if (
      this.step + 1 < this.indicators.length &&
      !this.props.navigation.getParam('skipped')
    ) {
      this.props.navigation.push('Question', {
        draftId: this.draftId,
        survey: this.survey,
        step: this.step + 1
      })
    } else
      this.props.navigation.navigate('Final', {
        draftId: this.draftId,
        survey: this.survey
      })
  }

  render() {
    return (
      <ScrollView style={globalStyles.background}>
        <View style={{ ...globalStyles.container, paddingTop: 20 }}>
          <Text style={{ ...globalStyles.h5, textAlign: 'right' }}>{`${this
            .step + 1} / ${this.indicators.length}`}</Text>
          <Text style={{ ...globalStyles.h3 }}>{`${this.step + 1}. ${
            this.indicator.questionText
          }`}</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color={colors.green}
            indeterminate={false}
            progress={(this.step + 1) / this.indicators.length}
            style={{ marginTop: 35 }}
          />
        </View>
        <Slider
          slides={this.slides}
          selectAnswer={answer => this.selectAnswer(answer)}
        />
        <View style={styles.skip}>
          {this.indicator.required ? (
            <Text style={globalStyles.tag}> *Response required </Text>
          ) : (
            <Checkbox
              onIconPress={() => this.selectAnswer(0)}
              title="Skip this question"
            />
          )}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  skip: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30
  }
})

Question.propTypes = {
  addSurveyData: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  addSurveyData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
