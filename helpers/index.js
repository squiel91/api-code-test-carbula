import format from 'format-number';

export const parseOwners = (owners)=>{switch (owners) {
  case '1': return 'Único dueño';
  case '2': return 'Dos dueños';
  case '3': return 'Tres dueños';
  case '4': return 'Cuatro dueños';
  case '5 o más': return 'Cinco dueños o más';
  default:
    break;
}}

export const thousands = (number, decimals, decPoint = ',', thousandsSep = '.') => {
  if (number === 0) {
    return '0,00';
  }
  return format({
    round: decimals, integerSeparator: thousandsSep, decimal: ',', padRight: decimals,
  })(number);
}

export function parseCampanaValue(value) {
  if(value){
    if (typeof(value) === 'object') {
      return value[0]
    }
    return value.toString()
  }
  return undefined
}