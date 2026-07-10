import { useEffect } from "react";
import { fetch_Imgs, fetch_Vids } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
    const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  useEffect(
      function () {

        if (!query) return
          const getData = async () => {
            try {
                dispatch(setLoading())
                let data = [];
              if (activeTab === "Photos") {
                let res = await fetch_Imgs(query);
                data = res.results.map((item) => ({
                  id: item.id,
                  type: "photo",
                  title: item.alt_description,
                  thumbnail: item.urls.small,
                  src: item.urls.full,
                }));
              } else if (activeTab === "Videos") {
                let res = await fetch_Vids(query);
                data = res.videos.map((item) => ({
                  id: item.id,
                  type: "video",
                  title: item.user.name || "Video",
                  thumbnail: item.image,
                  src: item.video_files[0]?.link,
                  url: item.video_files[0]?.link,
                }));
              }
              console.log(data)
              dispatch(setResults(data))
            } catch (err) {
                dispatch(setError(err.message))
            }
          }
      getData();
    },
    [query, activeTab, dispatch],
  );

  if (error) return <h1>Error While Loading...</h1>;
  if (loading) return <h1>Loading...</h1>;

    return (
        <div className='flex justify-between w-full flex-wrap gap-6 overflow-auto px-10'>
            {results.map((item, idx) => {
                return <div key={idx}>
                    <ResultCard item={item} />
                </div>
            })}
        </div>
    )
};

export default ResultGrid;
