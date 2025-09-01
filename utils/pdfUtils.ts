import pdfMake from 'pdfmake/build/pdfmake';

// The 'pdfmake/build/vfs_fonts.js' file is a UMD module. To use it reliably
// in an ES module environment without polluting the global scope, we import it
// and directly assign the virtual file system (VFS) it contains to our pdfMake instance.
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// The imported UMD module attaches its exports to a `pdfMake` property.
// We safely access this and assign the `vfs` object.
if (pdfFonts && (pdfFonts as any).pdfMake && (pdfFonts as any).pdfMake.vfs) {
  (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
} else {
  console.error("vfs_fonts.js failed to load, so the default Roboto font will be unavailable. PDF font support may be limited.");
  // Ensure vfs is an object to prevent crashes, even if it's empty.
  if (!(pdfMake as any).vfs) {
    (pdfMake as any).vfs = {};
  }
}

let cairoFontLoaded = false;

async function fetchFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function ensureArabicPdfFont(): Promise<void> {
  if (cairoFontLoaded) {
    return;
  }
  
  try {
    const fontUrl = 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/cairo/Cairo-Regular.ttf';
    const cairoRegularBase64 = await fetchFontAsBase64(fontUrl);
    
    (pdfMake as any).vfs['Cairo-Regular.ttf'] = cairoRegularBase64;

    pdfMake.fonts = {
      ...(pdfMake.fonts || {}),
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      Cairo: {
        normal: 'Cairo-Regular.ttf',
        bold: 'Cairo-Regular.ttf',
        italics: 'Cairo-Regular.ttf',
        bolditalics: 'Cairo-Regular.ttf'
      }
    };
    cairoFontLoaded = true;
  } catch (error) {
    console.error("Could not load Arabic font 'Cairo' for PDF export. The PDF will be generated with the default font, which may not display Arabic characters correctly.", error);
  }
}

export async function generateSha256Hash(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}