import { useQuery } from "@tanstack/react-query"
import { GetMoviesCompany } from "../api/GetMoviesCompany"

const useGetMoviesCompany = (companyId: number) => {
    return useQuery({
        queryKey: ["movies-company", companyId],
        queryFn: () => GetMoviesCompany(companyId),

    })
}

export default useGetMoviesCompany