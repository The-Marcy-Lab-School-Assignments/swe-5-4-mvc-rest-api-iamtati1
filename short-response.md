# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
Three specific design decisions in the API that make it RESTful is:
- We integrated endpoint URLs that describe resources and not actions(`/api/getUser` instead we `use/api/users`)
- The implamentation of `HTTP methods` like (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) This helps us perform many different operations on the same endpoint.
- Responses manage proper `status codes`: (to communicate how the operations are performing)
 - `200` OK
 - `201` Created
 - `400` Bad Request (e.g. they sent a POST request with an empty body)
- `404`Not Found
- `500` Internal Server Error (e.g. the third-party API we are using is down)


---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

`Seperating concerns` improves the whole functionality of the app. When we seperate data handling into a model and request parsing/response logic is handled in a controller, each part has a clear responsibility. The seperation acts a way to make the code easier to `test`, `update` and `resuse` the code without breaking other parts in the app.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

***Step 1***: When the user clicks the checkbox, a request is sent from the `client` to the `server` (typically a PATCH request with the todo’s ID).

***Step 2***: In server.js, the request is routed to the appropriate controller function, such as `todoControllers.toggleTodo`.

***Step 3***: The controller `parses` the request, extracts the ID, and calls a function from `todoModel.js`, to update the isDone value in the todos array.

***Step 4***: The model updates the data and returns the `modified` todo back to the controller.

***Step 5***: the controller sends a `response` back to the `client` with the updated todo, and the UI renders again.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:
1) ***Controller*** - it extracts task from `req.body`, which is part of handling the incoming HTTP request.
2) ***Controller*** - it validates the request and sends an `HTTP response` if the input is invalid.
3) ***Model*** - it creates the new `todo object` and defines its data structure, which is part of managing data.
4) ***Model*** - it directly `modifies` the todos array, which is the model’s responsibility.
5) ***Controller*** - it sends the `HTTP response` back to the client with the created todo.