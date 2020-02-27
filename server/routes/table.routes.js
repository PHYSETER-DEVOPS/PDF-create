/*jshint esversion: 6 */

// Default
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports
var uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('./../utils/pdf-table');

// Llamada al servicio
// http://localhost:3000/pdf/table
// Ubiicación del archivo generado /server/docs
/**
 * POST DOCUMENT WITH TABLES
 */
app.post('/pdf/table', (req, res) => {
    let content = `Officia enim aliquip labore elit dolor. Sint ut ea elit cillum do pariatur duis reprehenderit amet irure incididunt anim exercitation velit. Enim minim eiusmod in magna laboris magna cupidatat fugiat aliqua culpa.

    In ullamco tempor exercitation labore ex laboris quis. Ad occaecat pariatur veniam fugiat cillum qui dolore commodo do elit sint cupidatat mollit. Incididunt qui veniam sint Lorem adipisicing in eiusmod dolore exercitation. Non laboris non commodo commodo aliqua enim officia nisi exercitation nostrud enim magna occaecat.\n\n`;

    // Content Table
    // Las cabeceras pueden ir predefinidas o igual puede ser generada en el FrontEnd o Backend
    let headers = ['MESES', 'FECHA', 'INTERESES', 'AMORTIZACIÓN', 'CUOTA\nVEHÍCULO', 'SEGURO\nVEHÍCULO', 'SEGURO\nDESGRAV', 'TOTAL\nPAGAR', 'SALDO PENDIENTE'];
    // Esto sería el contenido de la amortización generada ya sea en el FrontEnd o Backend
    let rows = []; 
    for (let i = 0; i < 200; i++) {
        rows.push([i, '01/20/20', i, i, i, i, i, i, i]);
    }
    let docName = `documentId-${uniqid('olimpica-')}.pdf`;
    let pathPDF = path.resolve(__dirname, `../docs/${docName}`);
    writeStream = fs.createWriteStream(pathPDF); 
    const doc = new PDFDocument();
    doc.pipe(writeStream);

    const table = {
        headers,
        rows
    };
    doc.fontSize(18)
    .text('Tabla de Amortización', {
        align: 'center'
    });
    doc.fontSize(12)
    .text(content, {
        align: 'justify'
    });
    doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(6),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(7)
    });
    doc.end();

    writeStream.on('finish', () => {
        res.json({
            statusCode: 200,
            message: 'Document Generated'
        });
    });

    writeStream.on('error', (error) => {
        return res.json({
            statusCode: 400,
            message: 'Bad Request',
            content: error
        });
    });
});

/**
 * GET DOCUMENT
 */
app.get('/pdf/:pdfName', (req, res) => {
    let pdf = req.params.pdfName;
    let pdfPath = path.resolve(__dirname, `../docs/${pdf}`);
    if (fs.existsSync(pdfPath)) {
        res.sendFile(pdfPath);
    } else {
        res.json({
            statusCode: 404,
            message: 'PDF not Found'
        });
    }

    // Para ver el documento vas al siguiente link
    // http://localhost:3000/pdf/documentId-olimpica-gaovkq6tkk5pl7gan.pdf
});


module.exports = app;