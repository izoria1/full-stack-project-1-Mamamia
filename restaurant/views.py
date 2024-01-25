from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Menu, Booking
from .serializers import MenuSerializer, BookingSerializer, CustomAuthTokenSerializer

from djoser.views import TokenCreateView

class CustomTokenCreateView(TokenCreateView):
    serializer_class = CustomAuthTokenSerializer


# Create your views here.
def index(request):
    return render(request, 'index.html', {})


class MenuItemView(ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class SingleMenuItemView(RetrieveUpdateAPIView, DestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class BookingViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()  # Default queryset

    def get_queryset(self):
        # Return bookings for the current user
        return Booking.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        # Associate the booking with the currently authenticated user
        serializer.save(user=self.request.user)

    

