import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserProfile} from 'src/types/userProfile';
import { GraphObject } from 'src/types/userProfile';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  graphMap: any = [];
  @ViewChild('mainDiv') mainDiv?: ElementRef<any>;
  selectionForm: FormGroup;

  tempGraphArr: GraphObject = {
    "0": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534732d-1331-48de-8bcb-5d83447f0831&maxDataAge=300&theme=light&autoRefresh=true"
    }, 
    "1": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534a826-765d-4c1f-8cd6-a8b6939efa38&maxDataAge=3600&theme=light&autoRefresh=true"
    }, 
    "2": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534ce24-c4df-4138-86fe-3f3dcef35f7a&maxDataAge=3600&theme=light&autoRefresh=true"
    },
    "3": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6534cf06-e091-410e-85c2-9f6159a68825&maxDataAge=3600&theme=light&autoRefresh=true"
    },
    "4": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=65459b49-e494-482b-84e6-df084e7721b9&maxDataAge=3600&theme=light&autoRefresh=true"
    },
    "5": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6545b832-fc4e-4bbf-8435-51d61fce0225&maxDataAge=3600&theme=light&autoRefresh=true"
    },
    "6": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6545bb47-2d82-4281-8923-b59c3c8f0bdd&maxDataAge=3600&theme=light&autoRefresh=true"
    },
    "7": {
      "src": "https://charts.mongodb.com/charts-project-0-mcbzq/embed/charts?id=6545c291-1c1d-4385-8425-0c58858d5f8d&maxDataAge=3600&theme=light&autoRefresh=true"
    }
  };

  tempUserSelection: any = [];

  checkBoxData = [ 
    {
      "value": "0",
      "label": "Percentage of Greenhouse Gas Emissions by Scope"
    },
    {
      "value": "1",
      "label": "Monthly Sum of Greenhouse Gas Emissions sorted by Source"
    },
    {
      "value": "2",
      "label": "Monthly Sum of Greenhouse Gas Emissions sorted by Scope"
    },
    {
      "value": "3",
      "label": "Sum of Greenhouse Gas Emissions Tracked in Carbon Dioxide"
    },
    {
      "value": "4",
      "label": "Scope 1: Fuel Combustion"
    },
    {
      "value": "5",
      "label": "Scope 1: Other Emissions"
    },
    {
      "value": "6",
      "label": "Scope 2: Electricity consumption"
    },
    {
      "value": "7",
      "label": "Scope 3: Water Usage"
    },
  ]
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private sanitizer: DomSanitizer){
    this.selectionForm = this.formBuilder.group({
      selectedGraphs: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.getGraphSelection();
  }


  saveGraphSelections(data: any) {
    console.log(data);

  }

  // Method to get the user's graph selection
  getGraphSelection() {

    this.authService.getUserProfile().subscribe(
      (userProfile: Object) => {
        const castedUserProfile = userProfile as UserProfile;
        this.tempUserSelection = castedUserProfile.selectedGraphs;
        console.log(this.tempUserSelection, 'selectedGraphs')
      },
      (error) => {
        console.error('Error in retrieving the graph selection')
      }
    );
  }

  filterGraphsBasedOnSelection(){
  // Assuming tempUserSelection is an array of selected graph IDs
  const selectedGraphIds = this.tempUserSelection || [];

  // Filter tempGraphArr based on selected graph IDs
  const filteredGraphs = selectedGraphIds.map((id: string | number) => this.tempGraphArr[id]);

  // Now, filteredGraphs contains only the graphs that were selected by the user
  console.log('Filtered Graphs:', filteredGraphs);
  return filteredGraphs;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  scrollRight() {
    const mainDivElement = this?.mainDiv?.nativeElement as HTMLElement;
    console.log(mainDivElement);
    mainDivElement.scrollLeft += 50; // Adjust the value based on how much you want to scroll
  }

  get selectedGraphs(): FormArray {
    return this.selectionForm.get('selectedGraphs') as FormArray;
  }

  // Add a method to handle the checkbox changes
  onCheckboxChange(event: Event, index: number): void {
    const formArray: FormArray = this.selectedGraphs;

     if (event.target instanceof HTMLInputElement && event.target.checked) {
      console.log(event.target);
      formArray.push(this.formBuilder.control(index.toString()));
    } else {
      const indexToRemove = formArray.controls.findIndex(x => x.value === index.toString());
      formArray.removeAt(indexToRemove);
    }
  }
}
