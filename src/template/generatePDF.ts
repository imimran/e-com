import moment from "moment";
import pdf from "html-pdf";

import { ReadStream } from "fs";



export const generateInvoiceHTML = (invoiceData: any) => {

  const invoiceHtml = `
  <html>
   <body>
   
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
