import { useState, useContext } from "preact/hooks";
import { Fragment } from "preact";
import {
   Info as IconInfo,
   Phone as IconPhone,
   Mail as IconMail,
   Globe as IconGlobe,
   ChevronRight as IconChevronRight,
} from "preact-feather";
import ReactGA from "react-ga";
import _isEmpty from "lodash.isempty";
import { Link } from "react-router-dom";

// Actions
import { Action } from "../index";

import { isProd } from "../utils";

const WrapperLink = ({ id, children }) => {
   if (id)
      return (
         <Link to={`/store/${id}`} onClick={(e) => e.stopPropagation()}>
            {children}
         </Link>
      );

   return <Fragment>{children}</Fragment>;
};

export const ListItem = ({ name, tel, site, mail, note, mb_id }) => {
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

   // TODO: refactor this splitting components for detail page
   return (
      <WrapperLink id={mb_id}>
         <div class="rounded-lg border bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl font-semibold text-gray-700">
            <div class="flex justify-between items-center">
               {mb_id ? (
                  <Link to={`/store/${mb_id}`}>
                     <span onClick={handleClick}>{name}</span>
                  </Link>
               ) : (
                  <a href="#">
                     <span onClick={handleClick}>{name}</span>
                  </a>
               )}
               {mb_id ? (
                  <div>
                     <IconChevronRight />
                  </div>
               ) : (
                  <div class="flex">
                     {note && !mb_id && (
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
                              Array.isArray(tel) &&
                                 action.setPopupNumbers(e, tel);
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
               )}
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
      </WrapperLink>
   );
};
