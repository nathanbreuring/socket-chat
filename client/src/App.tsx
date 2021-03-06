import React from "react";
import { socketHandler } from "./handlers";
import Chat from "./Chat";
import Users from "./Users";
import SignIn from "./SignIn";
import PrivateChatDialog from "./PrivateChatDialog";
import { IPayload, IUser, IPrivateChat } from "./interfaces";

interface IState {
  chatHistory: IPayload[];
  privChatHistory: IPrivateChat[];
  users: IUser[];
  isSignedIn: boolean;
  user: IUser;
  selectedUser: IUser;
  isPrivateChatOpen: boolean;
}

interface IProps {}

class App extends React.PureComponent<IProps, IState> {
  state: IState = {
    user: null,
    users: [],
    selectedUser: null,
    chatHistory: [],
    privChatHistory: [],
    isSignedIn: false,
    isPrivateChatOpen: false
  };

  getIndexPrivateChat = (user1: IUser, user2: IUser) => {
    if (!user1 || !user2) return -1;
    return this.state.privChatHistory.findIndex(
      c =>
        (c.userPair.user1.id === user1.id ||
          c.userPair.user1.id === user2.id) &&
        (c.userPair.user2.id === user2.id || c.userPair.user2.id === user1.id)
    );
  };

  updateChat = () => {
    const updateUsers = (users: IUser[]) => {
      this.setState({ users });
    };

    const updateUser = (user: IUser) => {
      this.setState({ user });
    };

    const updateHistory = payload => {
      this.setState(prevState => ({
        chatHistory: [...prevState.chatHistory, payload]
      }));
    };

    const updatePrivateHistory = payload => {
      const user1 = payload.userPair.user1;
      const user2 = payload.userPair.user2;

      const i = this.getIndexPrivateChat(user1, user2);
      const privPairChat = this.state.privChatHistory[i];

      if (i === -1) {
        // Create userpair with chathistory
        const initPrivChat = {
          userPair: { user1, user2 },
          chatHistory: [
            {
              userName: payload.user.userName,
              message: payload.userMsg
            }
          ]
        };

        this.setState(prevState => ({
          privChatHistory: [...prevState.privChatHistory, initPrivChat]
        }));
      } else {
        // Add message to chathistory from existing userpair
        privPairChat.chatHistory.push({
          userName: payload.user.userName,
          message: payload.userMsg
        });

        const newHist = [...this.state.privChatHistory];
        newHist[i] = { ...privPairChat };
        this.setState({ privChatHistory: newHist });
      }
    };

    return {
      updateHistory,
      updatePrivateHistory,
      updateUser,
      updateUsers
    };
  };

  updateIsSignedIn = (isSignedIn: boolean) => {
    this.setState({ isSignedIn });
  };

  updateIsPrivateChatOpen = (isOpen: boolean) => {
    this.setState({ isPrivateChatOpen: isOpen });
  };

  updateSelectedUser = async (selectedUser: IUser) => {
    await this.setState({ selectedUser });
  };

  socketHandler = socketHandler(this.updateChat());

  render() {
    const i = this.getIndexPrivateChat(
      this.state.user,
      this.state.selectedUser
    );

    if (!this.state.isSignedIn)
      return (
        <SignIn
          handler={this.socketHandler}
          setIsSignedIn={this.updateIsSignedIn}
        />
      );

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Chat
          user={this.state.user}
          handler={this.socketHandler}
          chatHistory={this.state.chatHistory}
        />
        <Users
          users={this.state.users}
          updateSelectedUser={this.updateSelectedUser}
          user={this.state.user}
          openPrivateChat={this.updateIsPrivateChatOpen}
        />
        <PrivateChatDialog
          onClose={() => this.updateIsPrivateChatOpen(false)}
          open={this.state.isPrivateChatOpen}
          updateSelectedUser={this.updateSelectedUser}
          user={this.state.user}
          selectedUser={this.state.selectedUser}
          handler={this.socketHandler}
          chatHistory={this.state.privChatHistory[i]}
        />
      </div>
    );
  }
}

export default App;
