package com.hotto.dto;

import com.hotto.entity.Comment;
import com.hotto.entity.Post;

import java.time.LocalDateTime;
import java.util.List;

public record PostDetailResponse (
        Long id,
        String nickname,
        String ipAddress,
        String title,
        String content,
        int likes,
        int views,
        LocalDateTime createdAt,
        List<CommentResponse> comments
){
    public PostDetailResponse(Post post, List<Comment> comments) {
        this(
                post.getId(),
                post.getNickname(),
                post.getIpAddress(),
                post.getTitle(),
                post.getContent(),
                post.getViews(),
                post.getLikes(),
                post.getCreatedAt(),
                comments.stream().map(CommentResponse::new).toList()
        );
    }
}
