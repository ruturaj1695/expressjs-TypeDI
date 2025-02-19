# Express Dependency Injection Project

This project demonstrates the use of dependency injection in an Express.js application using the `typedi` library.

## Project Structure

```
express-DI/
├── src/
│   ├── user/
│   │   ├── interfaces/
│   │   │   └── user.interface.ts
│   │   ├── users.controller.ts
│   │   ├── user.service.ts
│   ├── utils/
│   │   └── api.error.ts
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/express-DI.git
   cd express-DI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

### Endpoints

- **GET /users**: Retrieve all users.
- **GET /user**: Retrieve a user by email.
- **POST /user**: Create a new user.

### Example Requests

- **GET /users**
  ```bash
  curl -X GET http://localhost:3000/users
  ```

- **GET /user?email=test@example.com**
  ```bash
  curl -X GET "http://localhost:3000/user?email=test@example.com"
  ```

- **POST /user**
  ```bash
  curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
  ```

## Technologies Used

- Node.js
- Express.js
- TypeScript
- typedi

## License

This project is licensed under the MIT License.
