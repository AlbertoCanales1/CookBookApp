import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import EditRecipe from "./pages/EditRecipe";


const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>

        <Header /> 
        <div className="container">
          <Route exact path="/" component={Home}/>
           
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/addRecipe">
            <RecipeForm />
          </Route>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/editRecipe/:id" component={EditRecipe}/>
           
          <Route exact path="/signup">
            <Signup />
          </Route>
        </div>

      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
