const canvas = document.getElementById("bfsCanvas");
const ctx = canvas.getContext("2d");

// Tile and map settings
const tileSize = 10;
const mapWidth = 120;
const mapHeight = 120;


// const DIRECTIONS = {
//     RIGHT,
//     LEFT,
//     UP,
//     DOWN,
// };
const xOffset = {
    RIGHT: 1,
    LEFT:  -1,
    UP:    0,
    DOWN:  0,
};
const yOffset = {
    RIGHT: 0,
    LEFT:  0,
    UP:    -1,
    DOWN:  1,
};

// Define tile types
const TILE_TYPES = {
    GROUND: 0,
    WALL: 1,
    PLAYER: 2,
    GOAL: 3,
    PATH: 4,
    SEARCH: 5
};

// Tile colors for each type
const TILE_COLORS = {
    [TILE_TYPES.GROUND]: "#a9dfbf", // Light green for ground
    [TILE_TYPES.WALL]: "#566573",   // Gray for wall
    [TILE_TYPES.PLAYER]: "#ff0000",
    [TILE_TYPES.GOAL]: "#ff00ff",
    [TILE_TYPES.PATH]: "#fcce4e",
    [TILE_TYPES.SEARCH]: "#03ecfc"
};

// Sample tile map (10x10 grid)
function generateTileMap() {
    const map = [];

    for (let y = 0; y < mapHeight; y++) {
        const row = [];
        for (let x = 0; x < mapWidth; x++) {
            // Make the perimeter walls
            if (y === 0 || y === mapHeight - 1 || x === 0 || x === mapWidth - 1) {
                row.push(TILE_TYPES.WALL);
            } else {
                // Randomly assign ground (0) or water (1) for the interior tiles
                row.push(Math.random() < 0.65 ? TILE_TYPES.GROUND : TILE_TYPES.WALL);
            }
        }
        map.push(row);
    }
    return map;
}

// Function to draw the tile map
function drawTileMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            // Get tile type and color
            const tileType = tileMap[y][x];
            const tileColor = TILE_COLORS[tileType];

            // Draw tile
            ctx.fillStyle = tileColor;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

//determine if loaction is valid ie, ie not a wall
function isValid(coords){
    return tileMap[coords[0]][coords[1]] == TILE_TYPES.GROUND || tileMap[coords[0]][coords[1]] == TILE_TYPES.GOAL;
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getNeighborTiles(coords){
    var neighbors = []
    for (dir in xOffset){
        var neighborX = coords[0] + xOffset[dir];
        var neighborY = coords[1] + yOffset[dir];
        var neighbor = [neighborX, neighborY];
        neighbors.push(neighbor);
    }
    return neighbors;
}

function findGoalBFS(startCoords, endCoords){
    const visited = structuredClone(tileMap);
    visited.forEach(row => {
        row.fill(false)
    });
    const queue = []; 
    const allSearched = [];
    const parent = new Map(); // To keep track of the path
    parent.set(startCoords.toString(), null);
    
    // Mark the source node as visited 
    // and enqueue it
    visited[startCoords[0]][startCoords[1]] = true;
    queue.push(startCoords);

    // Iterate over the queue
    while (queue.length) {
    
        // Dequeue a cell from queue and print it
        const curr = queue.shift();
        allSearched.push(curr);
        if(curr[0] === endCoords[0] && curr[1] === endCoords[1]){
            // Reconstruct path from endCoords to startCoords
            const path = [];
            let step = curr;
            while (step) {
                path.push(step);
                step = parent.get(step.toString());
            }
            return {searched: allSearched, goalPath: path.reverse()}; // Reverse to get the path from start to end
        }
        // Get adjacent cells and check if valid, push if valid
        const neighbors = getNeighborTiles(curr);
        for (let n of neighbors) {
            //allSearched.push(n);
            if (!visited[n[0]][n[1]] && isValid(n)) {
                visited[n[0]][n[1]] = true;
                queue.push(n);
                parent.set(n.toString(), curr);
            }
        }
    }
    return {searched: allSearched, goalPath: null};
}

function drawGoalPath(coords){
    tileMap[coords[0]][coords[1]] = TILE_TYPES.PATH;
    drawTileMap();
}
function drawSearchPath(coords){
    tileMap[coords[0]][coords[1]] = TILE_TYPES.SEARCH;
    drawTileMap();
}
function setMap(map){
    tileMap = map;
}
//generate the grid
let tileMap = generateTileMap();
const originalMap = structuredClone(tileMap);

//create a random point to be player and one to be the goal
playerCoords = [0,0];
while(!isValid(playerCoords)){
    playerCoords[0] = getRandomInt(1, mapWidth);
    playerCoords[1] = getRandomInt(1, mapHeight);
}
goalCoords = [0,0];
while(!isValid(goalCoords) && goalCoords != playerCoords){
    goalCoords[0] = getRandomInt(1, mapWidth);
    goalCoords[1] = getRandomInt(1, mapHeight);
}

//set the tile map to reflect the player and goal
tileMap[playerCoords[0]][playerCoords[1]] = TILE_TYPES.PLAYER;
tileMap[goalCoords[0]][goalCoords[1]] = TILE_TYPES.GOAL;
originalMap[playerCoords[0]][playerCoords[1]] = TILE_TYPES.PLAYER;
originalMap[goalCoords[0]][goalCoords[1]] = TILE_TYPES.GOAL;

async function drawPathWithDelay(path, drawFunction, delay) {
    for (let i = 0; i < path.length; i++) {
        drawFunction(path[i]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

async function drawPaths() {
    const { searched, goalPath } = findGoalBFS(playerCoords, goalCoords);

    // If goalPath is null, it means no path was found
    if (!goalPath) {
        console.log("No path found");
        await drawPathWithDelay(searched, drawSearchPath, 5); // Show only the searched path
        await setMap(originalMap);
        await drawTileMap();
        return; // Exit early as there's no path to the goal
    }
    
    // Remove the first and last elements if needed
    //searched.shift();
    searched.pop();
    goalPath.shift();
    goalPath.pop();

    // Draw the searched path first, then the goal path after it finishes
    await drawPathWithDelay(searched, drawSearchPath, 5);
    await setMap(originalMap);
    await drawPathWithDelay(goalPath, drawGoalPath, 60);
}

//drawPaths();

