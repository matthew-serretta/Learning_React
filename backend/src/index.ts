import { ApolloServer, Config, gql } from "apollo-server";
import {
  getAllNotes,
  getNoteById,
  getAllLabels,
  getLabelsByNoteId,
  updateNoteContent,
  updateNoteTitle,
  updateNoteLabels
} from "./api/NoteService";

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
    labels: [Label]
  }

  type Label {
    id: ID!
    title: String!
  }

  type Mutation {
    updateNoteTitle(id: ID!, title: String): Note
    updateNoteContent(id: ID!, content: String): Note
    updateNoteLabels(noteId: ID!, labels: [String]): Note
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note
    labels: [Label]
  }
`;

const resolvers: Config["resolvers"] = {
  Note: {
    labels: async (parent) => {
      return await getLabelsByNoteId(parent.id)
    }
  },
  Query: {
    notes: () => getAllNotes(),
    note: (_, args) => getNoteById(args.id),
    labels: () => getAllLabels()
  },
  Mutation: {
    updateNoteTitle: (_, args) => {
      return updateNoteTitle(args.id, args.title);
    },
    updateNoteContent: (_, args) => {
      return updateNoteContent(args.id, args.content);
    },
    updateNoteLabels: (_, args) => {
      return updateNoteLabels(args.noteId, args.labels);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
