import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userEmail: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  deliveryDate?: string;
  paymentMethod: 'online' | 'cash';
  products: OrderProduct[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  createdAt: string;
}

export async function generateOrderPdf(order: Order): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([612, 792]); // US Letter
  const { width } = page.getSize();

  let y = 750;

  // Header background
  page.drawRectangle({
    x: 0,
    y: 700,
    width,
    height: 92,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Company name
  page.drawText('Tech Net', {
    x: 50,
    y: 740,
    size: 28,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText('Order Receipt', {
    x: 50,
    y: 715,
    size: 12,
    font,
    color: rgb(0.7, 0.7, 0.7),
  });

  y = 670;

  // Order info section
  page.drawText('ORDER DETAILS', {
    x: 50,
    y,
    size: 11,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  y -= 25;

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const leftCol = 50;
  const rightCol = 350;

  page.drawText(`Order ID:`, {
    x: leftCol,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(`#${order._id.slice(-6).toUpperCase()}`, {
    x: leftCol + 70,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(`Date:`, {
    x: rightCol,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(orderDate, {
    x: rightCol + 40,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 20;

  page.drawText(`Status:`, {
    x: leftCol,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(order.status.toUpperCase(), {
    x: leftCol + 50,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.5, 0.1),
  });

  page.drawText(`Payment:`, {
    x: rightCol,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(order.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery', {
    x: rightCol + 60,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 35;

  // Divider
  page.drawLine({
    start: { x: 50, y: y + 10 },
    end: { x: width - 50, y: y + 10 },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Delivery info
  page.drawText('DELIVERY INFORMATION', {
    x: 50,
    y,
    size: 11,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  y -= 22;

  page.drawText(order.name, {
    x: leftCol,
    y,
    size: 11,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  y -= 18;

  page.drawText(order.phone, {
    x: leftCol,
    y,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 16;

  const addressText = `${order.address}, ${order.city}`;
  page.drawText(addressText, {
    x: leftCol,
    y,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 35;

  // Divider
  page.drawLine({
    start: { x: 50, y: y + 10 },
    end: { x: width - 50, y: y + 10 },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Items table header
  page.drawText('ITEMS', {
    x: 50,
    y,
    size: 11,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  y -= 25;

  // Table header background
  page.drawRectangle({
    x: 50,
    y: y - 5,
    width: width - 100,
    height: 22,
    color: rgb(0.96, 0.96, 0.96),
  });

  page.drawText('Product', {
    x: 60,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  page.drawText('Qty', {
    x: 340,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  page.drawText('Price', {
    x: 400,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  page.drawText('Total', {
    x: 490,
    y,
    size: 10,
    font: boldFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  y -= 22;

  // Items
  for (const product of order.products) {
    const itemTotal = product.price * product.quantity;

    page.drawText(product.name, {
      x: 60,
      y,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    page.drawText(`${product.quantity}`, {
      x: 355,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
    page.drawText(`$${product.price.toFixed(2)}`, {
      x: 400,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
    page.drawText(`$${itemTotal.toFixed(2)}`, {
      x: 490,
      y,
      size: 10,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 20;

    // Light divider between items
    page.drawLine({
      start: { x: 60, y: y + 8 },
      end: { x: width - 60, y: y + 8 },
      thickness: 0.5,
      color: rgb(0.95, 0.95, 0.95),
    });
  }
  y -= 10;

  // Totals section
  page.drawRectangle({
    x: 350,
    y: y - 90,
    width: 212,
    height: 100,
    color: rgb(0.96, 0.96, 0.96),
  });

  const totalsX = 370;
  const totalsValueX = 520;

  page.drawText('Subtotal:', {
    x: totalsX,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(`$${order.subtotal.toFixed(2)}`, {
    x: totalsValueX,
    y,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 20;

  page.drawText('Delivery Fee:', {
    x: totalsX,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText(`$${order.deliveryFee.toFixed(2)}`, {
    x: totalsValueX,
    y,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 25;

  // Total divider
  page.drawLine({
    start: { x: totalsX, y: y + 8 },
    end: { x: totalsValueX + 60, y: y + 8 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  page.drawText('TOTAL:', {
    x: totalsX,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  page.drawText(`$${order.total.toFixed(2)}`, {
    x: totalsValueX,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Footer
  page.drawText('Thank you for your purchase!', {
    x: 50,
    y: 50,
    size: 12,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  page.drawText('Tech Net | Support: support@technet.com', {
    x: 50,
    y: 35,
    size: 9,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `order-${order._id.slice(-6)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateAllOrdersPdf(orders: Order[]): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const page = pdfDoc.addPage([612, 792]);
    const { width } = page.getSize();

    let y = 750;

    // Header
    page.drawRectangle({
      x: 0,
      y: 700,
      width,
      height: 92,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawText('Tech Net', {
      x: 50,
      y: 740,
      size: 28,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText(`Order ${i + 1} of ${orders.length}`, {
      x: 50,
      y: 715,
      size: 12,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });

    y = 670;

    // Order details
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    page.drawText(`Order #${order._id.slice(-6).toUpperCase()}  |  ${orderDate}  |  ${order.status.toUpperCase()}`, {
      x: 50,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 25;

    // Delivery
    page.drawText(`${order.name}  |  ${order.phone}  |  ${order.address}, ${order.city}`, {
      x: 50,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 30;

    // Items header
    page.drawRectangle({
      x: 50,
      y: y - 5,
      width: width - 100,
      height: 20,
      color: rgb(0.96, 0.96, 0.96),
    });

    page.drawText('Product', { x: 60, y, size: 10, font: boldFont, color: rgb(0.4, 0.4, 0.4) });
    page.drawText('Qty', { x: 340, y, size: 10, font: boldFont, color: rgb(0.4, 0.4, 0.4) });
    page.drawText('Price', { x: 400, y, size: 10, font: boldFont, color: rgb(0.4, 0.4, 0.4) });
    page.drawText('Total', { x: 490, y, size: 10, font: boldFont, color: rgb(0.4, 0.4, 0.4) });
    y -= 22;

    for (const product of order.products) {
      const itemTotal = product.price * product.quantity;
      page.drawText(product.name, { x: 60, y, size: 10, font, color: rgb(0.1, 0.1, 0.1) });
      page.drawText(`${product.quantity}`, { x: 355, y, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(`$${product.price.toFixed(2)}`, { x: 400, y, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(`$${itemTotal.toFixed(2)}`, { x: 490, y, size: 10, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
      y -= 18;
    }

    y -= 15;

    // Totals
    page.drawText(`Subtotal: $${order.subtotal.toFixed(2)}`, { x: 370, y, size: 10, font, color: rgb(0.5, 0.5, 0.5) });
    y -= 18;
    page.drawText(`Delivery: $${order.deliveryFee.toFixed(2)}`, { x: 370, y, size: 10, font, color: rgb(0.5, 0.5, 0.5) });
    y -= 25;
    page.drawText(`TOTAL: $${order.total.toFixed(2)}`, { x: 370, y, size: 14, font: boldFont, color: rgb(0.1, 0.1, 0.1) });

    // Footer
    page.drawText('Thank you for your purchase!', { x: 50, y: 50, size: 10, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'all-orders.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
