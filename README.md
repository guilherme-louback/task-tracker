# Task Tracker CLI

## Overview
Task Tracker is a simple command-line interface (CLI) tool built with Node.js to help you track your tasks. You can add, list, update, delete, and change the status of tasks efficiently using this tool.

## Installation
Before using the CLI, ensure you have Node.js installed on your system.

### **1. Clone the repository**
```sh
git clone <repository-url>
cd task-tracker
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Make the script executable** (if using Linux/macOS)
```sh
chmod +x task-tracker.js
```

## Usage
To use the Task Tracker CLI, run the following command:
```sh
node task-tracker <command> [options]
```

Alternatively, if you've set it up as a global command:
```sh
task-tracker <command> [options]
```

## Commands & Examples

### **1. List Tasks**
List all tasks in your task tracker.
```sh
node task-tracker list
```

#### Options:
- `-i, --id` → Show task IDs
- `-t, --todo` → Show tasks with status "todo"
- `-p, --inprogress` → Show tasks with status "in-progress"
- `-d, --done` → Show completed tasks

Example:
```sh
node task-tracker list --todo
```

---
### **2. Add a Task**
Add a new task with a description.
```sh
node task-tracker add "Buy groceries"
```

#### Options:
- `-s, --status <status>` → Define the task status (`todo`, `in-progress`, or `done`)

Example:
```sh
node task-tracker add "Finish project report" --status in-progress
```

---
### **3. Update Task Description**
Update the description of an existing task.
```sh
node task-tracker update <task-id> "New task description"
```
Example:
```sh
node task-tracker update 123e4567-e89b-12d3-a456-426614174000 "Submit assignment"
```

---
### **4. Delete a Task**
Delete a task by its ID.
```sh
node task-tracker delete <task-id>
```
Example:
```sh
node task-tracker delete 123e4567-e89b-12d3-a456-426614174000
```

---
### **5. Change Task Status**
#### Mark a Task as In-Progress
```sh
node task-tracker mark-in-progress <task-id>
```
Example:
```sh
node task-tracker mark-in-progress 123e4567-e89b-12d3-a456-426614174000
```

#### Mark a Task as Done
```sh
node task-tracker mark-done <task-id>
```
Example:
```sh
node task-tracker mark-done 123e4567-e89b-12d3-a456-426614174000
```

## Notes
- Task IDs are generated randomly using UUID.
- The tasks are stored in a JSON file.
- Make sure to run the CLI inside the correct project directory.

## License
This project is open-source and available under the MIT License.

