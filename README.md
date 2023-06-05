# OptimizeX - An Open-Source image optimization platform

![Landing Page](https://media-bucket-project.s3.ap-south-1.amazonaws.com/1.png)

OptimizeX is a serverless cloud application built with NextJS, React 18, TypeScript, Prisma, and various AWS services. It provides a frontend interface for seamless user interaction and leverages serverless architecture to handle backend processes efficiently. This repository contains the codebase for the frontend implementation of the application.

## Features

**NextJS 13.4.1:** Utilizes the latest version of NextJS framework for building fast and scalable web applications.

**React 18:** Harnesses the power of React 18 to create dynamic and interactive user interfaces.

**TypeScript:** Implements strong typing with TypeScript for enhanced code quality and maintainability.

**Prisma:** Uses Prisma as an Object-Relational Mapping (ORM) tool to interact with the MongoDB database seamlessly.

**MongoDB:** Stores user data, including name, email, and securely encrypted hashed passwords.

**S3:** Stores and retrieves images securely in S3 buckets, employing S3 Managed Encryption Keys for high-level encryption.

**Lambda:** Executes serverless functions to handle various tasks within the application, such as image optimization and processing.

**SQS:** Utilizes a FIFO (First-In, First-Out) queue to manage messages created by a Lambda function triggered by S3 object creation events.

**CloudFront:** Enables fast content delivery by leveraging a Content Delivery Network (CDN) and serves the optimized images from the destination S3 bucket.

**Cloudwatch:** Monitors and logs the application's performance and provides actionable insights for debugging and optimization.

## Getting Started

To get started with OptimizeX, follow the steps below:

### Prerequisites

1. Node.js (version 19.0.X)
2. AWS Account with necessary permissions
3. MongoDB Account with necessary credentials

### Installation

**Clone the repository:**

```bash
git clone https://github.com/your-username/project-name.git
```

**Install the dependencies:**

```bash
cd optimizex-client
npm install
```

**Configure AWS services:**

Set up the necessary AWS services, including S3, Lambda, SQS, CloudFront, and Cloudwatch, by following this blog by me[Soon!]

**Configure MongoDB:**

Set up a MongoDB database and obtain the connection string.

**Configure environment variables:**

Copy the .env.example file and rename it to .env.
Update the environment variables in the .env file with your specific values.

**Start the development server:**

```bash
npm run dev
```

**Access the application:**

Open your preferred web browser and navigate to `http://localhost:3000`.

## Usage

OptimizeX provides a user-friendly interface for seamless interaction. Users can perform various actions such as uploading images, authenticating via OAuth using NextAuth, and accessing their stored data securely. The application follows industry-standard security practices, including encrypted storage of user data and secure transmission of sensitive information.

## Contributing

Contributions are always welcome! If you wish to contribute to OptimizeX, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they follow the code style guidelines.
4. Commit your changes and push them to your forked repository.
5. Submit a pull request with a detailed description of your changes.

## Acknowledgements

NextJS
React
TypeScript
Prisma
MongoDB
AWS
NextAuth

## Contact

For any inquiries or feedback, please contact [us](BharathxxD@gmail.com) or open an issue in the repository.
