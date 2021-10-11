import React, { useCallback } from "react";
import {
  Autocomplete,
  Chip,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { graphql } from "./types";
import { uniqueValues } from './helperFunctions'

interface Props {
  id: string;
  title: string;
  content: string;
  labels: { id: number; title: string; }[]
}

const LABEL_QUERY = gql`
  query Query {
    labels {
      title
    }
  }
`;

const NOTE_TITLE_MUTATION = gql`
  mutation NoteTitleMutation($id: ID!, $title: String!) {
    updateNoteTitle(id: $id, title: $title) {
      id
      title
      content
    }
  }
`;

const NOTE_CONTENT_MUTATION = gql`
  mutation NoteContentMutation($id: ID!, $content: String!) {
    updateNoteContent(id: $id, content: $content) {
      id
      title
      content
    }
  }
`;

const NOTE_LABELS_MUTATION = gql`
  mutation NoteLabelsMutation($noteId: ID!, $labels: [String]) {
    updateNoteLabels(noteId: $noteId, labels: $labels) {
      labels{
        title
      }
    }
  }
`;

export const Note: React.FC<Props> = ({ id, title, content, labels }) => {
  const [updateNoteTitleMutation] = useMutation<
    graphql.NoteTitleMutation,
    graphql.NoteTitleMutationVariables
  >(NOTE_TITLE_MUTATION);
  const [updateNoteContentMutation] = useMutation<
    graphql.NoteContentMutation,
    graphql.NoteContentMutationVariables
  >(NOTE_CONTENT_MUTATION);
  const [updateNoteLabelsMutation] = useMutation<
    graphql.NoteLabelsMutation,
    graphql.NoteLabelsMutationVariables
  >(NOTE_LABELS_MUTATION);

  const [noteLabels, setNoteLabels] = React.useState(labels.map(label => label.title));

  const { data } = useQuery<graphql.LabelsQuery>(LABEL_QUERY);
  const allLabels = data ? [...data.labels.map(label => label.title), ...noteLabels].filter(uniqueValues) : [];

  const handleTitleChange = useCallback(
    async e => {
      const title = e.target.value;
      await updateNoteTitleMutation({
        variables: {
          id,
          title
        }
      });
    },
    [id, updateNoteTitleMutation]
  );

  const handleContentChange = useCallback(
    async e => {
      const content = e.target.value;
      await updateNoteContentMutation({
        variables: {
          id,
          content
        }
      });
    },
    [id, updateNoteContentMutation]
  );

  const handleLabelsChange = useCallback(
    async (e, labels) => {
      setNoteLabels(labels);
      const noteId = id
      await updateNoteLabelsMutation({
        variables: {
          noteId,
          labels
        }
      });
    },
    [id, updateNoteLabelsMutation]
  );

  return (
    <Paper
      sx={{
        py: 3,
        px: 2,
        my: 3,
      }}
    >
      <Typography variant="h3">Note</Typography>

      <TextField
        label={"Title"}
        sx={{
          my: 3,
        }}
        defaultValue={title}
        onBlur={handleTitleChange}
        fullWidth
      />

      <TextField
        label={"Content"}
        sx={{
          mb: 3,
        }}
        defaultValue={content}
        onBlur={handleContentChange}
        fullWidth
        multiline
      />

      <Autocomplete
        multiple
        freeSolo
        options={allLabels}
        value={noteLabels}
        onChange={handleLabelsChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Labels"}
          />
        )}
      />

    </Paper>
  );
};
