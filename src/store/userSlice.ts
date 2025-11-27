// redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../type/User";

const LOCAL_KEY = "users";

const loadFromLocal = (): User[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(LOCAL_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveToLocal = (users: User[]) => {
  if (typeof window !== "undefined")
    localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
};

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers(state) {
      state.users = loadFromLocal();
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      saveToLocal(state.users);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
      saveToLocal(state.users);
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(u => u.id !== action.payload);
      saveToLocal(state.users);
    },
    deleteMany(state, action: PayloadAction<string[]>) {
      state.users = state.users.filter(u => !action.payload.includes(u.id));
      saveToLocal(state.users);
    }
  },
});

export const { loadUsers, addUser, updateUser, deleteUser, deleteMany } =
  userSlice.actions;

export default userSlice.reducer;
