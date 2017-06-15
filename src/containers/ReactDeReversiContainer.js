import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import ReactDeReversi from '../components/ReactDeReversi'

const mapStateToProps = (state) => ({
  squares: state.squares,
  guide: state.guide,
})

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

class ReactDeReversiContainer extends Component {
  render() {
    return (
      <ReactDeReversi
        { ...this.props }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatch)(ReactDeReversiContainer)
