from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SeekerSerializer, ShelterSerializer, ShelterImageSerializer, ShelterInfoSerializer
from .models import PetSeeker, PetShelter, ShelterImage
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions


# Create your views here.
class CanViewSeekerProfile(BasePermission):
    def has_permission(self, request, view):
        # if request.authenticators and TokenAuthentication in request.authenticators:
            # Token-based authentication present
            if request.user and request.user.is_authenticated:
                if hasattr(request.user, 'shelter'):     # Check if the user is a PetShelter
                    shelter = request.user.shelter
                    # should be shelter , else false 
                    if shelter.application_set.filter(applicant_id=view.kwargs['pk']).exists():
                    # if shelter.application_set.filter(shelter=shelter).exists(): #acceess application set 
                        if request.method in permissions.SAFE_METHODS:
                            return True  # Shelters can only view pet seekers' profiles if they have active application w them
                        else: 
                            # not allowed to update / delete 
                            return False 
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
    # permission_classes = [IsAuthenticated]
    # can only be shown to pet shelters who has an active application w them 
    permission_classes = [CanViewSeekerProfile]
    serializer_class = SeekerSerializer

    def get_object(self):
        # try:
        return get_object_or_404(PetSeeker, id=self.kwargs['pk'])
        # except PermissionDenied:
        #     # Handle the PermissionDenied exception here
        #     # For instance, return a custom response or redirect
        #     return Response({"error": "You are not authorized to view this profile"}, status=status.HTTP_403_FORBIDDEN)
    

class PetShelterListCreate(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShelterSerializer

    def get_queryset(self):
        # Get all existing PetShelter instances
        return PetSeeker.objects.filter(shelter__isnull=False)

class IsShelterOwner(BasePermission):
    # def has_object_permission(self, request, view, obj):
    def has_permission(self, request, view):
        # If it's a GET request, allow any user to view the shelter.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # If it's an unsafe method (PUT, PATCH, DELETE)
        if hasattr(request.user, 'shelter'):  # check if user is shelter 
            # return obj.shelter == request.user
            return request.user.id == view.kwargs['pk'] 
        return False
        # return obj == request.user.shelter
        # return False 

class PetShelterDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsShelterOwner]
    serializer_class = ShelterSerializer

    def get_object(self):
        return get_object_or_404(PetSeeker, id=self.kwargs['pk'])
    
    # def put(self, request, *args, **kwargs):
    #     return self.partial_update(request, *args, **kwargs)

    
