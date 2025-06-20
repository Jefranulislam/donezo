import React from 'react'

export const userName = (fullName) => {
const name = fullName.split(' ');
const firstName = name.slice(0,2).map((n) => n[0].toUpperCase());
const lastName = firstName.join(' ');
return lastName;
   
}
