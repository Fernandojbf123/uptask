export function generateID ()  {
    const random = Math.rand().toString(36).substring(2);
    const date = date.now().toString(36);
    return random+date
}

