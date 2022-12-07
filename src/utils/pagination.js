export const getPaginationArray = (totalSize, sizePerPage) => {
    const noOfPages = Math.ceil(totalSize / sizePerPage);
    const array = [];
    let pageNo = 1;
    while (pageNo <= noOfPages) {
      array.push(pageNo);
      pageNo = pageNo + 1;
    }
    return array;
  };