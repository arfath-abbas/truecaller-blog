import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PostDetailComponent implements OnInit {
  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.postService.getPost(slug).subscribe(response => {
        this.post = response;
      });
    });
  }
}
