from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Menu, Booking

# Custom admin class for CustomUser
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'is_staff_member', 'is_staff', 'is_active']
    list_filter = ['is_staff_member', 'is_staff', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_staff_member',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('is_staff_member',)}),
    )

# Register your models here.
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Menu)
admin.site.register(Booking)
