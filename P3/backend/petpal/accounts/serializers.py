from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ListField, EmailField, CharField, ImageField
from .models import PetSeeker, PetShelter, ShelterImage

# from https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5 
from django.contrib.auth.password_validation import validate_password 
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from django.core.validators import validate_email 
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.db import transaction


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
        instance = PetSeeker.objects.create_user(**validated_data)
        instance.save()
        return instance


class ShelterImageSerializer(ModelSerializer):
    # default going to be the current logged in shelter 
    class Meta:
        model = ShelterImage
        fields = "__all__"
    
    shelter = PrimaryKeyRelatedField(read_only=True)


class ShelterInfoSerializer(WritableNestedModelSerializer):
    images = ListField(child = ImageField(), write_only=True)

    class Meta:
        model = PetShelter 
        fields = ["user", "id", "organization_name", "logo_image", "phone_number", 
                    "mission_statement","country", "address1", "address2", "city", 
                    "state", "zip", "images" ]


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
        user = PetSeeker.objects.create_user(**validated_data)

        # first create pet shelter info  
        images = shleter_data.pop('images', tuple()) 
        shelter_info = PetShelter.objects.create(user=user, **shleter_data)
        
        for image_data in images:
            ShelterImage.objects.create(shelter=shelter_info, image=image_data)
        return user
    
    def update(self, instance, validated_data):
        with transaction.atomic():
            # Update PetSeeker fields
            instance.username = validated_data.get("username", instance.username)
            instance.email = validated_data.get("email", instance.email)
            
            # Update password if provided
            password = validated_data.get("password")
            if password:
                instance.set_password(password)

            # instance.shelter.organization_name = validated_data.get("organization_name", instance.shelter.organization_name)

            # Save PetSeeker instance
            # instance.save()
            shelter_data = validated_data.pop("shelter", {})
            instance.shelter.organization_name = shelter_data.get("organization_name", instance.shelter.organization_name)
            instance.shelter.logo_image = shelter_data.get("logo_image", instance.shelter.logo_image)
            instance.shelter.phone_number = shelter_data.get("phone_number", instance.shelter.phone_number)
            instance.shelter.mission_statement = shelter_data.get("mission_statement", instance.shelter.mission_statement)
            instance.shelter.country = shelter_data.get("country", instance.shelter.country)
            instance.shelter.address1 = shelter_data.get("address1", instance.shelter.address1)
            instance.shelter.address2 = shelter_data.get("address2", instance.shelter.address2)
            instance.shelter.city = shelter_data.get("city", instance.shelter.city)
            instance.shelter.state = shelter_data.get("state", instance.shelter.state)
            instance.shelter.zip = shelter_data.get("zip", instance.shelter.zip)

            # Save PetSeeker instance
            instance.save()

            # Update or create associated PetShelter

            # Update or create associated PetShelter
            # shelter_data = validated_data.get("shelter", {})
            shelter_instance, _ = PetShelter.objects.update_or_create(
                user=instance,
                defaults=shelter_data
            )
            
            # instance.save()

            # Update or create associated images
            images_data = shelter_data.get("images", [])
            for image_data in images_data:
                ShelterImage.objects.update_or_create(
                    shelter=shelter_instance,
                    defaults={"image": image_data}
                )

            return instance
    