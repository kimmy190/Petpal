python3 -m venv venv

source venv/bin/activate

pip install django

# Pillow
pip install pillow

# Django REST framework
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support

# Json web token
pip install djangorestframework-simplejwt


petpal/manage.py makemigrations
petpal/manage.py migrate
