// Get form element
const form = document.getElementById("employeeForm");

// Validate before submission
form.addEventListener("submit", (e) => {
  // Get form data
  const name = form.name.value.trim();
  const iqama = form.iqama.value.trim();
  const iqamaExpiry = form.iqamaExpiry.value;
  const passport = form.passport.value.trim();
  const jobTitle = form.jobTitle.value.trim();
  const qualification = form.qualification.value.trim();
  const experience = form.experience.value.trim();
  const contact = form.contact.value.trim();

  // Get file inputs
  const cv = form.cv.files[0];
  const passportCopy = form.passportCopy.files[0];
  const iqamaCopy = form.iqamaCopy.files[0];
  const medical = form.medical.files[0];
  const insurance = form.insurance.files[0];
  const abshir = form.abshir.files[0];

  // Validation checks
  if (!name) { alert("Please enter full name."); e.preventDefault(); return; }
  if (!iqama) { alert("Please enter Iqama number."); e.preventDefault(); return; }
  if (!iqamaExpiry) { alert("Please select Iqama expiry date."); e.preventDefault(); return; }
  if (!passport) { alert("Please enter Passport number."); e.preventDefault(); return; }
  if (!jobTitle) { alert("Please enter Job Title."); e.preventDefault(); return; }
  if (!qualification) { alert("Please enter Qualification."); e.preventDefault(); return; }
  if (!experience || isNaN(experience) || experience < 0) { alert("Please enter valid Experience."); e.preventDefault(); return; }
  if (!contact || !/^\d{10,15}$/.test(contact)) { alert("Please enter valid Contact Number (10-15 digits)."); e.preventDefault(); return; }

  // File validations
  if (!cv) { alert("Please upload CV."); e.preventDefault(); return; }
  if (!passportCopy) { alert("Please upload Passport Copy."); e.preventDefault(); return; }
  if (!iqamaCopy) { alert("Please upload Iqama Copy."); e.preventDefault(); return; }
  if (!medical) { alert("Please upload Medical Certificate."); e.preventDefault(); return; }
  if (!insurance) { alert("Please upload Insurance Copy."); e.preventDefault(); return; }
  if (!abshir) { alert("Please upload Abshir Copy."); e.preventDefault(); return; }

  // Optional: check file size (< 5MB)
  const files = [cv, passportCopy, iqamaCopy, medical, insurance, abshir];
  for (let f of files) {
    if (f.size > 5 * 1024 * 1024) { // 5MB
      alert(`File ${f.name} exceeds 5MB. Please upload a smaller file.`);
      e.preventDefault();
      return;
    }
  }
});
