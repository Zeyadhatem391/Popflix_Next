import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import ImageCompany from "./ImageCompany";

type CompanyProps = {
  id: string;
};


const CompanyPages = ({ id }: CompanyProps) => {
  return (
    <div className="flex items-center justify-around my-10 px-4 md:px-10">
      {/* Left Arrow */}
      <LeftArrow  id={id}/>

      {/* Company Image */}
      <ImageCompany id={id}/>

      {/* Right Arrow */}
      <RightArrow id={id}/>
    </div>
  );
};

export default CompanyPages;
