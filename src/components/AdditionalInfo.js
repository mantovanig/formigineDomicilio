import {
   Truck as IconTruck,
   DollarSign as IconDollarSign,
   Globe as IconGlobe,
} from "preact-feather";

const AdditionalInfo = ({ shippingCosts, minimoOrdine, website }) => {
   return (
      <div class="flex flex-wrap">
         {shippingCosts && (
            <div class="w-full mb-4">
               <span class="inline-block align-middle mr-2">
                  <IconTruck class="w-6 h-6" />
               </span>
               <span class="inline-block align-middle text-sm">
                  {shippingCosts}
               </span>
            </div>
         )}
         {minimoOrdine && (
            <div class="w-full mb-4">
               <span class="inline-block align-middle mr-2">
                  <IconDollarSign class="w-6 h-6" />
               </span>
               <span class="inline-block align-middle text-sm">
                  {minimoOrdine}
               </span>
            </div>
         )}
         {website && (
            <div class="w-full mb-4">
               <span class="inline-block align-middle mr-2">
                  <IconGlobe class="w-6 h-6" />
               </span>
               <span class="inline-block align-middle text-sm underline">
                  {" "}
                  <a href={website} target="_BLANK" rel="noopener noreferrer">
                     Visita il sito web
                  </a>
               </span>
            </div>
         )}
      </div>
   );
};

export default AdditionalInfo;
