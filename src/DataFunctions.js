// functions for operating on robot data and for re-organizing it

const generateRobotArray = (sheetsData) => {
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

module.exports = { generateRobotArray };
