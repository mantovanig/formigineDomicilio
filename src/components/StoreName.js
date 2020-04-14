const StoreName = ({ name, categoryEmoji }) => {
   return (
      <h1 class="font-sans text-2xl md:text-3xl capitalize mb-4">
         {categoryEmoji} {name}
      </h1>
   );
};

export default StoreName;
