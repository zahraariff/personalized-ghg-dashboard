import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async generatePdf(title: string): Promise<Uint8Array> {
    console.log('generatepdf is called')
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page to the document
    const page = pdfDoc.addPage();

    // Set some text on the page
    const { width, height } = page.getSize();
    page.drawText(title, { x: 50, y: height - 200 });

    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();
    
    return pdfBytes;
  }

  async generatePdfWithIframe(): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page to the document
    const page = pdfDoc.addPage();

    // Use html2canvas to capture the content of the iframe as an image
    // const iframeImage = await this.captureIframeImage('hidden-iframe');
    const iframeImage = await this.captureIframeImage('chart');


    // Embed the iframe image in the PDF
    const embeddedImage = await pdfDoc.embedPng(iframeImage);

    // Add the image to the PDF page
    const { width, height } = page.getSize();
    page.drawImage(embeddedImage, {
      x: 50,
      y: height - 200,
      width: 200,
      height: 100,
    });

    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  private async captureIframeImage(iframeId: string): Promise<Uint8Array> {
    
    const iframeElement = document.getElementById(iframeId) as HTMLIFrameElement;

    // Wait for the iframe to fully load
    // await new Promise(resolve => iframeElement.addEventListener('load', resolve));

    // Use html2canvas to capture the iframe content as an image
    const canvas = await html2canvas(iframeElement); 

    // Convert the canvas to a data URL and then to a Uint8Array; This has performance issues.
    const dataUrl = canvas.toDataURL('image/png'); 
    const data = dataUrl.split(',')[1];
    const buffer = new Uint8Array(atob(data).split('').map((char) => char.charCodeAt(0)));

    return buffer;
  }

  async generatePdfWithChart(title: any): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
  
    // Add a page to the document
    const page = pdfDoc.addPage();
  
    // Use html2canvas to capture the content of the div with the ID "chart" as an image
    const chartImage = await this.captureDivImage('chartDiv');
  
    // Embed the chart image in the PDF
    const embeddedImage = await pdfDoc.embedPng(chartImage);

    // Add the title of the report to the PDF page
    const { width, height } = page.getSize();
    page.drawText(title, {x: 50, y: height - 200});
  
    // Add the image to the PDF page
    page.drawImage(embeddedImage, {
      x: 50,
      y: height - 300,
      width: 200,
      height: 100,
    });
  
    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();
  
    return pdfBytes;
  }
  
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
  
}
