// FIXME: clean up here
// TODO: rewrite with async-await syntax

import { toastr } from 'react-redux-toastr'
import * as api from '../../helpers/api'
import {
  rewrite,
  signInToSave,
  uncalculated,
  cantSave,
  noEstimate,
  saved,
  defaultError,
} from '../../helpers/messages'
import {
  addSpinner,
  delSpinner,
  redirect,
  updateEstimate,
  cleanEstimate,
  closeAuthScreen,
  openAuthScreen,
  setCreds,
  resetCreds,
  setTitles,
} from './index'

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  dispatch({ type: '__ASYNC__SAVE_ESTIMATE' })

  if (!getState().creds.username) {
    return toastr.warning(...signInToSave)
  }

  dispatch(addSpinner())
  const estimateToSave = getState().estimates[estimateId]
  return api.getEstimate({ estimateId })
    .then(estimate => {
      // Check whether the estimate has been modified by someone else
      if (
        estimate._changed !== estimateToSave._changed
        // eslint-disable-next-line no-alert
        && !window.confirm(rewrite(estimate))
      ) {
        return false
      }

      if (!estimateToSave.calculated) {
        toastr.warning(...uncalculated)
      }
      dispatch(addSpinner())
      return api.saveEstimate(estimateToSave)
        .then(savedEstimate => {
          dispatch(updateEstimate(savedEstimate))
          dispatch(redirect(`/estimate/${savedEstimate._id}`))
          toastr.success(...saved(savedEstimate))
        })
        .catch(({ message }) => {
          toastr.error(...cantSave(message))
        })
        .finally(() => { dispatch(delSpinner()) })
    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}`)
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const getEstimate = ({ estimateId }) => dispatch => {
  dispatch({ type: '__ASYNC__GET_ESTIMATE' })

  if (estimateId === 'new') return false

  dispatch(addSpinner())
  return api.getEstimate({ estimateId })
    .then(estimate => {
      // Catching specific case of `restdb.io` response
      if (estimate instanceof Array || estimate === null) {
        throw new Error(noEstimate)
      }
      dispatch(updateEstimate(estimate))
    })
    .catch(err => {
      toastr.error(...defaultError(err))
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const checkCreds = () => dispatch => {
  dispatch({ type: '__ASYNC__CHECK_CREDS' })

  dispatch(addSpinner())
  return api.checkCreds()
    .then(({ totals: { count } }) => {
      console.info(`${count} record(s) found in the DB.`)
      dispatch(setCreds())
      dispatch(closeAuthScreen())
    })
    .catch(() => { dispatch(resetCreds()) })
    .finally(() => { dispatch(delSpinner()) })
}

export const openGuestSession = () => dispatch => {
  dispatch({ type: '__ASYNC__OPEN_GUEST_SESSION' })

  dispatch(redirect(''))
  setTimeout(() => dispatch(closeAuthScreen()))
  setTimeout(() => dispatch(redirect('/estimate/new')))
}

export const fetchTitles = () => dispatch => {
  dispatch({ type: '__ASYNC__FETCH_TITLES' })

  dispatch(addSpinner())
  // TODO: implelment fetching only recent titles at first
  return api.fetchTitles()
    .then(titles => {
      dispatch(setTitles(titles))
    })
    .catch(err => {
      toastr.error(...defaultError(err))
    })
    .finally(() => { dispatch(delSpinner()) })
}