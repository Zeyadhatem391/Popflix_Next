"use client";
import { useParams } from "next/navigation";
import CompanyPages from "../components/CompanyPages";
import CompanyMovies from "../components/CompanyMovies";

const CompanyPage = () => {
  const params = useParams();
  const id = params.companyId as string;

  return (
    <div className="my-10 mx-7">
      <CompanyPages id={id} />
      <CompanyMovies id={id} />
    </div>
  );
};

export default CompanyPage;
