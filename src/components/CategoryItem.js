export const CategoryItem = ({ name = "", icon = "", stores = 0 }) => {
   return (
      <div id={name.replace(" ", "_")} className="relative py-2">
         <div class="rounded-lg border bg-indigo-100 p-4 md:p-5 my-2 text-md lg:text-xl font-semibold text-gray-700 flex items-center justify-between">
            <div class="flex items-center">
               <div class="mr-3">
                  <span class="text-3xl">{icon}</span>
               </div>
               <div class="mr-3">
                  <span class="text-xl md:text-3xl capitalize">{name}</span>
               </div>
               <div>
                  <span class="align-baseline rounded-full bg-indigo-500 uppercase px-3 py-1 text-base font-bold mr-3 text-white">
                     {stores}
                  </span>
               </div>
            </div>
            <div>
               <svg
                  class="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
               >
                  <path
                     class="heroicon-ui"
                     d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
                  />
               </svg>
            </div>
         </div>
      </div>
   );
};
