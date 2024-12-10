const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let person = {
  firstName: 'Raju',
  lastName: 'Yennam',
  gender: 'male',
  age: '36',
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName() {
  return person.firstName + ' ' + person.lastName;
}

app.get('/person/fullname', (req, res) => {
  res.json({ fullName: getFullName() });
});

function getFirstNameandGender() {
  return { firstName: person.firstName, gender: person.gender };
}
app.get('/person/firstname-gender', (req, res) => {
  res.json(getFirstNameandGender());
});

function getIncrementedAgeObject() {
  person.age = parseFloat(person.age) + 1;
  return person;
}
app.get('/person/increment-age', (req, res) => {
  res.json(getIncrementedAgeObject());
});

function getFinalPrice(cartTotal, isMember) {
  if (isMember) {
    return cartTotal -cartTotal*.1;
  } else {
    return cartTotal;
  }
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json({ finalPrice: finalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
