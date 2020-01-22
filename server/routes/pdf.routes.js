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
// Documentación oficial de la libreria en:
// http://pdfkit.org/docs/text.html
const PDFDocument = require('pdfkit');


/**
 * POST DOCUMENT
 */
app.post('/pdf', (req, res) => {
    let docName = `documentId-${uniqid('olimpica-')}.pdf`;
    let pathPDF = path.resolve(__dirname, `../docs/${docName}`);
    let content = `Officia enim aliquip labore elit dolor. Sint ut ea elit cillum do pariatur duis reprehenderit amet irure incididunt anim exercitation velit. Enim minim eiusmod in magna laboris magna cupidatat fugiat aliqua culpa.

In ullamco tempor exercitation labore ex laboris quis. Ad occaecat pariatur veniam fugiat cillum qui dolore commodo do elit sint cupidatat mollit. Incididunt qui veniam sint Lorem adipisicing in eiusmod dolore exercitation. Non laboris non commodo commodo aliqua enim officia nisi exercitation nostrud enim magna occaecat.

Elit aute ad proident sit incididunt sunt enim quis laborum consectetur magna. Sint do ullamco incididunt do ex. Veniam exercitation ipsum adipisicing id officia ex laboris. Ad est excepteur aliquip esse anim incididunt id consequat in cupidatat. Incididunt commodo reprehenderit id non elit incididunt magna ex labore et ipsum enim aliquip adipisicing.

Dolore pariatur dolor qui sit est culpa. Amet ut sunt id incididunt. Eiusmod in ad nulla amet eiusmod minim ullamco proident esse consequat cupidatat excepteur laborum consectetur. Consectetur magna labore in id velit.

Velit tempor adipisicing labore pariatur labore. Ex ex sint velit nulla quis ipsum minim eiusmod nulla sit. Sunt culpa mollit reprehenderit in qui Lorem consectetur est amet nostrud in laboris in. Est incididunt nisi tempor ea cupidatat quis in deserunt ullamco nostrud dolore qui. Deserunt ipsum fugiat quis veniam elit cupidatat deserunt ut quis minim reprehenderit sint. Quis do elit aute anim voluptate aute nostrud occaecat cillum non ad culpa. Veniam eiusmod sunt et culpa sint Lorem dolor duis fugiat in.

Elit aliqua non enim ea ea fugiat consequat reprehenderit magna dolore sit labore officia. Eu ipsum reprehenderit veniam eu ipsum ad qui irure fugiat sit consequat adipisicing ex eiusmod. Ad in mollit mollit consectetur deserunt dolore in elit enim sint. Cillum elit irure esse pariatur fugiat. Minim eiusmod laboris tempor dolore qui qui esse dolor.

Sit id amet sit eu minim culpa occaecat anim. Pariatur ea consequat veniam proident consequat duis id veniam ullamco. Dolor fugiat enim culpa voluptate ut. Eiusmod ea exercitation adipisicing eiusmod. Reprehenderit qui duis aliquip veniam officia deserunt irure proident minim consequat sit. Irure enim ullamco commodo fugiat velit dolor magna qui nisi mollit elit nulla dolore.

Culpa laboris fugiat labore cupidatat Lorem officia. Tempor labore occaecat excepteur qui dolore laboris irure incididunt dolore amet quis et. Aliquip deserunt magna in quis labore aliqua. Anim deserunt laborum sunt ipsum dolor commodo excepteur proident. Sint non velit consectetur veniam officia amet adipisicing in.

Ad et do elit ullamco commodo officia. Aliquip consectetur ad incididunt tempor. Consequat labore aute laborum ipsum aute excepteur ipsum sit laborum exercitation.

Eiusmod qui excepteur nostrud ipsum sit non dolore consequat duis nostrud mollit cillum Lorem est. Ad ipsum nisi non ullamco consequat deserunt culpa in in irure esse incididunt. Ad ut minim commodo irure aliquip mollit consectetur cupidatat magna. Ea amet ad id elit. Proident irure quis laboris excepteur sint consequat eu tempor est minim non laborum fugiat.`;

    writeStream = fs.createWriteStream(pathPDF); 
    const doc = new PDFDocument();
    doc.pipe(writeStream);
    doc.fontSize(25)
    .text('Title', {
        align: 'center'
    });
    doc.fontSize(12)
    .text(content, {
        align: 'justify'
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