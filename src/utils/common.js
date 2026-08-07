export const formatDateToDDMMYYYY = (dateInput) => {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error('Invalid date provided to formatDateToDDMMYYYY');
    return '';
  }
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(date).replace(/\//g, '-');
};