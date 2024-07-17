import { extension, Banner } from "@shopify/ui-extensions/checkout";

export default extension("purchase.checkout.header.render-after", (root) => {

  root.appendChild(
    root.createComponent(
      Banner,
      { title: "Purchase things on ease" }
    )
  );
});