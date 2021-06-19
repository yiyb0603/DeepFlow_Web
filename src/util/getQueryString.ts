const getQueryString = (queryKey: string | string[]) => {
  const queries: Array<string | null> = [];
  const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
  
  if (Array.isArray(queryKey)) {
    for (const key of queryKey) {
      const query: string | null = searchParams.get(key);
      queries.push(query);
    }

    return queries;
  }

  const query: string | null = searchParams.get(queryKey);
  return query as string;
}

export default getQueryString;