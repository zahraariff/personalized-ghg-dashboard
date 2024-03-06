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
  
    // Crop 5px from the top of the image
    const croppedImage = await pdfDoc.embedPng(reportContent.slice(0, intrinsicWidth * 4 * (intrinsicHeight - 5)));
  
    // Calculate scaling factors for width and height
    const { width, height } = page.getSize();
    const scaleX = width / intrinsicWidth;
    const scaleY = height / (intrinsicHeight - 5); // Subtract 5px from the height
  
    // Use the minimum scaling factor to ensure the entire image fits within the page
    const scaleFactor = Math.min(scaleX, scaleY);
  
    // Calculate the adjusted width and height based on the scaling factor
    let adjustedWidth = intrinsicWidth * scaleFactor;
    const adjustedHeight = (intrinsicHeight - 5) * scaleFactor; // Subtract 5px from the height
  
    // Check if the adjustedWidth is not maximum (600)
    if (adjustedWidth > 600) {
      adjustedWidth = 600;
    }
  
    // Calculate the centering position
    const centerX = (width - adjustedWidth) / 2;
    const centerY = height - adjustedHeight - 20; // Move the image down by adjusting this value
  
    // Draw the cropped image with adjusted width and height to fit the page
    page.drawImage(croppedImage, {
      x: centerX,
      y: centerY,
      width: adjustedWidth,
      height: adjustedHeight,
    });
  
    // Add the title of the report to the PDF page
    const titleHeight = 5; // Adjust the title height as needed
    const gapBelowTitle = 20; // Adjust this value as needed
    page.drawText(title, { x: 50, y: height - titleHeight - gapBelowTitle, size: 10 });
  
    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();
  
    return pdfBytes;
  }
  
  
  
  
}
