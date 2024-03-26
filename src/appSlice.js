import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createSlice({
  name: "apps",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state) => {
        //handle error
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const login = createAsyncThunk(
  "apps/login",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signin`,
      payload
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const signup = createAsyncThunk(
  "apps/signup",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      payload
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const logout = createAsyncThunk(
  "apps/logout",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signout`,
      {
        refreshToken: payload.refreshToken,
      },
      {
        headers: {
          Authorization: payload.accessToken,
        },
      }
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);
