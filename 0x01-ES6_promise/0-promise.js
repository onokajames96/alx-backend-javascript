export default function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    const data = false;

    if (data) {
      reject();
    } else {
      resolve();
    }
  });
}
