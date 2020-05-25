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
import Category from "./routes/category";
import Store from "./routes/store";

// Components
import { Dialog } from "./components/dialog.js";
import CustomCookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";

export const Action = createContext({});

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
   }

   componentDidUpdate() {
      const { isPopupOpen } = this.state;

      const root = document.documentElement;
      root.style.setProperty(
         "--popup-visible",
         isPopupOpen ? "hidden" : "initial"
      );
   }

   render(props, { popupNumbers, isPopupOpen }) {
      return (
         <Action.Provider value={{ setPopupNumbers: this.setPopupNumbers }}>
            <SWRConfig
               value={{
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
                           <Home />
                        </Route>
                        <Route path="/store/:id">
                           <Store />
                        </Route>
                        <Route path="/categorie/:category">
                           <Category />
                        </Route>
                     </Switch>
                  </Router>
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
