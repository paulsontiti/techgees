export const formatDate = (date:Date | null) => {
   
    return date ? date.toDateString() : "";
  }