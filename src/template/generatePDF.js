"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = exports.generateInvoiceHTML = void 0;
const moment_1 = __importDefault(require("moment"));
const html_pdf_1 = __importDefault(require("html-pdf"));
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
const generateInvoiceHTML = (invoiceData) => {
    const invoiceHtml = `
  <html>
   <body style=${styles.Body}>
     <div styles=${styles.WritingText}>Order ID: ${invoiceData.OrderId.OrderId}</div>
     <div styles=${styles.WritingText}>Customer ID: ${invoiceData.OrderId.ClientId}</div>
     <div styles=${styles.WritingSmlText}>Order date:  ${(0, moment_1.default)(invoiceData.OrderId.createdAt).format("LT")} | ${(0, moment_1.default)(invoiceData.OrderId.createdAt).format("ll")}</div>
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
exports.generateInvoiceHTML = generateInvoiceHTML;
const generateInvoice = (generateInvoiceHTML, cb) => {
    html_pdf_1.default
        .create(generateInvoiceHTML, { format: "Letter" })
        .toStream(function (err, stream) {
        if (err)
            return cb(err, null);
        return cb(null, stream);
    });
};
exports.generateInvoice = generateInvoice;
