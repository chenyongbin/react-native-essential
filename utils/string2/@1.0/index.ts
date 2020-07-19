/**
 * @author chenyongbin
 * @date 2020-06-01
 * @description 字符串类型类模块
 */

const convertToString = (value: any) => {
  if (value && typeof value.toString == "function") {
    return value.toString();
  } else {
    return value + "";
  }
};

/**
 * 字符串类型类，封装了一些字符串的方法
 */
class String2Class {
  private value: string = "";

  constructor(value: any) {
    this.value = convertToString(value);

    this.val = this.val.bind(this);
    this.padStart = this.padStart.bind(this);
    this.padEnd = this.padEnd.bind(this);
    this.contains = this.contains.bind(this);
    this.beautify = this.beautify.bind(this);
    this.equals = this.equals.bind(this);
  }

  /**
   * 获取转换后的字符串
   */
  val() {
    return this.value;
  }

  /**
   * 补全字符串左侧
   * @param targetLength 当前字符串需要填充到的目标长度
   * @param padString 填充字符串，默认值是空格
   */
  padStart(targetLength: number, padString: string = " ") {
    try {
      return this.value.padStart(targetLength, padString);
    } catch (error) {}

    if (this.value.length >= targetLength) {
      return this.value;
    }

    let newValue = this.value;
    while (newValue.length < targetLength) {
      newValue = padString + newValue;
    }
    return newValue;
  }

  /**
   * 补全字符串右侧
   * @param targetLength 当前字符串需要填充到的目标长度
   * @param padString 填充字符串，默认值是空格
   */
  padEnd(targetLength: number, padString: string = " ") {
    try {
      return this.value.padEnd(targetLength, padString);
    } catch (error) {}

    if (this.value.length >= targetLength) {
      return this.value;
    }

    let newValue = this.value;
    while (newValue.length < targetLength) {
      newValue = newValue + padString;
    }
    return newValue;
  }

  /**
   * 是否包含目标字符串
   * @param targetString 目标字符串
   */
  contains(targetString: string) {
    return this.value.indexOf(targetString) != -1;
  }

  /**
   * 美化字符串为日期或时间格式
   * "163908  -> 16:39:08"
   * "63908  -> 06:39:08"
   * "20150507  -> 2015-05-07"
   */
  beautify(divider: ":" | "-" | "/") {
    if (!this.value) {
      return "";
    }

    let val: string = this.value + "";
    if (divider == ":") {
      if (val.length == 5 || val.length == 7) {
        val = "0" + val;
      }
      val =
        val.substr(0, 2) +
        divider +
        val.substr(2, 2) +
        divider +
        val.substr(4, 2);
    } else {
      val =
        val.substr(0, 4) +
        divider +
        val.substr(4, 2) +
        divider +
        val.substr(6, 2);
    }

    return val;
  }

  /**
   * 和另一个字符串比较
   * @param anotherStr 另一个字符串
   * @param ignoreCase 是否忽略大小写，默认不忽略
   */
  equals(anotherStr: string, ignoreCase = false) {
    if (ignoreCase) {
      return this.value.toLowerCase() == anotherStr.toLowerCase();
    }
    return this.value == anotherStr;
  }
}

export { String2Class };
export default (value: any) => new String2Class(value);
