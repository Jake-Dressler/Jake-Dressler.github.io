'use client'
import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import GridLayout from "react-grid-layout";

class jakeGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "stack", x: 0, y: 0, w: 4, h: 6, minW: 4, maxW: 6, minH: 6, maxH: 8 },
      { i: "langs", x: 0, y: 4, w: 4, h: 9, minW: 4, maxW: 6, minH: 9, maxH: 12 },
      { i: "textGame", x: 0, y: 8, w: 4, h: 6, minW: 4, maxW: 6, minH: 6, maxH: 8 },
      { i: "tiles", x: 8, y: 8, w: 4, h: 11, minW: 4, maxW: 6, minH: 11, maxH: 13 },
      { i: "lincoln", x: 4, y: 0, w: 4, h: 12, minW: 4, maxW: 6, minH: 12, maxH: 14},
      { i: "dibujar", x: 4, y: 4, w: 4, h: 6, minW: 4, maxW: 6, minH: 6, maxH: 8 },
      { i: "resume", x: 8, y: 0, w: 4, h: 3, minW: 4, maxW: 6, minH: 3, maxH: 4 },
      { i: "email", x: 8, y: 2, w: 4, h: 3, minW: 4, maxW: 6, minH: 3, maxH: 4 },
      { i: "linkedin", x: 8, y: 4, w: 4, h: 3, minW: 4, maxW: 6, minH: 3, maxH: 4 },
      { i: "github", x: 8, y: 6, w: 4, h: 3, minW: 4, maxW: 6, minH: 3, maxH: 4 }
    ];
    return (
    <div className="justify-center items-center w-1/2 h-auto py-8">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        //width={Math.min(1200, window.innerWidth * 0.9)}
        width={1200}
        draggableCancel=".no-drag"
      >
        <div key="stack" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>Tech Stack for this site</h1>
          </div>
          <div className='justify-center flex pt-4'>
            <Image priority src="/images/HTML5.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/JavaScript.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/react.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
          </div>
          <div className='justify-center flex pt-2'>
            <Image priority src="/images/next-js.svg" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/tailwind.svg" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
          </div>
        </div>

        <div key="langs" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center text-stone-900 font-mono font-bold text-2xl pl-4 pr-4'>
            <h1 className='pl-4 pr-4'>My Favorite</h1>
            <h1 className='pl-4 pr-4'>Technologies</h1>
          </div>
          <div className='justify-center flex pt-4'>
            <Image priority src="/images/java.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/python.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/wordpress.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
          </div>
          <div className='justify-center flex pt-2'>
            <Image priority src="/images/sql.png" className='mr-1 ml-1' height={60} width={140} alt=""></Image>
            <Image priority src="/images/php.png" className='mr-1 ml-1' height={60} width={140} alt=""></Image>
          </div>
          <div className='justify-center flex pt-4'>
            <Image priority src="/images/docker.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/github.svg" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
            <Image priority src="/images/placeholder_icon.png" className='mr-1 ml-1' height={75} width={75} alt=""></Image>
          </div>
        </div>

        <div key="textGame" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>Text Based Game</h1>
            <p className='text-stone-900 font-mono pt-2 pr-2 pl-2'>A JS based text game in its early stages featuring random world generation. Built from scratch with a modular design focusing on flexibility using OOP.</p>
          </div>
          <Link href="https://jake-dressler.github.io/textGamePreAlpha/" className='no-drag text-stone-900 font-mono font-bold underline pt-2 pr-2 pl-2'>Check it out</Link>
        </div>

        <div key="tiles" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center text-stone-900 font-mono'>
            <h1 className='font-bold text-2xl'>Tilemap Searches</h1>
            <Image priority src="/images/tilemap.PNG" className='mt-3' height={250} width={250} alt=""></Image>
            <p className='pt-2 pr-2 pl-2'>BFS, DFS, and Heuristic searches performed on a 2d tilemap</p>
          </div> 
            <Link href="/tilemaps" className='no-drag text-stone-900 font-mono font-bold underline pt-2 pr-2 pl-2'>Check it out</Link>
        </div>

        <div key="lincoln" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>Lincoln Cemetery</h1>
            <Image priority src="/images/lincoln.png" className='mt-3' height={250} width={250} alt=""></Image>
            <p className='text-stone-900 font-mono pt-2 pr-2 pl-2'>My senior capstone group project. An interactive map to preserve African American history for the historic Lincoln Cemetery in Gettysburg PA.</p>
          </div>
          <Link href="https://lcmap.sites.gettysburg.edu/" className='no-drag text-stone-900 font-mono font-bold underline pt-2 pr-2 pl-2'>Check it out</Link>
        </div>

        <div key="dibujar" className='bg-blue-300 rounded bg-opacity-70'>
          <div className='place-items-center'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>Dibujar Don Quixote</h1>
            <p className='text-stone-900 font-mono pt-2 pr-2 pl-2'>A final project for one of my spanish classes. This site features a basic vector based drawing tool which allows users to submit drawings which are then stored on the server.</p>
          </div>
          <Link href="https://dibujardq.sites.gettysburg.edu/index.html" className='no-drag text-stone-900 font-mono font-bold underline pt-2 pr-2 pl-2'>Check it out</Link>
        </div>

        <div key="resume" className='bg-blue-300 rounded bg-opacity-70 flex items-center justify-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>My resume: </h1>
            <a className='no-drag' href='/files/DresslerResume.pdf'>
              <Image priority src="/images/resume.svg" className='no-drag' height={50} width={50} alt=""></Image>
            </a>
          </div>
        </div>

        <div key="email" className='bg-blue-300 rounded bg-opacity-70 flex items-center justify-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl'>Email me: </h1>
            <a className='no-drag' href='mailto:jakedressler.jd@yahoo.com'>
              <Image priority src="/images/email.svg" className='no-drag' height={75} width={75} alt=""></Image>
            </a>
          </div>
        </div>

        <div key="linkedin" className='bg-blue-300 rounded bg-opacity-70 flex items-center justify-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl '>My LinkedIn: </h1>
            <a className='no-drag' href='https://www.linkedin.com/in/jake-dressler-049ab2276'>
              <Image priority src="/images/linkedin.png" className='no-drag' height={75} width={75} alt=""></Image>
            </a>
          </div>
        </div>

        <div key="github" className='bg-blue-300 rounded bg-opacity-70 flex items-center justify-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-stone-900 font-mono font-bold text-2xl '>My GitHub: </h1>
            <a className='no-drag' href='https://github.com/Jake-Dressler'>
              <Image priority src="/images/github.svg" className='no-drag' height={75} width={75} alt=""></Image>
            </a>
          </div>
        </div>

      </GridLayout>
    </div>
    );
  }
}

export default jakeGrid;