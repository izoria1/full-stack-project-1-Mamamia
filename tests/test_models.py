from django.test import TestCase
from restaurant.models import Menu, Booking
import datetime
from django.utils import timezone

class MenuModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Menu.objects.create(Title='Pizza', Price=9.99, Inventory=5)

    def test_string_representation(self):
        menu_item = Menu.objects.get(ID=1)
        expected_str = menu_item.Title 
        self.assertEqual(str(menu_item), expected_str)

class BookingModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Booking.objects.create(Name='John Doe', No_of_guests=2, BookingDate=timezone.now())

    def test_string_representation(self):
        booking = Booking.objects.get(ID=1)
        expected_str = booking.Name
        self.assertEqual(str(booking), expected_str)
