import { useState, useContext } from "preact/hooks";
import {
   Info as IconInfo,
   Phone as IconPhone,
   Mail as IconMail,
   Globe as IconGlobe,
} from "preact-feather";
import ReactGA from "react-ga";
import _isEmpty from "lodash.isempty";

// Actions
import { Action } from "../index";

import { isProd } from "../utils";

export const ListItem = ({ name, tel, site, mail, note }) => {
   const [infoVisible, setInfoVisible] = useState(false);
   const action = useContext(Action);

   function handleClick(action) {
      if (isProd) {
         ReactGA.event({
            category: "User",
            label: name,
            action: `Click on ${action}`,
         });
      }
      setInfoVisible(!infoVisible);
   }

   return (
      <div class="rounded-lg border bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl font-semibold text-gray-700">
         <div class="flex justify-between items-center">
            <a href="#">
               <span onClick={handleClick}>{name}</span>
            </a>
            <div class="flex">
               {note && (
                  <span
                     onClick={() => handleClick("note")}
                     class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center bg-blue-300 leading-8 rounded-lg text-white p-1"
                     role="img"
                     aria-label="warning"
                  >
                     <IconInfo />
                  </span>
               )}
               {site && (
                  <a href={`${site}`}>
                     <span
                        onClick={() => handleClick("site")}
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer leading-8 bg-blue-300 rounded-lg flex justify-center items-center p-1 text-white"
                        role="img"
                        aria-label="website"
                     >
                        <IconGlobe />
                     </span>
                  </a>
               )}
               {mail && (
                  <a href={`mailto:${mail}`}>
                     <span
                        onClick={() => handleClick("mail")}
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer leading-8 bg-blue-300 rounded-lg flex justify-center items-center p-1 text-white"
                        role="img"
                        aria-label="e-mail"
                     >
                        <IconMail />
                     </span>
                  </a>
               )}
               {tel && (
                  <a
                     href={`tel:${tel}`}
                     onClick={(e) => {
                        if (isProd) {
                           ReactGA.event({
                              category: "User",
                              label: name,
                              action: "Click on phone number",
                           });
                        }
                        Array.isArray(tel) && action.setPopupNumbers(e, tel);
                     }}
                  >
                     <span
                        class="inline-block mx-2 w-8 h-8 bg-green-300 leading-8 rounded-lg cursor-pointer flex justify-center items-center p-1"
                        role="img"
                        aria-label="telephone"
                     >
                        <IconPhone />
                     </span>
                  </a>
               )}
            </div>
         </div>
         {infoVisible && !_isEmpty(note) && (
            <div class="block mt-10">
               <p class="text-yellow-700 text-sm md:text-md lg:text-lg">
                  {note}
               </p>
            </div>
         )}
      </div>
   );
};
