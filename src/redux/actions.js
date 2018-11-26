// Login

export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS'
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

const setLoginSuccess = (token, status, username) => ({
  type: SET_LOGIN_SUCCESS,
  token,
  status,
  username
})

const setLoginError = (token, status, username) => ({
  type: SET_LOGIN_ERROR,
  token,
  status,
  username
})

export const login = (username, password, env) => dispatch =>
  fetch(
    `${env}/oauth/token?username=${username}&password=${password}&grant_type=password`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic bW9iaWxlQ2xpZW50SWQ6bW9iaWxlQ2xpZW50U2VjcmV0'
      }
    }
  )
    .then(data => {
      if (data.status !== 200) {
        dispatch(setLoginError(null, data.status, null))
        throw new Error()
      } else return data.json()
    })
    .then(data =>
      dispatch(setLoginSuccess(data.access_token, 200, data.user.username))
    )
    .catch(e => e)

// Environment

export const SET_ENV = 'SET_ENV'

export const setEnv = env => ({
  type: SET_ENV,
  env
})

// Surveys

export const LOAD_SURVEYS = 'LOAD_SURVEYS'

export const loadSurveys = (env, token) => ({
  type: LOAD_SURVEYS,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/graphql`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          query:
            'query { surveysByUser { title id surveyPersonalQuestions { id questionText answerType options { text value  } } surveyEconomicQuestions { questionText codeName answerType topic required forFamilyMember options {text value} } surveyStoplightQuestions { questionText dimension id stoplightColors { url value description } required } } }'
        })
      },
      commit: { type: LOAD_SURVEYS }
    }
  }
})

// Families

export const LOAD_FAMILIES = 'LOAD_FAMILIES'

export const loadFamilies = (env, token) => ({
  type: LOAD_FAMILIES,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/families`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: { type: LOAD_FAMILIES }
    }
  }
})

// Drafts

export const CREATE_DRAFT = 'CREATE_DRAFT'
export const DELETE_DRAFT = 'DELETE_DRAFT'
export const ADD_SURVEY_DATA = 'ADD_SURVEY_DATA'
export const ADD_SURVEY_FAMILY_MEMBER_DATA = 'ADD_SURVEY_FAMILY_MEMBER_DATA'
export const SUBMIT_DRAFT = 'SUBMIT_DRAFT'
export const SUBMIT_DRAFT_COMMIT = 'SUBMIT_DRAFT_COMMIT'
export const SUBMIT_DRAFT_ROLLBACK = 'SUBMIT_DRAFT_ROLLBACK'

export const createDraft = payload => ({
  type: CREATE_DRAFT,
  payload
})

export const deleteDraft = id => ({
  type: DELETE_DRAFT,
  id
})

export const addSurveyFamilyMemberData = ({
  id,
  index,
  payload,
  isSocioEconomicAnswer
}) => ({
  type: ADD_SURVEY_FAMILY_MEMBER_DATA,
  id,
  index,
  isSocioEconomicAnswer,
  payload
})

export const addSurveyData = (id, category, payload) => ({
  type: ADD_SURVEY_DATA,
  category,
  id,
  payload
})

export const submitDraft = (env, token, id, payload) => ({
  type: SUBMIT_DRAFT,
  env,
  token,
  payload,
  id,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/snapshots`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: {
        type: SUBMIT_DRAFT_COMMIT,
        meta: {
          id
        }
      },
      rollback: {
        type: SUBMIT_DRAFT_ROLLBACK,
        meta: {
          id
        }
      }
    }
  }
})

// Snapshots
export const LOAD_SNAPSHOTS = 'LOAD_SNAPSHOTS'

export const loadSnapshots = (env, token) => ({
  type: LOAD_SNAPSHOTS,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/snapshots`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: { type: LOAD_SNAPSHOTS, meta: { env, token } }
    }
  }
})

// Language
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'

export const switchLanguage = language => ({
  type: SWITCH_LANGUAGE,
  language
})
