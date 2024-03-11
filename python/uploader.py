from dotenv import load_dotenv
load_dotenv()
import os
import MySQLdb
import csv
from tqdm import tqdm

class dbTable:
	def __init__(self, targetTable, source):
		self.targetTable = targetTable
		self.source = source

tables = {
	"offerings": dbTable("setu-visualiser_offerings", "offerings.csv"),
	"aspectData": dbTable("setu-visualiser_aspect_data", "aspectData.csv"),
	"aspectDefinitions": dbTable("setu-visualiser_aspect_definitions", "aspectDefs.csv"),
}

# Establish connection
connection = MySQLdb.connect(
	host=os.getenv("DB_HOST"),
	user=os.getenv("DB_USERNAME"),
	passwd=os.getenv("DB_PASSWORD"),
	db=os.getenv("DB_NAME"),
	autocommit=True,
	ssl_mode="VERIFY_IDENTITY",
	ssl={
		"ca": "/etc/ssl/certs/ca-certificates.crt"
	}
)

for table in tables.values():
	print(f"Uploading {table.source} to {table.targetTable}...")

	with open(table.source, 'r') as file:
		csv_data = csv.reader(file)
		
		# Extract column names from the first row (header)
		columns = next(csv_data)
		placeholders = ', '.join(['%s'] * len(columns))
		columns_formatted = ', '.join(columns)
		
		# Prepare SQL statement
		sql = f"INSERT INTO `{table.targetTable}` ({columns_formatted}) VALUES ({placeholders})"

		# Convert the rest of the CSV lines into a list of tuples
		data_tuples = list(map(tuple, csv_data))

	# Cursor to execute queries
	cursor = connection.cursor()

	pbar = tqdm(data_tuples)
	for data_tuple in tqdm(data_tuples):
		pbar.set_description("_".join(data_tuple[:5]))

		try:
			cursor.execute(sql, data_tuple)
		except Exception as e:
			pass

# Close cursor and connection
cursor.close()
connection.close()
