import { CaraTempel } from '@/components/sections/CaraTempel';
import { Hero } from '@/components/sections/Hero';
import { Penutup } from '@/components/sections/Penutup';
import { SetelahBertemu } from '@/components/sections/SetelahBertemu';
import { StatusPrototipe } from '@/components/sections/StatusPrototipe';
import { Story } from '@/components/sections/Story';
import { TanyaJawab } from '@/components/sections/TanyaJawab';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';

/** The whole landing: one story read from top to bottom, ending where it says it ends. */
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#isi">
        Langsung ke isi
      </a>
      <SiteHeader />
      <main id="isi" tabIndex={-1}>
        <Hero />
        <Story />
        <CaraTempel />
        <SetelahBertemu />
        <StatusPrototipe />
        <TanyaJawab />
        <Penutup />
      </main>
      <SiteFooter />
    </>
  );
}
