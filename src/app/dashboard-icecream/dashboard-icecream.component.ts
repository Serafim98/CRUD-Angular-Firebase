import { Component } from '@angular/core';
import { IcecreamService } from './../icecream.service';



@Component({
  selector: 'app-dashboard-icecream',
  templateUrl: './dashboard-icecream.component.html',
  styleUrls: ['./dashboard-icecream.component.css']
})
export class DashboardIcecreamComponent {

  icecreams: any;
  icecreamName!: string;
  icecreamCalories!: number | undefined;
  icecreamDescription!: string;

  constructor(private icecreamService: IcecreamService) { }

  ngOnInit() {
    this.icecreamService.read_Icecreams().subscribe((data: any) => {
      this.icecreams = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Calories: e.payload.doc.data()['Calories'],
          Description: e.payload.doc.data()['Description'],
        };
      })
      console.log(this.icecreams);
    });
  }

  CreateRecord() {
    let record: any = {};
    record['Name'] = this.icecreamName;
    record['Calories'] = this.icecreamCalories;
    record['Description'] = this.icecreamDescription;
    this.icecreamService.create_NewIcecream(record).then(resp => {
      this.icecreamName = "";
      this.icecreamCalories = undefined;
      this.icecreamDescription = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
  RemoveRecord(rowID: any) {
    this.icecreamService.delete_Icecream(rowID);
  }
  EditRecord(record: any) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditCalories = record.Calories;
    record.EditDescription = record.Description;
  }
  UpdateRecord(recordRow: any) {
    let record: any = {};
    record['Name'] = recordRow.EditName;
    record['Calories'] = recordRow.EditCalories;
    record['Description'] = recordRow.EditDescription;
    this.icecreamService.update_Icecream(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
