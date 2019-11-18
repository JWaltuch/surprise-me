import React, {Component} from 'react'
import {PromisesItem} from './promises-item'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import firebase from 'firebase'
const db = firebase.database()

export default withRouter(
  class Promises extends Component {
    constructor(props) {
      super(props)
      this.state = {promises: {}}
      this.promisesData = db.ref(`promises/${this.props.currentUser}`)
    }

    async componentDidMount() {
      //puts the users promises on state
      const {data} = await axios.get(`/api/promises/${this.props.currentUser}`)
      this.setState({promises: data})
      //sets up listener on the users promises
      this.promisesData.on('value', snapshot => {
        this.setState({promises: snapshot.val()})
      })
    }

    componentWillUnmount() {
      this.promisesData.off()
    }

    render() {
      //once a user's promises load, make an array of its keys to map over
      //and load each item
      let promisesKeys
      let promises = this.state.promises
      if (promises) {
        promisesKeys = Object.keys(promises)
      }
      return (
        <div className="goldBox list-container">
          {promises ? (
            promisesKeys.map(id => (
              <div key={id}>
                <PromisesItem
                  id={id}
                  item={promises[id]}
                  history={this.props.history}
                  match={this.props.match}
                  currentUser={this.props.currentUser}
                />
              </div>
            ))
          ) : (
            <div>You have not promised gifts to anyone.</div>
          )}
        </div>
      )
    }
  }
)
