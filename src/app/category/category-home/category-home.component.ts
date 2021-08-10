import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { InventoryPos } from 'src/app/validators/inventory-pos';
@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss']
})
export class CategoryHomeComponent implements OnInit {


  // MatPaginator Output
  pageEvent: PageEvent;

  // MatPaginator Inputs
  thePageNumber: number = 1;
  length:number = 0;
  pageSize:number = 3;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  onPaginate(pageEvent:PageEvent){
    this.pageSize=+pageEvent.pageSize;
    this.thePageNumber=+pageEvent.pageIndex+1;
    this.listProductCategories();

  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



productCategories:ProductCategory[];
  constructor(private formBuilder:FormBuilder,private productCategoryService:ProductCategoryService) { }

  categoryFormGroup:FormGroup;

  ngOnInit(): void {

    this.categoryFormGroup=this.formBuilder.group(
      {
        categoryName: new FormControl('',[Validators.required,Validators.minLength(2),InventoryPos.notOnlyWhitespace])
      }
    )


    this.listProductCategories();
  }


  get categoryName(){return this.categoryFormGroup.get('categoryName');}
  listProductCategories() {
    this.productCategoryService.getProductCategoriesPaginate(this.thePageNumber-1,this.pageSize).subscribe(

      this.processResult()
    )
  }

  processResult() {
    return (data) => {
      this.productCategories = data._embedded.productCategory;
      this.thePageNumber = data.page.number ;
      this.pageSize = data.page.size;
      this.length = data.page.totalElements;
    };
  }

  onSubmit(){

  }

}
