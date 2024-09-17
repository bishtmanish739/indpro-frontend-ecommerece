import { Component } from '@angular/core';

@Component({
  selector: 'app-question-1',
  templateUrl: './question-1.component.html',
  styleUrls: ['./question-1.component.css']
})
export class Question1Component {
  isSidebarCollapsed = true;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
