import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-deliveroo--rfd99txfpp4t.code.run/"
        );
        // console.log(reponse.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  let deliveryFees = 2.5;

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  const addMealToCart = (mealObj) => {
    const cartCopy = [...cart];
    // console.log("ajout dans le panier =>", mealObj);
    /////// Méthode Algo pure
    let mealSpotted;
    for (let i = 0; i < cartCopy.length; i++) {
      if (cartCopy[i].id === mealObj.id) {
        // console.log("dans la condition meal spotted", mealSpotted);
        mealSpotted = cartCopy[i];
      }
    }
    /////// Méthode find() qui return un booléen
    // const mealSpotted = cartCopy.find((elem) => elem.id === mealObj.id);

    if (mealSpotted) {
      mealSpotted.quantity++;
    } else {
      // Comme le meal n'existe pas dans le cart, on le push avec une clé quantity dont la valeur est un
      cartCopy.push({ ...mealObj, quantity: 1 });
    }
    // Dans tous les cas, à la fin on veut MAJ le state
    setCart(cartCopy);
  };

  const handleClickPlus = (indexOfMealInCart) => {
    const cartCopy = [...cart];
    cartCopy[indexOfMealInCart].quantity++;
    setCart(cartCopy);
  };

  const handleClickMinus = (indexOfMealInCart) => {
    const cartCopy = [...cart];
    if (cartCopy[indexOfMealInCart].quantity === 1) {
      cartCopy.splice(indexOfMealInCart, 1);
    } else {
      cartCopy[indexOfMealInCart].quantity--;
    }
    setCart(cartCopy);
  };

  return isLoading ? (
    <span>Chargement en cours...</span>
  ) : (
    <>
      <header>
        <div className="container">
          <aside>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </aside>
          <img src={data.restaurant.picture} />
        </div>
      </header>
      <main className="container">
        <article>
          {data.categories.map((category) => {
            return (
              <>
                {category.meals.length !== 0 && (
                  <h2 key={category.name}>{category.name}</h2>
                )}
                <section>
                  {category.meals.map((meal) => {
                    return (
                      <menu
                        key={meal.id}
                        onClick={() => {
                          addMealToCart(meal);
                        }}
                      >
                        <div>
                          <h3>{meal.title}</h3>
                          <p className="description">{meal.description}</p>
                          <div className="price-and-popularity">
                            <span>{meal.price} €</span>
                            {meal.popular && (
                              <span className="popular">Populaire</span>
                            )}
                          </div>
                        </div>
                        {meal.picture && <img src={meal.picture} />}
                      </menu>
                    );
                  })}
                </section>
              </>
            );
            // fin du 1er map en-dessous
          })}
        </article>
        {/* -- CART -- */}
        <aside>
          {cart.length === 0 ? (
            <div>
              <button className="not-confirmed-yet"> Valider mon panier</button>
              <p className="empty-cart">Votre panier est vide</p>
            </div>
          ) : (
            <div>
              <button className="confirmed"> Valider mon panier</button>
              <div className="summary">
                {cart.map((elem, indexOfMealInCart) => {
                  return (
                    <div className="cart-line">
                      <button
                        className="quantity"
                        onClick={() => {
                          // console.log("elem", elem);
                          // console.log("elem id", elem.id);
                          handleClickMinus(indexOfMealInCart);
                        }}
                      >
                        -
                      </button>
                      <span> {elem.quantity} </span>
                      <button
                        className="quantity"
                        onClick={() => {
                          handleClickPlus(indexOfMealInCart);
                        }}
                      >
                        +
                      </button>
                      <span>{elem.title}</span>
                      <span>{(elem.price * elem.quantity).toFixed(2)} €</span>
                    </div>
                  );
                })}
              </div>
              <div className="subtotal-and-deliveryfees">
                <div className="align-info">
                  <p>Sous-total</p>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="align-info">
                  <p>Frais de livraison</p>
                  <span>{deliveryFees} €</span>
                </div>
              </div>
              <div className="total">
                <p>Total : </p>
                <span>{(total + deliveryFees).toFixed(2)} €</span>
              </div>
            </div>
          )}
        </aside>
      </main>
    </>
  );
}

export default App;
