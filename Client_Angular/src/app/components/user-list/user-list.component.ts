import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];

  newUser: User = {
    Id: 0,
    Name: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService) {}

  loadUsers(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load users from server';
      }
    });
  }

  addUser(): void {
    //  ניקוי הודעות קודמות
    this.errorMessage = '';
    this.successMessage = '';

    // ולידציה קלה בצד לקוח
    if (!this.newUser.Name || this.newUser.Name.trim() === '') {
      this.errorMessage = 'Name is required';
      return;
    }

    if (this.newUser.Id <= 0) {
      this.errorMessage = 'Id must be greater than 0';
      return;
    }

    this.userService.addUser(this.newUser).subscribe({
      next: (result) => {
        this.users.push(result);

        // הודעת הצלחה
        this.successMessage = 'User added successfully';

        // ניקוי שדות
        this.resetForm();
      },
      error: (err) => {
        if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Failed to add user';
        }
      }
    });
  }

  private resetForm(): void {
    this.newUser = {
      Id: 0,
      Name: ''
    };
  }
}