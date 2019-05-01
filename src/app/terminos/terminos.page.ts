import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  emaile;
  usuario = {} as User;

  constructor(private route: ActivatedRoute) { 
  

  }

  ngOnInit() {
  }

}
