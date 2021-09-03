import { FormControl } from '@angular/forms';
export class UploadFileValidators {
  static requiredFileType( type: string ) {
    return function ( control: FormControl ) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
          return {
            requiredFileType: true
          };
        }

        return null;
      }

      return null;
    };
  }
}
