import { Ajakan } from '@/components/sections/Ajakan';
import { CaraKerja } from '@/components/sections/CaraKerja';
import { Cerita } from '@/components/sections/Cerita';
import { Fitur } from '@/components/sections/Fitur';
import { Hero } from '@/components/sections/Hero';
import { Masalah } from '@/components/sections/Masalah';
import { TanyaJawab } from '@/components/sections/TanyaJawab';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';

/**
 * The whole landing, read top to bottom: what Patepang is, the problem, how it works, what it
 * does after a meeting, situations it is made for, questions, and how to start.
 */
export default function HomePage() {
  return (
    <>
      {/*
       * The top of the page, where the mark and "Kembali ke atas" lead. It is not the header: a
       * header that stays at the top of the window is always in view, so the browser would not
       * scroll back to it. Empty, so it takes no space; it takes focus, and Tab goes on from there.
       */}
      <div id="atas" tabIndex={-1} />
      <a className="skip-link" href="#isi">
        Langsung ke isi
      </a>
      <SiteHeader />
      <main id="isi" tabIndex={-1}>
        <Hero />
        <Masalah />
        <CaraKerja />
        <Fitur />
        <Cerita />
        <TanyaJawab />
        <Ajakan />
      </main>
      <SiteFooter />
    </>
  );
}
