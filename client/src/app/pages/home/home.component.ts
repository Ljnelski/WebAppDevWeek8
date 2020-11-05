import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { BasePageComponent } from '../../partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {

    constructor(route: ActivatedRoute) { 
        super(route);
    }

    ngOnInit(): void {
    }

}
