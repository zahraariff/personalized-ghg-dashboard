import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }
  
  private async captureDivImage(divId: string): Promise<Uint8Array> {
    const divElement = document.getElementById(divId);

    if (!divElement) {
      console.error(`Element with ID '${divId}' not found.`);
      return new Uint8Array(0); // Return an empty buffer or handle the error as needed.
    }
  
    // Use html2canvas to capture the div content as an image
    const canvas = await html2canvas(divElement);
  
    // Convert the canvas to a data URL and then to a Uint8Array
    const dataUrl = canvas.toDataURL('image/png');
    const data = dataUrl.split(',')[1];
    const buffer = new Uint8Array(atob(data).split('').map((char) => char.charCodeAt(0)));
  
    return buffer;
  }

  async generatePdfWithChartTable(title: any): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
  
    // Add a page to the document
    let page = pdfDoc.addPage();
  
    // Use html2canvas to capture the content of the div with the ID "chart" as an image
    const reportContent = await this.captureDivImage('report-wrapper');
  
    // Embed the chart image in the PDF
    const embeddedContent = await pdfDoc.embedPng(reportContent);

    // Get the intrinsic width and height of the embedded image
    const intrinsicWidth = embeddedContent.width;
    const intrinsicHeight = embeddedContent.height;
  

    // Add the title of the report to the PDF page
    const { width, height } = page.getSize();
    page.drawText(title, {x: 50, y: height - 50, size: 14});
  
     // Calculate scaling factors for width and height
    const scaleX = width / intrinsicWidth;
    const scaleY = height / intrinsicHeight;

  // Use the minimum scaling factor to ensure the entire image fits within the page
    const scaleFactor = Math.min(scaleX, scaleY);

  // Calculate the adjusted width and height based on the scaling factor
    let adjustedWidth = intrinsicWidth * scaleFactor;
    const adjustedHeight = intrinsicHeight * scaleFactor;

  // Calculate the centering position
    const centerX = (width - adjustedWidth) / 2;
    let centerY = (height - adjustedHeight) / 2;

    // Check if the image height exceeds the remaining space on the current page
  if (centerY < 0) {
    // If it does, add a new page
    page = pdfDoc.addPage();
    centerY = height - adjustedHeight;
  }

      // Assuming you want the image to be positioned 20% from the top
    const verticalPercentage = 0.1; // 20%

    // Calculate the vertical position based on the percentage
    centerY = height * verticalPercentage - adjustedHeight / 2;

    // Ensure centerY is within bounds
    centerY = Math.max(centerY, 0); // Ensure it's not negative
    centerY = Math.min(centerY, height - adjustedHeight); // Ensure it fits within the page height

    // Check if the adjustedWidth is not maximum (600)
    if(adjustedWidth > 600) {
      adjustedWidth = 600;
    }

  // Add the title of the report to the PDF page
    page.drawText(title, { x: 50, y: height - 50, size: 14 });


   // Crop and draw the upper part of the image
  const sourceX = 0; // X-coordinate in the source image (left-most)
  const sourceY = 0; // Y-coordinate in the source image (top-most)
  const sourceWidth = intrinsicWidth; // Width of the source image
  const sourceHeight = intrinsicHeight / 2; // Height of the cropped portion

  const destX = 0; // X-coordinate in the destination canvas (left-most)
  const destY = 0; // Y-coordinate in the destination canvas (top-most)
  const destWidth = adjustedWidth; // Width of the destination canvas
  const destHeight = adjustedHeight; // Height of the destination canvas

  // Draw the image with adjusted width and height to fit the page
    page.drawImage(embeddedContent, {
      x: centerX,
      // y: height - 450,
      y: centerY,
      width: adjustedWidth,
      height: adjustedHeight,
    });


    // Save the PDF to a Uint8Array

    const pdfBytes = await pdfDoc.save();
  
    return pdfBytes;
  }
  
}
