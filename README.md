# School Management ERP – Complete Project

Frontend (HTML/CSS/JavaScript) plus a small Node.js server. Three portals: Admin, Teacher, Student.
Mock data, role-based login, LocalStorage persistence and server-side JSON persistence are all included.

## Run on macOS (or Windows/Linux)
1. Install Node.js 16 or newer from https://nodejs.org (check with: node -v)
2. Unzip School_Management_ERP_Complete.zip (double-click it in Finder), then in Terminal:

       cd ~/Downloads/school-erp-demo
       npm install
       npm start

   (`npm install` finishes immediately because the project has no npm packages.)
3. Open http://localhost:3000 in your browser.
4. To edit in VS Code:  code .   (or File > Open Folder in VS Code)
5. Another port:  PORT=8080 npm start     Stop the server: Ctrl+C

## Demo login credentials
Admin:   admin@demo.school   / admin123
Teacher: teacher@demo.school / teacher123
Student: student@demo.school / student123

## Project files
    server.js              Node server: serves public/ and stores state in data/state.json
                           API: GET / PUT / DELETE /api/state
    package.json           "npm start" runs server.js
    public/index.html      page shell
    public/css/style.css   all styles
    public/js/01-core.js .. 09-*.js   application code (loaded in numeric order)
    data/state.json        created automatically when you use the app

## Checkbox multi-select (new)
- Shared component: searchable, scrollable checkbox lists with Select All, Clear All, selected count and
  indeterminate group state. Classes load from Classes & Sections; sections appear for the ticked classes.
- Admin > Fees: Bulk fee assignment (classes, individual students, pending-fee students, live count and total).
- Announcements: All Students / All Teachers / Selected Classes / Selected Sections / Selected Teachers / Selected Students,
  with multi-file attachments. Delivery and notifications go only to the chosen audience.
- Admin > Teacher Tasks: assign to many teachers and/or classes (one private record per teacher).
- Admin > Teachers: tick several classes/sections and subjects at once.
- Ranks & Results: single Class / Examination type / Examination; multi Sections (comparison) and Subjects.
- Admin > Landing Page: multi-photo upload, gallery delete, publish/unpublish events and public notices.
- Teacher > Study Materials (multi-class, multi-file) and Student > Study Materials.
- Multi-file pickers validate type and size, list the chosen files, and let you remove each before upload.
  (Only file names are stored; gallery photos are stored as resized images in the state file.)

## Landing page management (Admin > Landing Page)
Every picture on the landing page (home banner, About, the four Academics cards, the four Facilities cards) has a
Change picture / Reset to default button under Admin > Landing Page > Landing Page Pictures. Event cover pictures are
changed in Events.
Events and notices on the public landing page come from saved data, managed in two sections:
- Events: Add Event (name required, description, date, time, location, cover image, status), Edit, Delete,
  Publish/Unpublish. Upcoming events are sorted by date; past events are listed separately.
- Announcements & Public Notices: Add New Notice (title, description, category, date, optional PDF/image attachment,
  optional target classes, status), Edit, Delete, Publish/Unpublish. Visitors can view or download attachments.
Only published records appear publicly. The Photo Gallery option and the photo upload controls in Settings were removed.
Data from the previous version (event photos, public notices) is migrated automatically on first load.

## Attendance dates
Attendance pages show the weekday calculated from the date (for example "Saturday, 28 November 2026" or
"28 Nov 2026 (Saturday)"). Admin/Teacher > Attendance has a Daily & monthly report with CSV export; Reports has a by-date export.

## How data is stored
- Served by the Node server: all records are saved to data/state.json (shared by every browser).
  Login sessions stay per browser (LocalStorage).
- Opening public/index.html directly (file://): data stays in browser LocalStorage only.
- Reset: Admin > Settings > Reset demo data, or delete data/state.json.

## Internet-dependent items (CDN)
- Google Font "Plus Jakarta Sans": falls back to the system font if offline.
- jsPDF library (report-card PDF download), loaded from cdnjs.cloudflare.com.
  Offline, use "Print report card" instead of "Download PDF".
Everything else runs fully offline.

## Demo limits
- Passwords and permissions are checked in the browser; there is no real authentication or database.
- Uploaded files are not stored (names only); payments (UPI/card/offline) are simulations.
- Reminders and sounds work only while the app is open.
