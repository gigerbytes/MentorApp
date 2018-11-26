import { combineReducers } from 'redux'
import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SET_ENV,
  LOAD_SURVEYS,
  LOAD_FAMILIES,
  CREATE_DRAFT,
  ADD_SURVEY_DATA,
  ADD_SURVEY_FAMILY_MEMBER_DATA,
  DELETE_DRAFT,
  LOAD_SNAPSHOTS,
  SUBMIT_DRAFT,
  SUBMIT_DRAFT_COMMIT,
  SUBMIT_DRAFT_ROLLBACK,
  SWITCH_LANGUAGE
} from './actions'

//Login

export const user = (
  state = { token: null, status: null, username: null },
  action
) => {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      return {
        status: action.status,
        token: action.token,
        username: action.username
      }
    case SET_LOGIN_ERROR:
      return {
        status: action.status,
        token: action.token,
        username: action.username
      }
    default:
      return state
  }
}

//Environment

export const env = (state = 'production', action) => {
  switch (action.type) {
    case SET_ENV:
      return action.env
    default:
      return state
  }
}

//Surveys

export const surveys = (state = [], action) => {
  switch (action.type) {
    case LOAD_SURVEYS:
      return action.payload ? action.payload.data.surveysByUser : state
    default:
      return state
  }
}

//Families

export const families = (state = [], action) => {
  switch (action.type) {
    case LOAD_FAMILIES:
      return action.payload ? action.payload : state
    default:
      return state
  }
}

//Drafts

export const drafts = (state = [], action) => {
  switch (action.type) {
    case CREATE_DRAFT:
      return [...state, { ...action.payload, status: 'In progress' }]

    case ADD_SURVEY_DATA:
      return state.map(draft => {
        // if this is the draft we are editing
        if (draft.draftId === action.id) {
          const draftCategory = draft[action.category]

          if (Array.isArray(draftCategory)) {
            // if category is an Array
            const item = draftCategory.filter(
              item => item.key === Object.keys(action.payload)[0]
            )[0]

            if (item) {
              // if item exists in array update it
              const index = draftCategory.indexOf(item)
              return {
                ...draft,
                [action.category]: [
                  ...draftCategory.slice(0, index),
                  {
                    key: Object.keys(action.payload)[0],
                    value: Object.values(action.payload)[0]
                  },
                  ...draftCategory.slice(index + 1)
                ]
              }
            } else {
              // if item is not in array push it
              return {
                ...draft,
                [action.category]: [
                  ...draftCategory,
                  {
                    key: Object.keys(action.payload)[0],
                    value: Object.values(action.payload)[0]
                  }
                ]
              }
            }
          } else {
            // if category is an Object
            const payload = action.payload
            return {
              ...draft,
              [action.category]: {
                ...draftCategory,
                ...payload
              }
            }
          }
        } else return draft
      })

    case ADD_SURVEY_FAMILY_MEMBER_DATA:
      return state.map(draft => {
        // if this is the draft we are editing
        if (draft.draftId === action.id) {
          const familyMember = draft.familyData.familyMembersList[action.index]

          if (action.isSocioEconomicAnswer) {
            if (familyMember.socioEconomicAnswers) {
              // if its a socio economic edition
              const item = familyMember.socioEconomicAnswers.filter(
                item => item.key === Object.keys(action.payload)[0]
              )[0]

              if (item) {
                // if updating an existing answer
                const index = familyMember.socioEconomicAnswers.indexOf(item)

                return {
                  ...draft,
                  familyData: {
                    ...draft.familyData,
                    familyMembersList: [
                      ...draft.familyData.familyMembersList.slice(
                        0,
                        action.index
                      ),
                      {
                        ...familyMember,
                        socioEconomicAnswers: [
                          ...familyMember.socioEconomicAnswers.slice(0, index),
                          {
                            key: Object.keys(action.payload)[0],
                            value: Object.values(action.payload)[0]
                          },
                          ...familyMember.socioEconomicAnswers.slice(index + 1)
                        ]
                      },
                      ...draft.familyData.familyMembersList.slice(
                        action.index + 1
                      )
                    ]
                  }
                }
              } else {
                // if adding a new answer
                return {
                  ...draft,
                  familyData: {
                    ...draft.familyData,
                    familyMembersList: [
                      ...draft.familyData.familyMembersList.slice(
                        0,
                        action.index
                      ),
                      {
                        ...familyMember,
                        socioEconomicAnswers: [
                          ...familyMember.socioEconomicAnswers,
                          {
                            key: Object.keys(action.payload)[0],
                            value: Object.values(action.payload)[0]
                          }
                        ]
                      },
                      ...draft.familyData.familyMembersList.slice(
                        action.index + 1
                      )
                    ]
                  }
                }
              }
            } else {
              // adding socioEconomicAnswers for the first time
              return {
                ...draft,
                familyData: {
                  ...draft.familyData,
                  familyMembersList: [
                    ...draft.familyData.familyMembersList.slice(
                      0,
                      action.index
                    ),
                    {
                      ...familyMember,
                      socioEconomicAnswers: [
                        {
                          key: Object.keys(action.payload)[0],
                          value: Object.values(action.payload)[0]
                        }
                      ]
                    },
                    ...draft.familyData.familyMembersList.slice(
                      action.index + 1
                    )
                  ]
                }
              }
            }
          } else {
            // NON SOCIO ECONOMIC ANSSER
            if (typeof action.index !== 'undefined') {
              // if family member exists
              const payload = action.payload
              return {
                ...draft,
                familyData: {
                  ...draft.familyData,
                  familyMembersList: [
                    ...draft.familyData.familyMembersList.slice(
                      0,
                      action.index
                    ),
                    {
                      ...familyMember,
                      ...payload
                    },
                    ...draft.familyData.familyMembersList.slice(
                      action.index + 1
                    )
                  ]
                }
              }
            } else {
              // if family member doesn't exists
              const payload = action.payload
              return {
                ...draft,
                familyData: {
                  ...draft.familyData,
                  familyMembersList: [
                    ...draft.familyData.familyMembersList,
                    ...payload
                  ]
                }
              }
            }
          }
        } else {
          return draft
        }
      })

    case SUBMIT_DRAFT:
      return state.map(draft =>
        draft.draftId === action.id
          ? {
              ...draft,
              status: 'Pending'
            }
          : draft
      )
    case SUBMIT_DRAFT_COMMIT:
      return state.map(draft =>
        draft.draftId === action.meta.id
          ? {
              ...draft,
              status: 'Success'
            }
          : draft
      )
    case SUBMIT_DRAFT_ROLLBACK:
      return state.map(draft =>
        draft.draftId === action.meta.id
          ? {
              ...draft,
              status: 'Error'
            }
          : draft
      )
    case DELETE_DRAFT:
      return state.filter(draft => draft.draftId !== action.id)
    default:
      return state
  }
}

// Snapshots

export const snapshots = (state = [], action) => {
  switch (action.type) {
    case LOAD_SNAPSHOTS:
      return action.payload ? action.payload : state
    default:
      return state
  }
}

// Language
export const language = (state = false, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return action.language
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  env,
  user,
  surveys,
  families,
  drafts,
  snapshots,
  language
})
