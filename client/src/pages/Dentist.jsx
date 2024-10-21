import { Faq, FinalSection, Footer, GlobalNavbar, Path, TimeLineSection } from "@/components";
import DentistHero from "@/components/DentistHero";


export default function Dentist() {

  return (
    <div>
      <GlobalNavbar/>
      <DentistHero actor="dentist"/>
      <TimeLineSection actor="dentist" />
      <Path actor="dentist"/>
      <FinalSection actor="dentist"/>
      <Faq/>
      <Footer/>
    </div>
  );
}
