import psycopg2
import os

# Connect to the database
conn = psycopg2.connect(
    dbname=os.environ['PGDATABASE'],
    user=os.environ['PGUSER'],
    password=os.environ['PGPASSWORD'],
    host=os.environ['PGHOST'],
    port=os.environ['PGPORT']
)

# Create a cursor
cur = conn.cursor()

# Execute the ALTER TABLE command
cur.execute("ALTER TABLE blog_post ADD COLUMN IF NOT EXISTS author_id INTEGER;")

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Column 'author_id' added to 'blog_post' table.")
