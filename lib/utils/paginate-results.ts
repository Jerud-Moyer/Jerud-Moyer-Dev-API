interface PaginationParameters {
  page: number;
  limit: number;
}

type PaginationResults = {
  next?: PaginationParameters,
  previous?: PaginationParameters,
  results?: any[]
}


export default function(
  initial: any[], 
  page: number, 
  limit: number
): PaginationResults {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: PaginationResults = {};

  if(endIndex < initial.length) {
    results.next = {
      page: page + 1,
      limit
    };
  }

  if(startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit
    };
  }

  results.results = initial.slice(startIndex, endIndex);

  return results;

};
