import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
};

export const register = createAsyncThunk("register", async (data) => {
  try {
    const requesOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:8080/register`, requesOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      console.error("Registration failed:", action.error.message);
      // Kullanıcıya bir hata mesajı gösterilebilir
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
