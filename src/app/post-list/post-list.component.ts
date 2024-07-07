import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { PostService } from '../post.service';
import { TimeAgoPipe } from '../time-ago.pipe';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe], // Add the custom pipe here
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  pageSize: number = 20;
  totalRecords: number = 0;
  displayedPosts: any[] = [];
  totalPages: number = 1;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.fetchCategories();
  }

  fetchPosts(page: number = 1): void {
    this.postService.getPosts(page).subscribe((data: any) => {
      this.posts = data.posts;
      this.totalRecords = data.total;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      this.updateDisplayedPosts();
    });
  }

  fetchCategories(): void {
    this.postService.getCategories().subscribe((data: any) => {
      this.categories = data.categories;
    });
  }

  onCategoryChange(event: any): void {
    const category = event.target.value;
    this.selectedCategory = category;
    this.currentPage = 1;
    if (category) {
      this.postService.getPostsByCategory(category, this.currentPage).subscribe((data: any) => {
        this.posts = data.posts;
        this.totalRecords = data.total;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.updateDisplayedPosts();
      });
    } else {
      this.fetchPosts();
    }
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      if (this.selectedCategory) {
        this.postService.getPostsByCategory(this.selectedCategory, page).subscribe((data: any) => {
          this.posts = data.posts;
          this.totalRecords = data.total;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.updateDisplayedPosts();
        });
      } else {
        this.fetchPosts(page);
      }
    }
  }

  updateDisplayedPosts(): void {
    this.displayedPosts = this.posts;
  }

  viewPost(slug: string): void {
    this.router.navigate(['/post', slug]);
  }

  getCategoryKeys(categories: any): string[] {
    return Object.keys(categories);
  }
}