from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SeekerSerializer, ShelterSerializer, ShelterImageSerializer, ShelterInfoSerializer
from .models import PetSeeker, PetShelter, ShelterImage
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission


# Create your views here.
class CanViewSeekerProfile(BasePermission):
    def has_permission(self, request, view):
        if request.authenticators and TokenAuthentication in request.authenticators:
            # Token-based authentication present
            if request.user and request.user.is_authenticated:
                # if hasattr(request.user, 'shelter'):  
                if request.user.shelter is not None: # Check if the user is a PetShelter
                    # should be shelter , else false 
                    shelter = request.user.shelter
                    if shelter.application_set.filter(shelter=shelter).exists(): #acceess application set 
                        return True  # Allow access if an active application exists
                else: 
                    # is a pet seeker 
                    return int(request.user.id) == int(view.kwargs['pk'])
        return False

class PetSeekerCreate(CreateAPIView):
    # can view list of Pet shelters 
    # can create pet shelter 
    permission_classes = [AllowAny]
    serializer_class = SeekerSerializer

class PetSeekerDetail(RetrieveUpdateDestroyAPIView):
    # read-write-delete endpoints 
    permission_classes = [IsAuthenticated]

    # can only be shown to pet shelters who has an active application w them 
    # pepermission_classes = [CanViewSeekerProfile]
    serializer_class = SeekerSerializer

    def get_object(self):
        return get_object_or_404(PetSeeker, id=self.kwargs['pk'])
    

class PetShelterListCreate(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShelterSerializer

    def get_queryset(self):
        # Get all existing PetShelter instances
        return PetSeeker.objects.filter(shelter__isnull=False)


class PetShelterDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ShelterSerializer

    def get_object(self):
        return get_object_or_404(PetSeeker, id=self.kwargs['pk'])
    
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    
