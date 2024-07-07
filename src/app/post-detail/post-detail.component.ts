import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class PostDetailComponent implements OnInit {
  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.postService.getPost(slug).subscribe(data => {
        this.post = data;
      });
    }
  }
}
