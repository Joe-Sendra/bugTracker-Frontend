import { Component, OnInit } from '@angular/core';

import { Issue } from '../issue.model';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().then(response => this.issues = response);
  }
}
