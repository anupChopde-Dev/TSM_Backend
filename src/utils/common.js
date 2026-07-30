export const formatDateToDDMMYYYY = (dateInput) => {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided to formatDateToDDMMYYYY');
    return '';
  }

  // Uses 'en-GB' locale to naturally get day-month-year order
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Replace default forward slashes with hyphens
  return formatter.format(date).replace(/\//g, '-');
};