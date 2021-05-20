import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  rows: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  addRows: () => {},
  clearRows: () => {}
}); 

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [rows, setRows] = useState([]);

  const addCardMessage = (message) => {
    //setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
    setMessages([makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    /*setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);*/
    setMessages([
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage = (message) => {
    //setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
    setMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const addRows = (...ms) => {
    setRows([
      ...ms.map((m) => JSON.parse(m))
    ]);
  };

  const clearRows = () => {
    setRows([]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        rows,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        addRows,
        clearRows
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
