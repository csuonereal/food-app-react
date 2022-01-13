import React, { useEffect, useState } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setError] = useState();
  useEffect(() => {
    //başındaki fonksiyona async yazamayız uyarı verir farklı bir yöntemle yapabiliriz.
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-a28cb-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
    /*
    await fetchMeals yazamayız awaitli bir func çağırılamıyor useEffectin içinde o yüzden catch veya then kullanılmalı
    try {
     
      await fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
    */
  }, []);

  if (isLoading) {
    return (
      <section className={style["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError != null) {
    return (
      <section className={style["invalid-data"]}>
        <p>{httpError}</p>
      </section>
    );
  }
  const availableItems = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));
  return (
    <section className={style.meals}>
      <Card>
        <ul>{availableItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
