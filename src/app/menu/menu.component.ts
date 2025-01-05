import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfileListComponent } from '../profile-list/profile-list.component';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems = [
    { label: 'Criar Usuário', id: 'user-form' },
    { label: 'Listar Usuários', id: 'user-list' },
    { label: 'Criar Perfil', id: 'profile-form' },
    { label: 'Listar Perfis', id: 'profile-list' }
  ];

  @Output() activeSectionChange = new EventEmitter<string>();

  activeSection: string = 'user-list';
  constructor(private authService: AuthService) { }
  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
    this.activeSectionChange.emit(sectionId);
  }
  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
