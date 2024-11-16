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
    posts: [Post]
    post(id: ID!): Post
    users: [User]
    user(id: ID!): User
    profiles: [Profile]
    profile(id: ID!): Profile
  }

  type Mutation {
    signUp(
      name : String!
      email : String!
      password : String!
    ) : signUpResponse
  }

  type signUpResponse {
    token: String
    user: User
  }
`;
