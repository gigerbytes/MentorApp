import configureStore from 'redux-mock-store' //ES6 modules
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

import * as action from '../actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('environment actions', () => {
  it('should create an action to set env', () => {
    const env = 'production'
    const expectedAction = {
      type: action.SET_ENV,
      env
    }
    expect(action.setEnv(env)).toEqual(expectedAction)
  })
})

describe('login actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should create action LOGIN_SUCCESS when login is successful', () => {
    const store = mockStore({ token: { token: '' } })
    const env = 'https://mock/env'
    const user = 'user'
    const pass = 'pass'
    fetchMock.postOnce(
      `${env}/oauth/token?username=${user}&password=${pass}&grant_type=password`,
      {
        body: { access_token: 'token', user: { username: 'username' } }
      }
    )
    const expectedAction = [
      {
        type: action.SET_LOGIN_SUCCESS,
        token: 'token',
        status: 200,
        username: 'username'
      }
    ]

    return store.dispatch(action.login(user, pass, env)).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should create action LOGIN_ERROR when login is not successful', () => {
    const store = mockStore({})
    const env = 'https://mock/env'
    const user = 'user'
    const pass = 'pass'
    fetchMock.postOnce(
      `${env}/oauth/token?username=${user}&password=${pass}&grant_type=password`,
      401
    )
    const expectedAction = [
      {
        type: action.SET_LOGIN_ERROR,
        token: null,
        status: 401,
        username: null
      }
    ]

    return store.dispatch(action.login(user, pass, env)).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})

describe('families actions', () => {
  it('should create an action to load the list of families', () => {
    const env = 'https://mock/env'
    const token = 'token'
    const expectedAction = {
      type: action.LOAD_FAMILIES,
      env,
      token,
      meta: {
        offline: {
          effect: {
            url: `${env}/api/v1/families`,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          },
          commit: { type: action.LOAD_FAMILIES }
        }
      }
    }
    expect(action.loadFamilies(env, token)).toEqual(expectedAction)
  })
})

describe('surveys actions', () => {
  it('should create an action to load the list of surveys', () => {
    const env = 'https://mock/env'
    const token = 'token'
    const expectedAction = {
      type: action.LOAD_SURVEYS,
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
          commit: { type: action.LOAD_SURVEYS }
        }
      }
    }
    expect(action.loadSurveys(env, token)).toEqual(expectedAction)
  })
})

describe('snapshots actions', () => {
  it('should create an action to load the list of snapshots', () => {
    const env = 'https://mock/env'
    const token = 'token'
    const expectedAction = {
      type: action.LOAD_SNAPSHOTS,
      env,
      token,
      meta: {
        offline: {
          effect: {
            url: `${env}/api/v1/snapshots`,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          },
          commit: { type: action.LOAD_SNAPSHOTS, meta: { env, token } }
        }
      }
    }
    expect(action.loadSnapshots(env, token)).toEqual(expectedAction)
  })
})

describe('drafts actions', () => {
  it('should create an action to create a draft', () => {
    const payload = { draftId: 1, draftContent: 'content' }
    const expectedAction = {
      type: action.CREATE_DRAFT,
      payload
    }
    expect(action.createDraft(payload)).toEqual(expectedAction)
  })
  it('should create an action to delete a draft', () => {
    const id = 1
    const expectedAction = {
      type: action.DELETE_DRAFT,
      id
    }
    expect(action.deleteDraft(id)).toEqual(expectedAction)
  })
  it('should create an action to add survey data to draft', () => {
    const id = 1
    const category = 'category'
    const payload = { question: 'answer' }
    const expectedAction = {
      type: action.ADD_SURVEY_DATA,
      id,
      category,
      payload
    }
    expect(action.addSurveyData(id, category, payload)).toEqual(expectedAction)
  })

  it('should create an action to post a draft', () => {
    const env = 'https://mock/env'
    const token = 'token'
    const payload = {}
    const id = 1

    const expectedAction = {
      type: action.SUBMIT_DRAFT,
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
            type: action.SUBMIT_DRAFT_COMMIT,
            meta: {
              id
            }
          },
          rollback: {
            type: action.SUBMIT_DRAFT_ROLLBACK,
            meta: {
              id
            }
          }
        }
      }
    }
    expect(action.submitDraft(env, token, id, payload)).toEqual(expectedAction)
  })
  describe('language actions', () => {
    it('should create an action to switch the app language', () => {
      const language = 'es'
      const expectedAction = {
        type: action.SWITCH_LANGUAGE,
        language
      }
      expect(action.switchLanguage(language)).toEqual(expectedAction)
    })
  })
})
