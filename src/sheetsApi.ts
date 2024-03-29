const getSheetsData = async (sheetID, sheetTab) => {
  const data = fetch(`https://opensheet.elk.sh/${sheetID}/${sheetTab}`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return [{}]; // the api doesn't return errors if the sheet url is incorrect so this would only be for js errors
    });

  return data;
};

module.exports = { getSheetsData };
