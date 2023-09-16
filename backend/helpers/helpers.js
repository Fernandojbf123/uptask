export function generateID ()  {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return random + date
}

export const formatDate = date => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return newDate.toLocaleDateString('en-US', options)
}

export const formatMoney = (number) =>{
    return number.toLocaleString('en-US',{
        style: 'currency', 
        currency:'USD'
    })
  }