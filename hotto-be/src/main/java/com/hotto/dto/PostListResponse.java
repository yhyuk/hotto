package com.hotto.dto;

import com.hotto.entity.Post;

import java.time.LocalDateTime;
import java.util.List;

public record PostListResponse (
        Long id,
        String nickname,
        String ipAddress,
        String title,
        List<String> tags,
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
                post.getPostTags().stream()
                        .map(postTag -> postTag.getTag().getTagName())
                        .toList(),
                post.getCreatedAt(),
                post.getViews(),
                post.getLikes()
        );
    }
}
