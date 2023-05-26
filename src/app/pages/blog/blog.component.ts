import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  public img = `../../../assets/photo.jpg`;

  public blogs!: IBlogResponse[];

 
  constructor(private blogServise: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(): void {
    this.blogServise.getAll().subscribe((data) => {
      this.blogs = data;
    });
  }

}
