from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ListField, EmailField, CharField
from .models import PetSeeker, PetShelter, ShelterImage

# from https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5 
from django.contrib.auth.password_validation import validate_password 
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from django.core.validators import validate_email 
from drf_writable_nested.serializers import WritableNestedModelSerializer


class SeekerSerializer(ModelSerializer):
    first_name = CharField(required=True)
    last_name = CharField(required=True)
    email = EmailField(validators=[UniqueValidator(queryset=PetSeeker.objects.all())])
    password = CharField(required=True)
    password2 = CharField(write_only=True, required=True)
    location = CharField(required=True)

    class Meta:
        model = PetSeeker
        # fields = "__all__"
        fields = ["id","username", "email", "first_name", "last_name", "date_joined",
                    "password", "password2","location", "profile_image"]

    def validate(self, data):
        pw1 =  data.get('password')
        pw2 =  data.get('password2')
        if pw1 and pw2:
            if pw1 != pw2:
                raise ValidationError({"password": "The two password fields didn't match"})
        return data
    
    def validate_username(self, data): 
        # username = data.get('username')
        if PetSeeker.objects.filter(username=data).exists():
            raise ValidationError("This username is already in use")
        return data 
    
    def validate_password(self, data):
        try:
            validate_password(data)
        except ValidationError as e:
            raise ValidationError(str(e))
        return data
    
    def validate_email(self, data):
        try:
            validate_email(data)
        except ValidationError:
            raise ValidationError("Enter a valid email address")
        return data
    
    def create(self, validated_data): 
        validated_data.pop('password2', None) 
        validated_data.pop('groups', None)
        instance = PetSeeker.objects.create(**validated_data)
        instance.save()
        return instance


class ShelterImageSerializer(ModelSerializer):
    # default going to be the current logged in shelter 
    # shelter = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = ShelterImage
        fields = "__all__"
    
    shelter = PrimaryKeyRelatedField(read_only=True)


class ShelterInfoSerializer(WritableNestedModelSerializer):
    images = ListField(child = ShelterImageSerializer(), write_only=True)

    class Meta:
        model = PetShelter 
        fields = ["shelter", "id", "organization_name", "logo_image", "phone_number", 
                    "mission_statement","country", "address1", "address2", "city", 
                    "state", "zip", "images" ]
    # def create(self, validated_data): 


class ShelterSerializer(WritableNestedModelSerializer):
    # Reverse OneToOne relation
    shelter = ShelterInfoSerializer()
    email = EmailField(validators=[UniqueValidator(queryset=PetSeeker.objects.all())])
    password = CharField(required=True)
    password2 = CharField(write_only=True)

    class Meta:
        model = PetSeeker
        fields = ["id","username", "email", "password", "password2", "shelter"] 

    def validate(self, data):
        pw1 =  data.get('password')
        pw2 =  data.get('password2')
        if pw1 and pw2:
            if pw1 != pw2:
                raise ValidationError({"password": "The two password fields didn't match"})
        return data
    
    def create(self, validated_data):
        shleter_data = validated_data.pop("shelter")

        validated_data.pop('password2')
        user = PetSeeker.objects.create(**validated_data)

        # first create pet shelter info  
        images = shleter_data.pop('images', tuple()) 
        shelter_info = PetShelter.objects.create(shelter=user, **shleter_data)
        
        for image_data in images:
            ShelterImage.objects.create(shelter=shelter_info, image=image_data)
        return user
    