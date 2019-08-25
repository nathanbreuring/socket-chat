export interface IPrivateChat {
  userPair: { user1: IUser; user2: IUser };
  chatHistory: IPayload[];
}

export interface IPayload {
  userName: string | null;
  message: string;
}

export interface IUser {
  id: string;
  userName: string;
}

export interface IUpdateChat {
  updateHistory: (payload: IPayload) => void;
  updatePrivateHistory: (payload: IPayload) => void;
  updateUser: (user: IUser) => void;
  updateUsers: (users: IUser[]) => void;
}
