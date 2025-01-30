# Dynamic Form Instructions

## Overview

This project implements a dynamic form in a Next.js application. The form adapts to the type of information being collected based on the user's selection. There are two available form types:

1. **Personal Info**: Collects personal details such as name, age, and gender.
2. **Professional Details**: Collects job-related information such as job title, company, and years of experience.

The fields displayed depend on the form type selected by the user.

---

## Features

- Dynamically updates the form fields based on the selected form type.
- Maintains state for each input field to capture user data.
- Validates inputs with basic rules (e.g., required fields, minimum values).
- Displays a user-friendly dropdown to select the form type.

---

## How to Use

### **1. Selecting a Form Type**

- Upon loading, a dropdown labeled `Select Form Type` is displayed.
- Choose a form type from the dropdown:
  - **Personal Info**
  - **Professional Details**

### **2. Filling Out the Form**

After selecting a form type, appropriate fields are displayed:

#### Personal Info Form:

- **Name** (Text): Enter your full name. This field is required.
- **Age** (Number): Enter your age. This field is required and must be greater than 0.
- **Gender** (Dropdown): Choose your gender from the available options (Male, Female, Other). This field is required.

#### Professional Details Form:

- **Job Title** (Text): Enter your job title. This field is required.
- **Company** (Text): Enter the name of the company you work for. This field is required.
- **Years of Experience** (Number): Enter your years of experience. This field is required and must be 0 or greater.

### **3. Submitting the Form**

- After filling out all required fields, click the `Submit` button.
- Show the data.

---

# Parallel Requests

## Adding URL Fields and Fetching Data

- Add an API that can get urls - and fetch their data.
- Extend the form to include a section for entering multiple URLs. This allows users to Add new URL fields dynamically by clicking an Add URL button.
- On submit Perform web requests to the entered URLs concurrently.
- Aggregate the results of all successful requests.
- Display the aggregated data below the form.

