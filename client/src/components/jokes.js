import React, { Component } from 'react';
import axios from 'axios'


class Jokes extends Component {
  state = {
    jokes: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')

    const auth = {
      headers: {
        authorization: token
      }
    }

    axios
      .get('http://localhost:5000/api/jokes', auth)
      .then(res => {
        this.setState({ jokes: res.data })
      })
      .catch(err => {
        console.log('error: ', err.message)
      })
  }

  render() {
    return (
      <div className='jokes'>
        <ul>
          {this.state.jokes.map(u =>
            <li key={u.id}> setup: {u.setup} <br /> punchline: {u.punchline}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Jokes;
