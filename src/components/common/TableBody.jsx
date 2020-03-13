import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  //判断渲染属性还是元素函数
  renderCell = (item, column, pathProperty, funcProperty) => {
    //如果属性有值则返回属性的值，没有，则返回元素函数的结果 元素函数返回一个元素
    return _.get(item, column[pathProperty]) || column[funcProperty](item);
  };

  //计算td的key
  getTdKey = (item, column, idProperty, keyProperty) => {
    return item[idProperty] + column[keyProperty];
  };
  render() {
    const {
      items,
      columns,
      pathProperty,
      funcProperty,
      keyProperty,
      idProperty
    } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item[idProperty]}>
            {columns.map(column => (
              <td key={this.getTdKey(item, column, idProperty, keyProperty)}>
                {this.renderCell(item, column, pathProperty, funcProperty)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
