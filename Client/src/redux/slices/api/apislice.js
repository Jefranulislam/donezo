
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api_URL = "https://localhost:8000/api";

const baseQuery = fetchBaseQuery({baseUrl: api_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({}),
});

export default apiSlice;