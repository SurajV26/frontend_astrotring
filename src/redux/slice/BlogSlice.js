// src/redux/slices/blogSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

// ✅ Get all blogs (optional category filter)
export const getAllBlog = createAsyncThunk(
  "blog/getblog",
  async (categoryId = null, thunkApi) => {
    try {
      let url = "/blogs";
      if (categoryId && categoryId !== "All") {
        url += `?blog_category_id=${categoryId}`;
      }
      const res = await api.get(url);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

// ✅ Get blogs by category
export const getByCategory = createAsyncThunk(
  "blog/getblogbycategory",
  async (id, thunkApi) => {
    try {
      const res = await api.get(`/blogs?blog_category_id=${id}`);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs by category"
      );
    }
  }
);

// ✅ Get blog categories
export const getBlogCategory = createAsyncThunk(
  "blog/getblogcategory",
  async (_, thunkApi) => {
    try {
      const res = await api.get("/blog_categories");
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);



const initialState = {
  loading: false,
  blogs: [],
  category: [],
  currentBlog: null,
  error: null,
};

const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get All Blogs
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get Blogs By Category
      .addCase(getByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get Blog Categories
      .addCase(getBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearBlogError, clearCurrentBlog } = BlogSlice.actions;
export default BlogSlice.reducer;