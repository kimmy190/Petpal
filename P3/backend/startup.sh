python3 -m venv venv

source venv/bin/activate

pip install django

# Pillow
pip install pillow

# install Phone number field 
pip install django-phonenumber-field phonenumbers
# writes nested serializers 
pip install drf-writable-nested

# Django REST framework
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support

# Json web token
pip install djangorestframework-simplejwt

# swagger docs
pip install drf-yasg
pip install pyyaml
pip install packaging

pip install django-cors-headers

petpal/manage.py makemigrations
petpal/manage.py migrate
