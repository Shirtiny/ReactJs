import _ from "lodash";

const paginate = (array, currentPage, pageSize) => {
  //偏移量（起始index） = （当前页码 -1） * 页面容量
  const offset = (currentPage - 1) * pageSize;
  //从数组转为lodash对象 从起始index分离数组 然后挑选出pageSize个 然后转为数组
  return _(array)
    .slice(offset)
    .take(pageSize)
    .value();
};

export default paginate;
