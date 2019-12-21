// This is a library that helps us to make api calls super easily
import {ApiAiClient} from 'api-ai-javascript';
import {createStore, applyMiddleware, compose} from 'redux';

// This token is coming from firebase
const accessToken = '0b6340941f9f4a998d02fd4026f09d2f';
const client = new ApiAiClient({accessToken})

const MESSAGE = 'MESSAGE';

// Action to send a message. The function takes text as an argument
export const sendMessage = (text, sender='user') => ({
  type: MESSAGE,
  payload: { text, sender }
})

const messageMiddleware = () => next => action => {
  next(action);
  if (action.type === MESSAGE) {
    const { text } = action.payload;

    client.textRequest(text)
      .then(onSuccess)
      function onSuccess(response) {
        const { result: { fulfillment }} = response;
        next(sendMessage(fulfillment.speech, 'bot'));
      }
  }
}

const initState = [{ text: 'Hi! Im Ryan. What would you like to know about me?' }]

const messageReducer = (state = initState, action) => {
  switch (action.type) {
      
    case MESSAGE:
      return [ ...state, action.payload ];

    default:
      return state;
  }
}

export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));