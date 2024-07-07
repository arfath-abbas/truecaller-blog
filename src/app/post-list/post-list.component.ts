import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(data => {
      console.log(data);  // Log the data to inspect its structure
      this.posts = data.posts;
    });
  }

  loadCategories(): void {
    this.postService.getCategories().subscribe(data => {
      this.categories = data.categories;
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.selectedCategory = category;
    this.loadPostsByCategory(category || ''); // Provide a default value
  }

  loadPostsByCategory(category: string): void {
    this.postService.getPostsByCategory(category).subscribe(data => {
      this.posts = data.posts;
    });
  }

  viewPost(slug: string): void {
    this.router.navigate(['/post', slug]);
  }
}
