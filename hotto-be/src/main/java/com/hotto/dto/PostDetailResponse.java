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
        List<String> tags,
        LocalDateTime createdAt,
        int views,
        int likes,
        int commentCount,
        List<CommentResponse> comments
){
    public PostDetailResponse(Post post, List<Comment> comments) {
        this(
                post.getId(),
                post.getNickname(),
                post.getIpAddress(),
                post.getTitle(),
                post.getContent(),
                post.getPostTags().stream()
                        .map(postTag -> postTag.getTag().getTagName())
                        .toList(),
                post.getCreatedAt(),
                post.getViews(),
                post.getLikes(),
                post.getCommentCount(),
                comments.stream().map(CommentResponse::new).toList()
        );
    }
}
