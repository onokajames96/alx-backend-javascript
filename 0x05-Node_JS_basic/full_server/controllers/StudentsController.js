import readDatabase from '../utils';

const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const dataPath = process.argv.length > 2 ? process.argv[2] : '';
      const studentGroups = await readDatabase(dataPath);

      const responseParts = ['This is the list of our students'];

      // A comparison function
      // order by alphabet
      const cmpFxn = (a, b) => a[0].localeCompare(b[0], 'en', { sensitivity: 'base' });

      for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
        responseParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      }

      response.status(200).send(responseParts.join('\n'));
    } catch (err) {
      response.status(500).send(err instanceof Error ? err.message : err.toString());
    }
  }

  static async getAllStudentsByMajor(request, response) {
    try {
      const dataPath = process.argv.length > 2 ? process.argv[2] : '';
      const { major } = request.params;

      if (!VALID_MAJORS.includes(major)) {
        response.status(400).send('Major parameter must be CS or SWE');
        return;
      }

      const studentGroups = await readDatabase(dataPath);

      let responseText = '';

      if (Object.prototype.hasOwnProperty.call(studentGroups, major)) {
        const group = studentGroups[major];
        responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
      }

      response.status(200).send(responseText);
    } catch (err) {
      response.status(500).send(err instanceof Error ? err.message : err.toString());
    }
  }
}

export default StudentsController;
