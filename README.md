# Task Manager (Mini Project)

A simple full-stack task manager built with **Node.js + Express** (backend REST API) and **HTML/CSS/vanilla JavaScript** (frontend). Tasks are stored in a local `tasks.json` file.

## Features
- Add tasks with a priority (Low / Medium / High)
- Mark tasks complete / incomplete
- Edit task titles inline
- Delete tasks
- Filter by All / Active / Completed
- Live counter of remaining tasks

## Tech Stack
| Layer    | Technology                |
|----------|---------------------------|
| Frontend | HTML, CSS, JavaScript     |
| Backend  | Node.js, Express          |
| Storage  | JSON file (`tasks.json`)  |

## Run it
```bash
npm install
npm start
```
Open http://localhost:3000

## REST API
| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| PUT    | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## Project Structure
```
task-manager/
├── server.js        # Express server + REST API
├── package.json
├── tasks.json       # created automatically on first task
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

## Possible Improvements
- Swap the JSON file for MongoDB / SQLite / DynamoDB
- Add user login (JWT)
- Due dates and reminders
- Deploy to AWS (EC2 / Elastic Beanstalk) or Render
