import React, { useState, useEffect } from "react";
import { socketHandlers } from "./handlers";
import Chat from "./Chat";

interface IState {
  chatHistory: IPayload[];
}

interface IProps {}

export interface IPayload {
  userName: string;
  message: string;
}

class App extends React.PureComponent<IProps, IState> {
  state: IState = {
    chatHistory: []
  };

  updateChatHistory = (payload: IPayload) => {
    this.setState(prevState => ({
      chatHistory: [...prevState.chatHistory, payload]
    }));
  };

  handler = socketHandlers(this.updateChatHistory);

  render() {
    return <Chat handler={this.handler} chatHistory={this.state.chatHistory} />;
  }
}

export default App;
