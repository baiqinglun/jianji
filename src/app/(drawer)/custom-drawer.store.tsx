import { useEffect, useState } from "react";
import { useSqlite } from "@/providers/SqliteProvider";

const useCustomDrawer = () => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const { exeSql } = useSqlite();
  const [tags, setTags] = useState([]);

  const tagRename = () => {};

  useEffect(() => {
    const getData = async () => {
      await exeSql("searchAllTags", []).then(searchAllTagsRes => {
        //   setTags(searchAllTagsRes[0].rows);
        console.log(searchAllTagsRes[0].rows);
      });
    };
    getData();
    console.log("挂载");
    console.log(tags);
  }, []);
  console.log(tags);

  return {
    renameModal,
    setRenameModal,
    exeSql,
    tags,
    setTags,
    tagRename,
  };
};

export default useCustomDrawer;
