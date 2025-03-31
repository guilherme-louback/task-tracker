# Task Tracker CLI

## Overview
Task Tracker is a simple command-line interface (CLI) tool built with Node.js to help you track your tasks. You can add, list, update, delete, and change the status of tasks efficiently using this tool.

## Installation (Without Docker)
If you want to use the CLI directly on your system, follow these steps:

1. Clone this repository:
   ```sh
   git clone https://github.com/guilherme-louback/task-tracker
   cd tasktracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Link the CLI globally:
   ```sh
   npm link
   ```
4. Run the CLI:
   ```sh
   $ --help
   ```

---

## Running with Docker
You can run the Task Tracker CLI inside a Docker container.

### 1️⃣ Build the Docker Image
```sh
docker build -t tasktracker .
```

### 2️⃣ Run the Container
```sh
docker run -it tasktracker
```
This starts the container and opens an interactive shell where you can use the CLI.

---

## Usage
After starting the CLI, you can use the following commands:

### List Tasks
```sh
$ list
```
Options:
- `-i, --id` → Show task IDs
- `-t, --todo` → Show tasks marked as "to-do"
- `-p, --inprogress` → Show tasks in-progress
- `-d, --done` → Show completed tasks

### Add a Task
```sh
$ add "My new task"
```
Options:
- `-s, --status <status>` → Set status (`todo`, `in-progress`, `done`)

### Update a Task
```sh
$ update <id> "New description"
```

### Delete a Task
```sh
$ delete <id>
```

### Mark a Task as In Progress
```sh
$ mark-in-progress <id>
```

### Mark a Task as Done
```sh
$ mark-done <id>
```

---

## Notes
- Task IDs are generated randomly using UUID.
- The tasks are stored in a JSON file.
- Make sure to run the CLI inside the correct project directory.
- https://roadmap.sh/projects/task-tracker

## License
This project is open-source and available under the MIT License.