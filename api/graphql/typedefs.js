export const typeDefs = `
  type book {
    id: ID!
    title: String!
    author: author!
    coverImage: String
    categories: [category]
    description: String
  }

  type author {
    id: ID!
    firstName: String!
    lastName: String!
    books: [book]
  }

  type category {
    id: ID!
    name: String!
    books: [book]
  }

  type Query {
    getBooks: [book!]
    getBook(id: ID!): book!
    getAuthors: [author!]
    getAuthor(id: ID!): author!
    getCategories: [category!]
    getCategory(id: ID!): category!
  }

  type Mutation {
    addBook(
      title: String!
      author: ID!
      coverImage: String
      categories: [ID]!
      description: String
    ): book

    addCategory(name: String!, books: [ID]): category

    updateBook(
      id: ID!
      title: String!
      author: ID!
      coverImage: String
      categories: [ID]!
      description: String
    ): book
  }
  `;