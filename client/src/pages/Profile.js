// import React from 'react';

// const Home = () => {
//     return (
//         <div>Hello!</div>
//     );
// };

// export default Home;

// TODO
// Add useEffect to reload on delete
// use React-bootstrap stuff maybe

import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_RECIPE } from "../utils/mutations";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const recipes = data?.me.savedRecipes || [];
  const bookmarks = data?.me.bookmarked || [];

  console.log('profile recipes',recipes);
  console.log('profile data', data);
  const loggedIn = Auth.loggedIn();
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE);

  useEffect(() => {
    if(recipes.length) {
      const recipes = data?.me.savedRecipes || [];
    }
  }, [recipes]);

  const handleDeleteRecipe = async (recipeId) => {
  

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if(!token) {
    //   console.log("this")
    //   return false;
    // }
    
    try {
      const {data} = await removeRecipe({
        variables: { recipeId: recipeId },
      });
      window.location.assign('/');
    } catch(e) {
      console.log(e);
    }
  }
  if (loading) {
    return <h1>loading</h1>
  }
  return (
    <div className="text-center">
      <h1>Your Recipes</h1>
      <hr />
      {recipes.length ? (
        <div className="flex-row justify-space-between mb-4 p-2">
          {recipes.map((recipe) => {
            const recipeLink = "/EditRecipe/" + recipe._id;
            console.log(recipeLink.split("/"));
            return (
              <div key={recipe._id} border="dark" className="flex-row">
                <div className="card col-md-6">
                  <div className="card-body">
                    <h5 className="card-title text-uppercase fw-bold">
                      Recipe Name: <br /> {recipe.recipeName}
                    </h5>
                    <hr />
                    <p className="card-text">
                      How to make: <br /> {recipe.content}
                    </p>
                    <p className="card-text">
                      Author: <br /> {recipe.author}
                    </p>
                    <img src={recipe.image} alt={recipe.image}></img>
                    <hr />
                    <button
                      className="btn-primary"
                      onClick={() => handleDeleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                    <br />
                    <Link className="btn-primary" to={recipeLink} recipeId={recipe._id}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
          <h2>Bookmarks</h2>
      {bookmarks.length ? (
        <div className="flex-row justify-space-between mb-4 p-2">
          {bookmarks.map((bookmarks) => {
            return (
              <div key={bookmarks._id} border="dark" className="flex-row">
                <div className="card col-md-6">
                  <div className="card-body">
                    <h5 className="card-title text-uppercase fw-bold">
                      Recipe Name: <br /> {bookmarks.recipeName}
                    </h5>
                    <hr />
                    <p className="card-text">
                      How to make: <br /> {bookmarks.content}
                    </p>
                    <p className="card-text">
                      Author: <br /> {bookmarks.author}
                    </p>
                    <img src={bookmarks.image} alt={bookmarks.image}></img>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
    </div>
  );
};

export default Profile;