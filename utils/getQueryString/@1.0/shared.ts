export interface getQueryStringLike {
  /**
   * 获取url中的参数值（只支持在web版中使用）
   * @param name 参数名称
   * @param isUrl 该参数是否是url值，如果是的话，会对齐采用不用解码函数
   * @returns 参数值
   */
  (name: string, isUrl?: boolean): string;
}
