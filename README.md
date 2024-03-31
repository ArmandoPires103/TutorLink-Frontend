<p align="center">
  <img src="public/TutorLink.png" alt="TutorLink Logo">
</p>

<h1 align="center">TutorLink Website</h1>

Welcome to TutorLink, a platform connecting learners with exceptional tutors worldwide!

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Components](#components)

# About

TutorLink offers personalized learning experiences tailored to individual needs, empowering students to achieve their academic goals. With a diverse network of qualified tutors, TutorLink ensures quality education accessible to all.

# Getting Started

**Usage:**
To use the app on the web navigate to: ________

To get started with TutorLink on your local machine, follow these steps:

1. Clone this repository to your local machine.
2. Clone the server repository located [here](https://github.com/ArmandoPires103/TutorLink-Backend). 
2. Navigate to the project directory for both repositories.
3. Install dependencies on both repositories by running `npm install` on each.
4. Start the development server for both repositories using `npm run dev`.

## Landing Page

The landing page introduces users to TutorLink and its features. It includes the following components:

- Header: Navigation bar for easy access to different sections of the website.
- Section: Main content area featuring information about TutorLink.
  - Title: "Welcome, Find your Tutor".
  - Description: Overview of TutorLink's mission and services.
  - Action Button: "Hire A Tutor" button for users to proceed to the dashboard.
- Image: Illustrative image depicting the learning environment.

## Secure Navigation
To ensure secure navigation throughout the website, TutorLink uses a `ProtectedRoute` component. This component verifies the user's authentication status before allowing access to protected routes such as the dashboard and tutor requests. If a user is not authenticated, they are redirected to the login page. Once logged in, users can securely access their dashboard and other protected resources.

## Authentication
Users can log in with their credentials to access TutorLink's features. If users don't have an account, they can register to create one.

### Login Process:
1. Visit the login page.
2. Enter your username and password.
3. Click the "Login" button to authenticate.

### Registration Process:
1. Visit the registration page.
2. Fill out the registration form with required information.
3. Select your role as either a student or a tutor.
4. Complete additional information based on your selected role.
5. Submit the form to create your account.

## Student Dashboard - Logged in Student View

### Tutor Listing Page

The Tutor Listing page provides students with access to a list of tutors available on TutorLink. Users can view details such as the tutor's name, expertise, and whether they offer remote tutoring. Additionally, users can click on "View More..." to access detailed information about each tutor.

### Tutor Details Page

The Tutor Details page displays detailed information about a specific tutor. Users can view the tutor's name, expertise, subject, and profile picture. The page also provides options to view reviews, create a review, and book a tutoring session with the tutor.

### Student Reviews

The Student Reviews component allows students to leave reviews for tutors. It provides input fields for the student's username, tutor's name, subject, review description, and rating. After submitting the review, it is sent to the backend API for processing.

### Student Edit Review Form

The Student Edit Review Form component enables students to edit their previously submitted reviews for tutors. It retrieves the existing review data from the backend API, allowing students to modify the review description and rating. After submitting the changes, the updated review is sent to the backend for processing.

## Tutor Dashboard - Logged in Tutor View
### Student Request Page

The Student Request page allows tutors to view and manage incoming requests from students. It displays a list of student requests, including the student's name, email, and profile picture. Tutors can accept requests directly from this page.

# Components

### LandingPage

The `LandingPage` component renders the landing page of the TutorLink website. It includes HTML markup for the structure of the page, as well as React components for dynamic content rendering.

### Tutors

The `Tutors` component fetches data from the backend API to populate the list of available tutors. It dynamically renders each tutor's information in a card format, including their profile picture, name, expertise, and remote tutoring availability.

### TutorDetails

The `TutorDetails` component displays detailed information about a specific tutor. It fetches data from the backend API based on the tutor's ID and renders the tutor's details, including their name, expertise, description, and profile picture. Users can also view reviews, create a review, and book a tutoring session with the tutor.

### StudentRequest

The `StudentRequest` component allows tutors to view and manage incoming requests from students. It fetches data from the backend API and displays a list of student requests, including the student's name, email, and profile picture. Tutors can accept or reject requests directly from this page.

### StudentReviewForm

The `StudentReviewForm` component allows students to leave reviews for tutors. It provides input fields for the student's username, tutor's name, subject, review description, and rating. After submitting the review, it is sent to the backend API for processing.

### StudentsEditReviewForm

The `StudentsEditReviewForm` component enables students to edit their previously submitted reviews for tutors. It retrieves the existing review data from the backend API, allowing students to modify the review description and rating. After submitting the changes, the updated review is sent to the backend for processing.

---