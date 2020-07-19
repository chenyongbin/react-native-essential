/**
 * @author chenyongbin
 * @date 2020-1-15
 * @description 数值类模块
 */

/**
 * 是否是数值
 * @param value 目标值
 */
const isNumber = (value: any) => !isNaN(value);

/**
 * 计算方法
 * @param operand1 操作数1
 * @param operand2 操作数2
 * @param operator 操作符
 */
const caculate = (
  operand1: number,
  operator: "add" | "sub" | "mul" | "div",
  operand2: number
) => {
  if (!isNumber(operand1) || !isNumber(operand2)) {
    return NaN;
  }

  let d = 0,
    result = 0,
    isFinite = true;
  const [, digit1] = (operand1 + "").split("."),
    [, digit2] = (operand2 + "").split("."),
    d1 = digit1 ? digit1.length : 0,
    d2 = digit2 ? digit2.length : 0;

  let newOperand1 = Number((operand1 + "").replace(".", "")),
    newOperand2 = Number((operand2 + "").replace(".", ""));

  if (operator == "add" || operator == "sub") {
    d = Math.max(d1, d2);
    if (d1 != d2) {
      const min = Math.min(d1, d2),
        diff = Math.pow(10, d - min);
      d1 == min && (newOperand1 *= diff);
      d2 == min && (newOperand2 *= diff);
    }
  } else if (operator == "div") {
    d = Math.abs(d1 - d2);
  } else {
    d = d1 + d2;
  }

  switch (operator) {
    case "add":
      result = newOperand1 + newOperand2;
      isFinite = Number.isFinite(result);
      !isFinite && (result = operand1 + operand2);
      break;
    case "sub":
      result = newOperand1 - newOperand2;
      isFinite = Number.isFinite(result);
      !isFinite && (result = operand1 - operand2);
      break;
    case "mul":
      result = newOperand1 * newOperand2;
      isFinite = Number.isFinite(result);
      !isFinite && (result = operand1 * operand2);
      break;
    case "div":
      result = newOperand1 / newOperand2;
      isFinite = Number.isFinite(result);
      !isFinite && (result = operand1 / operand2);
      break;
  }

  return isFinite ? result / Math.pow(10, d) : result;
};

/**
 * 格式化小数点位数
 * @param value 目标数值
 * @param digits 小数点位数
 */
const convertToFixed = (value: number, digits: number) => {
  if (!isNumber(value)) {
    return "";
  }

  let isNegative = value < 0,
    parsedValue = parseInt(
      (Math.abs(value) * Math.pow(10, digits + 1)).toString()
    );
  const str = parsedValue + "",
    len = str.length,
    significantValue = Number(str.substr(0, len - 1)),
    lastValue = Number(str.substr(len - 1));

  if (significantValue == 0 && lastValue == 0) {
    isNegative = false;
  }

  parsedValue = lastValue >= 5 ? significantValue + 1 : significantValue;
  parsedValue = parsedValue / Math.pow(10, digits);

  return `${isNegative ? "-" : ""}${parsedValue.toFixed(digits)}`;
};

/**
 * 将数字按照千分位分隔
 * @param value 目标数值
 * @param digits 保留小数点位数，默认为2
 */
const convertToThousands = (value: number, digits = 2) => {
  if (!isNumber(value)) {
    return "";
  }

  const valueStr = convertToFixed(value, digits);
  if (value < 1000) {
    return valueStr;
  }

  const [val, d] = (valueStr + "").split(".");
  return val.replace(/\d(?=(\d{3})+$)/g, "$&,") + `${d ? "." : ""}${d}`;
};

/**
 * 数值类型类，自定义了加、减、乘、除和千分位、获取万、保留小数点等方法
 */
class Number2Class {
  private value: number;

  constructor(value: any) {
    this.value = Number(value);

    this.val = this.val.bind(this);
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
    this.mul = this.mul.bind(this);
    this.div = this.div.bind(this);
    this.toFixed = this.toFixed.bind(this);
    this.toThousands = this.toThousands.bind(this);
    this.toWan = this.toWan.bind(this);
  }

  /**
   * 返回结果
   */
  val() {
    return this.value;
  }

  /**
   * 加法
   * @param anotherValue 另一个数值
   */
  add(anotherValue: number) {
    this.value = caculate(this.value, "add", anotherValue);
    return this;
  }

  /**
   * 减法
   * @param anotherValue 另一个数值
   */
  sub(anotherValue: number) {
    this.value = caculate(this.value, "sub", anotherValue);
    return this;
  }

  /**
   * 乘法
   * @param anotherValue 另一个数值
   */
  mul(anotherValue: number) {
    this.value = caculate(this.value, "mul", anotherValue);
    return this;
  }

  /**
   * 除法
   * @param anotherValue 另一个数值
   */
  div(anotherValue: number) {
    this.value = caculate(this.value, "div", anotherValue);
    return this;
  }

  /**
   * 格式化数据
   * @param precision 精度
   * @param withRound 是否使用四舍五入，默认使用
   */
  toFixed(digits: number) {
    return convertToFixed(this.value, digits);
  }

  /**
   * 获取千分位格式数值
   * @param digits 保留小数点位数，默认为2
   */
  toThousands(digits = 2) {
    return convertToThousands(this.value, digits);
  }

  /**
   * 获取单位是万的数字
   * @param digits 保留小数点位数，默认为2
   * @param toThousands 转换后的数字是否要带千分位，默认不带
   */
  toWan(digits = 2, toThousands = false) {
    if (!isNumber(this.value)) {
      return "";
    }

    const val = convertToFixed(this.value / 10000, digits);
    return toThousands ? convertToThousands(Number(val), digits) : val;
  }
}

export { Number2Class };
export default (value: any) => new Number2Class(value);
