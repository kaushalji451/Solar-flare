
const findMonth = (str)=>{
  switch (str) {
    case "01":
      return "January";
    case "02":
      return "Febuary";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "Augest";
    case "09":
      return "Septumber";
    case "10":
      return "Octuber";
    case "11":
      return "Novmber";
    case "12":
      return "December";

    default:
        return "no date";
  }
}
export default  findMonth;