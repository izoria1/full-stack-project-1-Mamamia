from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from restaurant.models import Menu

class MenuViewTest(TestCase):

    def setUp(self):
        # Create some test data
        Menu.objects.create(Title='Pizza', Price=9.99, Inventory=5)
        Menu.objects.create(Title='Burger', Price=5.99, Inventory=10)

        # Initialize the APIClient
        self.client = APIClient()

    def test_get_all_menu_items(self):
        # Get the response from 'menu-list' URL
        response = self.client.get(reverse('menu-list'))

        # Check if the status code is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response data is correct
        self.assertEqual(len(response.data), 2)  # As we have 2 menu items
        self.assertEqual(response.data[0]['Title'], 'Pizza')
        self.assertEqual(response.data[1]['Title'], 'Burger')

