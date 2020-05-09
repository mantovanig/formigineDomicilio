import { h, Component, createContext } from "preact";
// import { Router } from "preact-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import CookieBanner from "react-cookie-banner";
import { SWRConfig } from "swr";

// css
import "tailwindcss/dist/tailwind.min.css";
import "./global.css";

// Routes
import Home from "./routes/home.js";
import Form from "./routes/form.js";
import Category from "./routes/category";
import Store from "./routes/store";

// Components
import { Dialog } from "./components/dialog.js";
import { Loader } from "./components/Loader";
import CustomCookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";

export const Action = createContext({});

// stubs
// import resultsMock from "./assets/formigineDomicilio.json";

import SETTINGS from "./settings.json";

import { isClient, isProd } from "./utils";

let PWAPrompt = null;
if (isClient) {
   PWAPrompt = require("react-ios-pwa-prompt").default;
}

if (isProd) {
   ReactGA.initialize(process.env.PREACT_APP_GA_TRACKING_ID);
}

export default class App extends Component {
   state = {
      loading: true,
      error: false,
      results: {},
      isPopupOpen: false,
      popupNumbers: [],
   };

   handleRoute = (e) => {
      this.currentUrl = e.url;
   };

   setPopupNumbers = (e, numberArray) => {
      e.preventDefault();

      this.setState({
         popupNumbers: numberArray,
         isPopupOpen: true,
      });
   };

   closePopup = (e) => {
      if (e.currentTarget === e.target) {
         this.setState({ isPopupOpen: false });
      }
   };

   componentDidMount() {
      if (isProd) {
         ReactGA.pageview(window.location.pathname + window.location.search);
      }
      fetch(`${SETTINGS.PREACT_APP_DATA_SOURCE}`)
         .then((r) => r.json())
         .then((json) => {
            this.setState({
               loading: false,
               results: json,
               resultBkp: json,
            });
         })
         .catch(() => {
            this.setState({
               loading: false,
               error: true,
            });
         });
   }

   componentDidUpdate() {
      const { isPopupOpen } = this.state;

      const root = document.documentElement;
      root.style.setProperty(
         "--popup-visible",
         isPopupOpen ? "hidden" : "initial"
      );
   }

   render(props, { results, popupNumbers, isPopupOpen, loading, error }) {
      if (loading)
         return (
            <div class="w-full h-screen flex items-center justify-center">
               <Loader />
            </div>
         );
      if (error)
         return (
            <div class="w-full h-screen flex items-center justify-center">
               <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
               >
                  <strong class="font-bold">Ops! </strong>
                  <span class="block sm:inline">
                     Qualcosa è andato storto, riprova.
                  </span>
               </div>
            </div>
         );

      return (
         <Action.Provider value={{ setPopupNumbers: this.setPopupNumbers }}>
            <SWRConfig
               value={{
                  refreshInterval: 3000,
                  // fetcher: (...args) =>
                  //    fetch(...args).then((res) => res.json()),
                  fetcher: (...args) => {
                     return fetch(args[0], {
                        headers: {
                           "Content-Type": "application/json",
                           "X-MBurger-Token": process.env.PREACT_APP_MB_TOKEN,
                           "X-MBurger-Version":
                              process.env.PREACT_APP_MB_VERSION,
                        },
                        ...args[1],
                     })
                        .then((res) => res.json())
                        .then(({ body }) => body);
                  },
               }}
            >
               <div id="app" class="px-5 max-w-screen-md mx-auto">
                  <Router>
                     <ScrollToTop />
                     <Switch>
                        <Route exact path="/">
                           <Home results={results} />
                        </Route>
                        <Route path="/store/:id">
                           <Store />
                        </Route>
                        <Route path="/form">
                           <Form />
                        </Route>
                        <Route path="/categorie/:category">
                           <Category results={results} />
                        </Route>
                     </Switch>
                  </Router>

                  {/* <Router onChange={this.handleRoute}>
                  <Home path="/" results={results} />
                  <Store path="/store/:id" />
                  <Form path="/form" />
                  <Category path="categorie/:category" results={results} />
               </Router> */}
               </div>
               <Dialog
                  isOpen={isPopupOpen}
                  closePopup={this.closePopup}
                  telNumbers={popupNumbers}
               />
               <CookieBanner
                  dismissOnScroll={false}
                  disableStyle
                  cookie="user-has-accepted-cookies"
               >
                  {(onAccept) => <CustomCookieBanner onAccept={onAccept} />}
               </CookieBanner>
               {PWAPrompt && (
                  <PWAPrompt
                     timesToShow={2}
                     // debug={true}
                     permanentlyHideOnDismiss={false}
                     copyTitle="Sono un'app!"
                     copyBody="Aggiungimi alla home per utilizzarmi in fullscreen e offline. Così appena vorrai ordinare mi avrai a portata!"
                     copyShareButtonLabel="Fai tap sul bottone condividi"
                     copyAddHomeButtonLabel="Fai sulla voce 'Aggiungi a Home'"
                  />
               )}
            </SWRConfig>
         </Action.Provider>
      );
   }
}
