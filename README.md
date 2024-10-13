# The Walton Centre NHS Foundation Trust – Coding Challenge
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
```
├── Database
    ├── Stored Procedures
    ├── CreateTable.sql
    ├── seed.sql
├── admin.html
├── admin.js 
├── index.html
├── index.js 
├── index.php
├── README.md
├── web.config
```
## Key Decisions to support development
    - Update Button: I created an update button in the admin view to instantly update the UI and database
    - Database creation and Stored Procedures: The 'CreateTable.sql' script also contains the sql commands for creating the stored procedures.     This is done to avoid any potential errors that may arise from running the stored procedures and createTable scripts separately.
    - Admin Button/Link: I added the 'target' attribute here with its value set to '_blank' so it opens in a new tab.
    -I added a seed file to manually seed the database with so as to have enough data to perform operations like sorting and filtering.

## Setup

1. **Clone the repository**:

   git clone https://github.com/joelali5/Neuromodulation.git

2. **Set up the MSSQL database**:

    Create a database named NeuromodulationDB.
    Execute the 'CreateTable.sql' scripts to create the necessary tables and stored procedures.

3. **Configure the PHP script**:
    Update the database connection details in index.php if necessary.

4. **Seed Database**
    Manually seed the database to have enough data to perform certain operations like sorting and filtering


## How to Use

**Patient Details Form**:

    - Open index.html in your browser.
    - Fill out the patient details and submit the form.
    -The page displays a loading spinner - to see the loader, set throttling to 'Slow 3G' in the browsers network tab
    - The form data will be sent to the server and stored in the database.

**Admin Interface**:

    - Open admin page by clicking the admin button (Opens in a new tab).
    - View the list of patients, filter and sort the data as needed.
    - Click on a patient record to view details (Displays the form as a readonly)
    - Use the edit button to update patient information (This makes the form editable and also displays the update button)
    - Click the edit button to update the interface with the updated form values and also persist the values to the database
    - Use the delete button to remove a patient record (This updates the user interface and the database simultaneously)

**Screenshots**
![ss1](https://github.com/joelali5/Neuromodulation/assets/42684254/253d9878-1346-44b2-bca2-8cd21333575d)
![ss4](https://github.com/joelali5/Neuromodulation/assets/42684254/ae92ada4-ae0d-42cc-9894-e853eefc3040)
![ss3](https://github.com/joelali5/Neuromodulation/assets/42684254/c2758251-a14c-4f34-9ecb-c03ce628b314)
![ss2](https://github.com/joelali5/Neuromodulation/assets/42684254/58c12782-e2df-4a6a-a27d-03b4e981b8e0)

 
