const http = require('http');
const fs = require('fs').promises; // Use fs promises for async file operations

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = async (dataPath) => {
  if (!dataPath) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const fileLines = data.trim().split('\n');

    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map((propName, idx) => ({
        [propName]: studentPropValues[idx]
      }));

      studentGroups[field].push(Object.assign({}, ...studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce((total, group) => total + group.length, 0);
    const reportParts = [`Number of students: ${totalStudents}`];

    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}.`);
      reportParts.push('List: ' + group.map(student => student.firstname).join(', '));
    }

    return reportParts.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

const handleRequest = async (req, res) => {
  try {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      res.setHeader('Content-Type', 'text/plain');

      try {
        const report = await countStudents(DB_FILE);
        const responseText = 'This is the list of our students\n' + report;
        res.statusCode = 200;
        res.end(responseText);
      } catch (err) {
        res.statusCode = 500;
        res.end('Error: ' + err.message);
      }
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } catch (err) {
    console.error('Internal Server Error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

app.on('request', handleRequest);

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});

module.exports = app;
