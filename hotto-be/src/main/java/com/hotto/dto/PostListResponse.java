package com.hotto.dto;

import com.hotto.entity.Post;

public record PostListResponse (
        Long id,
        String nickanme,
        String ipAddress,
        String title,
        String createdAt,
        int views,
        int likes
){
    public PostListResponse(Post post) {
        this(
                post.getId(),
                post.getNickname(),
                post.getIpAddress(),
                post.getTitle(),
                post.getCreatedAt().toString(),
                post.getViews(),
                post.getLikes()
        );
    }
}
