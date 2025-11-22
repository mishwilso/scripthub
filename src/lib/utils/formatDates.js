

export function getHeaderDate(){
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en', {month: 'long', day: 'numeric'});
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.toLocaleDateString('en', {weekday: 'long'});
    return({day: dayOfWeek, date: `${date} ${year}`})
}