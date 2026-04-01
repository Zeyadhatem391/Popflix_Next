import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import ImageCompany from "./ImageCompany";

type CompanyProps = {
  id: string;
};

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const Companies = [
  {
    id: 174,
    name: "Warner Bros.",
    logo_path: "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
  },
  {
    id: 2,
    name: "Walt Disney Pictures",
    logo_path: "/rRGi5UkwvdOPSfr5Xf42RZUsYgd.png",
  },
  {
    id: 33,
    name: "Universal Pictures",
    logo_path: "/7AYU97zQGg3aV3sTiSV0NihOgXG.png",
  },
  {
    id: 198834,
    name: "Netflix",
    logo_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
  },
  {
    id: 9383,
    name: "Blue Sky Studios",
    logo_path: "/ppeMh4iZJQUMm1nAjRALeNhWDfU.png",
  },

  {
    id: 521,
    name: "DreamWorks Animation",
    logo_path: "/3DWUezrpxTqVMW4oKRhzfqJbULK.png",
  },
  {
    id: 854,
    name: "EuropaCorp",
    logo_path: "/62xhmot9suhsKEDXyJgV9XuydHQ.png",
  },
  {
    id: 79,
    name: "Village Roadshow Pictures",
    logo_path: "/uySsPIA5PdoccIUxomkw0cfgBjB.png",
  },
  {
    id: 1632,
    name: "Lionsgate",
    logo_path: "/45f1kfTY94FdfGMljWHTMocnSbm.png",
  },
  {
    id: 25120,
    name: "Warner Animation Group",
    logo_path: "/6RLMWBcGF2COzjjBORPUy705yF7.png",
  },
];

const CompanyPages = ({ id }: CompanyProps) => {
  return (
    <div className="flex items-center justify-around my-10 px-4 md:px-10">
      {/* Left Arrow */}
      <LeftArrow />

      {/* Company Image */}
      <ImageCompany id={id}/>

      {/* Right Arrow */}
      <RightArrow />
    </div>
  );
};

export default CompanyPages;
