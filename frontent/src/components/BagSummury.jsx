import { useSelector } from "react-redux";

import BagCart from "./BagCart";
import PriceDetails from "./PriceDetails";
import EmptyCartMessage from "./EmptyCartMessage.JSX";


const BagSummury = () => {
  const bagItems = useSelector((state) => state.Cart);

  console.log(" i found bagitems", bagItems);

  if(bagItems.items.length < 1) {
    return <EmptyCartMessage />
  }

  return (
    <>
      <div className="flex justify-around h-screen overflow-hidden p-4">
        <div className="bagCards w-[50%]   overflow-y-auto no-scrollbar">
          {bagItems.items.map((item) => (
            <BagCart key={item.id} item={item} />
          ))}
        </div>
        <div className="w-[35%] h-fit sticky top-0">
          <PriceDetails items={bagItems.items} />
        </div>
      </div>
    </>
  );
};

export default BagSummury;
