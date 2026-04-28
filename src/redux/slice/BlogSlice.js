import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

export const getAllBlog = createAsyncThunk(
    "blog/getblog",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/blogs")
            console.log(res.data)
            return res.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
)
export const getByCategory = createAsyncThunk(
    "blog/getblogbycategory",
    async (id, thunkApi) => {
        try {
            const res = await api.get(`/blogs?blog_category_id=${id}`)
            return res.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
)
export const getBlogCategory = createAsyncThunk(
    "blog/getblogcategory",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/blog_categories")

            return res.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
)


const initialState = {
    loading: false,
    blogs: null,
    category: null,
    error: null
}


const BlogSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlog.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllBlog.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.blogs = action.payload
            })
            .addCase(getAllBlog.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getByCategory.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getByCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.blogs = action.payload
            })
            .addCase(getByCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getBlogCategory.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.category = action.payload
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default BlogSlice.reducer

