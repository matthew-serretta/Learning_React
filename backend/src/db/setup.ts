import { Client } from "pg";
import * as faker from "faker";

const client = new Client({
  user: "postgres",
  password: "postgres",
  port: 54320,
  database: "database"
});

const createTables = () => {
  return client.query(`
    CREATE TABLE IF NOT EXISTS note (
        id SERIAL PRIMARY KEY,
        title text NOT NULL,
        content text NOT NULL
    );	
    
    CREATE TABLE IF NOT EXISTS note_label (
        id SERIAL PRIMARY KEY,
        note_id INT,
        title text NOT null,
        CONSTRAINT fk_note
          FOREIGN KEY(note_id) 
            REFERENCES note(id)
    );
  `);
};

const populateData = async () => {
  await Promise.all(
    Array.from({ length: 25 }).map(async _ => {
      await client.query(`
        INSERT INTO note(title, content)
        VALUES (
            '${faker.company.catchPhrase()}',
            '${faker.lorem.paragraphs(3)}'
        );
    `);
    })
  );
  
  await client.query(`
  INSERT INTO note_label (note_id, title)
  VALUES
    (1, 'Whenever'),
    (1, 'Not Urgent'),
    (2, 'Not Urgent'),
    (3, 'Urgent');
  `);
}

const main = async () => {
  console.log("DB Setup...");
  await client.connect();

  await createTables();
  await populateData();

  await client.end();
};

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
