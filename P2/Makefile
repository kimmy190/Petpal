clean-and-setup: clean setup
	
clean:
	rm petpal/db.sqlite3

setup:
	petpal/manage.py makemigrations
	petpal/manage.py migrate
	petpal/manage.py loaddata petpal/test_data.json

run:
	python petpal/manage.py runserver
