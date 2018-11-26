import * as reducer from '../reducer'
import * as action from '../actions'

describe('environment reducer', () => {
  it('should handle SET_ENV', () => {
    expect(
      reducer.env('development', {
        type: action.SET_ENV,
        env: 'production'
      })
    ).toEqual('production')
  })
})

describe('login reducer', () => {
  it('should handle SET_LOGIN_SUCCESS', () => {
    expect(
      reducer.user(
        { token: null, status: null, username: null },
        {
          type: action.SET_LOGIN_SUCCESS,
          token: 'token',
          username: 'user',
          status: 200
        }
      )
    ).toEqual({ token: 'token', status: 200, username: 'user' })
  })

  it('should handle SET_LOGIN_ERROR', () => {
    expect(
      reducer.user(
        { token: null, status: null, username: null },
        {
          type: action.SET_LOGIN_ERROR,
          token: null,
          status: 401,
          username: null
        }
      )
    ).toEqual({ token: null, status: 401, username: null })
  })
})

describe('surveys reducer', () => {
  const payload = {
    data: {
      surveysByUser: [
        { surveyId: 1, surveyContent: 'content' },
        { surveyId: 2, surveyContent: 'content-2' }
      ]
    }
  }
  it('should handle LOAD_SURVEYS', () => {
    expect(
      reducer.surveys([], {
        type: action.LOAD_SURVEYS,
        payload
      })
    ).toEqual(payload.data.surveysByUser)
    expect(
      reducer.surveys([], {
        type: action.LOAD_SURVEYS
      })
    ).toEqual([])
  })
})

describe('families reducer', () => {
  const payload = [
    { familyId: 1, familyContent: 'content' },
    { familyId: 2, familyContent: 'content-2' }
  ]
  it('should handle LOAD_FAMILIES', () => {
    expect(
      reducer.families([], {
        type: action.LOAD_FAMILIES,
        payload
      })
    ).toEqual(payload)
    expect(
      reducer.surveys([], {
        type: action.LOAD_FAMILIES
      })
    ).toEqual([])
  })
})

describe('snapshots reducer', () => {
  const payload = [
    { snapshotId: 1, snapshotContent: 'content' },
    { snapshotId: 2, snapshotContent: 'content-2' }
  ]
  it('should handle LOAD_SNAPSHOTS', () => {
    expect(
      reducer.snapshots([], {
        type: action.LOAD_SNAPSHOTS,
        payload
      })
    ).toEqual(payload)
    expect(
      reducer.surveys([], {
        type: action.LOAD_SNAPSHOTS
      })
    ).toEqual([])
  })
})

describe('drafts reducer', () => {
  const initialStore = [
    {
      draftId: 1,
      status: 'Success'
    },
    {
      draftId: 2,
      status: 'In progress'
    }
  ]
  it('should handle CREATE_DRAFT', () => {
    const payload = {
      draftId: 3
    }
    expect(
      reducer.drafts(initialStore, {
        type: action.CREATE_DRAFT,
        payload
      })
    ).toEqual([...initialStore, { ...payload, status: 'In progress' }])
  })
  it('should handle SUBMIT_DRAFT', () => {
    const expectedStore = [
      {
        draftId: 1,
        status: 'Pending'
      },
      {
        draftId: 2,
        status: 'In progress'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.SUBMIT_DRAFT,
        id: 1
      })
    ).toEqual(expectedStore)
  })
  it('should handle SUBMIT_DRAFT_COMMIT', () => {
    const expectedStore = [
      {
        draftId: 1,
        status: 'Success'
      },
      {
        draftId: 2,
        status: 'Success'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.SUBMIT_DRAFT_COMMIT,
        meta: { id: 2 }
      })
    ).toEqual(expectedStore)
  })
  it('should handle SUBMIT_DRAFT_ROLLBACK', () => {
    const expectedStore = [
      {
        draftId: 1,
        status: 'Success'
      },
      {
        draftId: 2,
        status: 'Error'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.SUBMIT_DRAFT_ROLLBACK,
        meta: { id: 2 }
      })
    ).toEqual(expectedStore)
  })
  it('should handle ADD_SURVEY_DATA', () => {
    const expectedStore = [
      {
        draftId: 1,
        status: 'Success'
      },
      {
        draftId: 2,
        personal_survey_data: { name: 'Name' },
        status: 'In progress'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.ADD_SURVEY_DATA,
        id: 2,
        category: 'personal_survey_data',
        payload: { name: 'Name' }
      })
    ).toEqual(expectedStore)
  })
  it('should handle DELETE_DRAFT', () => {
    const expectedStore = [
      {
        draftId: 1,
        status: 'Success'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.DELETE_DRAFT,
        id: 2
      })
    ).toEqual(expectedStore)
  })
})

describe('language reducer', () => {
  it('should handle SWITCH_LANGUAGE', () => {
    expect(
      reducer.language('en', {
        type: action.SWITCH_LANGUAGE,
        language: 'es'
      })
    ).toEqual('es')
  })
})
