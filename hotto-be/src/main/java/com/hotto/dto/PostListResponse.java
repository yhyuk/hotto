package com.hotto.dto;

import com.hotto.entity.Post;

import java.time.LocalDateTime;

public record PostListResponse (
        Long id,
        String nickname,
        String ipAddress,
        String title,
        LocalDateTime createdAt,
        int views,
        int likes
){
    public PostListResponse(Post post) {
        this(
                post.getId(),
                post.getNickname(),
                post.getIpAddress(),
                post.getTitle(),
                post.getCreatedAt(),
                post.getViews(),
                post.getLikes()
        );
    }
}
