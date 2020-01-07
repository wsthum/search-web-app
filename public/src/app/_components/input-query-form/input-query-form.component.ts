import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgFormSelectorWarning } from '@angular/forms';
import { QueryService } from '../../_services/query.service';
import { FileKeyService } from '../../_services/get-data-keys.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'input-query-form',
  templateUrl: './input-query-form.component.html',
  styleUrls: ['./input-query-form.component.css']
})

export class InputQueryFormComponent implements OnInit {
  // Types of static .json files
  typeNames: string[];
  // File type name to field value array map
  fileFieldMap: Map<string, string[]>;
  // Fields that should be displayed when file is chosen
  dynamicFields: string[];
  submitted = false;
  userForm: FormGroup;
  // Items that return from query service
  items = [];
  runQuery = false;

  constructor(private formBuilder: FormBuilder,
    private queryService: QueryService,
    private fileKeyService: FileKeyService) {
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
    // Storing the filename to array of field names map on page rendering
    this.typeNames = [];
    this.fileFieldMap = new Map();
    this.fileKeyService.getFileKeys()
      .subscribe((fileKeys) => {
        if (fileKeys['success']) {
          for (var fileName in fileKeys['data']) {
            this.typeNames.push(fileName);
            this.fileFieldMap[fileName] = fileKeys['data'][fileName];
          }
        } else {
          this.items = [];
        }
      }, error => {
        console.log(error);
      });
  }

  // Event triggered when file type dropdown value changes
  typeDropdownChange(fileType: string) {
    // Needed to make error messages go away
    this.runQuery = false;
    this.submitted = false;
    // Needed to reset field value so that selections can be remade
    this.userForm.get('field').setValue("");
    this.userForm.controls['field'].setErrors({ 'incorrect': true });
    // Changes fields to be displayed based on filetype
    this.dynamicFields = this.fileFieldMap[fileType];
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
    if (this.userForm.invalid == true) {
      return;
    }
    else {
      // query service is run
      this.runQuery = true;
      let data: any = Object.assign(this.userForm.value);
      data['keys'] = this.dynamicFields;
      // Assigning rows to be displayed from query result
      this.queryService.queryData(data)
        .subscribe((queryResult) => {
          if (queryResult['success']) {
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
