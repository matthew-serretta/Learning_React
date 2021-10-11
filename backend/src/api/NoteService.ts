import * as db from "../db";

export const getAllNotes = async () => {
  const result = await db.query("SELECT * FROM note");
  return result.rows;
};

export const getAllLabels = async () => {
  const result = await db.query("SELECT DISTINCT ON (title) id, title FROM note_label");
  return result.rows;
};

export const getNoteById = async (id: number) => {
  const result = await db.query("SELECT * FROM note WHERE id = $1", id);
  return result.rows[0];
};

export const getLabelsByNoteId = async (id: number) => {
  const query = `
    SELECT id, title
    FROM note_label
    WHERE note_id = $1
  `;
  const result = await db.query(query, id);
  return result.rows;
};

export const updateNoteTitle = async (id: number, title: string) => {
  await db.query("UPDATE note SET title = $2 WHERE id = $1", id, title);
  return getNoteById(id);
};

export const updateNoteContent = async (id: number, content: string) => {
  await db.query("UPDATE note SET content = $2 WHERE id = $1", id, content);
  return getNoteById(id);
};

export const updateNoteLabels = async (noteId: number, labels: string[]) => {
  await db.query(`DELETE FROM note_label WHERE note_id = ${noteId}`)
  if (labels.length) {
    const values = labels.map(label => `(${noteId}, '${label}')`).join(', ')
    await db.query(`INSERT INTO note_label (note_id, title) VALUES ${values}`)
  }
};
