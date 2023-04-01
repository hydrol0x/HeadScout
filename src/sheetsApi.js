const getSheetsData = async (sheetID, sheetTab) => {
  const res = await fetch(`https://opensheet.elk.sh/${sheetID}/${sheetTab}`);

  return res.json();
};

module.exports = { getSheetsData };
