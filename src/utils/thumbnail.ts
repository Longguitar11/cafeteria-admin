'use client'

import * as fs from 'fs';

export const saveToPublicFolder = (file: File) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const data = event.target?.result;
      if((data instanceof ArrayBuffer)) {
        return;
      }
      
      const base64Data = data?.split(',')[1];
      const buffer = Buffer.from(base64Data || '', 'base64');

      fs.writeFile(`./public/images/${file.name}`, buffer, (error) => {
        if (error) {
          console.error('Error saving file:', error);
        } else {
          console.log('File saved successfully');
        }
      });
    };
    reader.readAsDataURL(file);
};