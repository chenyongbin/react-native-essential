import { NavigationParams } from "react-navigation";
import SessionCacheProvider from "../../../../utils/sessionCache/@1.0";

/**
 * 导航记录
 */
interface PageRecord {
  /**
   * 页面名称
   */
  page: string;
  /**
   * 参数
   */
  params?: NavigationParams;
}

/**
 * 页面记录集合类
 */
export default class PageRecords {
  private SessionCache = SessionCacheProvider(this.appName);
  private AllPageRecordsCacheKey = 'react_navigation_3x_page_records';
  private AllPageRecords: PageRecord[] = [];

  constructor(private readonly appName: string) {
    this.getAllPageRecords = this.getAllPageRecords.bind(this);
    this.updateAllPageRecords = this.updateAllPageRecords.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.update = this.update.bind(this);
    this.findLast = this.findLast.bind(this);
    this.clear = this.clear.bind(this);

    this.getAllPageRecords();
  }

  private getAllPageRecords() {
    this.AllPageRecords =
      this.SessionCache.get<PageRecord[]>(this.AllPageRecordsCacheKey) || [];
  }

  private updateAllPageRecords() {
    this.SessionCache.set(this.AllPageRecordsCacheKey, this.AllPageRecords);
  }

  /**
   * 压入一条新的页面记录
   * @param page 页面名称
   * @param params 参数
   * @param backPage 指定的返回页面
   */
  push(page: string, params?: NavigationParams, backPage?: string) {
    if (!page) {
      return;
    }

    if (!!backPage && this.AllPageRecords.length > 0) {
      for (let i = this.AllPageRecords.length - 1; i >= 0; i--) {
        if (this.AllPageRecords[i].page == backPage) {
          this.AllPageRecords.length = i + 1;
          break;
        }
      }
    }
    this.AllPageRecords.push({ page, params });
    this.updateAllPageRecords();
  }

  /**
   * 弹出一条页面记录
   * @returns 返回弹出页面记录后最近的一条页面记录
   */
  pop(): PageRecord | undefined {
    this.AllPageRecords.pop();
    this.updateAllPageRecords();
    if (this.AllPageRecords.length > 0) {
      return this.AllPageRecords[this.AllPageRecords.length - 1];
    }
    return;
  }

  /**
   * 更新一条页面记录
   * @param page 页面名称
   * @param params 页面参数
   */
  update(page: string, params?: NavigationParams) {
    if (!params) {
      return;
    }

    const record = this.AllPageRecords.find((r) => r.page == page);
    if (record) {
      record.params = Object.assign({}, record.params, params);
    }
    this.updateAllPageRecords();
  }

  /**
   * 从后面查找一条页面记录
   * @param page 页面名称
   * @returns result 查找对象
   * @returns result.index 从后面查找到的索引
   * @returns result.total 页面记录数量
   * @returns result.record 当前页面记录对象
   */
  findLast(page: string) {
    let index = -1,
      record: PageRecord | undefined;

    if (page && this.AllPageRecords.length > 0) {
      const reversedRecords = [...this.AllPageRecords].reverse();
      const resultIndex = reversedRecords.findIndex((r) => r.page == page);
      if (resultIndex != -1) {
        index = resultIndex;
        record = reversedRecords[resultIndex];
      }
    }

    return { index, total: this.AllPageRecords.length, record };
  }

  /**
   * 清除所有页面记录
   */
  clear() {
    this.AllPageRecords = [];
    this.updateAllPageRecords();
  }
}
