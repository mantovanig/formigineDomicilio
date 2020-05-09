import _isEmpty from "lodash.isempty";

const Products = ({ products }) => {
   if (_isEmpty(products)) return null;

   return (
      <div class="w-full mb-6">
         <h3 class="font-sans text-xl font-medium mb-2">Alcuni prodotti</h3>
         <div class="flex flex-wrap mb-4 -mx-2">
            {products.map((f) => (
               <div class="w-1/2 px-2 mb-6">
                  <div key={f.id} class="bg-white shadow-lg">
                        <div>
                           <img src={f.url} class="pointer-events-none" />
                        </div>
                        <div class="p-4 px-2">
                           <p class="text-sm text-gray-600 truncate">{f.title}</p>
                        </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Products;
