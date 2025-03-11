1. Create a New Task
URL: /
Method: POST
Middleware: authMiddleware
Controller: taskController.createTask
Description: Creates a new task for the authenticated user.

```
body
{
  "title": "Task Title",
  "description": "Task Description"
}

response
{
  "message": "Task created successfully",
  "task": {
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "createdAt": "2025-03-10T00:00:00.000Z"
  }
}

```
2. Get All Tasks
URL: /
Method: GET
Middleware: authMiddleware
Controller: taskController.getUserTasks
Description: Retrieves all tasks for the authenticated user. If the user is an admin, retrieves tasks from all users.

body
```
{
  "taskList": [
    {
      "title": "Task Title",
      "description": "Task Description",
      "completed": false,
      "createdAt": "2025-03-10T00:00:00.000Z"
    }
  ],
  "requestedBy": "user@example.com"
}

```
3. Get a Task by ID
URL: /:id
Method: GET
Middleware: authMiddleware
Controller: taskController.getTaskById
Description: Retrieves a specific task by its ID for the authenticated user.

```
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "createdAt": "2025-03-10T00:00:00.000Z"
}
```
4. Update a Task
URL: /:id
Method: PUT
Middleware: authMiddleware
Controller: taskController.updateTask
Description: Updates the details of a specific task for the authenticated user.

```
body
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "completed": true
}

response
{
  "task": {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "completed": true,
    "createdAt": "2025-03-10T00:00:00.000Z"
  },
  "message": "Task updated successfully"
}

5. Delete a Task
URL: /:id
Method: DELETE
Middleware: authMiddleware
Controller: taskController.deleteTask
Description: Deletes a specific task for the authenticated user.
```
{
  "message": "Task deleted successfully",
  "task": {
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "createdAt": "2025-03-10T00:00:00.000Z"
  }
}
```

Middleware
authMiddleware: Ensures that the user is authenticated before accessing the routes.

Controllers
taskController: Contains the logic for handling task-related operations.
