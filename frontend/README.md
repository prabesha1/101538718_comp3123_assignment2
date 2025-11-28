# Employee Management System - Frontend

React frontend for employee management with authentication, CRUD operations, and image upload.

## Tech Stack

- React 19.2.0
- React Router DOM 6.30.2
- Bootstrap 5.3.8
- Axios 1.13.2

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:5001/api
```

### Run Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## Features

- User Authentication (Login/Signup)
- Employee List with Search
- Add/Edit Employee with Image Upload
- View Employee Details
- Delete Employee
- Responsive Bootstrap UI
- Protected Routes

## Project Structure

```
src/
├── api/
│   └── axiosClient.js          # Axios configuration
├── auth/
│   ├── AuthContext.js          # Auth state management
│   └── PrivateRoute.js         # Route protection
├── components/
│   └── Layout.js               # Main layout with navbar
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── EmployeeListPage.js
│   ├── EmployeeAddPage.js
│   ├── EmployeeViewPage.js
│   └── EmployeeEditPage.js
├── App.js                      # Routes configuration
└── index.js                    # Entry point
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from CRA (one-way operation)


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
