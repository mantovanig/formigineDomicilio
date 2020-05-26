import { ChevronRight as IconChevronRight } from "preact-feather";

export const CategoryItem = ({ name = "", icon = "", stores, onClick }) => {
   return (
      <div id={name.replace(" ", "_")} className="relative py-2">
         <div
            class="rounded-lg border bg-indigo-100 p-4 md:p-5 my-2 text-md lg:text-xl font-semibold text-gray-700 flex items-center justify-between"
            onClick={onClick}
         >
            <div class="flex items-center">
               <div class="mr-3">
                  <span class="text-3xl">{icon}</span>
               </div>
               <div class="mr-3">
                  <span class="text-xl md:text-3xl capitalize">{name}</span>
               </div>
               {stores && (
                  <div>
                     <span class="align-baseline rounded-full bg-indigo-500 uppercase px-3 py-1 text-base font-bold mr-3 text-white">
                        {stores}
                     </span>
                  </div>
               )}
            </div>
            <div>
               <IconChevronRight />
            </div>
         </div>
      </div>
   );
};
