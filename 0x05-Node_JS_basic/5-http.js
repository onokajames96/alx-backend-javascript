const http = require('http'); // Import the 'http' module
const fs = require('fs');

const PORT = 1245;

// Create an HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    // Handle root path ('/')
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Handle /students path
    const dbFilePath = process.argv[2]; // Get database file path from command line argument
    if (!dbFilePath) {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 500;
      res.end('Error: Database file path not provided');
      return;
    }

    // Read the database file asynchronously
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 500;
        res.end('Error: Cannot read database file');
        return;
      }

      // Process the student data
      const reportParts = [];
      const fileLines = data.trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');

      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }

        const studentEntries = studentPropNames.map((propName, idx) => ({
          [propName]: studentPropValues[idx]
        }));

        studentGroups[field].push(Object.assign({}, ...studentEntries));
      }

      reportParts.push(`Number of students: ${fileLines.length - 1}`); // Total lines excluding header
      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push(`Number of students in ${field}: ${group.length}.`);
        reportParts.push('List: ' + group.map(student => student.firstname).join(', '));
      }

      // Prepare response text
      const responseText = 'This is the list of our students\n' + reportParts.join('\n');

      // Send response
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(responseText);
    });
  } else {
    // Handle unknown paths
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Start listening on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
module.exports = app;
