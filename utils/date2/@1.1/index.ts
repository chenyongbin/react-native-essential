import String2 from "../../string2/@1.0";

/**
 * 计算在日期基础上增加若干月后的新日期
 * @param date 开始日期
 * @param n 增加的月数
 */
const addMonths = (date: Date, n: number) => {
  if (n == 0) {
    return date;
  }

  let i = 0,
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  while (i < Math.abs(n)) {
    if (n > 0) {
      if (month == 12) {
        month = 1;
        year++;
      } else {
        month++;
      }
    } else {
      if (month == 1) {
        month = 12;
        year--;
      } else {
        month--;
      }
    }
    i++;
  }

  if (day > 28) {
    if (month == 2) {
      day = year % 4 == 0 ? 29 : 28;
    } else if ([4, 6, 9, 11].indexOf(month) != -1) {
      day = day == 31 ? 30 : day;
    }
  }

  date.setFullYear(year, month - 1, day);
  return date;
};

/**
 * 日期类型类
 */
class Date2Class {
  /**
   * 判断目标参数是否是日期类型
   * @param target 目标参数
   */
  static isDate(target: any) {
    return (
      !!target &&
      Object.prototype.toString.call(target) == "[object Date]" &&
      !isNaN(target.getTime())
    );
  }

  private value: Date | undefined;

  constructor(value: any) {
    if (!!value) {
      try {
        if (typeof value == "string") {
          // iOS系统中需要将日期中的横杠连字符改为斜杠，否则无法转换
          value = value.replace(/-/g, "/");
        }

        const date = new Date(value);
        if (Date2Class.isDate(date)) {
          this.value = date;
        }
      } catch (error) {}
    }

    this.val = this.val.bind(this);
    this.clone = this.clone.bind(this);
    this.format = this.format.bind(this);
    this.addMilliSeconds = this.addMilliSeconds.bind(this);
    this.addMonths = this.addMonths.bind(this);
    this.compare = this.compare.bind(this);
    this.getWeekDay = this.getWeekDay.bind(this);
    this.getFullWeekDay = this.getFullWeekDay.bind(this);
  }

  /**
   * 获取当前值
   */
  val() {
    return this.value;
  }

  /**
   * 克隆当前对象
   */
  clone() {
    return new Date2Class(this.value);
  }

  /**
   * 格式化日期对象
   * @param f 格式化字符串，如yyyyMMdd、yyMMdd
   */
  format(f: string) {
    if (!this.value) {
      return "";
    }

    const [yearMatch] = f.match(/(y+)/) || [];
    if (yearMatch) {
      f = f.replace(
        yearMatch,
        this.value
          .getFullYear()
          .toString()
          .substr(4 - yearMatch.length)
      );
    }

    [
      { exp: "M+", value: this.value.getMonth() + 1 },
      { exp: "d+", value: this.value.getDate() },
      { exp: "h+", value: this.value.getHours() },
      { exp: "m+", value: this.value.getMinutes() },
      { exp: "s+", value: this.value.getSeconds() },
      { exp: "S+", value: this.value.getMilliseconds() },
    ].forEach(({ exp, value }) => {
      const [match] = f.match(new RegExp(`(${exp})`)) || [];
      //   console.log(exp, match);
      if (match) {
        if (match.length == 1) {
          f = f.replace(match, value.toString());
        } else {
          f = f.replace(
            match,
            String2(value).padStart(match.length, "0").substr(0, match.length)
          );
        }
      }
    });

    return f;
  }

  /**
   * 在当前日期基础上增加若干毫秒
   * @param ms 毫秒
   */
  addMilliSeconds(ms: number) {
    if (this.value) {
      this.value = new Date(this.value.getTime() + ms);
    }
    return this;
  }

  /**
   * 在当前日期基础上增加若干月
   * @param m 月
   */
  addMonths(m: number) {
    if (!this.value) {
      return this;
    }

    this.value = addMonths(this.value, m);
    return this;
  }

  /**
   * 和另一个日期比较
   * 1. 小于0，当前日期早于比较日期
   * 2. 等于0，当前日期等于比较日期
   * 3. 大于0，当前日期晚于比较日期
   * @param date 待比较的日期
   */
  compare(date: Date2Class) {
    if (!this.value) {
      throw new Error("当前Date2对象为空");
    }

    const dt = date.val();
    if (!dt) {
      throw new Error("待比较的Date2对象为空");
    }

    return this.value.getTime() - dt.getTime();
  }

  /**
   * 获取星期描述，如周日、周一等
   */
  getWeekDay() {
    if (!this.value) {
      return "";
    }
    return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
      this.value.getDay()
    ];
  }

  /**
   * 获取星期描述，如星期日、星期一等
   */
  getFullWeekDay() {
    if (!this.value) {
      return "";
    }
    return [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ][this.value.getDay()];
  }
}

export { Date2Class };
export default (value: any) => new Date2Class(value);
