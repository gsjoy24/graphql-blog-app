export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt : String!
    isPublished: Boolean!
    publishedAt : String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
    Profile: Profile
    }

  type Profile {
    id: ID!
    bio: String
    user: User!
    createdAt: String!
  }

  type Query {
    books: [Book]
  }
`;
