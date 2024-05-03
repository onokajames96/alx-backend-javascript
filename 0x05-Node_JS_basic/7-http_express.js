const express = require('express');
const fs = require('fs').promises; // Use fs promises for async file operations

const app = express();
const PORT = 1245;
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

    const reportParts = [`Number of students: ${fileLines.length - 1}`]; // Total lines excluding header
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}.`);
      reportParts.push('List: ' + group.map(student => student.firstname).join(', '));
    }

    return reportParts.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (_, res) => {
  try {
    const report = await countStudents(DB_FILE);
    const responseText = 'This is the list of our students\n' + report;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(responseText));
    res.status(200).send(responseText);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : err.toString();
    const responseText = 'Error: ' + errorMessage;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(responseText));
    res.status(500).send(responseText);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
