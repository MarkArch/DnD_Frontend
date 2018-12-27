import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-campaign-select',
  templateUrl: './campaign-select.component.html',
  styleUrls: ['./campaign-select.component.scss']
})
export class CampaignSelectComponent implements OnInit, OnDestroy {

  constructor(public route: ActivatedRoute, public router: Router, public modalService: BsModalService) { }

  public x = [0, 0, 0, 0, 0];
  modalRef: BsModalRef;
  ngOnInit() {
  }

  onSelectCharacter() {
    this.router.navigate(['/dashboard']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy() {
    this.modalRef.hide();
  }

}
