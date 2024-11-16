# Blog app with GraphQL

## Requirements

- Users can post and publish post
- Users can see posts
- User authentication system
- Users can see their profile

## Tables

- ### Post

  - id
  - title
  - content
  - authorId
  - createdAt
  - updatedAt
  - isPublished
  - publishedDate

- ### User

  - id
  - name
  - email
  - password
  - createdAt
  - updatedAt
  - profile

- ### User profile
  - id
  - bio
  - createdAt
  - updatedAt
  - userId

## Technologies

- GraphQL
- Typescript
- PostgreSQL
- Prisma
