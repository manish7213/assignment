import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { Employee } from '../model/Employee';
import { EmpRegistrationService } from '../services/emp-registration.service';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  employeeForm!: FormGroup;
  postData: any;
  IsColumnsToFit: any;
  allEmployeeData: Employee[] = [];
  rowData: Employee[] = [];
  // constructor(private httpClient:HttpClient) { }
  constructor(private fb: FormBuilder, private http: HttpClient, private empService: EmpRegistrationService) { }
  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      department: ['', Validators.required]

    });

    this.loadAllData();

  }

  public loadAllData() {

    this.empService.getAllData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.allEmployeeData.push(data[i]);
        this.rowData.push(data[i]);
      }

      this.rowData = data;

    });

    console.log(this.allEmployeeData);
    console.log('row data is ');
    console.log(this.rowData);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    this.empService.saveData(this.employeeForm.value).subscribe(data => {
      this.loadAllData();
    });


  }

  onClear() {
    this.employeeForm.reset();
  }

  columnDefs = [
    { headerName: 'Emp Id',field: 'empId', sortable: true, filter: true },
    { headerName: 'First Name',field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name',field: 'lastName', sortable: true, filter: true },
    { headerName: 'Gender',field: 'gender', sortable: true, filter: true },
    { headerName: 'Dob',field: 'dob', sortable: true, filter: true },
    { headerName: 'Department',field: 'department', sortable: true, filter: true },
  ];



}

