// Import necessary libraries and dependencies
// import { error } from '@sveltejs/kit';
import { createPool, sql } from '@vercel/postgres'; // Importing database pool and SQL template
import { POSTGRES_URL } from '$env/static/private'; // Importing PostgreSQL connection URL from environment variables

// Function to load data from the database
export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL }); // Creating a PostgreSQL connection pool using the connection URL

  try {
    // Attempt to query all names from the 'names' table
    const { rows: names } = await db.query('SELECT * FROM names'); // Executing SQL query to fetch all names from 'names' table
    return {
      names: names, // Returning fetched names
    };
  } 
  catch (error) {
    console.log(
      // 'Table does not exist, creating and seeding it with dummy data now...'
      'Something went wrong while fetching users from the databse.'
    );
    // Table doesn't exist; create and seed it with dummy data
    await seed(); // Calling the seed function to create table and seed data
    const { rows: names } = await db.query('SELECT * FROM names'); // Fetching names again after seeding
    return {
      users: names, // Returning seeded names
    };
  }
}

// Function to seed initial data into the database
async function seed() {
  const db = createPool({ connectionString: POSTGRES_URL }); // Creating a PostgreSQL connection pool for seeding
  const client = await db.connect(); // Connecting to the database using the pool

  // Create 'names' table if it doesn't exist
  const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS names (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `; // SQL template to create 'names' table with columns: id, name, email, createdAt

  console.log(`Created "users" table`); // Logging message indicating table creation

  // Seed initial users data into 'names' table
  const users = await Promise.all([
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Rohan', 'rohan@tcl.com')
      ON CONFLICT (email) DO NOTHING;
    `, // SQL template to insert 'Rohan' user data
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Rebecca', 'rebecca@tcl.com')
      ON CONFLICT (email) DO NOTHING;
    `, // SQL template to insert 'Rebecca' user data
    client.sql`
      INSERT INTO names (name, email)
      VALUES ('Vivek', 'vivek@gmail.com')
      ON CONFLICT (email) DO NOTHING;
    `, // SQL template to insert 'Vivek' user data
  ]);

  console.log(`Seeded ${users.length} users`); // Logging message indicating number of seeded users

  // Return information about table creation and seeded users
  return {
    createTable, // Returning result of table creation
    users, // Returning array of seeded users
  };
}

// Define actions that can be performed on the 'names' table
/** @type {import('./$types').Actions} */
export const actions = {
  // Update an existing user's information
  update: async ({ request }) => {
    const data = await request.formData(); // Parsing form data from the request
    const db = createPool({ connectionString: POSTGRES_URL }); // Creating a PostgreSQL connection pool
    const client = await db.connect(); // Connecting to the database using the pool

    const email = data.get('email'); // Extracting 'email' field from form data
    const name = data.get('name'); // Extracting 'name' field from form data

    const updateUser = await client.sql`
      UPDATE names
      SET email = ${email}, name = ${name}
      WHERE     ;`; // SQL template to update user's email and name

    return { success: true }; // Returning success response
  },

  // Delete a user from the database
  delete: async ({ request }) => {
    const data = await request.formData(); // Parsing form data from the request
    const db = createPool({ connectionString: POSTGRES_URL }); // Creating a PostgreSQL connection pool
    const client = await db.connect(); // Connecting to the database using the pool

    const id = data.get('id'); // Extracting 'id' field from form data

    const deleteUser = await client.sql`
      DELETE FROM names
      WHERE id = ${id};`; // SQL template to delete user by ID

    return { success: true }; // Returning success response
  },

  // Create a new user in the database
  create: async ({ request }) => {
    const data = await request.formData(); // Parsing form data from the request
    const db = createPool({ connectionString: POSTGRES_URL }); // Creating a PostgreSQL connection pool
    const client = await db.connect(); // Connecting to the database using the pool

    const email = data.get('email'); // Extracting 'email' field from form data
    const name = data.get('name'); // Extracting 'name' field from form data

    const createUser = await client.sql`
      INSERT INTO names (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO NOTHING;
    `; // SQL template to insert new user into 'names' table

    return { success: true }; // Returning success response
  },
};
