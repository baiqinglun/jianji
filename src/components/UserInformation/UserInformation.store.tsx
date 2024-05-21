import { useEffect } from "react";
import { useData } from "@/providers/DataProvider";

const useUserInformation = () => {
  const {
    getUserInformation,
    getNotionInformation,
    userInformation,
    contentInformation,
  } = useData();

  const tagRename = () => {};

  useEffect(() => {
    getUserInformation();
    getNotionInformation();
  }, []);

  return {
    tagRename,
    userInformation,
    getUserInformation,
    contentInformation,
  };
};

export default useUserInformation;
