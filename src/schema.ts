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
    profile: Profile
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
    profile(userId: ID!): Profile
  }

  type Mutation {
    signUp(
      name : String!
      email : String!
      password : String!
      bio : String
    ) : authResponse

    signIn (
      email : String!
      password : String!
    ) : authResponse
  }

  type authResponse {
    token: String
    user: User
  }

`;
