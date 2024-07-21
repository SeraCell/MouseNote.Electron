import { app, ipcMain } from "electron";
import { constants } from "fs";

export class FileService {
    public rootPath = app.getPath("documents") + "\\MouseNote";
    public settingsFile = "settings.json";

    constructor() {}

    public saveFile(directory: string, filename: string, data: string) {
        const fs = require('fs');
        fs.access(filename, constants.F_OK, (err: any) => {
            if (err){
                fs.mkdir(directory, { recursive: true }, (err: any) => {
                    if (err) throw err;
                    fs.writeFile(directory + '\\' + filename, data, (err: any) => {
                        if (err) throw err;
                      }); 
                  });
            }
            else {
                fs.writeFile(directory + '\\' + filename, data, (err: any) => {
                    if (err) throw err;
                  }); 
            }
          });
    }

    public loadFile(file: string): string {
        const fs = require('fs');
        try {
             return fs.readFileSync(file, 'utf8')
        }
        catch (err){
            return '';
        }
    }
}