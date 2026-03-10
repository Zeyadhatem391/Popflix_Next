import Back from "@/components/common/Back"
import FilterButton from "../genre/components/FilterButton"
import SortButton from "../genre/components/SortButton"
import InputSearch from "@/components/common/InputSearsh"


const ActorsPage = () => {
  return (
      <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">Actors</h2>
        <div className="flex items-center gap-3">
          <SortButton />
          <FilterButton />
        </div>
      </div>

      <div className="my-10">
        {/* <ActorsCards page={page} /> */}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        {/* <PaginationDemo page={page} setPage={changePage} /> */}
      </div>
    </div>
  )
}

export default ActorsPage