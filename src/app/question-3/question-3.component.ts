import { Component } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-question-3',
  templateUrl: './question-3.component.html',
  styleUrls: ['./question-3.component.css']
})
export class Question3Component {
  username: string = 'bishtmanish739';  // Replace with any username
  owner: any;
  repositories: any[] = [];
  page: number = 1;
  perPage: number = 10;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadOwnerAndRepos();
  }

  loadOwnerAndRepos(): void {
    this.githubService.getUserDetails(this.username).subscribe((data) => {
      this.owner = data;
    });

    this.githubService.getRepos(this.username).subscribe((repos) => {
      this.repositories = repos;
    });
  }

  openRepo(url: string): void {
    window.open(url, '_blank');
  }

  // For pagination/infinite scrolling, implement this logic.
  loadMore(): void {
    this.page++;
    this.githubService.getRepos(this.username).subscribe((repos) => {
      this.repositories.push(...repos); // Append new data
    });
  }

}
