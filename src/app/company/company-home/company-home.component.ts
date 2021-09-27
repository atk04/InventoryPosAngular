import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import { Companies } from 'src/app/common/companies';
import { Company } from 'src/app/common/company';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyApiCallServiceService } from 'src/app/services/company-api-call-service.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  //Snotify Message
  style = 'material';
  title = 'Alert Message';
  body = 'text';
  timeout = 1500;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 50;
  bodyMaxLength = 80;

  // MatPaginator Output
  pageEvent: PageEvent;

  // MatPaginator Inputs
  thePageNumber: number = 1;
  length: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  onPaginate(pageEvent: PageEvent) {
    this.pageSize = +pageEvent.pageSize;
    this.thePageNumber = +pageEvent.pageIndex + 1;
    this.listCompanies();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  Company:Company=new Company();



  company:Companies=new Companies();
  Companies:Companies[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private companyService:CompanyService,
    private companyApiCallService:CompanyApiCallServiceService,
    private snotifyService: SnotifyService
  ) {}

  companyFormGroup: FormGroup;

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      Name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Website: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
    });

    this.listCompanies();
  }

  //Company Name Getter for validation
  get Name(){
    return this.companyFormGroup.get('Name');
  }

  //Company Address Getter for validation
  get Address(){
    return this.companyFormGroup.get('Address');
  }

  //Company Phone Getter for validation
  get Phone(){
    return this.companyFormGroup.get('Phone');
  }

  //Company Email Getter for validation
  get Email(){
    return this.companyFormGroup.get('Email');
  }

   //Company Website Getter for validation
   get Website(){
    return this.companyFormGroup.get('Website');
  }

  listCompanies() {
    this.companyService
      .getCompaniesPaginate(this.thePageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      console.log(data)
      this.Companies = data._embedded.company;
      this.thePageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.length = data.page.totalElements;
    };
  }

  //Snotify Alert
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates,
      },
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
    };
  }

  //Snotify Alert Methods
  onSuccess() {
    this.snotifyService.success(this.body, this.title, this.getConfig());
  }
  onInfo() {
    this.snotifyService.info(this.body, this.title, this.getConfig());
  }
  onError() {
    this.snotifyService.error(this.body, this.title, this.getConfig());
  }
  onWarning() {
    this.snotifyService.warning(this.body, this.title, this.getConfig());
  }




  onSubmit() {
    if (this.companyFormGroup.invalid) {
      this.companyFormGroup.markAllAsTouched();
      return;
    }

    this.company.name = this.companyFormGroup.controls['Name'].value;
    this.company.address = this.companyFormGroup.controls['Address'].value;
    this.company.phoneNumber = this.companyFormGroup.controls['Phone'].value;
    this.company.emailAddress = this.companyFormGroup.controls['Email'].value;
    this.company.websiteAddress =
      this.companyFormGroup.controls['Website'].value;
      this.companyApiCallService
      .createCompany(this.company)
      .subscribe({
        next: (response) => {
          this.title = 'Create Success';
          this.body = 'Company: ' + `${response.name}`;
          this.onSuccess();
          this.listCompanies();
        },
        error: (err) => {
          this.title = `Error`;
          this.body = 'Add Fail';
          this.onError();
          this.listCompanies();
        },
      });

  }

  onDelete(id: number) {
    this.companyApiCallService.deleteCompanyById(id).subscribe({
      next: (response) => {
        this.title = 'Delete Success';
        this.body = 'Category: ' + `${response.message}`;
        this.onSuccess();
        this.listCompanies();
      }
    });
  }
}
