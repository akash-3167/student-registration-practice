/**
 * Student Admission Form Logic - Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentRegistrationForm');
  const photoInput = document.getElementById('studentPhotoInput');
  const avatarImage = document.getElementById('avatarImage');
  const avatarPlaceholder = document.getElementById('avatarPlaceholder');
  const removePhotoBtn = document.getElementById('removePhotoBtn');
  const fillDemoBtn = document.getElementById('fillDemoBtn');
  const resetBtn = document.getElementById('resetBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let currentPhotoDataUrl = '';

  // 1. Toast Notification Helper
  function showToast(message, isError = false) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    if (isError) {
      toastNotification.style.background = '#ef4444';
    } else {
      toastNotification.style.background = '#0f172a';
    }
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // 2. Photo Upload & Preview with FileReader
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      // Limit file size (max 2.5MB)
      if (file.size > 2.5 * 1024 * 1024) {
        showToast('Image size exceeds 2.5MB limit. Please choose a smaller image.', true);
        photoInput.value = '';
        return;
      }

      // Check image type
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG, JPG, WebP).', true);
        photoInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        currentPhotoDataUrl = event.target.result;
        setAvatarPreview(currentPhotoDataUrl);
        showToast('Photo uploaded successfully!');
      };
      reader.onerror = () => {
        showToast('Error reading image file.', true);
      };
      reader.readAsDataURL(file);
    });
  }

  function setAvatarPreview(src) {
    if (src) {
      avatarImage.src = src;
      avatarImage.style.display = 'block';
      avatarPlaceholder.style.display = 'none';
      if (removePhotoBtn) removePhotoBtn.style.display = 'inline-block';
    } else {
      avatarImage.src = '';
      avatarImage.style.display = 'none';
      avatarPlaceholder.style.display = 'block';
      if (removePhotoBtn) removePhotoBtn.style.display = 'none';
      if (photoInput) photoInput.value = '';
      currentPhotoDataUrl = '';
    }
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', () => {
      setAvatarPreview('');
      showToast('Photo removed');
    });
  }

  // 3. Populate existing data from localStorage if available (Edit Mode)
  function loadSavedData() {
    try {
      const saved = localStorage.getItem('studentRegistrationData');
      if (!saved) return;
      const data = JSON.parse(saved);

      if (data.firstName) document.getElementById('firstName').value = data.firstName;
      if (data.lastName) document.getElementById('lastName').value = data.lastName;
      if (data.dob) document.getElementById('dob').value = data.dob;
      if (data.bloodGroup) document.getElementById('bloodGroup').value = data.bloodGroup;

      if (data.gender) {
        const genderRadio = form.querySelector(`input[name="gender"][value="${data.gender}"]`);
        if (genderRadio) genderRadio.checked = true;
      }

      if (data.email) document.getElementById('email').value = data.email;
      if (data.phone) document.getElementById('phone').value = data.phone;
      if (data.address) document.getElementById('address').value = data.address;
      if (data.city) document.getElementById('city').value = data.city;
      if (data.state) document.getElementById('state').value = data.state;
      if (data.zipCode) document.getElementById('zipCode').value = data.zipCode;
      if (data.guardianName) document.getElementById('guardianName').value = data.guardianName;
      if (data.guardianPhone) document.getElementById('guardianPhone').value = data.guardianPhone;

      if (data.course) document.getElementById('course').value = data.course;
      if (data.academicBatch) document.getElementById('academicBatch').value = data.academicBatch;
      if (data.previousSchool) document.getElementById('previousSchool').value = data.previousSchool;
      if (data.previousScore) document.getElementById('previousScore').value = data.previousScore;

      if (Array.isArray(data.activities)) {
        data.activities.forEach(act => {
          const chk = form.querySelector(`input[name="activities"][value="${act}"]`);
          if (chk) chk.checked = true;
        });
      }

      if (data.photoDataUrl) {
        currentPhotoDataUrl = data.photoDataUrl;
        setAvatarPreview(currentPhotoDataUrl);
      }

      const declarationChk = document.getElementById('declaration');
      if (declarationChk) declarationChk.checked = true;

    } catch (err) {
      console.warn('Could not parse saved student data', err);
    }
  }

  loadSavedData();

  // 4. Fill Demo Data Feature
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      document.getElementById('firstName').value = 'Alexander';
      document.getElementById('lastName').value = 'Vance';
      document.getElementById('dob').value = '2004-08-16';
      document.getElementById('bloodGroup').value = 'O+';

      const maleRadio = form.querySelector('input[name="gender"][value="Male"]');
      if (maleRadio) maleRadio.checked = true;

      document.getElementById('email').value = 'alexander.vance@apex.edu';
      document.getElementById('phone').value = '+1 (555) 432-8765';
      document.getElementById('address').value = '742 Evergreen Terrace, Apt 3B';
      document.getElementById('city').value = 'San Francisco';
      document.getElementById('state').value = 'California';
      document.getElementById('zipCode').value = '94103';
      document.getElementById('guardianName').value = 'Eleanor Vance';
      document.getElementById('guardianPhone').value = '+1 (555) 987-1234';

      document.getElementById('course').value = 'B.Tech Computer Science & Engineering';
      document.getElementById('academicBatch').value = 'Fall 2026 (Semester 1)';
      document.getElementById('previousSchool').value = 'Bay Area STEM Academy';
      document.getElementById('previousScore').value = '93.4';

      // Check some activities
      const acts = ['Coding & Robotics Club', 'Debating & Model UN'];
      form.querySelectorAll('input[name="activities"]').forEach(cb => {
        cb.checked = acts.includes(cb.value);
      });

      document.getElementById('declaration').checked = true;

      // Demo SVG Avatar Data URL
      const demoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><rect width="120" height="120" fill="url(#grad)"/><circle cx="60" cy="48" r="24" fill="#ffffff" opacity="0.95"/><path d="M24 104c0-19.88 16.12-36 36-36s36 16.12 36 36" fill="#ffffff" opacity="0.95"/></svg>`;
      currentPhotoDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(demoSvg);
      setAvatarPreview(currentPhotoDataUrl);

      showToast('Demo student data filled successfully!');
    });
  }

  // 5. Reset button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      const confirmReset = confirm('Are you sure you want to clear all form fields?');
      if (!confirmReset) {
        e.preventDefault();
        return;
      }
      setAvatarPreview('');
      showToast('Form reset to default.');
    });
  }

  // 6. Form Submission & Validation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check validity of native inputs
      if (!form.checkValidity()) {
        form.reportValidity();
        showToast('Please fill out all required fields properly.', true);
        return;
      }

      // Check Gender selection
      const selectedGender = form.querySelector('input[name="gender"]:checked');
      const genderFeedback = document.getElementById('genderFeedback');
      if (!selectedGender) {
        if (genderFeedback) genderFeedback.style.display = 'block';
        showToast('Please select your gender.', true);
        return;
      } else if (genderFeedback) {
        genderFeedback.style.display = 'none';
      }

      // Check Declaration
      const declaration = document.getElementById('declaration');
      const declarationFeedback = document.getElementById('declarationFeedback');
      if (!declaration.checked) {
        if (declarationFeedback) declarationFeedback.style.display = 'block';
        showToast('Please agree to the applicant declaration.', true);
        return;
      } else if (declarationFeedback) {
        declarationFeedback.style.display = 'none';
      }

      // Gather Form Data
      const selectedActivities = [];
      form.querySelectorAll('input[name="activities"]:checked').forEach(cb => {
        selectedActivities.push(cb.value);
      });

      // Preserve or generate unique Student ID & Roll Number
      let studentId = '';
      try {
        const existing = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');
        studentId = existing.studentId;
      } catch (err) {
        studentId = '';
      }

      if (!studentId) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        studentId = `AIT-2026-${randomNum}`;
      }

      const studentData = {
        studentId: studentId,
        submissionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        dob: document.getElementById('dob').value,
        bloodGroup: document.getElementById('bloodGroup').value || 'N/A',
        gender: selectedGender.value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        guardianName: document.getElementById('guardianName').value.trim(),
        guardianPhone: document.getElementById('guardianPhone').value.trim(),
        course: document.getElementById('course').value,
        academicBatch: document.getElementById('academicBatch').value,
        previousSchool: document.getElementById('previousSchool').value.trim(),
        previousScore: document.getElementById('previousScore').value.trim(),
        activities: selectedActivities,
        photoDataUrl: currentPhotoDataUrl || ''
      };

      // Store in localStorage
      try {
        localStorage.setItem('studentRegistrationData', JSON.stringify(studentData));
      } catch (storageError) {
        console.error('Storage error', storageError);
        // If image exceeded storage quota, retry saving without the image
        studentData.photoDataUrl = '';
        localStorage.setItem('studentRegistrationData', JSON.stringify(studentData));
      }

      showToast('Application registered successfully! Generating ID Card...');

      // Redirect to Page 2 after brief animation
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Generating Card...</span>`;
      }

      setTimeout(() => {
        window.location.href = 'student-profile.html';
      }, 700);
    });
  }
});
