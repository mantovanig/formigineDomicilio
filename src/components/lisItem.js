import { useState, useContext } from "preact/hooks";
import {
   Info as IconInfo,
   Phone as IconPhone,
   Mail as IconMail,
   Globe as IconGlobe,
} from "preact-feather";
import ReactGA from "react-ga";
import _isEmpty from "lodash.isempty";
import { Link } from "preact-router/match";

// Actions
import { Action } from "../index";

import { isProd } from "../utils";

export const ListItem = ({ name, tel, site, mail, note, cf_id }) => {
   const [infoVisible, setInfoVisible] = useState(false);
   const action = useContext(Action);

   const isCfStore = !_isEmpty(cf_id);

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
            {isCfStore ? (
               <a href="#">
                  <span onClick={handleClick}>{name}</span>
               </a>
            ) : (
               <Link href={`/store/${cf_id}`}><span onClick={handleClick}>{name}</span></Link>
            )}
            <div class="flex">
               {note && !isCfStore && (
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
            <div class="block mt-6">
               <p>Info: </p>
               <p class="text-blue-800 font-light text-sm md:text-md lg:text-lg">
                  {note}
               </p>
            </div>
         )}
      </div>
   );
};
