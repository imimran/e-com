import moment from "moment";
import pdf from "html-pdf";

import { ReadStream } from "fs";


const styles = {
  generalHeading: `"font-size: 0.875rem;
  line-height:  1rem;
  font-weight: bold;
  text-align: left;
  color: #000000;
  margin: 0;"`,

  generalSubHeadingBold: `"font-size: 0.75rem;
  line-height: 1rem;
  font-weight: bold;
  text-align: left;
  color: #000000;
  margin: 0;"`,
  
  WritingText: `"font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  text-align: left;
  color: #262626;"`,
  
  WritingSmlText: `"font-size: 0.5rem;
  line-height: 0.7rem;
  font-weight: 400;
  text-align: left;
  color: #2E2E2E;
  margin: 0;"`,
  Container: `"margin: 0; padding: 2rem;"`,
  Body: `"background-color: white;
  font-family: Verdana, sans-serif"`,

};

export const generateInvoiceHTML = (invoiceData: any) => {

  const invoiceHtml = `
  <html>
   <body style=${styles.Body}>
     <div styles=${styles.WritingText}>Order ID: ${invoiceData.OrderId.OrderId}</div>
     <div styles=${styles.WritingText}>Customer ID: ${invoiceData.OrderId.ClientId}</div>
     <div styles=${styles.WritingSmlText}>Order date:  ${moment(invoiceData.OrderId.createdAt).format("LT")} | ${moment(
      invoiceData.OrderId.createdAt
    ).format("ll")}</div>
     <br>
     <div>
     <div styles=${styles.generalSubHeadingBold}>Product Info</div>
     <div styles=${styles.WritingSmlText}>Product SKU: ${invoiceData.ProductId.SKU}</div>
     <div styles=${styles.WritingSmlText}>Product Name: ${invoiceData.ProductId.Name}</div>
     <div styles=${styles.WritingSmlText}>Product Price: ${invoiceData.ProductId.Price}</div>
     <div styles=${styles.WritingSmlText}>Product Qty: ${invoiceData.Quantity}</div>
     <div styles=${styles.WritingSmlText}>Product Size: ${invoiceData.Size}</div>
     <div styles=${styles.WritingSmlText}>Product TotalPrice: ${invoiceData.TotalPrice}</div>
     <div styles=${styles.WritingSmlText}>Product Details: ${invoiceData.ProductId.Details}</div>

     </div>
   </body>
</html>
    `;
  return invoiceHtml;
};

export const generateInvoice = (
  generateInvoiceHTML: string,
  cb: {
    (err: any, pdfStream: any): void;
    (arg0: Error | null, arg1: ReadStream | null): void;
  }
) => {
  pdf
    .create(generateInvoiceHTML, { format: "Letter" })
    .toStream(function (err, stream) {
      if (err) return cb(err, null);
      return cb(null, stream);
    });
};
