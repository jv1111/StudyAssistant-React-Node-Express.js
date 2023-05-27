const pdf = require("html-pdf");
const pdfTemplate = require("../documents");
const path = require("path");

const savePDF = (data) => {
    const projectRoot = path.resolve(__dirname, '../..');
    const pdfDirectory = `${projectRoot}/public/pdf`;
    const pdfFileName = `pdf${Date.now()}${data._id}.pdf`;
    const pdfFilePath = path.join(pdfDirectory, pdfFileName);

    return new Promise((resolve, reject) => {
        pdf.create(pdfTemplate(data), {
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: "/dev/null"
                }
            }
        }).toFile(pdfFilePath, (error) => {
            if (error) {
                console.log("error here");
                reject(error);
            }
            resolve({
                success: true,
                pdfName: pdfFileName,
                message: "PDF saved to server"
            })
        });
    })
}

// todo create a get pdf method and a download method in react



module.exports = {
    savePDF
};
