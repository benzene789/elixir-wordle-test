# elixir-wordle-test
Technical Test for Elixir - building the well known wordle game

A simple Wordle clone built with **React** with **Typescript** styled using **Tailwind CSS** (frontend) and **Django** with **Django Rest Framework** (backend), containerized using **Docker**.

## Setting up
### Prerequisites
- Firsrtly clone the repo: `git clone https://github.com/benzene789/elixir-wordle-test.git`

- And then navigate into the directory: `cd elixir-wordle-test`
- Must have **Node.js** and **npm** installed
- Must have **python** and **pip** installed
- Optionally can have **Docker** and **docker-compose** installed on your machine

### Local Development
#### Frontend
1.  Navigate to the `wordle_frontend` directory: `cd wordle_frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Access the frontend at `http://localhost:5173`
#### Backend
1. Navigate to the wordle_backend directory: `cd wordle_backend`
2. Create a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies: `pip install -r requirements.txt`
4. Run migrations: `python manage.py migrate`
5. Start the development server: `python manage.py runserver`

### Docker Development
1. Build and start the containers: `docker-compose up --build`
2. Access the services:
    ```
    Frontend: http://localhost:5173
    Backend: http://localhost:8000
    ```
3. Simply access `http://localhost:5173` to play the wordle game
4. To stop the containers: `docker-compose down`

### Tests
- Tests can be run by first navigating into `cd wordle_backend` and then running `python -m pytest`

## Resources Used
- `wordlist.txt` taken from [https://dagshub.com/arjvik/wordle-wordlist/src/master/answerlist.txt] - public dataset free to use

## Further Work
Test individual React components in isolation to ensure they render correctly and handle props/events as expected.

### Tools:
- Jest: A popular testing framework for JavaScript.

- React Testing Library: A lightweight library for testing React components.
