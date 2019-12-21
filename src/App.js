import React, { Component } from 'react';
import {sendMessage} from './chat';
import {connect} from 'react-redux';
import './app.css';

class App extends Component {
  render() {
    const {feed, sendMessage} = this.props;
    let filteredFeed = feed;
    if (feed.length > 6) {
      filteredFeed.shift();
    }
    return (
      <div id="appContainer">
        <div id="chatBot">
          <h1>Hi! I'm Ryan</h1>
          <h4>I created this chat bot share my skills. Ask me a question!</h4>
          <img id ="botImage" src="https://avatars1.githubusercontent.com/u/44260224?s=460&v=4"/>
          <ul id="convoList">
          { filteredFeed.map(entry => <><li class="convoText" >{entry.text}</li><br/></> )}
          </ul>
          <input 
            tabIndex="0" 
            onKeyDown={(e)=> (e.keyCode === 13 && 
            e.target.value) ? sendMessage(e.target.value) : null 
          }/>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  feed: state,
})

export default connect(mapStateToProps, {
  sendMessage
})(App);
