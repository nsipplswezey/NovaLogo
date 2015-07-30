//constants
var pi = Math.PI;
var piOver2 = Math.PI/2;
var negativePiOver2 = -Math.PI/2;
var negativePi = -Math.PI;
var pi2 = 2 * Math.PI;

//utilities
var normalize = function(theta) {
  var ntheta = theta % pi2;
  if (ntheta > Math.PI) ntheta -= pi2;
  else if (ntheta <= -Math.PI) ntheta += pi2;
  return ntheta;
};

var radiansToDegrees = function(theta){
  return theta * 180 / Math.PI;
};


var degreesToRadians = function(degrees){
  return degrees * Math.PI / 180;
};

var checkInBounds = function(potentialX,potentialY,environment){

  if(potentialX > environment.cols - 1 || potentialX < 0){
    return false;
  } else if(potentialY > environment.rows - 1 || potentialY < 0) {
    return false;
  } else{
    return true;
  }
}

var subtractHeadings = function(heading1,heading2){
  return normalize(heading1-heading2);
}


//primitives
var forward = function(distance,agent){

  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  var normalizedTheta = normalize(agentTheta);

  var dx = distance * COS(normalizedTheta);
  var dy = distance * SIN(normalizedTheta);

  var nextX = agentX + dx;
  var nextY = agentY + dy;

  //distance is within rounding error
  //precision can be added
  //print(DISTANCE(currentX,currentY,nextX,nextY));

  agent.MOVE(nextX,nextY);
};


var back = function(distance,agent){

  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //to go back, we add pi to theta
  //this can create values greater than 2*pi
  //so we normalize

  var backTheta = agentTheta + Math.PI;

  var normalizedTheta = normalize(backTheta);

  var dx = distance * COS(normalizedTheta);
  var dy = distance * SIN(normalizedTheta);

  var nextX = agentX + dx;
  var nextY = agentY + dy;

  //distance is within rounding error
  //precision can be added
  //print(DISTANCE(currentX,currentY,nextX,nextY));

  agent.MOVE(nextX,nextY);
};



var jump = function(distance,agent){
  //interesting
  //the implementation of forward and jump are the same in Nova
  //netlogo introduces the idea of forward as an interpolation
  //between two points, where the agent exists in the intermediate points
  //while moving forward

  //and jump just puts them at the next position
  //so technically... jump and move are the same in nova
  //a move, is just done with a smaller step interval.

}


var left = function(degreeChange,agent){

  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //take the current heading
  //convert to degree
  //add degreeChange
  //convert to radian
  //normalize
  //pass to set heading
  var agentDegreeHeading = radiansToDegrees(agentTheta);
  var newAgentDegreeHeading = agentDegreeHeading - degreeChange;
  var newTheta = normalize(degreesToRadians(newAgentDegreeHeading));

  agent.SET_HEADING(newTheta);
}

var right = function(degreeChange,agent){

  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //take the current heading
  //convert to degree
  //add degreeChange
  //convert to radian
  //normalize
  //pass to set heading
  var agentDegreeHeading = radiansToDegrees(agentTheta);
  var newAgentDegreeHeading = agentDegreeHeading + degreeChange;
  var newTheta = normalize(degreesToRadians(newAgentDegreeHeading));

  agent.SET_HEADING(newTheta);
}

var checkCanMove = function(agent){

}

var randomXCoord = function(environment){
  return environment.cols * Math.random();
}

var randomYCoord = function(environment){
  return environment.rows * Math.random();
}

var distanceToAgentOrCell = function(callingAgent,target){

  var callingAgentLocation = callingAgent.LOCATION();
  //check if target is agent or cell
  //agents have a myId property
  //cells don't!
  //a potentially brittle check, but it works for now

  if(target.myId){
    //agent case
    //get the two agents locations
    var targetLocation = target.LOCATION();

    //return the distance between
    return DISTANCE(callingAgentLocation.x,callingAgentLocation.y,targetLocation.x,targetLocation.y);
  } else if(target.coords){
    //cell case
    //returns the distance to the center of the cell
    var cellCenterX = target.coords.col + 0.5
    var cellCenterY = target.coords.row + 0.5

    return DISTANCE(callingAgentLocation.x,callingAgentLocation.y,cellCenterX,cellCenterY)

  } else {
    //throw an error
    //not sure how throw appropriate erros in Nova's javascript
    print("your target is not a cell or agent");
    return null;
  }

}

var patchAhead = function(distance, agent, environment){

  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //we use theta and distance to find a coordinate
  var normalizedTheta = normalize(agentTheta);


  var dx = distance * COS(normalizedTheta);
  var dy = distance * SIN(normalizedTheta);

  var nextX = agentX + dx;
  var nextY = agentY + dy;

  //we use that coordinate to find and return a cell

  //TODO: Check for whether this coordinate is inbounds or not
  //Needs a better way to pass in the environment that Super
  //This will break in a confusing way if not called by an agent
  if(checkInBounds(nextY,nextX,environment)){
    return agent.CELL(nextY,nextX);
  } else {
    return null;
  }
}

var patchAt = function(dx,dy,agent){

  //the agent theta,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  var targetX = agentX + dx;
  var targetY = agentY + dy;

  return agent.CELL(targetY,targetX);
}

var patchAtHeadingAndDistance = function(theta,distance,agent){

  //the agent theta,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  var normalizedTheta = normalize(theta);

  var dx = distance * COS(normalizedTheta);
  var dy = distance * SIN(normalizedTheta);

  var targetX = agentX + dx;
  var targetY = agentY + dy;

  return agent.CELL(targetY,targetX);
}

var patchHere = function(agent){

  //the agent theta,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  return agent.CELL(agentY,agentX);

}

var patchLeftAndAhead = function(degreeChange,distance,agent){
  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //take the current heading
  //convert to degree
  //add degreeChange
  //convert to radian
  //normalize
  //pass to set heading
  var agentDegreeHeading = radiansToDegrees(agentTheta);
  var newAgentDegreeHeading = agentDegreeHeading - degreeChange;
  var newTheta = normalize(degreesToRadians(newAgentDegreeHeading));

  var dx = distance * COS(newTheta);
  var dy = distance * SIN(newTheta);

  var targetX = agentX + dx;
  var targetY = agentY + dy;

  return agent.CELL(targetY,targetX)
}

var patchRightAndAhead = function(degreeChange,distance,agent){
  //agent has two thetas
  //one theta is the theta of the model
  //the other theta is the theta of the agent

  //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
  var agentTheta = agent.LOCATION().theta;
  var agentX = agent.LOCATION().x;
  var agentY = agent.LOCATION().y;

  //the model theta,y,x, which is a stock value
  var modelTheta = agent.theta;
  var modelX = agent.x;
  var modelY = agent.y;

  //take the current heading
  //convert to degree
  //add degreeChange
  //convert to radian
  //normalize
  //pass to set heading
  var agentDegreeHeading = radiansToDegrees(agentTheta);
  var newAgentDegreeHeading = agentDegreeHeading + degreeChange;
  var newTheta = normalize(degreesToRadians(newAgentDegreeHeading));

  var dx = distance * COS(newTheta);
  var dy = distance * SIN(newTheta);

  var targetX = agentX + dx;
  var targetY = agentY + dy;


  return agent.CELL(targetY,targetX);
}


var towards = function(callingAgentOrCell, targetAgent){

  //target agent has two potentially different theta,x,y
  var targetAgentTheta = targetAgent.LOCATION().theta;
  var targetAgentX = targetAgent.LOCATION().x;
  var targetAgentY = targetAgent.LOCATION().y;

  //model theta,x,y
  var targetAgentModelTheta = targetAgent.theta;
  var targetAgentModelX = targetAgent.x;
  var targetAgentModelY = targetAgent.y;

  print(callingAgentOrCell);
  //check if target is agent or cell
  //agents have a myId property
  //cells don't!
  //a potentially brittle check, but it works for now

  if(callingAgentOrCell.myId){

    //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
    var agentTheta = callingAgentOrCell.LOCATION().theta;
    var agentX = callingAgentOrCell.LOCATION().x;
    var agentY = callingAgentOrCell.LOCATION().y;

    //the model theta,x,y, which is a stock value
    var modelTheta = callingAgentOrCell.theta;
    var modelX = callingAgentOrCell.x;
    var modelY = callingAgentOrCell.y;

    var deltaY = targetAgentY - agentY;
    var deltaX = targetAgentX - agentX;

    //in radians
    var thetaTowardsTarget = normalize(Math.atan(deltaY / deltaX));

    return thetaTowardsTarget;

  } else if(callingAgentOrCell.coords){
    //cell is calling
    var cellX = callingAgentOrCell.coords.col + 5;
    var cellY = callingAgentOrCell.coords.row + 5;

    var deltaY = targetAgentY - cellY;
    var deltaX = targetAgentX - cellX;

    //in radians
    var thetaTowardsTarget = normalize(Math.atan(deltaY / deltaX));

    return thetaTowardsTarget;

  } else {
    //throw an error
    //not sure how throw appropriate erros in Nova's javascript
    //TODO: catch the error where the target is not an agent
    //TODO: Catch it earlier and exit the function.
    print("your caller is not a cell or agent");
    return null;
  }

}

var towardsXY = function(callingAgentOrCell, targetX, targetY){

  //TODO: Test and fix. Currently throws two unexpected errors when used in layoutCircle method
  //Currently the left half of the circle faces in. The right half faces out.
  //May have to do with implementaiton of towardsXY
  //Probably a simple trig mistake


  //check if target is agent or cell
  //agents have a myId property
  //cells don't!
  //a potentially brittle check, but it works for now


  print(callingAgentOrCell.myId + "calling");

  if(callingAgentOrCell.myId){


    //the agent theta,,x,y which is determined by SET_THETA and MOVE(x,y)
    var agentTheta = callingAgentOrCell.LOCATION().theta;
    var agentX = callingAgentOrCell.LOCATION().x;
    var agentY = callingAgentOrCell.LOCATION().y;

    //the model theta,x,y, which is a stock value
    var modelTheta = callingAgentOrCell.theta;
    var modelX = callingAgentOrCell.x;
    var modelY = callingAgentOrCell.y;

    var deltaY = targetY - agentY;
    var deltaX = targetX - agentX;

    //in radians
    var thetaTowardsTarget = normalize(Math.atan(deltaY / deltaX));

    return thetaTowardsTarget;

  } else if(callingAgentOrCell.coords){
    //cell is calling
    var cellX = callingAgentOrCell.coords.col + 5;
    var cellY = callingAgentOrCell.coords.row + 5;

    var deltaY = targetY - cellY;
    var deltaX = targetX - cellX;

    //in radians
    var thetaTowardsTarget = normalize(Math.atan(deltaY / deltaX));

    return thetaTowardsTarget;

  } else {
    //throw an error
    //not sure how throw appropriate erros in Nova's javascript
    //TODO: Catch it earlier and exit the function.
    print("your caller is not a cell or agent");
    return null;
  }
}



layoutCircle = function(cell, radius, agentVector){
  //TODO: Fix theta setting.
  //Currently the left half of the circle faces in. The right half faces out.
  //May have to do with implementaiton of towardsXY

  var circleCenterX = cell.coords.col + 0.5;
  var circleCenterY = cell.coords.row + 0.5;
  var agentX;
  var agentY;
  var agent;
  var agentCount = agentVector.length;
  var agentHeading;

  //circleCenterX + radius * Math.cos(2*this.agent.id/this.agentvector.count*Math.PI);
  //circleCenterY + radius * Math.sin(2*this.agent.id/this.agentvector.count*Math.PI);

  for(var i = 0; i < agentCount; i++){

    agent = agentVector[i];

    //equation for points on a circle
    agentX = circleCenterX + radius * Math.cos(2*agent.myId/agentCount*Math.PI);
    agentY = circleCenterY + radius * Math.sin(2*agent.myId/agentCount*Math.PI);

    //set initial value for agent
    //in this implementation, the function can only be called during init
    //agent.init_x = agentX;
    //agent.init_y = agentY;

    //alternately they can be moved to these locations
    agent.MOVE(agentX,agentY);

    //print(agent.myId);
    //print(agentCount);
    //set the heading away from the center point
    //away is just towards +Math.PI and normalized
    agentHeading = normalize(towardsXY(agent,circleCenterX,circleCenterY) + Math.PI)
    agentVector[i].SET_HEADING(agentHeading);
  }
}
