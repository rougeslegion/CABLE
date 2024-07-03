Dependencies:
	Python Django
	MySQL
	Node
	React compatible browser

// -----

Setting up:
	inside '/backend':

		in '../api/views.py':
			find 'client' variable:
				replace "bacdive.BacdiveClient" arguments to credentials to use 
				(shown as ('email', 'password')) from https://api.bacdive.dsmz.de/

		in '../bacdiveapi/settings.py':
			find "DATABASES":
				configure DATABASE profile to match system requirements/if database already exists.
				(Django will handle the schema and making the database if it doesn't exist)
				
				if database doesn't exist:
					inside '/backend':
						python manage.py migrate
						python manage.py makemigrations


	inside '/interface':
		npm install

// -----

To run:

	open two terminals (one for the server and one for the interface)

	(opens a virtual environment to run server in)
	run terminal inside '/backend':
		python -m venv venv
		venv\Scripts\activate
		python manage.py runserver

	(opens interface)
	run terminal inside '/interface':
		npm start

// ------------------------------------------------

Making changes:

	Schema changes:
		schema can be found in '../api/models.py'
		changes will have to be reflected in '../api/serializers.py' for functions

	Function changes:
		functions can be found in '../api/views.py'
		check serializers used in '../api/serializers.py'
		functions can be made usable in '../api/urls.py'

	---

	any changes made to the backend requires running:
		  python manage.py migrate
		  python manage.py makemigrations

// ------------------------------------------------

Known Issues and Troubleshooting:

- While connection to the BacDive API has been accomplished and strains can be downloaded, downloading BacDive data from some strains will fail because of the non-uniformity of the information/number of items per field employed by some strains. This will require a more thorough schema fix.

- BacDive search returns a 500 error when query is invalid/nothing is found. This can be safely ignored.

- BacDive search will occasionally return a 400 error, replicably from inactivity, sometimes even if search query is valid. To fix this, restart Django server or manually log-in credentials in https://api.bacdive.dsmz.de/. There is no need to restart browser interface.

- Directly moving to the "BacDive search" header route from the "edit strain" page will result in a 400 error. This results in no changes to the data and can be safely ignored. Move back to the individual strain/strains list before moving back to the bacdive search.