export const toCorrectDate = (inputDate : string) : Date => {
  let date = new Date(inputDate.replace( /-/g, '\/'));
  return new Date(inputDate.replace( /-/g, '\/') + '\/' + lastDay( date.getMonth() ) );
}

const lastDay = (month : number) : number => {
  const days = { 0:31, 1:28, 2:31, 3:30, 4:31, 5:30, 6:31, 7:31, 8:30, 9:31, 10:30, 11:31 };
  return days[month];
}