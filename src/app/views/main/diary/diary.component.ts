import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  constructor() { }

  public editor = ClassicEditor;
  public model = {
    editorData: ''
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

  public onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
    );
}

}
