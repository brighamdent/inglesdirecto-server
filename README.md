# Ingles Directo Server

Welcome to the Ingles Directo Server repository! This server is designed to accompany the Ingles Directo platform, providing backend functionality for authentication, subscription management, and data retrieval. Seamlessly integrated with Firebase and Stripe, it enables clients to enroll in online classes, manage subscriptions, and access personalized learning experiences.

## Description

Ingles Directo is a comprehensive online platform tailored for English teaching businesses. Seamlessly integrated with Firebase and Stripe, it empowers clients to effortlessly enroll in online classes, manage subscriptions, and access personalized learning experiences. With intuitive features for authentication, subscription management, and account customization, Ingles Directo streamlines the administrative tasks for both educators and learners, fostering a dynamic and engaging learning environment.

## Features

- **Server Communication:**
  - Handles communication between the Ingles Directo website and external services like Firebase and Stripe.

- **Subscription Management:**
  - Enables users to manage their subscription plans, including enrollment, cancellation, and updates.

- **Data Retrieval:**
  - Retrieves and processes data from external services, such as retrieving subscription details and updating user information.


## Technologies Used

### Node.js
Ingles Directo utilizes Node.js, a runtime environment for executing JavaScript code outside of a web browser, to build the server-side logic of the application. In the server, Node.js enables the execution of JavaScript code to handle HTTP requests, interact with databases, and integrate with external services such as Firebase and Stripe.

### Express
Ingles Directo utilizes Express, a minimalist web framework for Node.js, to build robust and scalable server-side applications. In the server, Express handles routing, middleware management, and request handling, enabling efficient development of RESTful APIs and backend services.

### Stripe
Stripe is employed for handling payment processing functionalities within Ingles Directo. In the server, Stripe is integrated to handle payment-related endpoints such as `/payment`, `/update-subscription`, `/cancel-subscription`, `/resume-subscription`, and `/retrieve-data`. These endpoints interact with the Stripe API to create customers, manage subscriptions, and retrieve payment data.

## Getting Started

To run the server locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/inglesdirecto-server.git

2. **Navigate to the project directory:**

   ```bash
   cd inglesdirecto-server

3. **Install dependencies:**

   ```bash
   npm install

4. **Set up Stripe .env file:**

   Create a .env file in the root directory and add the following environment variables:
   ```bash
   STRIPE_SECRET_TEST=your_stripe_secret_key
