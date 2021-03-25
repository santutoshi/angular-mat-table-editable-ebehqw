import { Component } from "@angular/core";
import { FormControl, FormArray, FormGroup, Validators } from "@angular/forms";

import { CoreService } from "./services/core.service";

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: "table-basic-example",
  styleUrls: ["table-basic-example.css"],
  templateUrl: "table-basic-example.html"
})
export class TableBasicExample {
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = this.core.list$;
  controls: FormArray;

  constructor(private core: CoreService) {}

  ngOnInit() {
    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup(
        {
          position: new FormControl(entity.position, Validators.required),
          name: new FormControl(entity.name, Validators.required),
          weight: new FormControl(entity.weight, Validators.required),
          symbol: new FormControl(entity.symbol, Validators.required)
        },
        { updateOn: "blur" }
      );
    });

    this.controls = new FormArray(toGroups);
  }

  editField: string;
  personList: Array<any> = [
    {
      id: 1,
      name: "Aurelia Vega",
      age: 30,
      companyName: "Deepends",
      country: "Spain",
      city: "Madrid"
    },
    {
      id: 2,
      name: "Guerra Cortez",
      age: 45,
      companyName: "Insectus",
      country: "USA",
      city: "San Francisco"
    },
    {
      id: 3,
      name: "Guadalupe House",
      age: 26,
      companyName: "Isotronic",
      country: "Germany",
      city: "Frankfurt am Main"
    },
    {
      id: 4,
      name: "Aurelia Vega",
      age: 30,
      companyName: "Deepends",
      country: "Spain",
      city: "Madrid"
    },
    {
      id: 5,
      name: "Elisa Gallagher",
      age: 31,
      companyName: "Portica",
      country: "United Kingdom",
      city: "London"
    }
  ];

  awaitingPersonList: Array<any> = [
    {
      id: 6,
      name: "George Vega",
      age: 28,
      companyName: "Classical",
      country: "Russia",
      city: "Moscow"
    },
    {
      id: 7,
      name: "Mike Low",
      age: 22,
      companyName: "Lou",
      country: "USA",
      city: "Los Angeles"
    },
    {
      id: 8,
      name: "John Derp",
      age: 36,
      companyName: "Derping",
      country: "USA",
      city: "Chicago"
    },
    {
      id: 9,
      name: "Anastasia John",
      age: 21,
      companyName: "Ajo",
      country: "Brazil",
      city: "Rio"
    },
    {
      id: 10,
      name: "John Maklowicz",
      age: 36,
      companyName: "Mako",
      country: "Poland",
      city: "Bialystok"
    }
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index, field, control.value);
    }
  }

  getControl(index, fieldName) {
    const a = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
