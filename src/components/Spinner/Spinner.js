import React from 'react'
import PropTypes from 'prop-types'
import spinner from './spinner.gif'

const Spinner = ({ showSpinner }) => (
  <div id="spinner" className={showSpinner ? '' : 'hidden'}>
    <img src={spinner} alt="" />
  </div>
)

Spinner.propTypes = {
  showSpinner: PropTypes.bool,
}
Spinner.defaultProps = {
  showSpinner: false,
}

export default Spinner
