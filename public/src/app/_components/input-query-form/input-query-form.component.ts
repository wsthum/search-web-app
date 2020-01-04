import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgFormSelectorWarning } from '@angular/forms';
import { QueryService } from '../../_services/query.service';

@Component({
  selector: 'input-query-form',
  templateUrl: './input-query-form.component.html',
  styleUrls: ['./input-query-form.component.css']
})

export class InputQueryFormComponent implements OnInit {
  typeNames: string[] = ['organizations', 'tickets', 'users'];
  userFields: string[] = ['_id', 'url', 'external_id', 'name', 'alias', 'created_at', 'active', 
                          'verified', 'shared', 'locale', 'timezone', 'last_login_at', 'email', 
                          'phone', 'signature', 'organization_id', 'tags', 'suspended', 'role'];
  ticketFields: string[] = ['_id', 'url', 'external_id', 'created_at', 'type', 'subject', 
                            'description', 'priority', 'status', 'recipient', 'submitted_id', 
                            'assignee_id', 'organization_id', 'tags', 'has_incidents', 'due_at', 
                            'via', 'requester_id'];
  orgFields: string[] = ['_id', 'url', 'external_id', 'name', 'domain_names', 'created_at', 
                          'details', 'shared_tickets', 'tags'];
  dynamicFields: string[];
  submitted = false;
  userForm: FormGroup;
  items = [];
  runQuery = false;

  constructor(private formBuilder: FormBuilder,
              private queryService: QueryService) { 
    this.userForm = this.formBuilder.group({
      type: ['', Validators.required],
      field: ['', Validators.required],
      value: ['']
    });
  }

  invalidType() {
  	return (this.submitted && this.userForm.controls.type.errors != null);
  }

  invalidField() {
  	return (this.submitted && this.userForm.controls.field.errors != null);
  }

  noResultsFound() {
    return (this.runQuery && this.items.length == 0);
  }

  resultsFound() {
    return (this.runQuery && this.items.length != 0);
  }

  ngOnInit() {

  }

  typeDropdownChange(val: string) {
    this.runQuery = false;
    this.submitted = false;
    this.userForm.get('field').setValue("");
    this.userForm.controls['field'].setErrors({'incorrect': true});
    if(val === 'organizations') {
      this.dynamicFields = this.orgFields;
    } else if(val === 'users') {
      this.dynamicFields = this.userFields;
    } else if(val === 'tickets') {
      this.dynamicFields = this.ticketFields;
    }
  }

  fieldDropdownChange(val: string) {
    this.submitted = false;
    this.runQuery = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.userForm.value);
  	if(this.userForm.invalid == true) {
  		return;
  	}
  	else {
      this.runQuery = true;
      let data: any = Object.assign(this.userForm.value);
      this.queryService.queryData(data)
        .subscribe((queryResult) => {
          if(queryResult['success']) {
            this.items = queryResult['data'];
          } else {
            this.items = []
          }
        })

    }
    
  }

}
