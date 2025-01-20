import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from '/components/layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Link from 'next/link';
import BFSCanvas from "@/components/BFSCanvas";
import DFSCanvas from "@/components/DFSCanvas";
import HCanvas from "@/components/HCanvas";

export default function tilemaps() {
  return (
    <div className="w-full flex-col pt-8 pr-4 pl-4">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex justify-center  text-stone-900 font-mono">
        <div className="w-1/3 flex flex-wrap flex-col">
          <Link href="/" className='text-stone-900 font-bold underline pb-4'>Return Home</Link>
          <p className="text-3xl">2D Tilemap Searches</p>
          <p className="">I made these demonstrations as a brush up on data structures and algorithms, and as a practice in using JavaScript componenets in NextJS.
          The "maze" is randomly generated and two random points are chosen as the start(red) and goal(purple) points. I really like random/procedural generation, so instead of preparing a guarenteed win I have the algorithm handle the case where a path cannot be found.
          This allows the generation to stay random, and even if a path is not found, the program still draws the search as it was calculated.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 place-items-center font-mono pt-4">
        <div class="bg-blue-300 text-stone-900 p-4">
          <p className="font-bold">Breadth First Search</p>
          <p>Breadth first search is my favorite to see demonstrations for. It may not always be the perfect search for a program, but it is almost always a decent option (as long as the graph can be stored in memory).</p>
          <BFSCanvas></BFSCanvas>
        </div>
        <div class="bg-blue-300 text-stone-900 p-4">
          <p className="font-bold">Depth First Search</p>
          <p>Depth first search is fun to watch in its pure form because it can be so chaotic and clearly inefficient. Luckily it turns into a fantastic search with some additions (ie. Dijkstra's, Depth Limited, IDDFS).</p>
          <DFSCanvas></DFSCanvas>
        </div>
        <div class="bg-blue-300 text-stone-900 p-4">
          <p className="font-bold">Breadth First Search with Heuristic</p>
          <p>This is an example of taking BFS and adding a simple heurisitic to give priority to better(closer to goal) solutions. For 2d maps like these, A+ would be an improvement over this example which only uses euclidean distance.</p>
          <HCanvas></HCanvas>
        </div>
      </div>
    </div>
  );
}