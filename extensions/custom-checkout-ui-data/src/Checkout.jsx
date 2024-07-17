import { useEffect, useState } from "react";

import {
  useCartLineTarget,
  useAppMetafields,
  reactExtension,
  Text

} from "@shopify/ui-extensions-react/checkout";
export default reactExtension(
  'purchase.checkout.cart-line-item.render-after',
  () => <Extension />,
);

function Extension() {
   // Use the merchant-defined metafield for watering instructions and map it to a cart line
   const wateringMetafields = useAppMetafields({
    type: "product",
    namespace: "reviews",
    key: "rating"
  });

 
  const cartLineTarget = useCartLineTarget();

  const [wateringInstructions, setWateringInstructions] = useState();

  useEffect(() => {
    const productId = cartLineTarget?.merchandise?.product?.id;
    if (!productId) {
      return;
    }

    const wateringMetafield = wateringMetafields.find(({target}) => {
      return `gid://shopify/Product/${target.id}` === productId;
    }
  );

    
    wateringMetafield && setWateringInstructions(wateringMetafield.metafield.value);
    console.log(typeof(wateringMetafield?.metafield.value) , "value")
   
  }, [cartLineTarget, wateringMetafields]);

  // Render the watering instructions if applicable
  if (wateringInstructions) {
    return (
      <Text>{JSON.parse(wateringInstructions).value}</Text>
        
      );
  }

  return "hii";
}