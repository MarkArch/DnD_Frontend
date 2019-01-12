import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import { RestServiceService } from '../../../shared/rest-service.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  constructor(private service: RestServiceService, private shared: SharedVariableService) { }

  public character = this.shared.character.diary;
  public editor = ClassicEditor;
  public model = {
    editorData: this.character
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
    this.service.updatePg(char,value).subscribe();
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
