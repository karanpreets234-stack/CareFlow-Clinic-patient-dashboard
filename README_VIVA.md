# CareFlow — Clinic Patient Flow Dashboard

## Project overview
CareFlow is a front-end clinic operations dashboard. It gives clinic staff one place to review appointments, patient check-ins, queue position, provider assignment, and visit completion.

## Files in this project
- `index.html` — page structure and dashboard content.
- `style.css` — colors, layout, responsive design, tables, cards, modal, and mobile styles.
- `script.js` — sample data and interactive behavior: searching, filtering, pagination, adding appointments, changing statuses, and CSV export.

## How to run
1. Keep all three files in the same folder.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. No server or installation is required for this demo. An internet connection is only needed to load the optional Google Fonts.

## Viva explanation (short)
**What is the project?**  
A Clinic Patient Flow Dashboard that helps staff monitor the patient's journey from check-in to completion.

**Why did you build it?**  
Small clinics can have appointment information, waiting patients, and completed visits spread across different places. This dashboard brings the key information together.

**Technologies used**
- HTML5: creates the structure, navigation, cards, forms, and appointment table.
- CSS3: provides the visual design, grid/flex layouts, status colors, hover effects, and responsive layout.
- JavaScript: renders appointment data, searches and filters the table, changes visit statuses, paginates results, adds appointments, and exports a CSV report.

**Important functions**
- Search by patient name, patient ID, provider, or visit type.
- Filter by visit status.
- Add a new appointment through a dialog form.
- Click the three-dot action in a row to cycle the visit status.
- Export the currently filtered appointment list to a CSV file.
- Use pagination to navigate the table.
- On small screens, use the menu button to open the sidebar.

**Is this connected to a real clinic database?**  
No. This is a front-end demonstration with sample data. A production version would need a secure backend, authentication, role-based access, database storage, audit logs, and privacy safeguards for medical information.

**Possible future improvements**
- Connect to a backend API and clinic database.
- Add secure login and staff roles (administrator, receptionist, provider).
- Store appointment changes persistently.
- Add real-time queue updates and provider availability.
- Add date selection and more detailed reports.

## Note
All names and patient identifiers are fictional demo data. Do not use this demo to store real patient information.
