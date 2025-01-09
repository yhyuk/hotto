package com.hotto.controller;

import com.hotto.dto.*;
import com.hotto.entity.Post;
import com.hotto.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/posts")
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
    public ResponseEntity<Post> createPost(@RequestBody PostRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(postService.createPost(request, httpRequest));
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<Post> addLike(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.addLike(postId));
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long postId, @RequestBody CommentRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(postService.addComment(postId, request, httpRequest));
    }
}
