import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketaddService } from './ticketadd.service';
import { PagerService } from './_services/index';
@Component({
  selector: 'nt-listing',
  templateUrl: 'new-tickets.component.html',
  providers: [TicketaddService]
})
export class NewTicketsComponent implements OnInit {
  userForm: FormGroup;
  public selectedId;
  private  errorMessage: string;
  private  result;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  constructor(public _ticketaddservice: TicketaddService, private _pagerService: PagerService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._ticketaddservice.newTickets()
      .subscribe(results => {
       // set items to json response
        this.allItems = results;
        // initialize to page 1
        this.setPage(1);
    });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  deleteCurrentTicket(id: number) {
    this._ticketaddservice.deleteTickets(id)
      .subscribe(results => {
        this.allItems = results;
          });
    location.reload();
  }


 }
