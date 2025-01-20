const mapWidth = 100;
const mapHeight = 100;

// Define tile types
export const TILE_TYPES = {
    GROUND: 0,
    WALL: 1,
    PLAYER: 2,
    GOAL: 3,
    PATH: 4,
    SEARCH: 5
};

// Tile colors for each type
export const TILE_COLORS = {
    [TILE_TYPES.GROUND]: "#a9dfbf", // Light green for ground
    [TILE_TYPES.WALL]: "#566573",   // Gray for wall
    [TILE_TYPES.PLAYER]: "#ff0000",
    [TILE_TYPES.GOAL]: "#ff00ff",
    [TILE_TYPES.PATH]: "#fcce4e",
    [TILE_TYPES.SEARCH]: "#03ecfc"
};

// Sample tile map (10x10 grid)
export function generateTileMap() {
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

export function setMap(map){
    tileMap = map;
}

export function isValid(coords, tilemap) {
    return (
      tilemap[coords[0]][coords[1]] === TILE_TYPES.GROUND ||
      tilemap[coords[0]][coords[1]] === TILE_TYPES.GOAL
    );
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

export function findGoalBFS(startCoords, endCoords, tilemap){
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
