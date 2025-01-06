package com.hotto.controller;

import com.hotto.dto.CommentRequest;
import com.hotto.dto.PostDetailResponse;
import com.hotto.dto.PostListResponse;
import com.hotto.dto.PostRequest;
import com.hotto.entity.Comment;
import com.hotto.entity.Post;
import com.hotto.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/posts")
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostListResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> getPostById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<Post> addLike(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.addLike(postId));
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(postService.addComment(request, httpRequest));
    }
}
