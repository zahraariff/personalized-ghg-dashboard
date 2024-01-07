import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {

  // Store all graph arrays here
  graphArr = [
    {
      "name": "graph1",
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534732d-1331-48de-8bcb-5d83447f0831&maxDataAge=300&theme=light&autoRefresh=true"
    },{
      "name": "graph2",
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534a826-765d-4c1f-8cd6-a8b6939efa38&maxDataAge=3600&theme=light&autoRefresh=true"
    }
  ]; 

  graphSelectionForm: FormGroup;
  isGraph1Visible: boolean = false;
  isGraph2Visible: boolean = false;
  isGraph3Visible: boolean = false;
  isGraph4Visible: boolean = false;
  isGraph5Visible: boolean = false;
  isGraph6Visible: boolean = false;
  isGraph7Visible: boolean = false;
  isGraph8Visible: boolean = false;
  showForm: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.graphSelectionForm = this.formBuilder.group({
      graph1: [false],
      graph2: [false],
      graph3: [false],
      graph4: [false]
    });
  }


  saveGraphSelections(data: any) {
    console.log(data);
    // switch(data)
    // this.graphSelection.push(data);

    const graphSelections = Object.keys(data).filter(key => data[key]);

    graphSelections.forEach(key => {
      switch (key) {
        case 'graph1':
          this.isGraph1Visible = true;
          break;

        case 'graph2':
          this.isGraph2Visible = true;
          break;

        case 'graph3':
          this.isGraph3Visible = true;
          break;

        case 'graph4':
          this.isGraph4Visible = true;
          break;

        case 'graph5':
          this.isGraph5Visible = true;
          break;

        case 'graph6':
          this.isGraph6Visible = true;
          break;

        case 'graph7':
          this.isGraph7Visible = true;
          break;
          
        case 'graph8':
          this.isGraph8Visible = true;
          break;
      }
    });

  }

  

}
