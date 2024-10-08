import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'indpro-frontend';
  constructor(private locationStrategy: LocationStrategy, private router: Router) {}

  ngOnInit(): void {
    this.locationStrategy.onPopState(() => {
      if (window.location.pathname === '' || window.location.pathname === '/') {
        this.router.navigate(['/products']);
      }
    });
  }
}
