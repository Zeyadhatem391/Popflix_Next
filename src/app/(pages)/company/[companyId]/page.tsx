"use client";
import { useParams } from "next/navigation";
import CompanyPages from "../components/CompanyPages";

const CompanyPage = () => {
  const params = useParams();
  const id = params.companyId as string;

  return (
    <>
      <CompanyPages id={id}/>
    </>
  );
};

export default CompanyPage;
