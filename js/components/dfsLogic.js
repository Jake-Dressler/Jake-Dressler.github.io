export const mapWidth = 50;
export const mapHeight = 50;

// Define tile types
export const TILE_TYPES = {
    GROUND: 0,
    WALL: 1,
    PLAYER: 2,
    GOAL: 3,
    PATH: 4,
    SEARCH: 5,
};

// Tile colors for each type
export const TILE_COLORS = {
    [TILE_TYPES.GROUND]: "#a9dfbf", // Light green for ground
    [TILE_TYPES.WALL]: "#566573",   // Gray for wall
    [TILE_TYPES.PLAYER]: "#ff0000",
    [TILE_TYPES.GOAL]: "#ff00ff",
    [TILE_TYPES.PATH]: "#fcce4e",
    [TILE_TYPES.SEARCH]: "#03ecfc",
};

// Generate a random tile map (10x10 grid)
export function generateTileMap() {
    const map = [];

    for (let y = 0; y < mapHeight; y++) {
        const row = [];
        for (let x = 0; x < mapWidth; x++) {
            // Make the perimeter walls
            if (y === 0 || y === mapHeight - 1 || x === 0 || x === mapWidth - 1) {
                row.push(TILE_TYPES.WALL);
            } else {
                // Randomly assign ground (0) or wall (1) for the interior tiles
                row.push(Math.random() < 0.65 ? TILE_TYPES.GROUND : TILE_TYPES.WALL);
            }
        }
        map.push(row);
    }
    return map;
}

// Check if a coordinate is valid within the tilemap
export function isValid(coords, tilemap) {
    const [y, x] = coords;
    return tilemap[y][x] === TILE_TYPES.GROUND || tilemap[y][x] === TILE_TYPES.GOAL;
}

// Get neighboring tiles
function getNeighborTiles(coords) {
    const [y, x] = coords;
    const directions = [
        [y - 1, x], // Up
        [y + 1, x], // Down
        [y, x - 1], // Left
        [y, x + 1], // Right
    ];
    return directions;
}

// Breadth-First Search to find the goal
export function findGoalDFS(startCoords, endCoords, tilemap) {
    // Clone the tilemap for visited tracking
    const visited = tilemap.map((row) => row.map(() => false));
    const queue = [];
    const allSearched = [];
    const parent = new Map(); // To keep track of the path
    parent.set(startCoords.toString(), null);

    // Mark the start node as visited and enqueue it
    visited[startCoords[0]][startCoords[1]] = true;
    queue.push(startCoords);

    // Iterate over the queue
    while (queue.length) {
        // Dequeue a cell from queue
        const curr = queue.pop();
        allSearched.push(curr);

        // Check if we reached the goal
        if (curr[0] == endCoords[0] && curr[1] == endCoords[1]) {
            // Reconstruct path from endCoords to startCoords
            const path = [];
            let step = curr;
            while (step) {
                path.push(step);
                step = parent.get(step.toString());
            }
            return { searched: allSearched, goalPath: path.reverse() }; // Reverse to get path from start to end
        }

        // Get adjacent cells and check if valid, push if valid
        const neighbors = getNeighborTiles(curr);
        for (let n of neighbors) {
            const [ny, nx] = n;
            if (!visited[ny][nx] && isValid(n, tilemap)) {
                visited[ny][nx] = true;
                queue.push(n);
                parent.set(n.toString(), curr);
            }
        }
    }

    // If we reach here, there's no path to the goal
    return { searched: allSearched, goalPath: null };
}
