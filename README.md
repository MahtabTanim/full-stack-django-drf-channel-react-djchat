# 💬 djChat – Full Stack Real-Time Chat Application

This is a full-stack real-time chat application built using **React**, **Django**, **Django REST Framework**, and **Django Channels**. It features real-time WebSocket communication, secure JWT-based authentication, and a modern Material UI-based frontend with light/dark mode support.

---

## 🚀 Core Features

### 🔒 Authentication

- JWT-based authentication using `djangorestframework-simplejwt`
- Access and refresh tokens handled via **HTTPOnly cookies**
- Automatic access token refresh using **Axios interceptors**

### 📡 Real-Time Chat

- Real-time communication using **WebSockets** powered by **Django Channels**
- **Custom WebSocket middleware** to validate JWT tokens for secure socket communication

### 🖼️ Media & Icon Handling

- File uploads with custom validations for **SVG** icon files
- Restriction on icon dimensions (e.g., **70x70px** max size)

### 🌐 Frontend

- Built with **React** using **Vite**
- Styled with **Material UI**
- Uses **TanStack Router** for routing and **TanStack Query** for efficient data fetching and caching
- **Context API** used for managing global theme (light/dark)
- **Axios** for API requests and automatic token refreshing

### 🧠 Backend

- Django + Django REST Framework
- Authentication with **SimpleJWT**
- Real-time support with **Django Channels** + **Uvicorn**
- **drf-spectacular** + **Swagger UI** for API documentation

---

## 🧩 Main Frontend Components

- `PrimaryAppBar`: Top navbar
- `PrimarySidebar`: Navigation sidebar
- `SecondarySidebar`: Contextual navigation
- `MainArea`: Chat window

---

## 🎯 Server Functionality

- Servers can be **filtered**:
  - By **User**
  - By **Server ID**
  - By **Server quantity**
- Real-time **join** and **leave server** actions
- Custom logic and validation for server-side file uploads

---

## ⚠️ Challenges Faced & Solutions

### 🔁 **Deploying Frontend and Backend to Different Providers**

- Both apps are hosted under the same domain but on **different platforms**
- Required careful CORS configuration and domain routing

### 🌍 **CORS and Cookie Issues**

- Managed **CORS setup** to allow frontend-backend communication
- Ensured **HTTPOnly cookies** were properly set and cleared during login/logout
- Handled `SameSite` attributes and secure settings for cross-site cookies

### 🧪 **Django Channels Integration**

- Implemented **WebSocket authentication** using JWTs
- Used **custom ASGI middleware** to validate access tokens for every socket connection
- Auto-refreshing tokens mid-WebSocket session if expired

### 🔐 **JWT Authentication via Cookies**

- Access tokens stored in memory; refresh tokens stored in **HTTPOnly cookies**
- Axios **JWT interceptor** set up to request new access tokens using refresh tokens automatically

### ⚙️ **Custom Middleware for Channel Authentication**

- Wrote a custom ASGI middleware to:
  - Extract tokens from cookies
  - Validate user session
  - Attach user to socket scope for message routing

### 💾 **Purging and Managing Media Files**

- Deleted uploaded media directly from Heroku dyno via bash
- Ensured `MEDIA_ROOT` is properly configured and regularly purged

---

## 🧪 Development Setup

### 🔧 Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### 💻 Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌐 Live Deployments

- 🔵 **Frontend (React)**: [https://djchat.space](https://djchat.space)
- 🔴 **API Docs (Swagger)**: [https://backend.djchat.space](https://backend.djchat.space)

---

## 📦 Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Frontend  | React (Vite), Material UI              |
| Routing   | TanStack Router                        |
| Caching   | TanStack Query                         |
| Theming   | React Context (Light/Dark Mode)        |
| API Calls | Axios + JWT Interceptor                |
| Backend   | Django, Django REST Framework          |
| Auth      | SimpleJWT + HTTPOnly Cookies           |
| Real-time | Django Channels + WebSockets + Uvicorn |
| Docs      | Swagger UI (drf-spectacular)           |

---

## 📸 Screenshots

_Include relevant screenshots of the UI, real-time chat, and API docs if available._

Some challanges i have faced :
Deploying the frontend and backend to multiple servers
Same domain different providers
CORS Cookies
Django Channels
Custom middleware to check channels authentication
Set cookies on request to the login/access/refresh
Used technologies:
tanstack router , tansatck queries for caching
Context layer for color mode in the frontend app
Axios JWTInterceptor for gain access token using the refresh token

swagger UI
Filetering Servers :
by user , by id , by quantity
Icons :
custom validation models for accepting svg icon and specific size
Frontend Material UI
for frontend caching : Tanstack queruiies
for routing : used tanstack router
Context for lite and dark mode
Main components of the frontend templating: primaryappbar , primarysidebar , secondarysidebar , main area
Axios for api calls
Axios iterceptor for intercept request to refresh access token
Uvicorn for asgi request handling
Simplejwt for access and refresh token
JWT interceptor to set cookies on the browser
Websocket custom middleware to handle asgi request validation / refresha ccess token on premise
Setting HTTPonly cookies on login
Removing HTTp only cookies on logout

Live preview of frontend available at : https://djchat.space
Spectacular API view backend available at : https://backend.djchat.space

**\*\*\***Highlight the deployment procedures"**\*\*\*\***
