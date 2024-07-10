// Import necessary libraries and dependencies
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

// Function to load data from the database
export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL });
  try {
    const { rows: names } = await db.query('SELECT * FROM names');
    return { names };
  } catch (error) {
    console.log('Something went wrong while fetching users from the database.');
    await seed();
    const { rows: names } = await db.query('SELECT * FROM names');
    return { names };
  }
}

// Function to seed initial data into the database
async function seed() {
  const db = createPool({ connectionString: POSTGRES_URL });
  const client = await db.connect();
  const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS names (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log(`Created "names" table`);
  const users = await Promise.all([
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Rohan', 'rohan@tcl.com')
      ON CONFLICT (email) DO NOTHING;
    `,
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Rebecca', 'rebecca@tcl.com')
      ON CONFLICT (email) DO NOTHING;
    `,
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Vivek', 'vivek@gmail.com')
      ON CONFLICT (email) DO NOTHING;
    `,
  ]);
  console.log(`Seeded ${users.length} users`);
  return { createTable, users };
}

// Define actions that can be performed on the 'names' table
/** @type {import('./$types').Actions} */
export const actions = {
  // Update an existing user's information
  update: async ({ request }) => {
    const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL });
    const client = await db.connect();

    const id = data.get('id');
    const email = data.get('email');
    const name = data.get('name');

    const updateUser = await client.sql`
      UPDATE names
      SET email = ${email}, name = ${name}
      WHERE id = ${id};
    `;

    return { success: true, userUpdateAction : true };
  },

  // Delete a user from the database
  delete: async ({ request }) => {
    const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL });
    const client = await db.connect();

    const id = data.get('id');

    const deleteUser = await client.sql`
      DELETE FROM names
      WHERE id = ${id};
    `;

    return { success: true , userDeleteAction : true};
  },

  // Create a new user in the database
  create: async ({ request }) => {
    const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL });
    const client = await db.connect();

    const email = data.get('email');
    const name = data.get('name');
    if(  !name || !email ) return { success: false, userAddAction : true, error : "Enter both name and email" };

    const createUser = await client.sql`
      INSERT INTO names (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO NOTHING;
    `;

    return { success: true, userAddAction : true };
  },
};
