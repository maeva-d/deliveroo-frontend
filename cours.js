const tab = [];
const tab2 = [];

// console.log(tab === tab2);

const cart = [{ id: 8 }, { id: 2 }, { id: 3 }];

const meal = { id: 1 };

let iFoundTheMealInCart;

for (let i = 0; i < cart.length; i++) {
  //   console.log(cart[i].id === meal.id);
  if (cart[i].id === meal.id) {
    iFoundTheMealInCart = cart[i];
  }
}

// console.log(iFoundTheMealInCart);

if (iFoundTheMealInCart) {
} else {
  // push
}

const tab6 = [{ id: 8 }, { id: 2 }, { id: 3 }];
const tab7 = structuredClone(tab6);

// tab6.push({ id: 89 });
tab6[0].id = 678;

console.log(tab6);
console.log(tab7);
