const express = require('express');
const app = express();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the complaints page
app.get('/complaints', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'complaints.html'));
});

// Route to serve the services page
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

// Route to serve the admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Complaints API endpoint
app.post('/complaints', (req, res) => {
  const data = req.body;
  // Validate the form data
  if (!data.place || !data.date || !data.user_name) {
    res.status(400).send({ message: 'Please fill in all required fields' });
    return;
  }
  // Insert data into the database
  const query = `INSERT INTO complaints (place, date, user_name, department, position, contact_number, email, hardware_type, hardware_serial_number, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [
    data.place,
    data.date,
    data.user_name,
    data.department,
    data.position,
    data.contact_number,
    data.email,
    data.hardware_type,
    data.hardware_serial_number,
    data.comments
  ], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating complaint' });
    } else {
      res.send({ id: results.insertId });
    }
  });
  complaint.id = Date.now(); // Generate a unique ID for the complaint
  console.log('Complaint received:', complaint);
  res.status(201).json(complaint);
});


// Services API endpoint
app.post('/servicereports', (req, res) => {
  const data = req.body;
  // Validate the form data
  if (!data.complaint_id || !data.eu_name || !data.job_card_number) {
    res.status(400).send({ message: 'Please fill in all required fields' });
    return;
  }
  // Insert data into the database
  const query = `INSERT INTO servicereports (complaint_id, eu_name, job_card_number, service_date, service_time, xisb_tech, status, department, location, equipment_type, model, serial_number, nature_of_defect, probable_cause, action_taken, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [
    data.complaint_id,
    data.eu_name,
    data.job_card_number,
    data.service_date,
    data.service_time,
    data.xisb_tech,
    data.status,
    data.department,
    data.location,
    data.equipment_type,
    data.model,
    data.serial_number,
    data.nature_of_defect,
    data.probable_cause,
    data.action_taken,
    data.remarks
  ], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating service' });
    } else {
      res.send({ id: results.insertId });
    }
  }); serviceReport.id = Date.now(); // Generate a unique ID for the service report
  console.log('Service report received:', serviceReport);
  res.status(201).json(serviceReport);
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});