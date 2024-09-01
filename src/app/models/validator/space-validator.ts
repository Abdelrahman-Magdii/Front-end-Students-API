import {FormControl, ValidationErrors} from "@angular/forms";

export class SpaceValidator {

  static noSpaces(control:FormControl):ValidationErrors | null{
    if(control!=null && control.value.trim().length==0){
      return {'noSpaces' :true};
    }else{
      return null;
    }
  }

}
