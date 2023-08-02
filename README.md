# Django-Reactjs-Resume-Builder



## Overview
The Resume Builder project is a web application that empowers users to create and manage their resumes effortlessly. It provides a user-friendly interface to add personal details, education, work experience, skills, and more. The project also offers customizable resume templates for PDF downloads and upcoming QR resume generation functionality.

## Technologies Used
- Django: A high-level Python web framework used for the backend development.
- Django Rest Framework (DRF): A powerful toolkit for building Web APIs in Django.
- ReactJS: A JavaScript library for building user interfaces.
- JavaScript: A programming language used for front-end development.

## Setup Instructions
Follow the steps below to set up the Resume Builder project on your local machine:

### Step 1: Clone the Repository
```bash
git clone <repository_url>
```

### Step 2: Activate Virtual Environment
```bash
cd resume
source env/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Create Database and Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Run the Server
```bash
python manage.py runserver
```

## APIs and Endpoints
The Resume Builder project provides the following APIs and endpoints for various functionalities:

### 1. Registration API (POST)
Endpoint: `/api/register/`
Description: Allows users to register by providing their email, password, and other optional details.
Example Request Body:
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "name": "John Doe",
  "mobileNumber": "1234567890",
}
```

### 2. Login API (POST)
Endpoint: `/api/login/`
Description: Authenticates users based on their email and password, and provides a JWT token for further requests.
Example Request Body:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

### 3. User Info API (GET)
Endpoint: `/api/user/`
Description: Fetches the user's information based on the provided JWT token.
Authorization: JWT token in cookies
Example Response:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "mobileNumber": "1234567890",
  "portfolio": "https://example.com/portfolio",
  "address": "123 Main St, City",
  "carrierObjective": "Seeking a challenging role in web development.",
  "education": [
    {
      "degree": "Bachelor of Science",
      "university": "Example University",
      "year": 2020
    },
    {
      "degree": "Master of Science",
      "university": "Another University",
      "year": 2022
    }
  ],
  "skills": ["Python", "JavaScript", "ReactJS"],
  "experience": [
    {
      "company": "Example Company",
      "position": "Software Engineer",
      "start_date": "2021-01-01",
      "end_date": "2022-12-31"
    }
  ],
  "projects": [
    {
      "name": "Project 1",
      "description": "A web application built with Django and ReactJS.",
      "url": "https://project1.example.com"
    },
    {
      "name": "Project 2",
      "description": "A mobile app built with React Native.",
      "url": "https://project2.example.com"
    }
  ]
}

```

### 4. Update User API (PUT)
Endpoint: `/api/update/`
Description: Allows users to update their profile details.
Authorization: JWT token in cookies
Example Request Body (to update name and mobileNumber):
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "mobileNumber": "1234567890",
  "portfolio": "https://example.com/portfolio",
  "address": "123 Main St, City",
  "carrierObjective": "Seeking a challenging role in web development.",
  "education": [
    {
      "degree": "Bachelor of Science",
      "university": "Example University",
      "year": 2020
    },
    {
      "degree": "Master of Science",
      "university": "Another University",
      "year": 2022
    }
  ],
  "skills": ["Python", "JavaScript", "ReactJS"],
  "experience": [
    {
      "company": "Example Company",
      "position": "Software Engineer",
      "start_date": "2021-01-01",
      "end_date": "2022-12-31"
    }
  ],
  "projects": [
    {
      "name": "Project 1",
      "description": "A web application built with Django and ReactJS.",
      "url": "https://project1.example.com"
    },
    {
      "name": "Project 2",
      "description": "A mobile app built with React Native.",
      "url": "https://project2.example.com"
    }
  ]
}

```

### 5. Logout API (POST)
Endpoint: `/api/logout/`
Description: Logs out the user and deletes the JWT token from cookies.

## Usage and Features
1. Registration: Users can create an account by providing their email, password, and other optional details.
2. Login: Registered users can log in using their email and password to access their profiles.
3. Profile Management: Users can view and update their personal details, education, work experience, skills, and projects.
4. PDF Download: Users can download their resume in PDF format using customizable templates.
5. QR Resume (Upcoming): The project will soon provide the functionality to generate QR codes for users' resumes.

## Contribution Guidelines
Contributions to the Resume Builder project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository and create a new branch for your feature/fix.
2. Make changes to your branch and commit the changes.
3. Push the changes to your forked repository.
4. Create a pull request with a detailed description of your changes.
5. Wait for the code review and feedback from maintainers.

Thank you for your interest in contributing!

## License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify the code for your needs.
