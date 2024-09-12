export class HTMLRender{

    static renderImportCompleted(){
        return '<div style="margin-top: 32px; text-align: center;">'
        + '<h1 style="color: deepskyblue;>Your file has been imported successfully.</h1>'
        + '<h2>Click to go back to <a href="http://34.238.176.205:8080">Colour Artisan: Web Admin</a></h2>'
        + '</div>';
    }

    static renderImportFailed(){
        return '<div style="margin-top: 32px; text-align: center;">'
        + '<h1 style="color: red;">ERROR! We are unable to import this file due to incompatibility.</h1>'
        + '<h2>Click to go back to <a href="http://34.238.176.205:8080">Colour Artisan: Web Admin</a></h2>'
        + '</div>';
    }

    static renderImportNotFound(){
        return '<div style="margin-top: 32px; text-align: center;">'
        + '<h1 style="color: red;">ERROR! File not found, please select the file to import.</h1>'
        + '<h2>Click to go back to <a href="http://34.238.176.205:8080">Colour Artisan: Web Admin</a></h2>'
        + '</div>';
    }

    static renderExportCompleted(){
        return '<div style="margin-top: 32px; text-align: center;">'
        + '<h1 style="color: deepskyblue;>Your file has been exported successfully.</h1>'
        + '<h3>Click to go back to <a href="http://34.238.176.205:8080">Colour Artisan: Web Admin</a></h3>'
        + '</div>';
    }


}