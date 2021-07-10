export default function timeFormat(nowDate) {
  let date = new Date(nowDate);
  let y = date.getFullYear();
  let m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let i = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let times = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return times;
}
