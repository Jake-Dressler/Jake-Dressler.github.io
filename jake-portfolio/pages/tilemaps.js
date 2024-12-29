import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from '/components/layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Link from 'next/link';

export default function tilemaps() {
  return (
    <div className="w-full flex flex-col items-center pt-8">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p>hello</p>
      <Link href="/" className='text-stone-900 font-mono font-bold underline pt-2 pr-2 pl-2'>home</Link>

    </div>
  );
}