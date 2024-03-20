import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    books: [], collection: [],
}

export const bookSlice = createSlice({
    name: 'books', initialState, reducers: {
        addBook: (state, action) => {
            state.books = [...state.books, action.payload]
        }, deleteBook: (state, action) => {
            state.books = state.books.filter(item => item.id !== action.payload.id);
        },
        editBook: (state, action) => {
            const tempArray = state.books
            const index = tempArray.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                tempArray[index] = action.payload;
                state.books = tempArray
            } else {
                throw new Error(`Item with id ${id} not found`);
            }
        }, addCollection: (state, action) => {
            state.collection = [...state.collection, action.payload]
        }, deleteCollection: (state, action) => {
            state.collection = state.collection.filter(item => item.id !== action.payload.id);
        }, editCollection: (state, action) => {
            const tempArray = state.collection
            const index = tempArray.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                tempArray[index] = action.payload;
                state.collection = tempArray
            } else {
                throw new Error(`Item with id ${id} not found`);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const {state, addBook, deleteBook, editBook, addCollection, deleteCollection, editCollection} = bookSlice.actions

export const reducer = bookSlice.reducer;