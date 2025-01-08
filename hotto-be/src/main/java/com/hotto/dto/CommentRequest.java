package com.hotto.dto;

public record CommentRequest (
        String nickname,
        String password,
        String content
){
}
