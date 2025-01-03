package com.hotto.dto;

import com.hotto.entity.Comment;

public record CommentResponse (
        Long id,
        String nickname,
        String ipAddress,
        String content,
        String createdAt
){

    public CommentResponse(Comment comment) {
        this(
                comment.getId(),
                comment.getNickname(),
                comment.getIpAddress(),
                comment.getContent(),
                comment.getCreatedAt().toString()
        );
    }
}
