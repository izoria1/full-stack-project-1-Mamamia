from rest_framework import serializers
from .models import Menu, Booking, CustomUser
from rest_framework.authtoken.serializers import AuthTokenSerializer
from djoser.serializers import UserCreateSerializer

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'is_staff_member')

class CustomAuthTokenSerializer(AuthTokenSerializer):
    def validate(self, attrs):
        # Call the superclass's validation method
        data = super(CustomAuthTokenSerializer, self).validate(attrs)

        # Add the is_staff_member field to the response
        data['is_staff_member'] = self.user.is_staff_member
        return data



class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'  

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('user',) 

