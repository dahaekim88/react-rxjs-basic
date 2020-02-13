import { Subject } from 'rxjs'; // act as both an Observable and an Observer at the same time

const subject = new Subject();

const initialState = {
  status: '',
  error: '',
  data: [], // hold an array of message objects ({person: '', text: ''})
  newDataCount: 0, // used by notification functionality
}

let state = initialState;

// `Subject.next()`: used to feed a new value to the Subject
const chatStore = {
  init: () => {
    state = {
      ...state,
      newDataCount: 0, // reset data count each time the messages are viewed
    }
    subject.next(state) // method: initialize component's state when mounted
  },
  subscribe: setState => subject.subscribe(setState), // method: subscribe React Hooks `setState` functions to RxJS Subject
  sendMessage: message => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
    subject.next(state);
  },
  initialState, // used when defining `chatState` with `useState` Hook
}

export default chatStore;