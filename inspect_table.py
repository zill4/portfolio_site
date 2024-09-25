import psycopg2
import os

conn = psycopg2.connect(
    dbname=os.environ['PGDATABASE'],
    user=os.environ['PGUSER'],
    password=os.environ['PGPASSWORD'],
    host=os.environ['PGHOST'],
    port=os.environ['PGPORT']
)

cur = conn.cursor()

cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'blog_post';")
columns = cur.fetchall()

print("Columns in blog_post table:")
for column in columns:
    print(f"{column[0]}: {column[1]}")

cur.close()
conn.close()
