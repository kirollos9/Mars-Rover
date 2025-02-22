class Rover {
  constructor(x, y, direction, obstacles = []) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.directions = ["NORTH", "EAST", "SOUTH", "WEST"];
    this.obstacles = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));
  }

  move(commands) {
    for (let command of commands) {
      switch (command) {
        case 'F':
          if (!this.moveForward()) {
            return`(${this.x},${this.y}) ${this.direction} STOPPED`;
            // return { x: this.x, y: this.y, direction: this.direction, status: "STOPPED" };
          }
          break;
        case 'B':
          if (!this.moveBackward()) {
            return`(${this.x},${this.y}) ${this.direction} STOPPED`;
            // return { x: this.x, y: this.y, direction: this.direction, status: "STOPPED" };
          }
          break;
        case 'L':
          this.rotateLeft();
          break;
        case 'R':
          this.rotateRight();
          break;
        default:
          throw new Error(`Invalid command: ${command}`);
      }
    }
    return`(${this.x},${this.y}) ${this.direction}`;
    return { x: this.x, y: this.y, direction: this.direction, status: "Success" };
  }

  moveForward() {
    let newX = this.x;
    let newY = this.y;
    switch (this.direction) {
      case "NORTH":
        newY += 1;
        break;
      case "EAST":
        newX += 1;
        break;
      case "SOUTH":
        newY -= 1;
        break;
      case "WEST":
        newX -= 1;
        break;
      default:
        throw new Error(`Invalid direction: ${this.direction}`);
    }
    if (this.obstacles.has(`${newX},${newY}`)) {
      return false;
    }

    this.x = newX;
    this.y = newY;
    return true;
  }

  moveBackward() {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case "NORTH":
        newY -= 1;
        break;
      case "EAST":
        newX -= 1;
        break;
      case "SOUTH":
        newY += 1;
        break;
      case "WEST":
        newX += 1;
        break;
      default:
        throw new Error(`Invalid direction: ${this.direction}`);
    }

    if (this.obstacles.has(`${newX},${newY}`)) {
      return false;
    }

    this.x = newX;
    this.y = newY;
    return true;
  }

  rotateLeft() {
    const currentIndex = this.directions.indexOf(this.direction);
    let newIndex=(currentIndex - 1);
    if(newIndex<0){
      newIndex+=4;
    }

    this.direction = this.directions[newIndex];
  }

  rotateRight() {
    const currentIndex = this.directions.indexOf(this.direction);
    let newIndex = (currentIndex + 1);
    if(newIndex>3){
      newIndex=newIndex-4;
    }

    this.direction = this.directions[newIndex];
  }
}
  
//Test cases
console.log(new Rover(0, 0, "NORTH").move("FFRFF"));// (2,2) EAST                    
console.log(new Rover(2, 2, "EAST").move("BBL")); //  (0,2) NORTH                                               
console.log(new Rover(0, 0, "NORTH", [[0, 2]]).move("FFF")); //(0,1) NORTH STOPPED
console.log(new Rover(0, 0, "NORTH", [[0, 1], [1, 0]]).move("FRF")); // (0,0) NORTH STOPPED
console.log(new Rover(0, 0, "EAST").move("FLFFRFF")); // (3,2) EAST
console.log(new Rover(3, 3, "WEST").move("BBRRBB")); // (3,3) EAST
console.log(new Rover(0, 0, "NORTH").move("RRRR"));// (0,0) NORTH
console.log(new Rover(0, 0, "NORTH", [[0, 1], [0, 2]]).move("FFFF")); // (0,0) NORTH STOPPED
console.log(new Rover(0, 0, "NORTH").move("FRFFLFBLBRFFF")); // (3,4) NORTH
console.log(new Rover(0, 0, "SOUTH", [[0, -1]]).move("B"));  // (0,1) SOUTH
console.log(new Rover(1, 1, "EAST", [[3, 1]]).move("FFFF"));  // (2,1) EAST STOPPED
console.log(new Rover(5, 5, "NORTH", [[5, 6]]).move("F"));// (5,5) NORTH STOPPED
console.log(new Rover(0, 0, "WEST").move("B")); // (1,0) WEST
console.log(new Rover(3, 3, "SOUTH").move("FFRRFF"));// // (3,3) NORTH
console.log(new Rover(0, 0, "EAST").move("FFLFFRFFF")); // (5,2) EAST
console.log(new Rover(0, 0, "NORTH", [[0, 3]]).move("FFF")); // (0,2) NORTH STOPPED
console.log(new Rover(0, 0, "NORTH", [[1, 1]]).move("RFFLFF")); // (2,2) NORTH
console.log(new Rover(0, 0, "NORTH").move("BBRBB")); // (-2,-2) EAST
console.log(new Rover(2, 2, "WEST", [[1, 2]]).move("FFF")); // (2,2) WEST STOPPED
console.log(new Rover(0, 0, "SOUTH", [[0, -2]]).move("BB")); // (0,2) SOUTH
console.log(new Rover(6, 4, "NORTH",[[1,4], [3,5], [7,4]] ).move("FLFFFRFLB"));// (4,5) WEST STOPPED
