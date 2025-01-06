package com.hotto.service;

import com.hotto.dto.CommentRequest;
import com.hotto.dto.PostDetailResponse;
import com.hotto.dto.PostListResponse;
import com.hotto.dto.PostRequest;
import com.hotto.entity.Comment;
import com.hotto.entity.Post;
import com.hotto.repository.CommentRepository;
import com.hotto.repository.PostRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    /**
     * 글 목록 조회
     */
    public List<PostListResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(PostListResponse::new)
                .toList();
    }

    /**
     * 글 상세 조회
     */
    public PostDetailResponse getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글 입니다."));

        List<Comment> comments = commentRepository.findByPostId(post.getId());
        return new PostDetailResponse(post, comments);
    }

    /**
     * 글 작성
     */
    @Transactional
    public Post createPost(PostRequest request) {
        Post post = new Post(
                request.nickname(),
                request.ipAddress(),
                request.title(),
                request.content()
        );

        return postRepository.save(post);
    }

    /**
     * 추천하기
     */
    @Transactional
    public Post addLike(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글 입니다."));
        post.addLike();

        return postRepository.save(post);
    }

    /**
     * 댓글 작성
     */
    @Transactional
    public Comment addComment(CommentRequest request, HttpServletRequest httpRequest) {
        Post post = postRepository.findById(request.postId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        // 클라이언트 IP 주소 추출
        String ipAddress = getClientIp(httpRequest);

        Comment comment = new Comment(
                post,
                request.nickname(),
                ipAddress,
                request.content()
        );

        return commentRepository.save(comment);
    }

    // 클라이언트 IP 추출 메소드
    private String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }

}
