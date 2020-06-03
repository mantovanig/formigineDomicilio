import SETTINGS from "../settings.json";
import { Fragment } from "preact";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { ChevronLeft as IconChevronLeft } from "preact-feather";

import Logo from '../assets/formigine_domicilio_logo.png'

import { isClient } from "../utils";

export const Header = ({ parentRoute }) => {
   const match = useRouteMatch("/");
   const history = useHistory();
   const { isExact } = match;

   const handleBack = () => {
      if (isClient) {
         if (parentRoute) {
            history.replace(parentRoute);
         } else {
            history.goBack();
         }
      }
   };

   return isExact ? (
      <Fragment>
         <nav class="flex justify-center md:justify-end items-center">
            <a
               class="m-2 my-5 md:m-5 mr-0 md:mr-0 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold text-xs md:text-base px-2 py-1 rounded"
               href="https://forms.gle/WrrNMiyU2qN9q82N7"
               target="_BLANK"
               rel="noopener noreferrer"
            >
               Aggiungi un'attività
            </a>
         </nav>
         <Link href="/">
            <div class="text-center w-full mt-10 mb-10">
               <img src={Logo} alt="Formigine Domicilio Logo" />
            </div>
         </Link>
      </Fragment>
   ) : (
      <Fragment>
         <nav class="flex items-center justify-between py-8">
            <div onClick={handleBack}>
               <button class="bg-transparent hover:bg-blue-500 text-center text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded">
                  <IconChevronLeft />
               </button>
            </div>
            <Link to="/">
               <div>
                  <img src={Logo} alt="Formigine Domicilio Logo" width="250" />
               </div>
               {/* <h3 class="font-sans text-xl md:text-2xl text-gray-800">
                  <span class="capitalize">{SETTINGS.PREACT_APP_CITY}</span> a
                  Domicilio
               </h3> */}
            </Link>
         </nav>
      </Fragment>
   );
};
