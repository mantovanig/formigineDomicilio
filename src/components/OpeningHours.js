const OpeningHours = ({ openings }) => {
   return (
      <div class="border-solid border-b border-gray-300 py-3">
         <p class="font-sans font-medium text-base mb-2">Orari</p>
         {openings.split("\n").map((item, i) => (
            <p key={i} class="text-sm text-gray-600">{item}</p>
         ))}
      </div>
   );
};

export default OpeningHours;
