from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from restaurant.views import BookingViewSet

# Create a router and register the BookingViewSet with it.
router = DefaultRouter()
router.register(r'', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('restaurant/', include('restaurant.urls')),
    path('restaurant/booking/', include(router.urls)),  # Directly include router URLs here
]
