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






export function FormatDateAndTime(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');  // 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year}, (${hours}:${minutes})`;
}


 export const formatPrice = (price) => {
  if (price >= 10000000) {
    const value = Math.floor(price / 100000) / 100;
    return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} Cr`;
  } else if (price >= 100000) {
    const value = Math.floor(price / 1000) / 100;
    return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} L`;
  } else if (price >= 1000) {
    const value = Math.floor(price / 10) / 100;
    return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} K`;
  } else {
    return `₹ ${price.toFixed(2)}`;
  }
};