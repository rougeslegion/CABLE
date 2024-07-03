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
				replace "bacdive.BacdiveClient" arguments to credentials to use (shown as ('email', 'password')) from https://api.bacdive.dsmz.de/

		in '../bacdiveapi/settings.py':
			find "DATABASES":
				configure DATABASE profile to match system requirements/if database already exists.
				(Django will handle the schema and making the database if it doesn't exist)


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

