import { useState, useContext } from "preact/hooks";

// Actions
import { Action } from "../index";

export const ListItem = ({ name, tel, site, mail, note }) => {
   const [infoVisible, setInfoVisible] = useState(false);
   const action = useContext(Action);
   const encodedName = encodeURIComponent(name);
   const encodedCity = encodeURIComponent(process.env.PREACT_APP_CITY);
   const searchUrl = `https://www.google.com/search?q=${encodedName}%20${encodedCity}`;

   function handleClick() {
      setInfoVisible(!infoVisible);
   }

   return (
      <div class="rounded-lg border bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl font-semibold text-gray-700">
         <div class="flex justify-between items-center">
            <span>
               <a
                  class="hover:underline"
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {name}
               </a>
            </span>
            <div class="flex">
               {note && (
                  <span
                     onClick={handleClick}
                     class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center bg-blue-300 leading-8 rounded-lg text-white p-1"
                     role="img"
                     aria-label="warning"
                  >
                     <svg
								class="fill-current"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background:new 0 0 512 512;"
                     >
                        <g>
                           <g>
                              <path
                                 d="M256,0C114.51,0,0,114.497,0,256c0,141.49,114.497,256,256,256c141.49,0,256-114.497,256-256C512,114.51,397.503,0,256,0z
			 M256,477.867c-122.337,0-221.867-99.529-221.867-221.867S133.663,34.133,256,34.133S477.867,133.663,477.867,256
			S378.337,477.867,256,477.867z"
                              />
                           </g>
                        </g>
                        <g>
                           <g>
                              <path
                                 d="M255.997,209.777c-9.425,0-17.067,7.641-17.067,17.067v143.969c0,9.425,7.641,17.067,17.067,17.067
			s17.067-7.641,17.067-17.067V226.843C273.063,217.417,265.422,209.777,255.997,209.777z"
                              />
                           </g>
                        </g>
                        <g>
                           <g>
                              <path
                                 d="M256,124.122c-18.821,0-34.133,15.312-34.133,34.133s15.312,34.133,34.133,34.133s34.133-15.312,34.133-34.133
			S274.821,124.122,256,124.122z"
                              />
                           </g>
                        </g>
                     </svg>
                  </span>
               )}
               {site && (
                  <a href={`${site}`}>
                     <span
                        onClick={handleClick}
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-orange-300 rounded-lg"
                        role="img"
                        aria-label="website"
                     >
                        🌐
                     </span>
                  </a>
               )}
               {mail && (
                  <a href={`mailto:${mail}`}>
                     <span
                        onClick={handleClick}
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-blue-300 rounded-lg"
                        role="img"
                        aria-label="e-mail"
                     >
                        ✉️
                     </span>
                  </a>
               )}
               {tel && (
                  <a
                     href={`tel:${tel}`}
                     onClick={(e) =>
                        Array.isArray(tel) && action.setPopupNumbers(e, tel)
                     }
                  >
                     <span
                        class="inline-block mx-2 w-8 h-8 bg-green-300 text-center leading-8 rounded-lg cursor-pointer"
                        role="img"
                        aria-label="telephone"
                     >
                        📞
                     </span>
                  </a>
               )}
            </div>
         </div>
         {infoVisible && (
            <div class="block mt-10">
               <p class="text-yellow-700 text-sm md:text-md lg:text-lg">
                  {note}
               </p>
            </div>
         )}
      </div>
   );
};
