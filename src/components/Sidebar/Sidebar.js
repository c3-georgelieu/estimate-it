import React from 'react'
import PropTypes from 'prop-types'
import SideButton from './SideButton'
import { estimateType } from '../Estimate/propTypes'

const Sidebar = ({
  match: { params: { estimateId } },
  recalc,
  saveEstimate,
  openAuthScreen,
  estimates,
  username,
}) => {
  const { saved, calculated } = estimates[estimateId]
  return (
    <aside>
      <SideButton
        title="New"
        name="file"
        disabled={estimateId === 'new'}
        link="/estimate/new"
      />
      <SideButton
        title="Erase"
        name="eraser"
        color="danger"
      />
      <SideButton
        title="Calculate"
        name="rocket"
        disabled={calculated}
        onClick={() => !calculated && recalc(estimateId)}
      />
      <SideButton
        title="Save"
        name="save"
        disabled={!username || saved}
        color={(saved && 'secondary') || (username && 'primary') || 'warning'}
        onClick={() => !saved && saveEstimate({ estimateId })}
      />
      <SideButton
        title="Editor"
        name="edit"
        link={`/estimate/${estimateId}`}
      />
      <SideButton
        title="Chart"
        name="signal"
        link={`/estimate/${estimateId}/graph`}
      />
      <SideButton
        title="Dashboard"
        name="list-ul"
        disabled={!username}
        link="/dashboard"
      />
      <div className="sidebar-bottom">
        <SideButton
          title="Auth"
          name="key"
          color={username ? 'success' : 'warning'}
          onClick={openAuthScreen}
        />
        <SideButton
          title="Home"
          name="home"
          link="/"
        />
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  recalc: PropTypes.func.isRequired,
  saveEstimate: PropTypes.func.isRequired,
  openAuthScreen: PropTypes.func.isRequired,
  estimates: PropTypes.objectOf(estimateType).isRequired,
  username: PropTypes.string,
}

Sidebar.defaultProps = {
  username: undefined,
}

export default Sidebar
