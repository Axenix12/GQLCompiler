import { authors, books, categories } from '../mock-data.js';

const resolvers = {
  book: {
    author: ({ author: authorId }) =>
      authors.find(author => author.id === authorId),
    categories: ({ categories: categoryIds }) =>
      categories.filter(category => categoryIds.includes(category.id))
  },
  author: {
    books: ({ books: bookIds }) =>
      books.filter(book => bookIds.includes(book.id))
  },
  category: {
    books: ({ books: bookIds }) =>
      books.filter(book => bookIds.includes(book.id))
  },
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
    getCategories: () => categories,
    getBook: (_parent, { id }) => books.find(book => book.id === id),
    getAuthor: (_parent, { id }) => authors.find(author => author.id === id),
    getCategory: (_parent, { id }) =>
      categories.find(category => category.id === id)
  },
  Mutation: {
    addBook(_parent, { title, author, coverImage, categories, description }) {
      const book = {
        id: String(books.length + 1),
        title,
        author,
        coverImage,
        categories,
        description
      };
      books.push(book);
      return book;
    },
    addCategory(_parent, { name, books }) {
      const category = {
        id: String(categories.length + 1),
        name,
        books
      };
      categories.push(category);
      return category;
    },
    updateBook(
      _parent,
      { id, title, author, coverImage, categories, description }
    ) {
      const bookLocation = books.findIndex(book => book.id === id);
      const book = {
        id,
        title,
        author,
        coverImage,
        categories,
        description
      };
      books[bookLocation] = book;
      return book;
    }
  }
};
export {resolvers}