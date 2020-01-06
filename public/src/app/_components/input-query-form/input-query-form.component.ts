import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgFormSelectorWarning } from '@angular/forms';
import { QueryService } from '../../_services/query.service';

@Component({
  selector: 'input-query-form',
  templateUrl: './input-query-form.component.html',
  styleUrls: ['./input-query-form.component.css']
})

export class InputQueryFormComponent implements OnInit {
  // Types of file types that are valid
  typeNames: string[] = ['organizations', 'tickets', 'users'];
  // Static values for each file type selection
  userFields: string[] = ['_id', 'url', 'external_id', 'name', 'alias', 'created_at', 'active', 
                          'verified', 'shared', 'locale', 'timezone', 'last_login_at', 'email', 
                          'phone', 'signature', 'organization_id', 'tags', 'suspended', 'role'];
  ticketFields: string[] = ['_id', 'url', 'external_id', 'created_at', 'type', 'subject', 
                            'description', 'priority', 'status', 'submitter_id', 
                            'assignee_id', 'organization_id', 'tags', 'has_incidents', 'due_at', 
                            'via'];
  orgFields: string[] = ['_id', 'url', 'external_id', 'name', 'domain_names', 'created_at', 
                          'details', 'shared_tickets', 'tags'];
  // Fields that should be displayed when file type is chosen
  dynamicFields: string[];
  submitted = false;
  userForm: FormGroup;
  // Items that return from query service
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

  // Checks to see if error for filetype should show after submission
  invalidType() {
  	return (this.submitted && this.userForm.controls.type.errors != null);
  }

  // Checks to see if field error should show after submission
  invalidField() {
  	return (this.submitted && this.userForm.controls.field.errors != null);
  }

  // Shows when results are not found after query is run
  noResultsFound() {
    return (this.runQuery && this.items.length == 0);
  }

  // Shows number of records when results are found
  resultsFound() {
    return (this.runQuery && this.items.length != 0);
  }

  ngOnInit() {

  }

  // Event triggered when file type dropdown value changes
  typeDropdownChange(val: string) {
    // Needed to make error messages go away
    this.runQuery = false;
    this.submitted = false;
    // Needed to reset field value so that selections can be remade
    this.userForm.get('field').setValue("");
    this.userForm.controls['field'].setErrors({'incorrect': true});
    // Changes fields to be displayed based on filetype
    if(val === 'organizations') {
      this.dynamicFields = this.orgFields;
    } else if(val === 'users') {
      this.dynamicFields = this.userFields;
    } else if(val === 'tickets') {
      this.dynamicFields = this.ticketFields;
    }
  }

  // Event triggered when field name dropdown value changes
  fieldDropdownChange(val: string) {
    this.submitted = false;
    this.runQuery = false;
  }

  // Triggers when submit button is pressed
  onSubmit() {
    this.submitted = true;
    // If form is invalid, nothing changes, errors thrown
  	if(this.userForm.invalid == true) {
  		return;
  	}
  	else {
      // query service is run
      this.runQuery = true;
      let data: any = Object.assign(this.userForm.value);
      // Assigning rows to be displayed from query result
      this.queryService.queryData(data)
        .subscribe((queryResult) => {
          if(queryResult['success']) {
            this.items = queryResult['data'];
          } else {
            this.items = [];
          }
        }, error => {
          console.log(error);
        });

    }
    
  }

}
