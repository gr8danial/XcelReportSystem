// Get the complaint form and list elements
const complaintForm = document.getElementById('complaint-form');
const complaintList = document.getElementById('complaints-list');

// Get the service form and list elements
const serviceForm = document.getElementById('service-form');
const serviceList = document.getElementById('services-list');

// Add event listeners to the forms
complaintForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    place: document.getElementById('place').value,
    date: document.getElementById('date').value,
    user_name: document.getElementById('user_name').value,
    department: document.getElementById('department').value,
    position: document.getElementById('position').value,
    contact_number: document.getElementById('contact_number').value,
    email: document.getElementById('email').value,
    hardware_type: document.getElementById('hardware_type').value,
    hardware_serial_number: document.getElementById('hardware_serial_number').value,
    comments: document.getElementById('comments').value,
  };

  // Validate the form data
  if (!data.place || !data.date || !data.user_name) {
    alert('Please fill in all required fields');
    return;
  }

  // Send a POST request to the API
  fetch('/complaints', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Add the new complaint to the list
    const listItem = document.createElement('li');
    listItem.textContent = `Complaint ${data.id} created`;
    complaintList.appendChild(listItem);
    alert('Complaint created successfully!');
  })
  .catch((error) => {
    console.error(error);
    alert('Error creating complaint: ' + error.message);
  });
});

serviceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    complaint_id: document.getElementById('complaint_id').value,
    eu_name: document.getElementById('eu_name').value,
    job_card_number: document.getElementById('job_card_number').value,
    service_date: document.getElementById('service_date').value,
    service_time: document.getElementById('service_time').value,
    xisb_tech: document.getElementById('xisb_tech').value,
    status: document.getElementById('status').value,
    department: document.getElementById('department').value,
    location: document.getElementById('location').value,
    equipment_type: document.getElementById('equipment_type').value,
    model: document.getElementById('model').value,
    serial_number: document.getElementById('serial_number').value,
    nature_of_defect: document.getElementById('nature_of_defect').value,
    probable_cause: document.getElementById('probable_cause').value,
    action_taken: document.getElementById('action_taken').value,
    remarks: document.getElementById('remarks').value,
  };

  // Validate the form data
  if (!data.complaint_id || !data.eu_name || !data.job_card_number) {
    alert('Please fill in all required fields');
    return;
  }

  // Send a POST request to the API
  fetch('/servicereports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Add the new service to the list
    const listItem = document.createElement('li');
    listItem.textContent = `Service ${data.id} created`;
    serviceList.appendChild(listItem);
    // Display a success message
    alert('Service created successfully!');
  })
  .catch((error) => {
    console.error(error);
    // Display an error message
    alert('Error creating service: ' + error.message);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const complaintForm = document.getElementById('complaint-form');
  const serviceForm = document.getElementById('service-form');

  if (complaintForm) {
    complaintForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(complaintForm);
      const complaintData = Object.fromEntries(formData);

      fetch('/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      })
      .then(response => response.json())
      .then(data => {
        alert('Complaint submitted successfully!');
        complaintForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the complaint.');
      });
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(serviceForm);
      const serviceData = Object.fromEntries(formData);

      fetch('/servicereports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      })
      .then(response => response.json())
      .then(data => {
        alert('Service report submitted successfully!');
        serviceForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the service report.');
      });
    });
  }

  // Fetch and display complaints in admin page
  fetch('/allcomplaints')
    .then(response => response.json())
    .then(data => {
      const complaintsTableBody = document.querySelector('#complaints-table-body');
      data.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${complaint._id}</td>
          <td>${complaint.place}</td>
          <td>${complaint.date}</td>
          <td>${complaint.user_name}</td>
          <td>${complaint.department}</td>
          <td>${complaint.position}</td>
          <td>${complaint.contact_number}</td>
          <td>${complaint.email}</td>
          <td>${complaint.hardware_type}</td>
          <td>${complaint.hardware_serial_number}</td>
          <td>${complaint.comment}</td>
        `;
        complaintsTableBody.appendChild(row);
      });
    });

  // Fetch and display service reports in admin page
  fetch('/allservicereports')
    .then(response => response.json())
    .then(data => {
      const servicesTableBody = document.querySelector('#services-table-body');
      data.forEach(serviceReport => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${serviceReport._id}</td>
          <td>${serviceReport.complaint_id}</td>
          <td>${serviceReport.eu_name}</td>
          <td>${serviceReport.job_card_number}</td>
          <td>${serviceReport.service_date}</td>
          <td>${serviceReport.service_time}</td>
          <td>${serviceReport.xisb_tech}</td>
          <td>${serviceReport.status}</td>
          <td>${serviceReport.department}</td>
          <td>${serviceReport.location}</td>
          <td>${serviceReport.equipment_type}</td>
          <td>${serviceReport.model_serial_number}</td>
          <td>${serviceReport.nature_of_defect}</td>
          <td>${serviceReport.probable_cause}</td>
          <td>${serviceReport.action_taken}</td>
          <td>${serviceReport.remarks}</td>
          <td>${serviceReport.created_at}</td>
          <td>${serviceReport.updated_at}</td>
        `;
        servicesTableBody.appendChild(row);
      });
    });
});

