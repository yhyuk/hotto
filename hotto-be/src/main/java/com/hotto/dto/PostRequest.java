package com.hotto.dto;

import java.util.List;

public record PostRequest (
        String nickname,
        String password,
        String title,
        String content,
        List<String> tagNames
){
}
