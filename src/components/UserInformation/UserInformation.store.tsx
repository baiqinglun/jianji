import { useEffect, useState } from "react";

import { UserType } from "@/constants";
import { useSqlite } from "@/providers/SqliteProvider";
import dayjs from "dayjs";

type ContentInformationProp = {
  notionCount: number;
  tagCount: number;
  dayCount: number;
};

const useUserInformation = () => {
  const [userInformation, setUserInformation] = useState<UserType>();
  const [contentInformation, setContentInformation] =
    useState<ContentInformationProp>();
  const { exeSql } = useSqlite();

  const tagRename = () => {};

  useEffect(() => {
    exeSql("searchUser", []).then(searchUserRes => {
      setUserInformation(searchUserRes[0]?.rows[0]);
    });
  }, []);

  useEffect(() => {
    getNotionCount();
  }, []);

  const getNotionCount = async () => {
    const searchNotionCountPromise = exeSql("searchTagCount", []);
    const searchTagCountPromise = exeSql("searchTagCount", []);

    const [searchNotionCountRes, searchTagCountRes] = await Promise.all([
      searchNotionCountPromise,
      searchTagCountPromise,
    ]);

    console.log(searchNotionCountRes[0].rows[0]["COUNT(*)"]);
    console.log(searchTagCountRes[0].rows[0]["COUNT(*)"]);

    const dayCount = dayjs(userInformation?.create_time).diff(
      dayjs().valueOf(),
      "days",
    );
    console.log(dayCount);

    setContentInformation({
      notionCount: searchNotionCountRes[0].rows[0]["COUNT(*)"],
      tagCount: searchTagCountRes[0].rows[0]["COUNT(*)"],
      dayCount,
    });
  };

  return {
    tagRename,
    userInformation,
    contentInformation,
  };
};

export default useUserInformation;
