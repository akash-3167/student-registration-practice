/**
 * Student Profile & Digital ID Card Logic - Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const profileContainer = document.getElementById('profileContainer');
  const noDataContainer = document.getElementById('noDataContainer');
  const printDocBtn = document.getElementById('printDocBtn');
  const copyIdBtn = document.getElementById('copyIdBtn');
  const loadDemoProfileBtn = document.getElementById('loadDemoProfileBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Helper: Toast Alert
  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  // Helper: Generate dynamic SVG avatar with student initials
  function generateInitialsAvatar(name) {
    const parts = (name || 'Student').trim().split(' ');
    const initials = parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : (parts[0].slice(0, 2)).toUpperCase();

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#avatarGrad)" />
        <text x="50" y="55%" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="34" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">
          ${initials}
        </text>
      </svg>
    `;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Load and render student data
  function renderProfile() {
    let studentData = null;
    try {
      const raw = localStorage.getItem('studentRegistrationData');
      if (raw) {
        studentData = JSON.parse(raw);
      }
    } catch (err) {
      console.error('Failed to parse student data', err);
    }

    if (!studentData || !studentData.firstName) {
      if (profileContainer) profileContainer.style.display = 'none';
      if (noDataContainer) noDataContainer.style.display = 'block';
      if (printDocBtn) printDocBtn.style.display = 'none';
      if (copyIdBtn) copyIdBtn.style.display = 'none';
      return;
    }

    if (profileContainer) profileContainer.style.display = 'grid';
    if (noDataContainer) noDataContainer.style.display = 'none';
    if (printDocBtn) printDocBtn.style.display = 'inline-flex';
    if (copyIdBtn) copyIdBtn.style.display = 'inline-flex';

    const fullName = `${studentData.firstName} ${studentData.lastName}`.trim();

    // 1. Populate Digital ID Card
    const cardName = document.getElementById('cardName');
    const cardRoll = document.getElementById('cardRoll');
    const cardCourse = document.getElementById('cardCourse');
    const cardBlood = document.getElementById('cardBlood');
    const cardEmergency = document.getElementById('cardEmergency');
    const cardPhoto = document.getElementById('cardPhoto');
    const cardBarcodeText = document.getElementById('cardBarcodeText');

    if (cardName) cardName.textContent = fullName;
    if (cardRoll) cardRoll.textContent = studentData.studentId || 'AIT-2026-8941';
    if (cardCourse) cardCourse.textContent = studentData.course || 'B.Tech Program';
    if (cardBlood) cardBlood.textContent = studentData.bloodGroup || 'N/A';
    if (cardEmergency) cardEmergency.textContent = studentData.guardianPhone || studentData.phone || '-';

    if (cardBarcodeText) {
      cardBarcodeText.textContent = (studentData.studentId || 'AIT20268941').replace(/[^A-Za-z0-9]/g, '');
    }

    if (cardPhoto) {
      if (studentData.photoDataUrl && studentData.photoDataUrl.trim().length > 0) {
        cardPhoto.src = studentData.photoDataUrl;
      } else {
        cardPhoto.src = generateInitialsAvatar(fullName);
      }
    }

    // 2. Populate Application Summary Dossier
    const summaryFullName = document.getElementById('summaryFullName');
    const summaryDob = document.getElementById('summaryDob');
    const summaryGender = document.getElementById('summaryGender');
    const summaryBloodGroup = document.getElementById('summaryBloodGroup');

    if (summaryFullName) summaryFullName.textContent = fullName;

    if (summaryDob && studentData.dob) {
      try {
        const d = new Date(studentData.dob);
        summaryDob.textContent = d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        summaryDob.textContent = studentData.dob;
      }
    }

    if (summaryGender) summaryGender.textContent = studentData.gender || '-';
    if (summaryBloodGroup) summaryBloodGroup.textContent = studentData.bloodGroup || 'Not Specified';

    const summaryEmail = document.getElementById('summaryEmail');
    const summaryPhone = document.getElementById('summaryPhone');
    const summaryAddress = document.getElementById('summaryAddress');
    const summaryGuardianName = document.getElementById('summaryGuardianName');
    const summaryGuardianPhone = document.getElementById('summaryGuardianPhone');

    if (summaryEmail) summaryEmail.textContent = studentData.email || '-';
    if (summaryPhone) summaryPhone.textContent = studentData.phone || '-';

    if (summaryAddress) {
      const addressParts = [
        studentData.address,
        studentData.city,
        studentData.state,
        studentData.zipCode
      ].filter(Boolean);
      summaryAddress.textContent = addressParts.join(', ') || '-';
    }

    if (summaryGuardianName) summaryGuardianName.textContent = studentData.guardianName || '-';
    if (summaryGuardianPhone) summaryGuardianPhone.textContent = studentData.guardianPhone || '-';

    const summaryCourse = document.getElementById('summaryCourse');
    const summaryBatch = document.getElementById('summaryBatch');
    const summaryPreviousSchool = document.getElementById('summaryPreviousSchool');
    const summaryPreviousScore = document.getElementById('summaryPreviousScore');
    const summaryActivities = document.getElementById('summaryActivities');
    const summarySubmissionDate = document.getElementById('summarySubmissionDate');

    if (summaryCourse) summaryCourse.textContent = studentData.course || '-';
    if (summaryBatch) summaryBatch.textContent = studentData.academicBatch || '-';
    if (summaryPreviousSchool) summaryPreviousSchool.textContent = studentData.previousSchool || '-';
    if (summaryPreviousScore) summaryPreviousScore.textContent = studentData.previousScore ? `${studentData.previousScore}%` : '-';

    if (summaryActivities) {
      if (Array.isArray(studentData.activities) && studentData.activities.length > 0) {
        summaryActivities.innerHTML = studentData.activities.map(act =>
          `<span class="badge-tag">${act}</span>`
        ).join('');
      } else {
        summaryActivities.innerHTML = `<span class="badge-tag">No extracurriculars selected</span>`;
      }
    }

    if (summarySubmissionDate) {
      summarySubmissionDate.textContent = studentData.submissionDate || new Date().toLocaleDateString('en-US');
    }
  }

  // 3. Print Action
  if (printDocBtn) {
    printDocBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. Copy Student ID Button
  if (copyIdBtn) {
    copyIdBtn.addEventListener('click', () => {
      const cardRoll = document.getElementById('cardRoll');
      if (cardRoll && cardRoll.textContent) {
        navigator.clipboard.writeText(cardRoll.textContent).then(() => {
          showToast(`Student ID "${cardRoll.textContent}" copied to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy ID');
        });
      }
    });
  }

  // 5. Load Demo Profile Handler (for direct visitors)
  if (loadDemoProfileBtn) {
    loadDemoProfileBtn.addEventListener('click', () => {
      const demoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><rect width="120" height="120" fill="url(#grad)"/><circle cx="60" cy="48" r="24" fill="#ffffff" opacity="0.95"/><path d="M24 104c0-19.88 16.12-36 36-36s36 16.12 36 36" fill="#ffffff" opacity="0.95"/></svg>`;

      const demoData = {
        studentId: 'AIT-2026-8941',
        submissionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        firstName: 'Alexander',
        lastName: 'Vance',
        dob: '2004-08-16',
        bloodGroup: 'O+',
        gender: 'Male',
        email: 'alexander.vance@apex.edu',
        phone: '+1 (555) 432-8765',
        address: '742 Evergreen Terrace, Apt 3B',
        city: 'San Francisco',
        state: 'California',
        zipCode: '94103',
        guardianName: 'Eleanor Vance',
        guardianPhone: '+1 (555) 987-1234',
        course: 'B.Tech Computer Science & Engineering',
        academicBatch: 'Fall 2026 (Semester 1)',
        previousSchool: 'Bay Area STEM Academy',
        previousScore: '93.4',
        activities: ['Coding & Robotics Club', 'Debating & Model UN', 'Sports & Athletics'],
        photoDataUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(demoSvg)
      };

      localStorage.setItem('studentRegistrationData', JSON.stringify(demoData));
      renderProfile();
      showToast('Loaded demo student profile!');
    });
  }

  // Initial render
  renderProfile();
});
