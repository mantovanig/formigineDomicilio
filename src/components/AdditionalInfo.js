import {
   Truck as IconTruck,
   ShoppingBag as IconShoppingBag,
   Globe as IconGlobe,
   Instagram as IconInstagram,
   Facebook as IconFacebook,
} from "preact-feather";

const AdditionalInfo = ({
   shippingCosts,
   minimoOrdine,
   website,
   instagram,
   facebook,
}) => {
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
                  <IconShoppingBag class="w-6 h-6" />
               </span>
               <span class="inline-block align-middle text-sm">
                  {minimoOrdine}
               </span>
            </div>
         )}
         <div class="w-full mb-4 flex items-center">
            <div class="mr-2">Seguici su: </div>
            <div class="flex items-center">
               {instagram && (
                  <div class="px-1">
                     <a
                        href={instagram}
                        target="_BLANK"
                        rel="noopener noreferrer"
                     >
                        <IconInstagram />
                     </a>
                  </div>
               )}
               {facebook && (
                  <div class="px-1">
                     <a
                        href={facebook}
                        target="_BLANK"
                        rel="noopener noreferrer"
                     >
                        <IconFacebook />
                     </a>
                  </div>
               )}
               {website && (
                  <div class="px-1">
                     <a
                        href={website}
                        target="_BLANK"
                        rel="noopener noreferrer"
                     >
                        <IconGlobe />
                     </a>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AdditionalInfo;
