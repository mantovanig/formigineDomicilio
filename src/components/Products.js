import Slider from "react-slick";

const Products = ({ products }) => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

   const prods = products.map((e) => e.fields);

   return (
      <div>
         <h3 class="font-sans text-xl font-medium mb-2">Alcuni prodotti</h3>
         <Slider {...settings}>
            {prods.map((f) => (
               <div>
                  <div class="border-solid border-gray-300 border-2 rounded-md overflow-hidden m-2">
                     <div>
                        <img src={f.file.url} alt={f.title} />
                     </div>
                     <div class="p-4 px-2">
                        <p class="text-sm text-gray-600">{f.title}</p>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   );
};

export default Products;
