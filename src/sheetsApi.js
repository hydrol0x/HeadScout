const { google } = require("googleapis");
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
const listMajors = async (auth) => {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "<TOKEN>",
    range: "A2:F3",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    return `row`;
  });
};

// authorize().then(listMajors).catch(console.error);
module.exports = listMajors;
