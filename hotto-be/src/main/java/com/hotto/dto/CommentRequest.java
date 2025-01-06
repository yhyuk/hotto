package com.hotto.dto;

public record CommentRequest (
        Long postId,
        String nickname,
        String content
){
}
