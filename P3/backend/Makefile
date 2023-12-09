clean-and-setup: clean setup
	
clean:
	rm -rf petpal/db.sqlite3
	rm -rf petpal/*/migrations/0*.py

setup:
	python3 petpal/manage.py makemigrations
	python3 petpal/manage.py migrate
	python3 petpal/manage.py loaddata petpal/test_data.json

run:
	python3 petpal/manage.py runserver
