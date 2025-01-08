package com.hotto.service;

import com.hotto.dto.CommentRequest;
import com.hotto.dto.PostDetailResponse;
import com.hotto.dto.PostListResponse;
import com.hotto.dto.PostRequest;
import com.hotto.entity.Comment;
import com.hotto.entity.Post;
import com.hotto.entity.PostTag;
import com.hotto.entity.Tag;
import com.hotto.repository.CommentRepository;
import com.hotto.repository.PostRepository;
import com.hotto.repository.PostTagRepository;
import com.hotto.repository.TagRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;

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

        post.addView();
        return new PostDetailResponse(post, comments);
    }

    /**
     * 글 작성
     */
    @Transactional
    public Post createPost(PostRequest request, HttpServletRequest httpRequest) {
        final Post post = Post.builder()
                .nickname(request.nickname())
                .password(request.password())
                .ipAddress(getClientIp(httpRequest))
                .title(request.title())
                .content(request.content())
                .createdAt(LocalDateTime.now())
                .build();

        postRepository.save(post);

        // 태그 처리
        if (request.tagNames() != null && !request.tagNames().isEmpty()) {
            List<Tag> tags = handleTags(request.tagNames(), post);

            tags.forEach(tag -> {
                PostTag postTag = PostTag.builder()
                        .post(post)
                        .tag(tag)
                        .build();
                postTagRepository.save(postTag);
            });
        }

        return post;
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
    public Comment addComment(Long postId, CommentRequest request, HttpServletRequest httpRequest) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        Comment comment = Comment.builder()
                .nickname(request.nickname())
                .password(request.password())
                .ipAddress(getClientIp(httpRequest))
                .content(request.content())
                .post(post)
                .createdAt(LocalDateTime.now())
                .build();

        return commentRepository.save(comment);
    }


    // 태그 처리
    private List<Tag> handleTags(List<String> tagNames, Post post) {
        log.info("태그 체크 : {}", tagNames);

        return tagNames.stream().map(tagName -> tagRepository.findByTagName(tagName)
                .orElseGet(() -> {
                    // 태그가 없으면 새로 생성
                    Tag newTag = Tag.builder()
                            .tagName(tagName)
                            .createdAt(LocalDateTime.now())
                            .build();
                    return tagRepository.save(newTag);
                })).collect(Collectors.toList());
    }

    private String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }

}
