"use client";

import React, { useEffect, useRef, useState } from "react";
import { TILE_TYPES, TILE_COLORS, generateTileMap, findGoalH, mapHeight, mapWidth } from "/components/hLogic";

const HCanvas = () => {
  const canvasRef = useRef(null);
  const [tileMap, setTileMap] = useState([]);
  const [playerCoords, setPlayerCoords] = useState([0, 0]);
  const [goalCoords, setGoalCoords] = useState([0, 0]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize map and positions
    const map = generateTileMap();
    setTileMap(map);

    const randomPlayer = [Math.floor(Math.random() * (mapHeight - 2)), Math.floor(Math.random() * (mapWidth - 2))];
    const randomGoal = [Math.floor(Math.random() * (mapHeight - 2)), Math.floor(Math.random() * (mapWidth - 2))];
    setPlayerCoords(randomPlayer);
    setGoalCoords(randomGoal);

    // Draw initial map
    drawTileMap(ctx, map, randomPlayer, randomGoal);
  }, []);

  const drawTileMap = (ctx, map, player, goal) => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        ctx.fillStyle = TILE_COLORS[map[y][x]];
        ctx.fillRect(x * 10, y * 10, 10, 10);
      }
    }

    // Mark player and goal
    ctx.fillStyle = TILE_COLORS[TILE_TYPES.PLAYER];
    ctx.fillRect(player[1] * 10, player[0] * 10, 10, 10);

    ctx.fillStyle = TILE_COLORS[TILE_TYPES.GOAL];
    ctx.fillRect(goal[1] * 10, goal[0] * 10, 10, 10);
  };

  const drawPathWithDelay = async (ctx, path, color, delay) => {
    for (const [y, x] of path) {
      ctx.fillStyle = color;
      ctx.fillRect(x * 10, y * 10, 10, 10);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };

  const drawPaths = async () => {
    if (!canvasRef.current || isDrawing) return;

    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");

    const { searched, goalPath } = findGoalH(playerCoords, goalCoords, tileMap);

    if (!goalPath) {
      alert("no path found for heuristic");
      await drawPathWithDelay(ctx, searched, TILE_COLORS[TILE_TYPES.SEARCH], 5);
    } else {
      await drawPathWithDelay(ctx, searched, TILE_COLORS[TILE_TYPES.SEARCH], 5);
      await drawPathWithDelay(ctx, goalPath, TILE_COLORS[TILE_TYPES.PATH], 50);
    }

    setIsDrawing(false);
  };

  return (
    <div>
      <canvas ref={canvasRef} id="hCanvas" width={500} height={500} />
      <button onClick={drawPaths} disabled={isDrawing}>
        {isDrawing ? "Drawing..." : "Start Visualization"}
      </button>
    </div>
  );
};

export default HCanvas;
