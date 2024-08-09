import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, NgForOf, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-nestjs-firestore-subscription-stream-data';

  company = {
    name: "Apple",
    employees: [
      "Smith"
    ]
  }
  constructor(public firestore: Firestore) { }

  public company$!: Observable<((DocumentData & { [T in string]: string }) | NonNullable<DocumentData>)[]>;

  ngOnInit() {
    const companyCollection = collection(this.firestore, 'company');
    this.company$ = collectionData(companyCollection, { idField: 'id' });

  }
}
