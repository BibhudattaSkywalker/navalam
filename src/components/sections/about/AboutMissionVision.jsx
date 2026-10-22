import Image from "@/components/next/Image";
import { AssetImage } from "@/components/ui/AssetImage";
import { AboutContainer } from "@/components/sections/about/AboutContainer";
const missionText = "Our mission is to uplift underserved communities through education, healthcare, and sustainable livelihoods, fostering dignity, equality, and self-reliance while creating long-term social impact for children, families, and communities to thrive together with hope and compassion.  and self-reliance while creating long-term social impact for children, families, and communities to thrive together with hope and compassion.";
const bulletItems = [
    "Empowerment through education, action opportunity",
    "Compassion driven by care, empathy",
    "Empowerment through education, action, opportunity",
    "Compassion driven by care, empathy",
];
function CheckList({ items }) {
    return (<ul className="mt-8 space-y-[18px]">
      {items.map((item, i) => (<li key={i} className="flex items-center gap-2">
          <AssetImage src="/images/icons/correct-icon.svg" alt="" width={24} height={24} className="mt-0.5 h-6 w-6 shrink-0"/>
          <span className="max-w-[310px] font-[family-name:var(--font-poppins)] text-[15px]  leading-[18px] text-foreground">
            {item}
          </span>
        </li>))}
    </ul>);
}
function MissionImages() {
    return (<div className="relative h-[296px] w-full max-w-[475px] sm:h-[353px]">
      <div className="absolute left-0 top-0 h-[272px] w-[min(100%,373px)] overflow-hidden rounded-[19px] border-2 border-orange sm:h-[450px]">
        <Image src="/images/about/mission-main.jpg" alt="Volunteers helping community" fill className="object-cover" sizes="466px"/>
      </div>
      <div className="absolute top-0 left-0 z-10 h-[168px] w-[min(55%,205px)] overflow-hidden rounded-[19px] border-[10px] border-white shadow-[0px_4px_5.3px_0px_rgba(0,0,0,0.25)] sm:h-[300px] lg:w-[271px] lg:top-20 lg:left-72">
        <Image src="/images/about/mission-overlay.jpg" alt="Group of children smiling" fill className="object-cover" sizes="256px"/>
      </div>
    </div>);
}
function VisionImages() {
    return (<div className="relative ml-auto h-[296px] w-full max-w-[462px] sm:h-[400px]">
      <div className="absolute right-0 top-0 h-[296px] w-full overflow-hidden rounded-[19px] border-2 border-green sm:h-[400px]">
        <Image src="/images/about/story-main.jpg" alt="Community members together" fill className="object-cover" sizes="578px"/>
      </div>
      <div className="absolute bottom-10 right-[370px] z-10 h-[168px] w-[min(47%,216px)] shadow-[0px_4px_5.3px_0px_rgba(0,0,0,0.25)] overflow-hidden rounded-[19px] border-[10px] border-white sm:h-[301px] lg:w-[271px]">
        <Image src="/images/about/story-overlay.jpg" alt="Children raising hands" fill className="object-cover" sizes="270px"/>
      </div>
    </div>);
}
export function AboutMissionSection() {
    return (<section className="bg-white">
      <AboutContainer>
        <div className="grid items-start gap-10 lg:grid-cols-[600px_1fr] lg:gap-[80px]">
          <MissionImages />
          <div className="lg:pt-[23px]">
            <h2 className="font-[family-name:var(--font-poppins)] text-[29px] leading-[44px] text-green lg:text-[39px]">
              Our Mission
            </h2>
            <p className="mt-6 max-w-[591px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[21px] text-foreground">
              {missionText}
            </p>
            <CheckList items={bulletItems}/>
          </div>
        </div>
      </AboutContainer>
    </section>);
}
export function AboutVisionSection() {
    return (<section className="bg-white  ">
      <AboutContainer>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_462px] lg:gap-[127px]">
          <div className="">
            <h2 className="font-[family-name:var(--font-poppins)] text-[32px] leading-[44px] text-green lg:text-[39px]">
              Our Vision
            </h2>
            <p className="mt-6 max-w-[591px] font-[family-name:var(--font-poppins)] text-[15px] font-light leading-[21px] text-foreground">
              {missionText}
            </p>
            <CheckList items={bulletItems}/>
          </div>
          <VisionImages />
        </div>
      </AboutContainer>
    </section>);
}
