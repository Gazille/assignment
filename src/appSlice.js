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
        localStorage.setItem("accessToken", action.payload.data.token);
      })
      .addCase(login.rejected, (state) => {
        //handle error
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.removeItem("accessToken");
      });
  },
});

export const login = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      payload
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const signup = createAsyncThunk(
  "users/signup",
  async (payload, { rejectWithValue, dispatch }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users`,
      payload
    );
    if (res.status !== 201) {
      return rejectWithValue(res.data);
    }
    dispatch(
      login({
        email: payload.email,
        password: payload.password,
      })
    );
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
          Authorization: `Bearer ${payload.accessToken}`,
        },
      }
    );
    if (res.status !== 204) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const getBankAccountsById = createAsyncThunk(
  "bank_accounts",
  async (payload, { rejectWithValue }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/bank_accounts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const getBankAccounts = createAsyncThunk(
  "bank_accounts/all",
  async (payload, { rejectWithValue }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/bank_accounts/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const getBank = createAsyncThunk(
  "bank",
  async (payload, { rejectWithValue }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/banks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (res.status !== 200) {
      return rejectWithValue(res.data);
    }
    return res.data;
  }
);

export const swapBankAccount = createAsyncThunk(
  "transactions",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/transactions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status !== 200) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const createBankAccount = createAsyncThunk(
  "transactions",
  async (payload, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/bank_accounts`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status !== 200) {
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);
