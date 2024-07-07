import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

interface Post {
  title: string;
  date: string;
  post_thumbnail?: {
    URL: string;
  };
  categories: string[];
  slug: string;
}

interface Category {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  displayedPosts: Post[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  currentPage = 1;
  pageSize = 20;
  totalRecords = 0;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.loadPosts();
    this.postService.getCategories().subscribe(data => {
      this.categories = data.categories.map((category: any) => ({ name: category.name, slug: category.slug }));
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  loadPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data.posts;
      this.totalRecords = data.found;
      this.updateDisplayedPosts();
    });
  }

  updateDisplayedPosts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedPosts = this.posts.slice(start, end);
  }

  onCategoryChange(event: any) {
    this.currentPage = 1;
    if (this.selectedCategory) {
      this.postService.getPostsByCategory(this.selectedCategory).subscribe(data => {
        this.posts = data.posts;
        this.totalRecords = data.found;
        this.updateDisplayedPosts();
      });
    } else {
      this.loadPosts();
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedPosts();
  }

  viewPost(slug: string): void {
    this.router.navigate(['/post', slug]);
  }
}
