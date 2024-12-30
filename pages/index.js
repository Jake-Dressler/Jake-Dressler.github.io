import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from '../components/layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import JakeGrid from '../components/jake-grid';
import Intro from '../components/intro'
import '../styles/global.css';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center pt-8">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Intro></Intro>
        <JakeGrid></JakeGrid>
    </div>
  );
}
