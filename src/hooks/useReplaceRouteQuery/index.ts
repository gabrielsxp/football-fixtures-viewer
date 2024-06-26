"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ITerm {
  [x: string]: string;
}

/*
  useReplaceRouteQuery
  @params blacklist
    - on each 'handleQueryReplacement' call, removes each reference of 
    any present param inside the blacklist
*/

const useReplaceRouteQuery = (blacklist: string[] = []) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleQueryReplacement = (term: ITerm, action: "set" | "delete") => {
    const params = new URLSearchParams(searchParams);
    const [key, value] = Object.entries(term)[0];
    if (action === "set") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (!!blacklist.length) {
      blacklist.forEach((param) => {
        params.delete(param);
      });
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    handleQueryReplacement,
  };
};

export default useReplaceRouteQuery;
