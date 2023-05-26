import { Component, OnInit } from '@angular/core';
import {
  IBlogRequest,
  IBlogResponse,
} from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';


@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})

export class AdminBlogComponent implements OnInit {
  public adminBlogs!: IBlogResponse[];
  public title = '';
  public text = '';
  public author = '';
  public img = '../../../assets/photo.jpg';
  public editID!: number;
  public btn = true;

  constructor(private blogServise: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogServise.getAll().subscribe((data) => {
      this.adminBlogs = data;
    });
  }

  addBlogs(): void {
    const newBlog = {
      title: this.title,
      text: this.text,
      author: this.author,
      img: this.img,
    };
    this.blogServise.create(newBlog).subscribe(() => {
      this.getBlogs();
      this.resetForm();
    });
  }

  editBlog(blog: IBlogResponse): void {
    this.title = blog.title;
    this.text = blog.text;
    this.author = blog.author;
    this.editID = blog.id;
    this.btn = false;
  }

  saveBlogs(): void {
    const updateBlog = {
      title: this.title,
      text: this.text,
      author: this.author,
      img: this.img,
    };
    this.blogServise.upDate(updateBlog, this.editID).subscribe(() => {
      this.getBlogs();
      this.resetForm();
      this.btn = true;
    });
  }

  deleteBlog(blog: IBlogResponse): void {
    if (confirm('Are you sure?')) {
      this.blogServise.delete(blog.id).subscribe(() => {
        this.getBlogs();
      });
    }
  }
  
  private resetForm(): void {
    this.title = '';
    this.text = '';
    this.author = '';
  }
}
