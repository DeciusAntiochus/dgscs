import { Component, OnInit } from '@angular/core';
import { AnnouncesService, Announce } from '../services/announces.service';
import { WorkPackage } from '../services/workpackages.service';
import { Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  announce:Announce;
  ready:boolean = false;

  //favs:Array<any> = [];
  favWorkPackages = [];
  favTasks = [];


  constructor(private announceService: AnnouncesService, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {

    this.announceService.getLastAnnounce().subscribe((res:any)=> (this.announce = res) && (this.ready = true) && (console.log(res)) , (error)=> console.log(error))

    this.getFavs();

  }

  getFavs(){

    this.userService.getMyFavs().subscribe((res:any) => {
      this.favWorkPackages = res.favWorkPackages;
      this.favTasks = res.favTasks;
    },
    (error) => console.log(error)
    )

  }

  instanceOfWorkpackage(object: any): object is WorkPackage {
    return 'tasks' in object; //marqueur d'un wp : un wp a des taches comme attribut, pas une tache ni une mission!
  }
  
  instanceOfTasks(object: any): object is Task {
    return 'endingDate' in object; //marqueur d'une tache: une tache a une date de fin comme attribut, pas un wp ni une mission!
  }
  
  instanceOfMission(object:any) {
  
    return false; //à compléter
  
  }

  date(date:Date){

    let mydate = new Date(date);
    const options = {month: 'long', day: 'numeric' };


    const options_time = { hour:"2-digit", minute:"2-digit"}

    return mydate.toLocaleDateString('fr-FR', options) + " à " + mydate.toLocaleTimeString('fr-FR',options_time)

  }

}
