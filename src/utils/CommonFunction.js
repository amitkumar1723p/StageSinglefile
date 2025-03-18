export function FormatDate(inputDate) {
  const date = new Date(inputDate); // Use the passed date (inputDate) here

  const options = { year: "2-digit", month: "short", day: "2-digit" };
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "")
    .split(" ")
    .join("-");
    
  return formattedDate; // Return the formatted date
}
