const puppeteer = require("puppeteer");
const pdfTemplate = require("../documents");
const path = require("path");
const fs = require("fs/promises");

const savePDF = async (data) => {
  const projectRoot = path.resolve(__dirname, "../..");
  const pdfDirectory = path.join(projectRoot, "public", "pdf");

  await fs.mkdir(pdfDirectory, {
    recursive: true,
  });

  const pdfFileName = `pdf${Date.now()}${data._id}.pdf`;
  const pdfFilePath = path.join(pdfDirectory, pdfFileName);

  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(pdfTemplate(data), {
      waitUntil: "networkidle0",
    });

    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    return {
      success: true,
      pdfName: pdfFileName,
      path: pdfFilePath,
      message: "PDF saved to server",
    };
  } finally {
    await browser.close();
  }
};

const fileDelete = async (filePath) => {
  await fs.unlink(filePath);

  return {
    success: true,
    message: "File deleted",
  };
};

module.exports = {
  savePDF,
  fileDelete,
};
