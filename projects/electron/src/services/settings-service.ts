import {ipcMain} from 'electron';
import { FileService } from './file-service';
import { SettingsModel } from '../models/settings';

export class SettingsService {
    fileService: FileService = new FileService();
    settings: SettingsModel = new SettingsModel();

    constructor() {}

    public startSettingsService() {
        ipcMain.on('get-settings', (event, arg) => {
            console.log('Getting settings');
            try{
                var settingsText = this.fileService.loadFile(this.fileService.rootPath + '\\' + this.fileService.settingsFile);
                const settings: SettingsModel = JSON.parse(settingsText);
                event.reply('returning-settings',settings); // Send a reply back to Angular
            }
            catch (e){
                event.reply('returning-settings',new SettingsModel()); // Send a reply back to Angular
            }
        });

        ipcMain.on('save-settings', (event, arg) => {
            let responseCode = 0;
            let responseMessage = 'Settings saved successfully';
            try{
                this.fileService.saveFile(this.fileService.rootPath, this.fileService.settingsFile, JSON.stringify(arg));
            }
            catch (e){
                responseCode = 1;
                responseMessage = e.message;
            }
            event.reply('saved-settings', responseMessage); // Send a reply back to Angular
        });
    }
}