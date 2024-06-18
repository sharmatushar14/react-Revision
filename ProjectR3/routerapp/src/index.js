import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Github from './components/Github/Github';
import { githubInfoLoader } from './components/Github/Github';
import User from './components/User/User';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route
      loader={githubInfoLoader}
      path='github' element={<Github/>}/>
      {/* This loader helps to load the fetch api or anything as soon as we hover over the url so that on clicking we get the results fast
      Hence, this is optimization step----->> Important Thing Learned */}
      <Route path='user/:userid' element={<User/>} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
