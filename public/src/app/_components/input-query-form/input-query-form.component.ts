import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-query-form',
  templateUrl: './input-query-form.component.html',
  styleUrls: ['./input-query-form.component.css']
})

export class InputQueryFormComponent implements OnInit {
  submitted = false;
  userForm: FormGroup;
  items = []

  constructor(private formBuilder: FormBuilder) { 
  }

  invalidDataType() {
  	return (this.submitted && this.userForm.controls.data_type.errors != null);
  }

  invalidInputField() {
  	return (this.submitted && this.userForm.controls.input_field.errors != null);
  }

  ngOnInit() {
  	this.userForm = this.formBuilder.group({
  		data_type: ['', Validators.required],
  		input_field: ['', Validators.required]
  	});
  }

  onSubmit() {
    this.submitted = true;
  	if(this.userForm.invalid == true) {
  		return;
  	}
  	else {
  	}
  }

}
