import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import { RestServiceService } from '../../../shared/rest-service.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  constructor(private service: RestServiceService, private shared: SharedVariableService, private toastr: ToastrService) {
    this.service.chooseCharacter('', 0).subscribe( res => {
      console.log(res);
      this.model.editorData = res.diary;
    });
   }

  public character;
  public editor = ClassicEditor;
  public model = {
    editorData: String
};
public config = {
  alignment: {
    options: [ 'left', 'right' ]},
    toolbar: [
      'heading', '|', 'bulletedList', 'numberedList', 'alignment', 'undo', 'redo'
  ]
};

  ngOnInit() {
  }

  onChangeAttribute(char: String,value:String){
    this.service.updatePg(char,value).subscribe( res => {
      this.toastr.success('Your upload was successful');
      this.service.chooseCharacter('', 0).subscribe( res => {
        this.model.editorData = res.diary;
      });
    },err=>{this.toastr.error('There was an error while trying to process your request, please try again later')});
  }

  onResetDiary() {
    let str = "";
    this.onChangeAttribute ('diary', str);
  }

  public onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
    );
}

}
