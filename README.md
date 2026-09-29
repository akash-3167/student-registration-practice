# Student Admission & Digital ID Portal

A clean, responsive, two-page web application for student admissions and digital ID card generation, built entirely with vanilla web technologies (HTML, CSS, and JavaScript) without external frameworks or dependencies.

---

## 📌 Project Overview

This project provides an intuitive, client-side solution for student onboarding and admissions. It guides students through a structured registration process and instantly generates a digital student identity card along with a complete application dossier upon submission.

---

## 🎯 Problem Being Solved

Traditional paper-based or disjointed admission workflows can be slow and error-prone. This application provides a lightweight, instant solution that:
- Captures and validates applicant personal, contact, guardian, and academic details.
- Allows students to preview and upload passport photos directly in the browser.
- Instantly issues an official Digital Student ID Card and formatted summary without requiring complex server configurations or databases.

---

## ✨ Key Features

- **Two-Page Workflow**:
  - `index.html`: Multi-section student registration and admission form.
  - `student-profile.html`: Digital Student ID Card badge and application summary dossier.
- **Comprehensive Form Sections**:
  - Personal Information (Name, Date of Birth, Gender, Blood Group).
  - Profile Photo Upload with real-time preview (supports PNG, JPG, WebP) and SVG initials avatar fallback.
  - Contact Details (Email, Mobile, Full Address).
  - Parent / Guardian Emergency Contact Information.
  - Academic Details (Course/Degree selection, Batch/Semester, Previous School, GPA/Score %).
  - Extracurricular Club selection.
  - Applicant Declaration checkbox.
- **Client-Side Validation**:
  - Semantic HTML5 validation enhanced with `:user-valid` and `:user-invalid` visual feedback.
- **One-Click Demo Fill**:
  - "Fill Demo Data" button to instantly populate realistic sample data for testing.
- **Persistent Data**:
  - Uses browser `localStorage` to save submissions and pre-populate the form for editing.
- **Digital Student ID Card**:
  - Holographic-inspired ID card with university branding, student photo, roll number, course, validity, emergency contact, and barcode simulation.
- **Print & Export Friendly**:
  - Dedicated `@media print` styling to cleanly print the ID card and dossier to paper or save as PDF.
- **Utility Actions**:
  - One-click "Copy Student ID" to clipboard with toast notification feedback.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document structure, accessibility attributes, and native form validation.
- **CSS3 (Vanilla CSS)**: CSS Custom Properties (variables), Flexbox, CSS Grid, custom radio/checkbox pills, glassmorphism, and responsive breakpoints.
- **JavaScript (Vanilla JS - ES6+)**: DOM manipulation, `FileReader` API for image previews, `localStorage` API for client-side persistence, and Clipboard API.
- **Typography**: Google Fonts (*Plus Jakarta Sans* for UI, *Space Grotesk* for monospace ID badges).

---

## 📁 Project Structure

```text
student-registration-practice/
│
├── index.html             # Page 1: Student Admission & Registration Form
├── student-profile.html   # Page 2: Student Profile & Digital Student ID Card
├── style.css              # Unified stylesheet for both pages & print layouts
├── script.js              # Logic for form validation, photo preview, & submission
├── profile.js             # Logic for profile rendering, ID card, & clipboard copy
└── README.md              # Project documentation
```

---

## 🚀 How to Run the Project

No build step or package installation is required.

### Option 1: Direct File Open
1. Clone or download this repository.
2. Locate `index.html` in your file explorer.
3. Double-click `index.html` (or right-click and select **Open with** > Google Chrome, Microsoft Edge, Firefox, or Safari).

### Option 2: Using a Local Server (Recommended for Live Reload)
If using VS Code:
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.

Alternatively, using Node:
```bash
npx serve .
```

---

## 📸 Screenshots

*(Screenshots will be added here)*

| Admission Form (`index.html`) | Digital ID Card & Profile (`student-profile.html`) |
| :---: | :---: |
| *Form screenshot placeholder* | *Profile & ID Card screenshot placeholder* |

---

## 🔮 Future Improvements

- [ ] Add backend integration (Node.js/Express, Firebase, or SQLite) for persistent multi-user databases.
- [ ] Export ID card as an image/PNG or PDF using `html2canvas` / `jsPDF`.
- [ ] Implement scannable 2D QR codes containing signed verification tokens.
- [ ] Add an administrative dashboard to view, filter, and export all submitted applications as CSV/Excel.

---

## 👤 Author

- **Akash Prajapati**
- GitHub: [@akash-3167](https://github.com/akash-3167)
