import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-display',
  templateUrl: './news-display.component.html',
  styleUrls: ['./news-display.component.css']
})
export class NewsDisplayComponent implements OnInit{

  articles$!: Observable<Article[]>
  article: Article[] = []

  constructor(private newsSvc: NewsService) { }

  ngOnInit(): void {
    // set  news$ after getting value from onNews() method in newsSvc
    this.articles$ = this.newsSvc.onNews
    console.log("articles$: ", this.articles$)
    // subscribe, everytime .next() is executed, will pass us data and we'll set data as this.articles
   
  }

}
