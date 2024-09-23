export const dateUtils = (dateTime) => {  
    const [datePart, timePartWithZ] = dateTime.split('T');
    const timePart = timePartWithZ.split('.')[0]; // This extracts "11:00:00"
  
    if (!datePart || !timePart) {
      return dateTime; // return the original datetime if the format is unexpected
    }
  
    const [year, month, day] = datePart.split('-');
    const [hoursStr, minutes] = timePart.split(':');
    if (!hoursStr || !minutes) {
      return dateTime; // return the original datetime if the format is unexpected
    }
  
    let hours = parseInt(hoursStr);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
  
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    const formattedDate = `${month}/${day}/${year}`;
  
    return `${formattedDate} ${formattedTime}`;
  };
  