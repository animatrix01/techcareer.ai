"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
}

export class PDFGenerator {
  private static readonly A4_WIDTH_MM = 210;
  private static readonly A4_HEIGHT_MM = 297;
  private static readonly A4_WIDTH_PX = 794; // 96 DPI
  private static readonly A4_HEIGHT_PX = 1123; // 96 DPI

  static async generateFromElement(
    element: HTMLElement,
    options: PDFOptions = {}
  ): Promise<void> {
    // Just trigger print dialog - no toasts
    window.print();
  }

  private static async waitForContent(element: HTMLElement): Promise<void> {
    // Wait for images to load
    const images = element.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
        setTimeout(() => resolve(), 2000); // Timeout after 2s
      });
    });

    // Wait for fonts to load
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Wait for all images
    await Promise.all(imagePromises);
    
    // Additional short delay to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}