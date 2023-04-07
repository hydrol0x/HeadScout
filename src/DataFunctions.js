// functions for operating on robot data and for re-organizing it

const generateRobotArray = (sheetsData) => {
  /**
   * Generate an object that is grouped based on each robot
   * i.e {... 'teamNumber': { `ROBOT DATA` } ...}
   */
  console.log("generating...");
  console.log(`lenght of sheets data ${sheetsData.length}`);
  let robots = {};
  sheetsData.map((matchData) => {
    const teamNum = matchData["Team Number"];
    // teamNum not `undefined` and is not yet in robots array
    if (!(teamNum in robots) && teamNum) {
      robots[teamNum] = 0;
    } else {
      robots[teamNum] += 1;
    }
  });
  return robots;
};

module.exports = { generateRobotArray };
