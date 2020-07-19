/**
 * @author chenyongbin
 * @date 2020-06-04
 * @description 生成指定长度的随机字符串
 */

const charCodeArray = [
    ...[...Array(10).fill(0)].map((v, i) => 48 + i), // 0-9
    ...[...Array(26).fill(0)].map((v, i) => 65 + i), // A-Z
    ...[...Array(26).fill(0)].map((v, i) => 97 + i), // a-z
  ],
  charCodeCount = charCodeArray.length;

/**
 * 生成指定长度的随机字符串
 * @param length 指定的长度，默认是32位
 */
export default (length = 32) => {
  if (length <= 0) {
    return "";
  }

  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(
      String.fromCharCode(
        charCodeArray[Math.floor(Math.random() * charCodeCount)]
      )
    );
  }
  return result.join("");
};
