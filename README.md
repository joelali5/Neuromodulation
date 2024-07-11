# The Walton Centre NHS Founda3on Trust – Coding Challenge
## Neuromodulation

Neuromodulation is a Patient Management System designed to handle patient data, such as specifics about their pain management details and cumulative pain assessments. The system has two interfaces: an admin interface for viewing, modifying, and deleting records, and a user interface for submitting patient details.

## Features

- **Patient Form**: Allows users to submit patient details and their pain treatment information.
- **Admin View**: Enables administrators to view, update, delete patient record, sort, and filter records.
- **Database Management**: Utilizes SQL Server stored procedures for CRUD operations.

## Technologies Used

- **Frontend**: HTML, Bootstrap, jQuery
- **Backend**: PHP, MSSQL, IIS Server
- **Version Control**: Git and Github

## Project Structure

├── Database
    ├── Stored Procedures
    ├── CreateTable.sql
├── admin.html
├── admin.js 
├── index.html
├── index.js 
├── index.php
├── README.md
├── web.config

## Setup

1. **Clone the repository**:

   git clone https://github.com/joelali5/The-Walton-Center-NHS-Foundation-Trust-Coding-Challenge.git

2. **Set up the MSSQL database**:

    Create a database named NeuromodulationDB.
    Execute the 'CreateTable.sql' scripts to create the necessary tables and stored procedures.

3. **Configure the PHP script**:
    Update the database connection details in index.php if necessary.


## How to Use

**Patient Details Form**:

    - Open index.html in your browser.
    - Fill out the patient details and submit the form.
    -The page displays a loading spinner
    - The form data will be sent to the server and stored in the database.

**Admin Interface**:

    - Open admin page by clicking the admin button (Opens in a new tab).
    - View the list of patients, filter and sort the data as needed.
    - Click on a patient record to view details (Displays the form as a readonly)
    - Use the edit button to update patient information (This makes the form editable and also displays the update button)
    - Click the edit button to update the interface with the updated form values and also persist the values to the database
    - Use the delete button to remove a patient record (This updates the user interface and the database simultaneously)


## Key Decisions to support development
    - Update Button: I created an update button in the admin view to instantly update the UI and database
    - Database creation and Stored Procedures: The 'CreateTable.sql' script also contains the sql commands for creating the stored procedures.     This is done to avoid any potential errors that may arise from running the stored procedures and createTable scripts separately.
    - Admin Button/Link: I added the 'target' attribute here with its value set to '_blank' so it opens in a new tab. 
