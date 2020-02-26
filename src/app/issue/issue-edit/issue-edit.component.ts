import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  issueForm: FormGroup;
  updateIssue = {
    isSuccess: null,
    message: ''
  };
  isEditMode = false;

  constructor(private issueService: IssueService, private fb: FormBuilder) {}


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (!this.isEditMode) {
      this.issueForm = this.fb.group({
        _id: [{value: '', disabled: true}],
        createFields: this.fb.group({
          project: ['', Validators.required],
          type: [{value: 'Bug', disabled: true}, Validators.required],
          status: ['Open', Validators.required],
          priority: ['Normal', Validators.required],
          summary: ['', Validators.required],
          description: [''],
        }),
        createdAt: [{value: '', disabled: true}],
        updatedAt: [{value: '', disabled: true}]
      });
    } else {
      // TODO create getIssue in service
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.issueForm.controls; }
  get fAdd() { return this.f.createFields['controls']; }

  onSubmit() {
    if (this.isEditMode) {
      const editedIssue = this.issueForm.value;
      // TODO create editIssue in service
      /*
      this.issueService.editIssue(editedIssue).subscribe(issue => {
        console.log(issue);
      },
      error => {
          console.log('TODO send error message to screen', error);
      });
      */
    } else {
      // Add a new issue
      const newIssue = this.issueForm.getRawValue().createFields;
      this.issueService.addIssue(newIssue).subscribe(issue => {
        if (issue._id) {
          this.updateIssue.isSuccess = true;
          this.updateIssue.message = 'Issue was successfully added!';
          this.issueForm.reset();
          this.initForm();
        }
      },
      error => {
        if (error.status === 422) {
          this.updateIssue.isSuccess = false;
          this.updateIssue.message = 'There was a problem adding this issue';
        } else {
          console.log('TODO send error message to screen', error);
        }
      });
    }
  }
}
