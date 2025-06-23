# 🧠 NeuroCare – Cognitive Health Prescreening Platform

NeuroCare is a full-featured web platform that empowers users to **prescreen cognitive impairments** through interactive assessments and educational content. Built on the **MERN stack** (MongoDB, Express.js, ReactJS, Node.js), it bridges the gap between medical awareness and accessible digital tools.

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [System Architecture](#system-architecture)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Database](#database)
  - [Architecture Diagram](#architecture-diagram)
- [API Design](#api-design)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Demo Login](#demo-login)
- [UI Screenshots](#ui-screenshots)

---

## 🧩 Introduction

**NeuroCare** offers a digital gateway to **early detection and awareness** of cognitive decline, including conditions like dementia and Alzheimer’s. Users can participate in **prescreening tests**, track their cognitive performance, and explore expert-curated learning resources.

It also includes a dedicated interface for healthcare professionals to **manage patients, interpret data**, and deliver feedback.

---

## 🏗️ System Architecture

The platform is structured into three core components:

### ⚛️ Front-end

Built using **ReactJS**, styled with **Tailwind CSS**, and powered by **Redux** for robust state management.

#### Patient Features

- **Home Page** – Introductory section explaining NeuroCare’s purpose.
- **Cognitive Assessments** – Interactive games/tests to evaluate memory, attention, and other cognitive skills.
- **Test Results Dashboard** – Graphs and stats for self-monitoring performance.
- **Learning Hub** – Articles and videos on mental wellness and cognitive health.
- **Account Settings** – Manage profile and view test history.

#### Healthcare Professional Features

- **Dashboard** – Overview of registered patients and insights.
- **Test Review** – View patient test results with AI-based flagging for risk levels.
- **Patient Management** – Add, update, and manage patient profiles.
- **Insights** – Track aggregate metrics across users.

---

### 🖥️ Back-end

The back-end is built using **Node.js** and **Express.js**, with RESTful APIs to serve the front-end and handle:

- **Authentication & Authorization** – Secure login/signup with JWT & role-based access control.
- **Assessment Logic** – Scoring engine for interpreting cognitive test results.
- **Test & Result Storage** – Managing test records, timestamps, and progress data.
- **Email Notifications** – OTP-based registration and password recovery.
- **Media & Document Management** – Handled via **Cloudinary**.

#### Key Technologies

- `Node.js`, `Express.js`
- `JWT`, `bcrypt`
- `Cloudinary`
- `Mongoose` (ODM)

---

### 🧾 Database

The platform uses **MongoDB** for storing structured and semi-structured health data:

- **User Schema** – Common fields for both patients and professionals.
- **Assessment Schema** – Stores answers, timestamps, and score reports.
- **Article/Content Schema** – Medical learning modules in Markdown format.
- **Notification Schema** – For system alerts and health updates.

---


## 🔗 API Design

RESTful APIs are implemented using **Node.js** and **Express.js**, supporting endpoints for:

- `/auth` – SignUp, Login, Forgot Password, OTP
- `/tests` – Start Test, Submit Test, Get Results
- `/users` – Profile info, history, edit
- `/admin` – For doctors/admin to fetch and review assessments

📄 Refer to the [API Documentation](/api-docs) for endpoint structure and sample payloads.

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/ManasTripathi07/repo.git

# Navigate to project
cd NeuroCare

# Install backend dependencies
npm install
