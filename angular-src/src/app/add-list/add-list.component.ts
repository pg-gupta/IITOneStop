import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  private newList: List;
  private lists: List[];
  @Output() addList: EventEmitter<List> = new EventEmitter<List>();
  constructor(private listServ: ListService, private router: Router) { }

  ngOnInit() {
  	//this.newList = {
  	//	title: '',
  	//	category:'',
  	//	description:'',
  	//	_id:''

   //     }
    this.getList();

  }

  public getList() {
    //Get all lists from server and update the lists property
    //this.listServ.getAllLists().subscribe(
    //  response => this.lists = response)

    this.listServ.getAllLists().subscribe(result => {
      this.lists = result;
    }, error => console.error(error));
  }

  public onSubmit() {
  	console.log(this.newList.category);
  	this.listServ.addList(this.newList).subscribe(
  		response=> {

  			if(response.success== true)
  				this.addList.emit(this.newList);
  		},
	);

  }

  onClick() {
    //this.router.navigate(['./', { outlets: { 'app-doc-details': [456] } }]);
    //this.router.navigate(['/app-doc-details', 456]);
    this.router.navigate(['app-doc-details', '456']);
    //this.router.navigate(['customer', account.item.accountNumber]);
  }
}
