/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteTitleMutation
// ====================================================

export interface NoteTitleMutation_updateNoteTitle {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface NoteTitleMutation {
  readonly updateNoteTitle: NoteTitleMutation_updateNoteTitle | null;
}

export interface NoteTitleMutationVariables {
  readonly id: string;
  readonly title: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteContentMutation
// ====================================================

export interface NoteContentMutation_updateNoteContent {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface NoteContentMutation {
  readonly updateNoteContent: NoteContentMutation_updateNoteContent | null;
}

export interface NoteContentMutationVariables {
  readonly id: string;
  readonly content: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteLabelsMutation
// ====================================================

export interface NoteLabelsMutation_updateNoteLabels {
  readonly __typename: "Labels"
  readonly noteId: string;
  readonly labels: string[];
}

export interface NoteLabelsMutation  {
  readonly updateNoteLabels: NoteLabelsMutation_updateNoteLabels | null;
}

export interface NoteLabelsMutationVariables {
  readonly noteId: string;
  readonly labels: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NoteQuery
// ====================================================

export interface NoteQuery_note {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly labels: { id: number; title: string; }[];
}

export interface NoteQuery {
  readonly note: NoteQuery_note | null;
}

export interface NoteQueryVariables {
  readonly id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotesQuery
// ====================================================

export interface NotesQuery_notes {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
}

export interface NotesQuery {
  readonly notes: ReadonlyArray<NotesQuery_notes>;
}

export interface LabelsQuery_notes {
  readonly __typename: "label";
  readonly id: string;
  readonly title: string;
}

export interface LabelsQuery {
  readonly labels: ReadonlyArray<LabelsQuery_notes>;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
