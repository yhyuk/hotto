package com.hotto.dto;

public record PostRequest (
        String nickname,
        String ipAddress,
        String title,
        String content
){
}
