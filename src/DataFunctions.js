// functions for operating on robot data and for re-organizing it

const isNumeric = (num) => {
  return !isNaN(num);
};

const generateRobotObj = (sheetsData) => {
  /**
   * Generate an object that is grouped based on each robot
   * i.e {... 'teamNumber': { `ROBOT DATA` } ...}
   */
  let robots = {};
  sheetsData.map((matchData) => {
    const teamNum = matchData["Team Number"];
    const matchNum = matchData["Match Number"];
    // teamNum not `undefined` and is not yet in robots array
    if (!(teamNum in robots) && teamNum) {
      robots[teamNum] = { [matchNum]: matchData };
    } else {
      robots[teamNum][matchNum] = matchData;
    }
  });
  return robots;
};

// TODO:
/** function that takes in robots object and calculates the totals for each robot
 * i.e Loop over each value and increment a counter or add it up so you get total cones scored top, total parks, etc.
 *   */
const generateRobotTotals = (robotsObj) => {
  // TODO for later: figure out how to detect values like charge station that have multiple
  // possible string values. Then create separate entry for each
  // i.e Auto Charge Station (Bottom): 10
  // Auto Charge Station (Top): 5
  // etc
  // there is probably a better way of doing this than a triple-nested for loop
  robotTotals = {};
  for (const [teamNum, robot] of Object.entries(robotsObj)) {
    if (!(teamNum in robotTotals) && teamNum) {
      robotTotals[teamNum] = {};
    }
    for (const [matchNum, match] of Object.entries(robot)) {
      delete match["Match Number"];
      delete match["Team Number"];
      for (const [dataName, data] of Object.entries(match)) {
        // Numerical -> add the value to the stored value
        if (dataName in robotTotals[teamNum]) {
          if (isNumeric(data)) {
            robotTotals[teamNum][dataName] += parseInt(data);
          } else {
            robotTotals[teamNum][dataName] += 1;
          }
        } else {
          if (isNumeric(data)) {
            robotTotals[teamNum][dataName] = parseInt(data);
          } else {
            robotTotals[teamNum][dataName] = 1;
          }
        }
      }
    }
  }
  return robotTotals;
};

const generateRobotAverages = (robotsObj) => {
  const numMatches = Object.keys(robotsObj).length;

  const robotTotals = generateRobotTotals(robotsObj);
  // const robotAverages = Object.keys(robotTotals).map((key) => {
  //   return [key];
  // });
  const robotAverages = Object.fromEntries(
    Object.entries(robotTotals).map(([key, total]) => [key, total / numMatches])
  );

  return robotAverages;
};

module.exports = {
  generateRobotObj,
  generateRobotTotals,
  generateRobotAverages,
};
