from dotenv import load_dotenv
load_dotenv()
import os
import MySQLdb
import csv

# Establish connection
connection = MySQLdb.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USERNAME"),
    passwd=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    autocommit = True,
    ssl_mode = "VERIFY_IDENTITY",
    ssl      = {
    "ca": "/etc/ssl/certs/ca-certificates.crt"
    }
)

with open('data.csv', 'r') as file:
    csv_data = csv.reader(file)
    
    # Extract column names from the first row (header)
    columns = next(csv_data)
    placeholders = ', '.join(['%s'] * len(columns))
    columns_formatted = ', '.join(columns)
    
    # Prepare SQL statement
    sql = f"INSERT INTO `setu-visualiser_data` ({columns_formatted}) VALUES ({placeholders})"

    # Convert the rest of the CSV lines into a list of tuples
    data_tuples = list(map(tuple, csv_data))

# Cursor to execute queries
cursor = connection.cursor()

cursor.executemany(sql, data_tuples)

# Close cursor and connection
cursor.close()
connection.close()
