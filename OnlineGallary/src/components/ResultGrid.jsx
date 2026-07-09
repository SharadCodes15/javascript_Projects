import React, { useEffect } from "react";
import { fetch_Imgs, fetch_Vids } from "../api/mediaApi";
import {
  setQuery,
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const ResultGrid = () => {
    const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  useEffect(
      function () {
          const getData = async () => {
            try{
                dispatch(setLoading())
                let data;
              if (activeTab == "Photos") {
                let res = await fetch_Imgs("cat");
                data = res.results.map((item) => ({
                  id: item.id,
                  type: "photo",
                  title: item.alt_description,
                  thumbnail: item.urls.small,
                  src: item.urls.full
                }));
              }
              if (activeTab == "Videos") {
                let res = await fetch_Vids("cat");
                  data = res.results.map((item) => ({
                      id: item.id,
                      type: "Video",
                      title: item.user.name || "Video",
                      thumbnail: item.image,
                      src: item.video_files[0].link
                }));
              }
              console.log(data)
              dispatch(setResults(data))
            }catch(err){
                dispatch(setError(err))
                
            }
            }
      getData();
    },
    [query, activeTab],
  );

  return <></>;
};

export default ResultGrid;
